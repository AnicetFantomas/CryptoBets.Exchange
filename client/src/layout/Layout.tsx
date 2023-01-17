import React from 'react'
import LevSlider from '../components/leverageSlider/levSlider'
import Navbar from '../components/navbar/Navbar'
import Charts from '../components/Charts'
import Trading from '../components/trading/Trading'
import TabsLayout from '../components/Tabs/TabsLayout'

const Layout = () => {
  return (
    <div className='flex justify-center w-screen min-h-screen bg-slate-300'>
	  <div className="w-screen min-h-screen p-1 md:w-1/2 bg-sky-800">
      <Navbar/>
      <Charts/>
      {/* <Trading/> */}
      <LevSlider/>
      < TabsLayout />
    </div>
	</div>
  )
}

export default Layout
