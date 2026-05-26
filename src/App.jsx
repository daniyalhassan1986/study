import React, { useState } from 'react'
import axios from 'axios'


const App = () => {

  const [page, setPage] = useState(0)
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(false)
  let image = 'no data'

  if(userData.length > 0) {
    image = userData.map((item) => {
      return (
        <div key={item.id} className="w-1/5">
          <img src={item.download_url} alt={item.author} className="w-50 h-50 rounded object-cover" />
          <p className="text-sm mt-2">{item.author}</p>
        </div>
      )
    })
  }

  const getData = async () => {
    if(page > 0) {
      const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=10`);
      setUserData(response.data);
    }
    else {
      image = 'fuck you all';
    }
  }

  return (
    <>  
      <div className="bg-black h-screen w-screen text-white p-6">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
          onClick={getData}>
          Page: {page}
        </button>
        <div className="flex flex-wrap p-2">
          {image}
        </div>

        <div className="flex justify-center align-middle gap-4 mt-4"> 
          <button className="bg-amber-500 hover:bg-amber-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded" 
            onClick={() => 
              getData() &&
              setPage(page - 1)}>
            Previous Page
          </button>

          <button className="bg-amber-500 hover:bg-amber-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded" 
            onClick={() => 
              getData() &&
              setPage(page + 1)}>
            Next Page
          </button>
        </div>

      </div>

    </>
  )
}

export default App
