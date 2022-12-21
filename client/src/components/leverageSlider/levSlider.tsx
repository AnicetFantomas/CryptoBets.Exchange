import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { LevDetails } from './LevDetails';

function valuetext(value: number) {
    return `${value}x`;
}

const LevSlider = () => {
    return (
        <div className="m-5 w-60 bg-gray-200 justify-center">
            <div className='w-full flex'>
                <div className='mr-11 flex flex-col items-center'>
                    <div>0</div>
                </div>
                <div className='mr-10 flex flex-col items-center'>
                    <div>10</div>
                </div>
                <div className='mr-10 flex flex-col items-center'>
                    <div>20</div>
                </div>
                <div className='mr-11 flex flex-col items-center'>
                    <div>30</div>
                </div>
                <div className='mr-10 flex flex-col items-center'>
                    <div>40</div>   
                </div>
                <div className='mr-11 flex flex-col items-center'>
                    <div>50</div>
                </div>
            </div>
            <div className='w-ful '>
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