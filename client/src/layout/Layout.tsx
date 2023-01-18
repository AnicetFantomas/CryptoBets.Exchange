import React, { useEffect, useState } from 'react'
import LevSlider from '../components/leverageSlider/levSlider'
import Navbar from '../components/navbar/Navbar'
import Charts from '../components/Charts'
import Trading from '../components/trading/Trading'
import TabsLayout from '../components/Tabs/TabsLayout'

const Layout = () => {
  // const [sliderValue, setSliderValue] =useState(0);
  // const [show, setShow] = useState(false);


  // const [inputValue, setInputValue] = useState(0);
  // const [result, setResult] = useState(0);

  // const handleInputChange = (e: any) => {
  //     const {target} = e
  //     const {value} = target;
  //     setInputValue((prev: number) => Number(value));
  //     setInputValue(e.target.value);
    
  // };


  // const handleSliderChange = (e: any, newValue: number) => {
  //     setSliderValue(newValue);   
  // };

  // useEffect(() => {
  //   if (sliderValue === 0) {
  //     return setResult(inputValue)
  //   }
  //   setResult(inputValue * sliderValue)
    
  // }, [inputValue, sliderValue])
  
  return (
    <div className='flex justify-center w-screen min-h-screen bg-slate-300'>
	  <div className="w-screen min-h-screen p-1 md:w-1/2 bg-sky-800">
      <Navbar/>
      <Charts/>
      <LevSlider />
      < TabsLayout />
    </div>
	</div>
  )
}

export default Layout
