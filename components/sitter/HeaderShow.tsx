import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Skeleton } from '@mui/material'
import 'react-loading-skeleton/dist/skeleton.css'
import ButtonC from './sitterProfile/ButtonC'
import { SessionInterface, SitterServices } from '@/common.types'
type Props={
    name?:string,
    img?:string,
    locationM:string|null,
    firstRender:boolean|undefined,
    sitter:SitterServices|undefined,
    session:SessionInterface;

}

const HeaderShow = ({name,img,locationM,firstRender,sitter,session}:Props) => {//the header com in the sitter profile page
  const [showSkeleton, setShowSkeleton] = useState(true);
  useEffect(() => {
    if(firstRender==true){
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 2000); // 2 seconds
  
      return () => clearTimeout(timer);
    }else if(firstRender==false){
      setShowSkeleton(false)
    }
   
  }, []);
  return (
    <div className='justify-center gap-[10rem]	flex pb-10  relative'>
      {!showSkeleton? 
        <Skeleton   width='200px' height='200px' variant="circular" className='h-[200px] w-[200px] rounded-[50%] ml-[7rem]' animation="wave"/>:img?    
        <Image src={img} alt={img} width={200} height={200} className=' z-[-2] h-[200px] w-[200px] rounded-[50%] ml-[7rem] relative '/>
      :null}

      {showSkeleton?
      <div className='gap-4 flex flex-col	justify-center mr-[9rem]  w-[400px]'>
        <p className='h1-sitterShow z-[-2]'> {name}</p>
        <p className='userH2 text-xl z-[-2]'> {locationM}</p>
        <ButtonC idSitter={sitter?.id}/>


      </div>:
      <div className='gap-4 flex flex-col	justify-center mr-[9rem]  w-[400px]'>
        <Skeleton className='h1-sitterShow'/>
        <Skeleton className='userH2 text-xl'/>
        <Skeleton variant='rounded' className='sitterContact'/>
      </div>
      }
    </div>
  )
}

export default HeaderShow