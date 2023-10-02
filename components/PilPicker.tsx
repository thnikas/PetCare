import React,{Fragment} from 'react'
import { Tab } from '@headlessui/react'
import Image from 'next/image'

type Props = {
    title: string,
    classActive:string,
    classInactive:string,
    arrayC:string[],
    state: string;
  setState: (value: string) => void;
  }
 
const PilPicker = ({title,classActive,classInactive,arrayC,state,setState}:Props) => {//the component that is used in petForm where the user selectes a value from an array
  let indexState=0
  arrayC.map((category,index)=>{
    if(state==category){//used when there is already saved value
      indexState=index
    }
})
  return (
    <div className='sex-container'>
    <div>
    <p className='w-full text-gray-100'>{title}</p>
      <Tab.Group defaultIndex={indexState}>
  <Tab.List className='flex space-x-4 pt-4'>
    {arrayC.map((category,index)=>(
         <Tab as={Fragment} key={index}>
         {({ selected }) => (
         /* Use the `selected` state to conditionally style the selected tab. */
         <button
         className={
           selected ? classActive : classInactive
         }
         onClick={()=> setState(category)}
         >
         <p>{category}</p>
         </button>
         )}
         </Tab>
    ))}
 

     
  </Tab.List>

</Tab.Group>
    </div>
          
  </div>
  )
}

export default PilPicker