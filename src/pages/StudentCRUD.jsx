import React, { useState, useEffect } from 'react'

const SESSION_KEY = 'students_data'

const getStudentsFromSession = () => {
  try {
    const data = sessionStorage.getItem(SESSION_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

const saveStudentsToSession = (students) => {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(students))
}

const emptyForm = { name: '', studentClass: '', age: '' }

const StudentCRUD = () => {
  const [students, setStudents] = useState(getStudentsFromSession)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState(null)
  const [errors, setErrors] = useState({})
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    saveStudentsToSession(students)
  }, [students])

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.studentClass.trim()) newErrors.studentClass = 'Class is required'
    if (!form.age || isNaN(form.age) || Number(form.age) <= 0 || Number(form.age) > 100)
      newErrors.age = 'Age must be a valid number between 1 and 100'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})

    if (editId !== null) {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === editId
            ? { ...s, name: form.name.trim(), studentClass: form.studentClass.trim(), age: Number(form.age) }
            : s
        )
      )
      setEditId(null)
    } else {
      const newStudent = {
        id: Date.now(),
        name: form.name.trim(),
        studentClass: form.studentClass.trim(),
        age: Number(form.age),
      }
      setStudents((prev) => [...prev, newStudent])
    }
    setForm(emptyForm)
  }

  const handleEdit = (student) => {
    setEditId(student.id)
    setForm({ name: student.name, studentClass: student.studentClass, age: String(student.age) })
    setErrors({})
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents((prev) => prev.filter((s) => s.id !== id))
      if (editId === id) {
        setEditId(null)
        setForm(emptyForm)
      }
    }
  }

  const handleCancel = () => {
    setEditId(null)
    setForm(emptyForm)
    setErrors({})
  }

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentClass.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Student Records (Session Storage)</h1>

        {/* Form */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-300">
            {editId !== null ? 'Edit Student' : 'Add New Student'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter name"
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Class</label>
              <input
                type="text"
                value={form.studentClass}
                onChange={(e) => setForm({ ...form, studentClass: e.target.value })}
                placeholder="Enter class"
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.studentClass && <p className="text-red-400 text-xs mt-1">{errors.studentClass}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Age</label>
              <input
                type="number"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                placeholder="Enter age"
                min="1"
                max="100"
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.age && <p className="text-red-400 text-xs mt-1">{errors.age}</p>}
            </div>

            <div className="md:col-span-3 flex gap-3 mt-2">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                {editId !== null ? 'Update Student' : 'Add Student'}
              </button>
              {editId !== null && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or class..."
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Stats */}
        <p className="text-gray-400 text-sm mb-4">
          Total: <span className="text-white font-semibold">{students.length}</span> student(s)
          {searchTerm && ` · Showing ${filteredStudents.length} result(s)`}
        </p>

        {/* Table */}
        {filteredStudents.length === 0 ? (
          <div className="bg-gray-800 rounded-xl p-10 text-center text-gray-400">
            {students.length === 0 ? 'No students yet. Add one above!' : 'No students match your search.'}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
            <table className="w-full text-left">
              <thead className="bg-gray-700 text-gray-300 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">#</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Class</th>
                  <th className="px-6 py-3">Age</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className={`border-t border-gray-700 ${
                      editId === student.id ? 'bg-blue-900/30' : 'hover:bg-gray-750'
                    }`}
                  >
                    <td className="px-6 py-4 text-gray-400">{index + 1}</td>
                    <td className="px-6 py-4 font-medium">{student.name}</td>
                    <td className="px-6 py-4 text-gray-300">{student.studentClass}</td>
                    <td className="px-6 py-4 text-gray-300">{student.age}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEdit(student)}
                        className="bg-yellow-600 hover:bg-yellow-500 text-white text-sm font-semibold py-1 px-4 rounded-lg mr-2 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="bg-red-600 hover:bg-red-500 text-white text-sm font-semibold py-1 px-4 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-center text-gray-500 text-xs mt-6">
          Data is stored in session storage — it will be cleared when the browser tab is closed.
        </p>
      </div>
    </div>
  )
}

export default StudentCRUD
