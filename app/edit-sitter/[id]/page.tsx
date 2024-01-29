import { SitterForm } from '@/components/sitter/SitterForm'
import React from 'react'
import { getCurrentUser } from "@/lib/session";
import { getSitterDetails } from '@/lib/actions';
import { SitterServices } from '@/common.types';
import { redirect } from "next/navigation";

const EditSitter = async ({params:{id}}:{params:{id:string}}) => {//edit sitter profile
    const googleApiKey = process.env.GOOGLE_MAPS_KEY
    
    const result=await getSitterDetails(id) as {mongoDB?:SitterServices}
    return (
      <div>
         <SitterForm sitterId={id} type='edit' mapsKey={googleApiKey} sitterD={result.mongoDB}/>
      </div>
    )
};

export default EditSitter;