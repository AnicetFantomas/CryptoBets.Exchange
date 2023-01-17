import React, { useState, useEffect } from 'react';
import { LevDetails } from './LevDetails';
import SliderBox from './SliderBox';
import Trading from '../trading/Trading';

interface Props {}

interface State {
    inputValue: number;
    result: number;
}


const LevSlider: React.FC<Props> = (props: any) => {

    const [sliderValue, setSliderValue] =useState(0);

    const [inputValue, setInputValue] = useState(0);
    const [result, setResult] = useState(0);

    const handleInputChange = (e: any) => {
        const {target} = e
        const {value} = target;
        setInputValue((prev: number) => Number(value));
        setInputValue(e.target.value);
      
    };


    const handleSliderChange = (e: any, newValue: number) => {
        setSliderValue(newValue);   
    };

    useEffect(() => {
      if (sliderValue === 0) {
        return setResult(inputValue)
      }
      setResult(inputValue * sliderValue)
      
    }, [inputValue, sliderValue])
    

    return (
        <>
            <Trading handleSliderChange={handleSliderChange} inputValue={inputValue} handleInputChange={handleInputChange} />
            <div className="m-5 flex flex-col ">
            <h2 className='self-start text-white my-5'>Leverage</h2>
            <div className='ml-3 flex self-center'>
                <div className='mr-5 flex flex-col items-center hover:text-blue-200 cursor-pointer'>
                    <span className='text-white'>0</span>
                </div>
                <div className='mr-3 flex flex-col items-center hover:text-blue-200 cursor-pointer'>
                    <span className='text-white'>5</span>
                </div>
                <div className='mx-2 flex flex-col items-center hover:text-blue-200 cursor-pointer'>
                    <span className='text-white'>10</span>
                </div>
                <div className='mx-2 flex flex-col items-center hover:text-blue-200 cursor-pointer'>
                    <span className='text-white'>15</span>
                </div>
                <div className='mx-2 flex flex-col items-center hover:text-blue-200 cursor-pointer'>
                    <span className='text-white'>20</span>
                </div>
                <div className='mx-2 flex flex-col items-center hover:text-blue-200 cursor-pointer'>
                    <span className='text-white'>25</span>
                </div>
                <div className='mx-2 flex flex-col items-center hover:text-blue-200 cursor-pointer'>
                    <span className='text-white'>30</span>
                </div>
                <div className='mx-2 ml-2 flex flex-col items-center hover:text-blue-200 cursor-pointer'>
                    <span className='text-white'>35</span>
                </div>
                <div className='mx-2 ml-2 flex flex-col items-center hover:text-blue-200 cursor-pointer'>
                    <span className='text-white'>40</span>   
                </div>
                <div className='mx-2 flex flex-col items-center hover:text-blue-200 cursor-pointer'>
                    <span className='text-white'>45</span>
                </div>
                <div className='mx-2 flex flex-col items-center hover:text-blue-200 cursor-pointer'>
                    <span className='text-white'>50</span>
                </div>
            </div>

            <SliderBox handleSliderChange={handleSliderChange} inputValue={inputValue} handleInputChange={handleInputChange} />
            
            <div>
                <LevDetails sliderValue={sliderValue} result={result} />
            </div>
                
            
        </div>
        </>
    );
}

export default LevSlider;