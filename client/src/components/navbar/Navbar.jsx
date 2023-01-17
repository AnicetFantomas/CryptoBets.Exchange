import React from "react";


const Navbar = () => {


    return (
              
        <div className="nav flex justify-between shadow-2xl">
            <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" 
                fill="#FFFFFF" 
                viewBox="0 0 30 30" 
                strokeWidth="1.5" 
                stroke="currentColor" 
                className="menu mt-3 ml-6 w-14 h-15">
                <path strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <p id="txt-title" className="text-white tracking-tighter mt-5 font-medium text-2xl">CryptoBets.Exchange</p>
            </div>
        </div>
    );
}

export default Navbar;