'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

type Props={
  money:{moneyA:number,moneyO:number},
  setMoney:(value:any) =>void
}

function valuetext(value: number) {
  return `${value}€`;
}


export default function PriceSlider({money,setMoney}:Props) {//the slider where the user can choose the price range of the sitter
  const [value, setValue] = React.useState<number[]>([15, 50]);

  const handleChange = (event: Event, newValue: number | number[]) => {//on value change sets new state
    if (Array.isArray(newValue)) {
      
       setMoney({...money, moneyA: newValue[0], moneyO: newValue[1]})
    }    setValue(newValue as number[]);
  };
 
  
  return (
    <Box sx={{ width: 255,gap:3 }}>
      <h2 className='textTitleSS'>Price range</h2>
    
      
      <Slider
        getAriaLabel={() => 'Price range'}
        max={80}
        min={5}
        value={value}
        onChange={handleChange}
        getAriaValueText={valuetext}
        style={{
          height:8,
          color:'#6171A3'
        }}
        classes={{track:'custom-track',thumb:'custom-thumb'}}
      />
      <div  className='flex gap-[13rem]'>
        <h2 className='static w-4'>{value[0]}€</h2> 
        <h2 className='static w-4'>{value[1]}€</h2>

      </div>
      
      
    </Box>
  );
}