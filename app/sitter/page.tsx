'use client'
import SittersDetails from '@/components/sitter/SittersDetails'
import { getCurrentUser } from '@/lib/session';
import Image from 'next/image'
import React from 'react'

import ButtonStr from '@/components/sitter/ButtonStr';
import { getUserSitter } from '@/lib/actions';
import { SitterServices,  UserProfile } from '@/common.types';
import { useGlobalContext } from '../context';



const Sitter = async() => {//the sitter page that motivates the user to become a sitter
  const {logUser} = useGlobalContext()
  const session = logUser;
  const sitterExist=session?await  getUserSitter(session.mongoDB.user.id) as { mongoDB: SitterServices }:null
  return (
    <section className='flexStart flex-col  mb-16'>
      <div>
        <Image //the page background image
        src="/bg334.jpg"
        alt="Background Image"
        width={500}
  height={500}
   sizes="
              100vw"
        style={{ height: '100%', width: '100vw' }} //The point is right there!
      />
      {/**the button that redirects the user to the sitter creation  */}
        <ButtonStr title='Get Started' session={session} sitter={sitterExist?.mongoDB.sitter}/>
      </div>
      <section className="sitters-details paddings">{/**the page objects that are showed under the image */}
        <SittersDetails session={session} sitter={sitterExist?.mongoDB.sitter  }/>
      </section>
    </section> 
  )
}

export default Sitter
