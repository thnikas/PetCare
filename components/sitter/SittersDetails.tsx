import Image from 'next/image'
import React from 'react'
import SitterWork from './SitterWork'
import Services from './Services'
import Link from 'next/link'
import ButtonStr from './ButtonStr'

type Props={
  session:any;
  sitter:any
}
const SittersDetails = ({session,sitter}:Props) => {//the sitter main page
  return (
    <div>
      <div>
        <h1 className='h1-sitter'>How does Pet sitting work?</h1>
      </div> 

      <SitterWork/>
      <Services/>

       <div className='relative pt-52 '>
        <h1 className='h1-sitter'>Ready to meet new fluffy friends?</h1>
        <div className='pt-24'>
          <ButtonStr title='Create your Sitter profile' session={session} sitter={sitter}/>

        </div>
      </div>

    </div>
  )
}

export default SittersDetails