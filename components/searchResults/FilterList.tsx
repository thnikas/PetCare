'use client'
import React,{useState} from 'react'
import MoreFilters from './MoreFilters'
import RangePicker from './RangePicker'
import PriceSlider from './PriceSlider'
import PetTypesSearch from './PetTypesSearch'
import FilterButton from './FilterButton'
import { SitterServicesFormState } from '@/common.types'

type Props={
  sitterData:any,
  setSitterData:(value:string) =>void

}
const FilterList = ({sitterData,setSitterData}:Props) => {//the filter components that the user can abjust in the search
    const [form, setForm] = 
    useState({
          service:{home:false,walk:false,drop:false},
          money:{
            moneyA:0,
            moneyO:0,
          },
        
          dates:{
            dateA:(new Date()),
            dateB:(new Date()) , 
            dayA:'',
            dayB:'',
          },
         
          sizePets:{small:false,medium:false,big:false,cat:false}
    })
    const handleStateChange = (fieldName: keyof any, value: string|number|any) => {
        setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
    };
  return (
    <div className='gap-12 flex flex-col'>
      <MoreFilters service={form.service} setSitterData={setSitterData} sitterData={sitterData}  setState={(value:any) => handleStateChange('service', value)}/>
      <RangePicker dates={form.dates} setDates={(value:any) => handleStateChange('dates', value)}/>
      <PriceSlider money={form.money} setMoney={(value:any) => handleStateChange('money', value)}/>
      <PetTypesSearch sizePets={form.sizePets} setSizePets={(value:any) => handleStateChange('sizePets', value)}/>
      <FilterButton filtersState={form} sitterData={sitterData} setSitterData={setSitterData} title='Search'/>
    </div>
  
    
  )
}

export default FilterList