"use client";
import React,{Fragment,useState} from 'react'
import { Tab } from '@headlessui/react'
import Image from 'next/image';
import { ServiceTypes } from '@/common.types';

type Props={
    title: string;
    iconSize?:number;
    icon1:string;
    state: any;
    setState:(value:string) =>void
    name:string
}
const SitterTab = ({title,icon1,state,setState,name}:Props) => {//the component where the user chan choose which services he can do
   const classActive='sitter-color_a' 
   const classInactive='sitter-color_in'
   const [classA,setClassA]=useState(state[name]==true?classActive:classInactive)
   const handleClick=()=>{
    if(classA==classInactive){
        setClassA(classActive)
         setState({ ...state, [name]:true });       

        
    }else{
        setClassA(classInactive)
         setState({ ...state, [name]:false });       


    }
   }
    return (
        
        <div>
            <h2 className='h3-sitter text-xl text-center'>{title}</h2>

            <button
            onClick={handleClick} 
            type='button'
            className={classA}
            >
                <Image src={icon1} className='form-icon' width={48} height={48 } alt={icon1} />

            </button>
        </div>
        
    )
}

export default SitterTab