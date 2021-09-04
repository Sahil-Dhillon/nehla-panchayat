import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.png'
const Navbar = () => {
    return (
        <header className="text-gray-600 body-font ">
            <div className="container flex flex-wrap px-5 py-6 flex-row  md:flex-column items-center lg:justify-between justify-center">
                <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <img src={logo} alt="logo" style={{ width: "60px", height: "auto" }} />
                    <span className="ml-3 text-xl">Gram Panchayat Nehla</span>
                </Link>
                <nav className=" flex flex-wrap items-center text-base justify-center">
                    <span className="mr-5 hover:text-gray-900" >
                        <Link to='/'>
                            Home
                        </Link>
                    </span>
                    <span className="mr-5 hover:text-gray-900">
                        <Link to='/gallery'>
                            Gallery
                        </Link>
                    </span>
                    <span className="mr-5 hover:text-gray-900">
                        <Link to='/PDS'>
                            PDS
                        </Link>
                    </span>
                    <span className=" hover:text-gray-900">
                        <Link to='/Admin'>
                            Admin
                        </Link>
                    </span>
                </nav>
            </div>
        </header>
    )
}
export default Navbar