import { SitterForm } from '@/components/sitter/SitterForm'
import SitterTab from '@/components/sitter/SitterTab'
import React from 'react'
import { getCurrentUser } from "@/lib/session";

const page = async() => {//create sitter profile and get google api so the user can choose location 
  const googleApiKey = process.env.GOOGLE_MAPS_KEY
  const session = await getCurrentUser();

  return (
    <div>
       <SitterForm session={session} type='create' mapsKey={googleApiKey}/>
    </div>
  )
}

export default page