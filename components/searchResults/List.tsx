'use client'
import { SitterServices, UserProfile } from '@/common.types'
import React,{useState} from 'react'
import Rating from '@mui/material/Rating';
import { getUserSitter } from '@/lib/actions';
import { ReadMore } from '../ReadMore';
import { redirect } from "next/navigation";
import Link from 'next/link';
import { useGlobalContext } from '@/app/context';

type Props={
  data:SitterServices,
  sitterData:any
}
const List = ({data,sitterData}:Props) => {//list of the user cards that is showed based on the search criteria
  const [img,setImg]=useState<string|undefined>()
  const [name,setName]=useState<string|undefined>()
  const [desc,setDesc]=useState<string|null>('')
  const [value, setValue] = React.useState<number | null>(getRandomInt(1,5));
  const [size,setSize]=React.useState<number|null|string|any>(null)
  const { loader,setLoader} = useGlobalContext();

  function getRandomInt(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  const getUser=async()=>{
  const sitter=await getUserSitter(data.createdBy.id, 100) as { user: UserProfile }
  setImg(sitter.user.avatarUrl)
  setName(sitter.user.name)
  setDesc(sitter.user.description)
  }
  getUser()
  return (
    <div className='justify-center flex pt-8 '  >
      
      <Link  href={`/sitterPr/${data.id}`} className={`relative bg-white rounded-[30px] border border-stone-300 containerProfile`} style={{height:size}} onClick={()=>setLoader(true)} >
        <img className="left-0 top-0 absolute imageUser " src={img} />
        <div className="left-[527px] top-[10px] absolute text-slate-500 text-base font-normal userPrice">
          <p>{data.moneyD} €    </p>
          <div className="  absolute text-slate-500  font-normal ">/day</div>
        </div>
        <div className="left-[220px] top-[10px] absolute flex-col justify-start items-start gap-[5px] inline-flex">
          <div className="text-gray-700 text-2xl font-medium userH1">{name}</div>
          <div className=" h-8 text-gray-600 text-lg font-normal leading-relaxed tracking-wide userH2">{data.locationM}</div>
      <Rating className='mt-[-10px]' name="read-only" value={data.rating} readOnly />
          <div className="w-[100px] h-8 text-black text-sm font-medium leading-relaxed tracking-wide userH3" suppressHydrationWarning >{data.review} Reviews<br/></div>
          <div className="w-[350px] h-[35px] text-gray-500 text-sm font-medium leading-relaxed tracking-wide userH4 mt-[-10px]">
          <ReadMore  children={desc} size={size} setSize={setSize}/>
            
            </div>
        </div>
      </Link>
    </div>
    
  )
}

export default List