import React,{Fragment,useState,useEffect} from 'react'
import { Tab } from '@headlessui/react'
import Image from 'next/image'

type Props = {
  title: string;
  name1:string;
  name2:string;
  iconSize?:number;
  classActive:string;
  classInactive:string;
  icon1:string;
  icon2:string;
  state: string;
  setState: (value: string) => void;

}
const TabComponent = ({title,iconSize,classActive,classInactive,icon1,icon2,state,setState, name1,name2}:Props) => {
  const index = state === name1 ? 0 : 1;
{/**the tab component that is showed in the in the pet creation form  */}
  return (
    <div className='sex-container'>
      <div>
        <p className='w-full text-gray-100'>{title}</p>
          <Tab.Group defaultIndex={index}>
            <Tab.List className='flex space-x-4'>
              <Tab as={Fragment}>
                {({ selected }) => (
                /* Use the `selected` state to conditionally style the selected tab. */
                <button onClick={()=> setState(name1)}
                  className={
                    selected ? classActive : classInactive
                  }
                ><Image src={icon1} className='form-icon' width={iconSize} height={iconSize } alt={icon1} />
                </button>
                )}
              </Tab>
              <Tab as={Fragment}>
              {({ selected }) => (
              /* Use the `selected` state to conditionally style the selected tab. */
              <button data-headlessui-state="selected" 
              onClick={()=> setState(name2)}
                className={
                  selected ? classActive : classInactive
                }
                
              >
                <Image src={icon2} className='form-icon' width={iconSize} height={iconSize} alt={icon2}/>
              </button>
              )}
              </Tab>
            </Tab.List>
          </Tab.Group>
      </div>     
    </div>  
  )
}

export default TabComponent