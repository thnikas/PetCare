"use client";
import React, { ChangeEvent, FormEvent, useState,useRef } from 'react'
import SitterTabs from './SitterTabs';
import { SessionInterface,  SitterServices,  SitterServicesFormState,  } from '@/common.types';
import DayPicker from './DayPicker';
import Map from './Map';
import Link from 'next/link';
import PetTypes from './PetTypes';
import {  createNewSitter, fetchToken, updateSitter } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import Button from '../Button';
import { useGlobalContext } from '@/app/context';

type Props={
  mapsKey:string|undefined
  type:string
  // session: SessionInterface,
  sitterD?:SitterServices,
  sitterId?:string
}
export const SitterForm = ({mapsKey,type,sitterD,sitterId}:Props) => {
  const {logUser} = useGlobalContext()
  const session=logUser
  const [submitting, setSubmitting] = useState<boolean>(false);
  const router = useRouter()
  function getRandomInt(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  const [form, setForm] = //the form that changes based on what the user has selected in the form
    useState<SitterServicesFormState>({
          service:sitterD?.sitter.service||{home:false,walk:false,drop:false},
          moneyH:sitterD?.sitter.moneyH||0,
          moneyD:sitterD?.sitter.moneyD||0,
          daysA:sitterD?.sitter.daysA||{mon:false,tue:false,wed:false,
          thu:false,fri:false,sat:false,sun:false},
          locationM:sitterD?.sitter.locationM||"",
          mapRadius:sitterD?.sitter.mapRadius||0,
          sizePets:sitterD?.sitter.sizePets||{small:false,medium:false,big:false,cat:false},
          review:sitterD?.sitter.review||getRandomInt(1,10),
          rating:sitterD?.sitter.rating||getRandomInt(1,5),
          createdBy:session?.mongoDB.user.id
    })
    const handleStateChange = (fieldName: keyof SitterServicesFormState, value: string|number|any) => {//set the form state when something is changed
      
      setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
      

  };
  const handleFormSubmit = async (e: FormEvent) => {//executes when button is pressed
    e.preventDefault();

    setSubmitting(true)

    const { token } = await fetchToken()
  try{//check if the user wants to create or edit their profile
    if (type === "create") {
      await createNewSitter(form)

      router.push("/")
      router.refresh()

  }
  if (type === "edit") {
    await updateSitter(form, sitterId as string, token)
            

    router.push(`/profile/${session.mongoDB.user.id}`)
    router.refresh()

  }

  } catch (error) {
  alert(`Failed to ${type === "create" ? "create" : "edit"} a pet. Try again!`);
  console.log(error)
  } finally {
  setSubmitting(false)
  }
    
  }
  return (
    <form onSubmit={handleFormSubmit}
   > 
      <h1 className=' h1-sitter-create  pt-16'>Choose what pass you better</h1>
      <div className='pl-48'>
        <div>
          <h2 className='h2-sitterForm '>Services</h2>
          <SitterTabs service={form.service}  setState={(value:any) => handleStateChange('service', value)}/>
          <div className='pt-16'>
            <label className="h2-sitterForm ">How much money?</label>
            <div className='flex-row flex pt-8'>
              <div className='flex-row flex  '>
                <input  max={100} onChange={(e) =>handleStateChange('moneyD', parseInt(e.target.value))} value={form.moneyD} min={0} type='number' className=' input_siD ' />
                <label className="w-full text-gray-100 self-end ml-2"> €/day</label>
              </div>
              <div className='flex-row flex'>
              <input  max={100} onChange={(e) =>handleStateChange('moneyH', parseInt(e.target.value))} min={0} value={form.moneyH} type='number' className='input_siD' />
                <label className="w-full text-gray-100 self-end ml-2">  €/hour</label>
              </div>
            </div>
          </div>
        </div>
      <div>
      <h2 className='h2-sitterForm '>Which days will you be normally available?</h2>
      <DayPicker days={form.daysA}  setState={(value:any) => handleStateChange('daysA', value)}/>
        
      </div>
      <div>
        <h2 className='h2-sitterForm '>Where is your service area?</h2>
        <Map apiKey={mapsKey} radius={form.mapRadius} locationM={form.locationM} setState={(value:string) => handleStateChange('locationM', value)}/>
        <h2 className='h3-sitter text-xl pt-4'>Service radius</h2>
        <div className='flex-row flex w-3/12 '>
          <input  max={100} onChange={(e) => handleStateChange('mapRadius', parseInt(e.target.value))} min={0} type='number' className=' input_siD ' value={form.mapRadius} />
          <label className="w-full text-gray-100 self-end ml-2"> km</label>
        </div>
      </div>
      <div className='pb-12 gap-6 grid'>
        <h2 className='h2-sitterForm '>What type of pets do you accept?</h2>
        <PetTypes textStyle='text-xl pl-2' iconsSize={64} values={form.sizePets} setState={(value:string) => handleStateChange('sizePets', value)}/>

      </div>
      <div>
        {type === 'create' ? (
          <button type="submit" className="buttonS2">Create your Sitter profile</button>
        ) : type === 'edit' ? (
          <button type="submit" className="buttonS2">Edit your Sitter profile</button>
        ) : null}
      </div>
    </div>
  </form>
  )
}

