import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { LevDetails } from './LevDetails';

function valuetext(value: number) {
    return `${value}x`;
}

const LevSlider = () => {
    return (
        <div className="m-5 flex flex-col ">
            <h2 className='self-start text-white my-5'>Leverage</h2>
            <div className=' flex self-center'>
                <div className='mx-11 flex flex-col items-center hover:text-blue-200 cursor-pointer'>
                    <span className='text-white'>0</span>
                </div>
                <div className='mr-10 flex flex-col items-center hover:text-blue-200 cursor-pointer'>
                    <span className='text-white'>10</span>
                </div>
                <div className='mr-10 flex flex-col items-center hover:text-blue-200 cursor-pointer'>
                    <span className='text-white'>20</span>
                </div>
                <div className='mr-11 flex flex-col items-center hover:text-blue-200 cursor-pointer'>
                    <span className='text-white'>30</span>
                </div>
                <div className='mr-10 flex flex-col items-center hover:text-blue-200 cursor-pointer'>
                    <span className='text-white'>40</span>   
                </div>
                <div className='mr-11 flex flex-col items-center hover:text-blue-200 cursor-pointer'>
                    <span className='text-white'>50</span>
                </div>
            </div>
            <div className='flex self-center'>
                <Box sx={{ width: 300 }}>
                    <Slider
                        aria-label="Temperature"
                        defaultValue={0}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        min={0}
                        max={50}
                    />
                </Box>
            </div>
            <div>
                <LevDetails />
            </div>
                
            
        </div>
    );
}

export default LevSlider;