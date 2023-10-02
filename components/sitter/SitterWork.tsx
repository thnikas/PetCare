import React from 'react'
import Image from 'next/image'

const SitterWork = () => {//another part of the main sitter page
  return (
    <div className="w-[1157px] h-72 justify-center items-center gap-[46px] inline-flex pt-24 ">
    <div className="w-[356px] h-[276px] flex-col justify-center items-center gap-[15px] inline-flex">
        <div className="w-[68px] h-[68px] relative">
            <Image src={'/user.svg'} width={68} height={68} alt='user'/>
        </div>
        <div className="w-[365px] text-center  text-2xl font-extrabold h2-sitter">Create your profile</div>
        <div className="w-[297px] h-[76px] text-center text-gray-500 text-lg font-normal text-sitter">Your pet sitting profile showcases your skills and experience.</div>
    </div>
    <div className="w-[356px] h-[276px] flex-col justify-center items-center gap-[15px] inline-flex">
        <div className="w-[68px] h-[68px] relative">
            <Image src={'/calendar.svg'} width={68} height={68} alt='user'/>
        </div>
        <div className="w-[365px] text-center text-gray-700 text-2xl font-extrabold h2-sitter">Accept requests</div>
        <div className="w-[321px] h-[76px] text-center text-gray-500 text-lg font-normal text-sitter">Choose your own schedule, prices, and requirements for your services.</div>
    </div>
    <div className="w-[356px] h-[276px] flex-col justify-center items-center gap-[15px] inline-flex">
        <div className="w-[68px] h-[68px] relative">
            <Image src={'/dog.svg'} width={68} height={68} alt='user'/>
        </div>
        <div className="w-[365px] text-center text-gray-700 text-2xl font-extrabold h2-sitter">Welcome your first pet</div>
        <div className="w-[297px] h-[76px] text-center text-gray-500 text-lg font-normal text-sitter">Once your listing is live, you can start accepting jobs.</div>
    </div>



</div>
  )
}

export default SitterWork