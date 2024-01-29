"use client"

import { getProviders, signIn } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

import Button from './Button';
import ButtonSi from './ButtonSi';
import {  getUserByEmail } from '@/lib/actions';
import { useGlobalContext } from '@/app/context';
import Link from 'next/link';

type Provider = {
    id: string;
    name: string;
    type: string;
    signinUrl: string;
    callbackUrl: string;
    signinUrlParams?: Record<string, string> | undefined;
  };
  
  type Providers = Record<string, Provider>;


const AuthProviders = () => {//is a button that is showed when the user in not logged in  next to navbar and when the user clicked it it redirects to logged in with google
    const [providers, setProviders] = useState<Providers | null>(null);
    const { logUser,  setLogUser} = useGlobalContext();

    useEffect(() => {
        // const fetchProviders = async () => {
        //     const res = await getProviders();
    
        //     setProviders(res);
        // }

        // fetchProviders();
    }, []);
    // const signInLocal = async() => {
    //     const logUser = await getUserByEmail('8nikas@gmail.com')
    //     setLogUser(logUser)
    // }
    
        return (
            <Link href={'/log-in'}>
                
                    <ButtonSi  title='Sign In'  />
                
            </Link>
        )
    
    // if (providers) {//normal log in 
    //     return (
    //         <div>
    //             {Object.values(providers).map((provider: Provider, i) => (
    //                 <ButtonSi key={i} title='Sign In' handleClick={() => signIn(provider?.id)} />
    //             ))}
    //         </div>
    //     )
    // }
}

export default AuthProviders