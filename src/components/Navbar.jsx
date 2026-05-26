import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <>
        <div className="">
            <nav className="bg-gray-800 p-4 text-white">
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="hover:text-gray-400">Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:text-gray-400">About</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:text-gray-400">Contact</Link>
                    </li>
                </ul>
            </nav>
        </div>
    </>
  )
}

export default Navbar