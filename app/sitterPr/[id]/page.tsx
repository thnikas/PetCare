import SitterShow from '@/components/sitter/SitterShow'
import { getCurrentUser } from '@/lib/session'
import React from 'react'

type Props = {
    params: {
        id: string,
    },
   
}

const page = async({ params }: Props) => {//the sitter profil of every user
  const googleApiKey = process.env.GOOGLE_MAPS_KEY
  const session = await getCurrentUser();

  return (
    <SitterShow session={session} id={params.id} apikey={googleApiKey}/>
  )
}

export default page