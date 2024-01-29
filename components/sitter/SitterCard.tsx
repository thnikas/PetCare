import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SitterServices } from '@/common.types'

type Props = {
   
    data:SitterServices
}

const SitterCard = ({data}:Props) => {//the sitter card that is showed in the profile of the user if exists. It accepts the data from grafbase
  return (
    <div className='sitterCard'>
        <div className='flex-row flex gap-6'>
            <h2 className='h2-sitterEdit'>Sitter Profile</h2>
            <div className='justify-end flex-row flex flex-grow pr-2'>
                <Link href={`/edit-sitter/${data.sitter.id}`} className="flexCenter edit-edit_sitter">
                    <Image src="/pencile.svg" width={33} height={33} alt="edit" />
                </Link>
            </div>
        </div>
        <div className='gap-4 grid mt-4'>
            <div className='flex'>
                <h2 className='h3-sitter text-2xl flex items-end '>Services:</h2>
                <div className="w-8 h-9 flex-row flex gap-4 ml-2">{/**if value if selected show the specific icon */}
                    {data.sitter.service.drop? <Image src={'/baggage.svg'} width={38} height={38} alt='bag' />:null}
                    {data.sitter.service.walk? <Image src={'/dog_foot.svg'} width={38} height={38} alt='dog' />:null}
                    {data.sitter.service.home? <Image src={'/house.svg'} width={38} height={38} alt='house' />:null}
                    
                    
                </div>
            </div>
            <h2 className='h3-sitter text-2xl'>Location: { data.sitter.locationM}</h2>
            <div className='flex'>
                <h2 className='h3-sitter text-2xl'>Type of Pets:</h2>
                <div className=" h-9 flex-row flex gap-4 ml-2">
                    {data.sitter.sizePets.small? <Image src={'/dogS5.svg'} width={38} height={38} alt='small' />:null}
                    {data.sitter.sizePets.medium? <Image src={'/dogS1.svg'} width={38} height={38} alt='medium' />:null}
                    {data.sitter.sizePets.big? <Image src={'/dogS6.svg'} width={38} height={38} alt='big' />:null}
                    {data.sitter.sizePets.cat? <Image src={'/dosS4.svg'} width={38} height={38} alt='cat' />:null}

                    
                </div>
            </div>
        </div>
           

    </div>
  )
}

export default SitterCard