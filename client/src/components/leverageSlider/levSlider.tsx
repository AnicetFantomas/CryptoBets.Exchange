import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { LevDetails } from './LevDetails';

interface Props {}

interface State {
    inputValue: number;
    result: number;
}

export function valuetext(value: number) {
    return `${value}x`;
}

const LevSlider: React.FC<Props> = () => {

    const [sliderValue, setSliderValue] =useState<any | null>(null);

    const [inputValue, setInputValue] = useState<number>(0);
    const [result, setResult] = useState<number>(0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(Number(e.target.value));
        setResult((prev: number) => inputValue * sliderValue);
    };


    const handleSliderChange = (event: any, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            newValue = newValue[0];
        }
        setSliderValue(newValue);
        setResult(Number(inputValue) * newValue);
    };


    return (
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
            <div className='flex self-center'>
                <Box sx={{ width: 350 }}>
                    <Slider
                        aria-label="Temperature"
                        defaultValue={0}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        step={5}
                        marks
                        min={0}
                        max={50}
                        value={sliderValue}
                        onChange={handleSliderChange}
                        onChangeCommitted={handleSliderChange}
                    />
                </Box>
            </div>
            <div>
                <LevDetails sliderValue={sliderValue} setSliderValue={setSliderValue} handleInputChange={handleInputChange} inputValue={inputValue} 
                    setInputValue={setInputValue} 
                    result={result}  />
            </div>
                
            
        </div>
    );
}

export default LevSlider;