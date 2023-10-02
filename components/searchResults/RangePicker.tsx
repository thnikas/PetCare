import React, { useState } from 'react'
import CalendarPicker from './CalendarPicker'
import moment from 'moment';

type Props={
  dates:any,
  setDates:(value:string) =>void
  iconWidth?:number,
  fontSize?:number,
  width?:string
}

const RangePicker = ({dates,setDates,iconWidth,fontSize,width}:Props) => {//the two calendars in the search page
  

  return (
    <div >
          <h2>Dates</h2>
        <div className='flex gap-2 pt-4'>
        <CalendarPicker iconWidth={iconWidth} fontSize={fontSize} widthD={width} dates={dates}  setDates={setDates} title='Start date'/>
        <h2 className='flex justify-center flex-col'>-</h2>
        <CalendarPicker iconWidth={iconWidth} fontSize={fontSize} widthD={width} dates={dates}  setDates={setDates} title='End date'/>
        </div>
       
    </div>
  )
}

export default RangePicker