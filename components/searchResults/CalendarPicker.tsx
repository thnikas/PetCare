'use client'
import  React,{useState} from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { TextField } from '@mui/material';
import { PickersDay,PickersDayProps,pickersDayClasses } from '@mui/x-date-pickers';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lime, purple } from '@mui/material/colors';
import moment from 'moment';

const theme = createTheme({
  palette: {
    primary: {main:'#6171A3'},
    secondary: purple,
  },
});
type Props={
  title:string,
 dates:any
  setDates:(value:string) =>void,
  iconWidth?:number,
  fontSize?:number,
  widthD?:string
}
export default function CalendarPicker({title,setDates,dates,iconWidth,fontSize,widthD}:Props) {//the calendar picker in the filters
  const [selected,setSelected]=useState<any>('')
  function CustomDay(props: PickersDayProps<unknown>) {//creates custom calendar color
    return (
     <PickersDay   sx={{
      [`&&.${pickersDayClasses.selected}`]: {
        backgroundColor: "#6171A3"
      }
    }} {...props}/>
    );
  }
 
  
  function changeState(newValue:any){
    setSelected(newValue)
    const dayOfWeek= newValue.$d.toString().slice(0,15);
    var index = dayOfWeek.indexOf(" ");  // Gets the first index where a space occours
    const day = dayOfWeek.slice(0, index); // Gets the first part
    const dateCa = dayOfWeek.slice(index + 1);
    const originalDateStr = dateCa;
    const originalDate = new Date(originalDateStr);
    
    // Convert to desired format
    const formattedDate = moment(originalDate).format("MM/DD/YYYY")
    if(title=='Start date'){//checks which of the 2 calendars is selected and changes the date
      setDates({ ...dates, dayA:day,dateA:formattedDate })
    }else if(title=='End date'){
      setDates({ ...dates, dayB:day,dateB:formattedDate })

    }
  }
 
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

      <ThemeProvider theme={theme}>
        <DatePicker label={title}
        onChange={(newValue:any) => changeState(newValue)}
        slots={{
        day:CustomDay               
        }}
        slotProps={{ textField: { 
        sx:{color:'#6171A3',borderColor:'red',width:widthD?widthD:'7.8rem',}, 
        size:widthD?"medium":"small", color:"primary",
        InputLabelProps:{style:{fontSize:fontSize?fontSize:12,fontFamily:'Inter'}},
        inputProps:{style:{fontSize:fontSize?fontSize:11.5,fontFamily:'Inter'}}}, 
        openPickerButton:{sx:{color:'#6171A3',width:iconWidth?iconWidth:24, justifyContent:'center', }},}}
        />
      </ThemeProvider>

    </LocalizationProvider>
  );
}