
import { SitterForm } from '@/components/sitter/SitterForm'
import SitterTab from '@/components/sitter/SitterTab'
import React from 'react'
import { getCurrentUser } from "@/lib/session";
import { useGlobalContext } from '../context';


const page = async() => {//create sitter profile and get google api so the user can choose location 
  const googleApiKey = process.env.GOOGLE_MAPS_KEY
  
  return (
    <div>
       <SitterForm  type='create' mapsKey={googleApiKey}/>
    </div>
  )
}

export default page