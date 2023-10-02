import React from 'react'
import ButtonC from './ButtonC'
import Image from 'next/image'


type Props={
    name?:string,
    img?:string|undefined,
    locationM:string|null,
}

const HeaderStick = ({name,img,locationM}:Props) => {//the header that is showed when the user scrolls further to the sitter profile
    
  return (
    <div className='w-full bg-white justify-center pt-4 flex items-center'>
      {img?              
        <Image src={img} alt={img} width={200} height={200} 
        className='h-[70px] w-[70px] rounded-[50%] relative right-[1rem] bottom-[3px]'/>
      :null}
      <div className='flex justify-center  w-[400px] flex-col '>
        <p className='h1-sitterShow2 text-xl'> {name}</p>
        <p className='userH2 text-xl'> {locationM}</p>
      </div>
   
      {locationM?
      <ButtonC customClass={'fixed-button '}/>
      :null}
    </div>
  )
}

export default HeaderStick