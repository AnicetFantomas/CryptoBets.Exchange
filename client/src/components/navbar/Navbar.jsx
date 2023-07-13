import React from "react";


const Navbar = () => {


    return (
              
        <div className=" flex mb-5 shadow-2xl jubstify-between nav bg-[f3f3f3 ]">
            <div className="relative flex ">
                <svg xmlns="http://www.w3.org/2000/svg" 
                fill="#FFFFFF" 
                viewBox="0 0 30 30" 
                strokeWidth="1.5" 
                stroke="currentColor" 
                className="mt-3 ml-6 menu w-14 h-15">
                <path strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <p id="txt-title" className="mt-5 text-2xl font-medium tracking-tighter text-white"><span className="italic text-[20px text-red-100]">CryptoBets</span>.Exchange</p>
            </div>
        </div>
    );
}

export default Navbar;