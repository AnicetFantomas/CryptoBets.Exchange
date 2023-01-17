import React from 'react'
import LevSlider from '../components/leverageSlider/levSlider'
import Navbar from '../components/navbar/Navbar'
import Charts from '../components/Charts'
import Trading from '../components/trading/Trading'

const Layout = () => {
  return (
    <div className='flex justify-center w-screen min-h-screen bg-slate-300'>
	  <div className="w-screen min-h-screen p-1 md:w-1/2 bg-sky-800">
      <Navbar/>
      <Charts/>
      {/* <Trading/> */}
      <LevSlider/>
    </div>
	</div>
  )
}

export default Layout
