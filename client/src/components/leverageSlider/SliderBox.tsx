import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export function valuetext(value: number) {
    return `${value}x`;
}

const SliderBox = (props: any) => {
    return (
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
                        value={props.sliderValue}
                        onChange={props.handleSliderChange}
                        onChangeCommitted={props.handleSliderChange}
                    />
                </Box>
            </div>
    )
}

export default SliderBox;