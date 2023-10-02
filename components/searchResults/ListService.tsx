'use client'
import { Fragment, useState,useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { ServiceTypes } from '@/common.types'

const services = [
    {title:'Wait at home', name:'home', icon:'/baggage.svg'},
    {title:'Go for a walk', name:'walk', icon:'/dog_foot.svg'},
    {title:'Drop in Visits', name:'drop', icon:'/house.svg'},

]
type Props={
  service: any
  setState:(value:string) =>void
  fontSize?:string
  iconSize?:number
}
export default function ListService({service,setState,fontSize,iconSize}:Props) {//the listbox of the srevices that the user can choose in the search page
  const [selected, setSelected] = useState(services[0])

  useEffect(() => {
    if (selected.name === 'drop') {
      setState({ ...service, drop: true,home:false,walk:false });
    }else if(selected.name==='home'){
      setState({ ...service, home: true,drop:false,walk:false });

    }else if(selected.name==='walk'){
      setState({ ...service, walk: true,home:false,drop:false });

    }
  }, [selected]);
  return (
    <div className="top-16 w-72 cursor-pointer">
      <Listbox value={selected} onChange={setSelected} > {/**changes the selected values */}
        <div className="relative mt-1">
          <Listbox.Button className="cursor-pointer relative w-full  rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <div className='flex items-center gap-4 cursor-pointer'>
              <Image src={selected.icon} width={iconSize?iconSize:35} height={iconSize?iconSize:35}  alt='dog-sign'/>

              <span style={{fontSize:fontSize}}  className="block truncate">{selected.title}</span>
            </div>
            
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon //on press shows the list
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white  text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ">
              {services.map((service, personIdx) => (
                <Listbox.Option
                  key={personIdx} style={{fontSize:fontSize}} 
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'selectServices text-black' : 'text-gray-900'
                    }`
                  }
                  value={service}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate cursor-pointer ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >

                        <div className='flex items-center gap-4 '>
                          <Image src={service.icon} width={iconSize?iconSize:35} height={iconSize?iconSize:35} alt='dog-sign'/>

                          <span className="block truncate">{service.title}</span>
                        </div>
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3  text-white" >
                          <CheckIcon className={`h-5 w-5 ${selected?'text-black':'text-white'}`} aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}