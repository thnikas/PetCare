import { Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import SitterVa from './SitterVa';
import { SitterServices } from '@/common.types';
import LocationSi from './sitterProfile/LocationSi';

type Props={
  desc:string|null,
  name:string|undefined,
  sitter:SitterServices|undefined,
  apikey:string|undefined
}

const MainShow = ({desc,name,sitter,apikey}:Props) => {//the main page in sitter profile
  const [showSkeleton, setShowSkeleton] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (

    <div className='flex-row flex pl-5 gap-[6rem] justify-center'>
      <SitterVa  sitter={sitter} name={name}/>

      {!showSkeleton? 
      <div className=' flex-col flex items-center mt-[-4%]'>

        <Skeleton height={300} width={500} className='w-[500px]  h-[300px]'/></div>  :<div className='gap-4 flex-col flex '>
        <div className='userH1 text-xl font-bold w-[500px]'>About {name}</div>
        <div className='w-[500px] userH4'>{desc}</div>
        <LocationSi sitter={sitter} name={name} apikey={apikey}/>
      </div>}

    </div>
    
 
   
    
  )
}

export default MainShow