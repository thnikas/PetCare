import { ServicePetSize } from '@/common.types'
import { Skeleton } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

type Props={
    petTypes:ServicePetSize|undefined
    name:string|undefined
}
const checksData = [
    {
      size: 'small',
      icon: '/dogS5w.svg',
      label: 'Small Dog',
    },
    {
      size: 'medium',
      icon: '/dogS1w.svg',
      label: 'Medium Dog',
    },
    {
      size: 'big',
      icon: '/dogS6w.svg',
      label: 'Big Dog',
    },
    {
      size: 'cat',
      icon: '/dosS4w.svg',
      label: 'Cat',
    },
  ];
const Types = ({petTypes,name}:Props) => {//the pets that the sitter accepts
    const [checkTypes, setCheckTypes] = useState<string[]>([]);
    const [showSkeleton, setShowSkeleton] = useState(true);
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 2000); // 2 seconds
  
      return () => clearTimeout(timer);
    }, []);
    useEffect(() => {
        if (petTypes) {
          const checkedTypes = [];
    
          if (petTypes.big) {
            checkedTypes.push('big');
          }
          if (petTypes.cat) {
            checkedTypes.push('cat');
          }
          if (petTypes.medium) {
            checkedTypes.push('medium');
          }
          if (petTypes.small) {
            checkedTypes.push('small');
          }
          setCheckTypes(checkedTypes);
        }
      }, [petTypes]);
  return (
    showSkeleton? <Skeleton height={200} width='18rem' variant='rounded' style={{borderRadius:'10%'}}  className='w-[18rem]   rounded-[10%] mt-5'/>:
    <div className='w-[18rem]  bg-[#6171A3] rounded-[10%] mt-5'>
        <h1 className=' text-2xl font-bold  text-center pt-2 text-white	'>{name} can host</h1>
        {checkTypes.length > 0 ? (
        <div className='flex flex-col pt-2 pl-12'>
          {checksData.map((type, index) => (
            checkTypes.includes(type.size) && 
            <div className='flex-row flex  gap-5 pt-1 pb-4'  key={index}> 
            <Image src={type.icon} width={50} height={50} alt={type.label}/>
            <h4 className='items-center flex  text-lg text-[#ffff]'>{type.label}</h4>
            
        </div>
        ))}
      </div>
      ) : (
       null
      )}
   
    </div>
  )
}

export default Types