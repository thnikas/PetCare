"use client"
import React, { useEffect, useState } from 'react'
import SitterTab from './SitterTab'
import { ServiceTypes } from '@/common.types'
type Props={
  service: ServiceTypes
  setState:(value:string) =>void

}
const SitterTabs = ({service,setState}:Props) => {
   
  return (
    <div className='flex gap-20 pt-8'>
            <SitterTab title='Wait at home' name='home' iconSize={10} icon1={'/baggage.svg'} state={service} setState={setState}/>
            <SitterTab title='Go for a walk' name='walk' iconSize={10} icon1={'/dog_foot.svg'} state={service} setState={setState}/>
            <SitterTab title='Drop in Visits' name='drop' iconSize={10} icon1={'/house.svg'} state={service} setState={setState}/>
    </div>
  )
}

export default SitterTabs