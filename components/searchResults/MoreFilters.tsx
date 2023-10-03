'use client'
import React from 'react'
import ListService from './ListService'
import { ServiceTypes } from '@/common.types'

type Props={
  service: ServiceTypes
  setState:(value:string) =>void
  sitterData:any,
  setSitterData:(value:string) =>void
}
const MoreFilters = ({service,setState}:Props) => {//the service filter in the search

  return (
    <div className='pt-8 relative'>
      <h2 className='textTitleSS'>Services</h2>
      <ListService service={service} setState={setState}/>
    </div>
  )
}

export default MoreFilters