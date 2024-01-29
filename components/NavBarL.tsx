'use client'
import React, { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Loader from './Loader'
import { NavLinks } from "@/constants";
import { useGlobalContext } from '@/app/context';
import AuthProviders from "./AuthProviders";
import Button from "./Button";
import ProfileMenu from "./ProfileMenu";

const NavBarL = ({session}:any) => {
    const {   setLoader} = useGlobalContext();
  return (
    <>
    
    <div className='flex-1 flexStart gap-10 h-[2vw] lg:h-[4vw]'>
        <Link  href='/' >
          <Image //the logo of the site
            src='/logo5.svg'
            alt='logo'
            width={140}
            height={140}
            className='lg:w-[7.4rem] md:w-[6rem] sm:w-[5rem] w-[4rem] xl:w-[8.2rem]'

       />
       
          
        </Link>
        <ul className='flex  text-small gap-7 resFont'>
          {NavLinks.map((link) => (//the links that exists in constants
            <Link onClick={()=>setLoader(true)} href={link.href} key={link.text}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className='flexCenter gap-4'>
        {session?.mongoDB.user ? (//if user is logged in show the profileMenu or else the Sign in Button
          <>
            <ProfileMenu session={session} />

            <Link href="/search">
              <Button title='Explore Sitters' />
            </Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
      
    </>
    
  )
}

export default NavBarL