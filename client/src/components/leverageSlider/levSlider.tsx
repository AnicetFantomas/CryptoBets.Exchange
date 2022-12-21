import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {
  return `${value}x`;
}

const LevSlider = () => {
  return (
    <div className="mt-5 w-full justify-center">
         <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Temperature"
        defaultValue={5}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={5}
        marks
        min={5}
        max={50}
      />
    </Box>
    </div>
  );
}

export default LevSlider;