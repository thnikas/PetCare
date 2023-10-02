import SittersDetails from '@/components/sitter/SittersDetails'
import { getCurrentUser } from '@/lib/session';
import Image from 'next/image'
import React from 'react'

import ButtonStr from '@/components/sitter/ButtonStr';
import { getUserSitter } from '@/lib/actions';
import { UserProfile } from '@/common.types';

const Sitter = async() => {//the sitter page that motivates the user to become a sitter
  const session = await getCurrentUser();
  const sitterExist=session?await  getUserSitter(session.user.id, 100) as { user: UserProfile }:null
  return (
    <section className='flexStart flex-col paddings mb-16'>
      <div>
        <Image //the page background image
      style={{top:'13%'}}
        src="/bg33.jpg"
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className='bg_image'
      />
          
      {/**the button that redirects the user to the sitter creation  */}
        <ButtonStr title='Get Started' session={session} sitter={sitterExist?.user.sitter.edges}/>
      </div>
      <section className="sitters-details">{/**the page objects that are showed under the image */}
        <SittersDetails session={session} sitter={sitterExist?.user.sitter.edges}/>
      </section>
    </section> 
  )
}

export default Sitter
