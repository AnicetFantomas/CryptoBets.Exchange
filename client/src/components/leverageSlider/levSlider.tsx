import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { LevDetails } from './LevDetails';

export function valuetext(value: number) {
    return `${value}x`;
}

const LevSlider = () => {

    const [sliderValue, setSliderValue] =useState<any | null>(null);

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
                        onChange={(event, newValue) => setSliderValue(newValue)}
                        onChangeCommitted={(event, newValue) => setSliderValue(newValue)}
                    />
                </Box>
            </div>
            <div>
                <LevDetails sliderValue={sliderValue} setSliderValue={setSliderValue}  />
            </div>
                
            
        </div>
    );
}

export default LevSlider;