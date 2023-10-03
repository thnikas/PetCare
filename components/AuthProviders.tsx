"use client"

import { getProviders, signIn } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

import Button from './Button';
import ButtonSi from './ButtonSi';

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

    useEffect(() => {
        const fetchProviders = async () => {
            const res = await getProviders();
    
            setProviders(res);
        }

        fetchProviders();
    }, []);

    if (providers) {
        return (
            <div>
                {Object.values(providers).map((provider: Provider, i) => (
                    <ButtonSi key={i} title='Sign In' handleClick={() => signIn(provider?.id)} />
                ))}
            </div>
        )
    }
}

export default AuthProviders