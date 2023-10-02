import React, { useState,useEffect } from 'react'
import DayPick from './DayPick'
import { ServiceDays } from '@/common.types'
const week:Array<string>=[
  'Mon','Tue','Wed','Thu','Fri','Sat','Sun'
]
type Props={
  days: ServiceDays|any
  setState:(value:string) =>void

}
const DayPicker = ({days,setState}:Props) => {//creates the day picker component when the day is selected or not is done by the DayPick component
  
  return ( 
    <div className='gap-1 flex pt-8'>
      {week.map((day,index)=>{
        const dayformat=day.toLowerCase()
        return(  <DayPick day={day} key={index} daysBoo={days[dayformat]} alldays={days} setState={setState}/>
        )}
      )}
    </div>
   
    
  )
}

export default DayPicker