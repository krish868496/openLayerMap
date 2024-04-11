import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div>
        <nav className="bg-gray-800 py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
            {/* <!-- Logo --> */}
            <div className="text-white font-bold">
                <Link href="#">Map</Link>
            </div>

            {/* <!-- Navbar links --> */}
            <div className="hidden md:flex space-x-4">
                <Link href="#" className="text-white hover:text-gray-300">Home</Link>
                <Link href="#" className="text-white hover:text-gray-300">About</Link>
                <Link href="#" className="text-white hover:text-gray-300">Services</Link>
                <Link href="#" className="text-white hover:text-gray-300">Contact</Link>
            </div>

            <div className="md:hidden">
                <button className="text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
        </div>
    </nav>

    <div className="md:hidden bg-gray-800">
        <div className="container mx-auto py-4 px-4 flex flex-col items-center space-y-4">
            <Link href="#" className="text-white hover:text-gray-300">Home</Link>
            <Link href="#" className="text-white hover:text-gray-300">About</Link>
            <Link href="#" className="text-white hover:text-gray-300">Services</Link>
            <Link href="#" className="text-white hover:text-gray-300">Contact</Link>
        </div>
    </div>
    </div>
  )
}

export default Header