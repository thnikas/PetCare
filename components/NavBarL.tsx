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
    
    <div className='flex-1 flexStart gap-10'>
        <Link  href='/' >
          <Image //the logo of the site
            src='/logo5.svg'
            width={116}
            height={43}
            alt='logo'
          />
        </Link>
        <ul className='xl:flex hidden text-small gap-7'>
          {NavLinks.map((link) => (//the links that exists in constants
            <Link onClick={()=>setLoader(true)} href={link.href} key={link.text}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className='flexCenter gap-4'>
        {session?.user ? (//if user is logged in show the profileMenu or else the Sign in Button
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