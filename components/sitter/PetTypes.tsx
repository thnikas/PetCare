'use client'
import React from 'react'
import Check from './Check'
import { ServicePetSize } from '@/common.types'
type Props={
    values:ServicePetSize;
    setState:(value:string) =>void
    iconsSize:number,
    textStyle:string
}
const PetTypes = ({values,setState,iconsSize,textStyle}:Props) => {//the check types component where the user can choose pet type
  return (
    <div className='pb-12 gap-6 grid'>
        <Check textStyle={textStyle} iconsSize={iconsSize} classC='flex-row flex items-baseline' label='Small Dog' icon='/dogS5.svg' size='small' object={values} checked={values.small} setState={setState}/>
        <Check textStyle={textStyle}  iconsSize={iconsSize} classC='flex-row flex items-end' label='Medium Dog' icon='/dogS1.svg' size='medium' object={values} checked={values.medium} setState={setState}/>
        <Check textStyle={textStyle}  iconsSize={iconsSize} classC='flex-row flex items-end' label='Big Dog' icon='/dogS6.svg' size='big' object={values} checked={values.big} setState={setState}/>
        <Check textStyle={textStyle}  iconsSize={iconsSize} classC='flex-row flex items-end' label='Cat' icon='/dosS4.svg' size='cat' object={values} checked={values.cat} setState={setState}/>
    </div>
  )
}

export default PetTypes