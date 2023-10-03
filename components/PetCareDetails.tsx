'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'
import Button from './Button';

const PetCareDetails = () => {//the com is showed under the background in home page
  const router = useRouter();

  return (
    <div >
      <div className='justify-center flex w-[88vw] pt-24 '>
      <div className="containerCard">
        <Image className="lg:w-[31.25rem] h-[21.063rem] rounded-[10px]" src={'/bg4.jpg'} alt='bg4' width={500} height={337}/>
        {/* className='lg:w-[7.4rem] md:w-[6rem] sm:w-[5rem] w-[4rem] xl:w-[8.2rem]' */}
        <div className="content-container">
          <div className="title pageC">Discover compassionate Pet Sitters</div>
          <div className="description h3-sitter">Uncover vetted and highly-rated pet sitters who provide unwavering companionship to your pets, ensuring utmost care, time, and affection.</div>
          <div className="button-container cursor-pointer" onClick={()=>router.push('/search')}>
            <div className="button-text">Find a Pet Sitter</div>
            <img className="arrow-image" src="/arrowR2.svg" alt="arrowR" width="25" height="25" />
          </div>
        </div>
      </div>
    </div>

  <div className='justify-center flex w-[88vw] pt-32'>
    <div className="containerCard">
      <div className="content-container">
        <div className="title pageC">Attention pet and travel enthusiasts!</div>
        <div className="description h3-sitter">Experience the joy of staying for free alongside charming animals in exceptional homes across the globe. Seize the opportunity to pet sit as frequently as you desire, in whichever destination you prefer.</div>
        <div className="button-container cursor-pointer" onClick={()=>router.push('/sitter')}>
          <div className="button-text">Become a Pet Sitter</div>
          <img className="arrow-image" src="/arrowR2.svg" alt="arrowR" width="25" height="25" />
        </div>
    </div>
    <Image className="w-[500px] h-[337px] rounded-[10px]" src={'/bg6.jpg'} alt='bg6' width={500} height={337}/>
    </div>
  </div>
  <div className='flex justify-center pt-32 flex-col items-center '>
    <div className="text-slate-500 text-[28px] font-bold">Connect with pet sitters who will embrace your pets as part of their own family.</div>
    <div style={{    width: '50rem', height: 72, position: 'relative'}} className='mt-24'>
      <div className='linie1'></div>
      <div className='linie2'></div>
      <div className='containerCir1'>
      <div className='circle' >
        <div className='number'>1</div>
      </div>
    </div>
    <div className='containerCir1 left-[88%]'>
      <div className='circle'>
        <div className='number'>3</div>
      </div>
    </div>
    <div className='containerCir1 left-[44%]'>
      <div className='circle'>
        <div className='number'>2</div>

      </div>
    </div>
  </div>
  <div className='flex flex-row gap-[135px] mt-[5%]'>
  <div className='whoTiTeC'>
    <Image className="w-[120px] h-[120px] rounded-[10px]" src={'/personSearch.svg'} alt='person' width={120} height={120}/>
    <div className='titleTextC'>
      <div className='titleDe'>Search</div>
      <div className='textDe'>Discover real insights from pet owners like you. Choose the ideal caregiver based on trusted reviews.</div>
    </div>
  </div>
  <div className='whoTiTeC'>
  <Image className="w-[120px] h-[120px] rounded-[10px]" src={'/phone.svg'} alt='phone' width={120} height={120}/>

    <div className='titleTextC'>
      <div className='titleDe'>Book Sitter</div>
      <div className='textDe'>Easily book a trusted caregiver with our seamless process. Your pet's comfort is just a click away.</div>
    </div>
  </div>
  <div className='whoTiTeC'>
  <Image className="w-[120px] h-[120px] rounded-[10px]" src={'/petLove.svg'} alt='petLove' width={120} height={120}/>

    <div className='titleTextC'>
      <div className='titleDe'>Relax</div>
      <div className='textDe'>Rest assured, your cherished pets are in the caring embrace of a devoted sitter.</div>
    </div>
  
   
  </div>
  
  </div>
  <div className='pt-20'>
    <Button customClass='buttonMainPage' handleClick={()=>router.push('/search')} title='Find a Sitter '/>
    </div>
  </div>

    </div>
   

  )
}

export default PetCareDetails