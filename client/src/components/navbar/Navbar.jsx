import React from "react";

const Navbar = () => {
    return (
        <div className="flex shadow-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" 
            fill="#FFFFFF" 
            viewBox="0 0 30 30" 
            stroke-width="1.5" 
            stroke="currentColor" 
            class="menu mt-3 ml-8 w-14 h-15">
            <path stroke-linecap="round" 
            stroke-linejoin="round" 
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <p className="text-white tracking-tighter mt-5 font-medium text-2xl">CryptoBets.Exchange</p>
        </div>
    );
}

export default Navbar;