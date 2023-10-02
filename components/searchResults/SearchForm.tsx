'use client'
import React, { useState } from 'react'
import FilterList from './FilterList'
import List from './List'
import { SitterServices } from '@/common.types'

type Props={
    sittersArray:any
    firstArray:any
}
const SearchForm = ({sittersArray,firstArray}:Props) => {
  const [sitterData,setSitterData]=useState(sittersArray)
  return (
    <div className='flex-row flex pl-5 gap-32'>
      {/**gets 2 same arrays the one is used to occur the filter changes and the other in order to change the state of the array that the users are showed based on the selectesd filters */}
      <FilterList sitterData={firstArray} setSitterData={setSitterData}/>
     

      <div>
      {sitterData.map((item:any,index:number)=>(//show the users based on the sitterData
          <List key={index} data={item.node} sitterData={sitterData}/>

      )
        
      )}
     </div>
     
   </div>
  )
}

export default SearchForm