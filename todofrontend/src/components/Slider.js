import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}`;
}

export default function DiscreteSlider({ value, onChange }) {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Validity"
        value={value}
        onChange={onChange}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={10}
      />
    </Box>
  );
}
