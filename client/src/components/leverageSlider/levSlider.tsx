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
            <div className=' flex self-center'>
                <div className='mx-11 flex flex-col items-center hover:text-blue-200 cursor-pointer'>
                    <div>0</div>
                </div>
                <div className='mr-10 flex flex-col items-center hover:text-blue-200 cursor-pointer'>
                    <div>10</div>
                </div>
                <div className='mr-10 flex flex-col items-center hover:text-blue-200 cursor-pointer'>
                    <div>20</div>
                </div>
                <div className='mr-11 flex flex-col items-center hover:text-blue-200 cursor-pointer'>
                    <div>30</div>
                </div>
                <div className='mr-10 flex flex-col items-center hover:text-blue-200 cursor-pointer'>
                    <div>40</div>   
                </div>
                <div className='mr-11 flex flex-col items-center'>
                    <div>50</div>
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