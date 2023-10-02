import React, { useState } from 'react'
import { useRouter } from "next/navigation";

type Props={
  customClass?:string|undefined
  idSitter?:string|undefined
}

const ButtonC = ({customClass,idSitter}:Props) => {//the button to the user profile that redirects to the contact form
  const router = useRouter();

    
  return (
        customClass?
        <>
          <button className={`buttonC  button-text ${customClass}`}   
            onClick={()=>router.push(`/contact/${idSitter}`)}>
              Contact
          </button>       
        </> :
        <>
          <button className='buttonC button-text'   
            onClick={()=>router.push(`/contact/${idSitter}`)}>
              Contact
          </button>  
      </>

  )
}

export default ButtonC