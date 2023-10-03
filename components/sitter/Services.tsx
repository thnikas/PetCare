import React from 'react'
import Image from 'next/image'
export const Services = () => {//the page that is shoed in the main sitter page
  return (
    <div className="w-[100%] h-[543px] justify-center items-center gap-[43px] inline-flex pt-52 ">
    <div className="h-[533px] flex-col justify-center items-center gap-[78px] inline-flex">
      <div className="flex-col justify-start items-start gap-[67px] flex">
        <div className="w-[388px] text-center text-gray-700 text-[32px] font-extrabold h2-sitter">Services</div>
        <div className="justify-start items-center gap-[25px] inline-flex">
          <div className="w-12 h-12 relative">
            <Image src={'/baggage.svg'} width={68} height={68} alt='bag' />
          </div>
          <div className="flex-col justify-center items-start gap-[15px] inline-flex">
            <div className="text-gray-600 text-[22px] font-semibold h3-sitter">Wait at home</div>
            <div className="w-[418px] text-gray-500 text-xl font-normal text-sitter">Care for a dog or cat overnight in your home.</div>
          </div>
        </div>
        <div className="justify-start items-center gap-[25px] inline-flex">
          <div className="w-12 h-12 relative">
            <Image src={'/dog_foot.svg'} width={68} height={68} alt='foot' />
          </div>
          <div className="flex-col justify-center items-start gap-[15px] inline-flex">
            <div className="text-gray-600 text-[22px] font-semibold h3-sitter">Take for a walk</div>
            <div className="w-[418px] text-gray-500 text-xl font-normal text-sitter">Discover tailored dog walking sessions perfectly aligned with your schedule.</div>
          </div>
        </div>
        <div className="justify-start items-center gap-[25px] inline-flex">
          <div className="w-12 h-12 relative">
            <Image src={'/house.svg'} width={68} height={68} alt='house' />
          </div>
          <div className="flex-col justify-center items-start gap-[15px] inline-flex">
            <div className="text-gray-600 text-[22px] font-semibold h3-sitter">House Sitting, Drop-In Visits</div>
            <div className="w-[418px] text-gray-500 text-xl font-normal text-sitter">Provide compassionate care and companionship to pets in the comfort of their own homes.</div>
          </div>
        </div>
      </div>
    </div>
    <div style={{width: 0, height: 590, border: '0.50px #ACACAC solid'}}></div>
  
    <div className="h-[543px]  w-[491px] flex-col justify-center items-center gap-[78px] inline-flex">
      <div className="w-[560px] text-center text-gray-700 text-[32px] font-extrabold h2-sitter">Advantages</div>
      
      <div className="justify-center items-center gap-[28px] inline-flex">

        <div className="w-12 h-12 relative">
          <Image src={'/bone.svg'} width={68} height={68} alt='bone' />
        </div>
        <div className="w-[441px] text-gray-500 text-xl font-normal text-sitter">Freedom to choose your schedule, services, and quote.</div>
      </div>
      <div className="justify-center items-center gap-[28px] inline-flex">
        <div className="w-12 h-12 relative">
          <Image src={'/bone.svg'} width={68} height={68} alt='bone' />
        </div>
        <div className="w-[441px] text-gray-500 text-xl font-normal text-sitter">Your service will be allocated to nearby pet parents.</div>
      </div>
      <div className="justify-center items-center gap-[28px] inline-flex">
        <div className="w-12 h-12 relative">
          <Image src={'/bone.svg'} width={68} height={68} alt='bone' />
        </div>
        <div className="w-[441px] text-gray-500 text-xl font-normal text-sitter">We will help you manage & handle pet parent’s booking and request.</div>
      </div>
      <div className="justify-center items-center gap-[28px] inline-flex">
        <div className="w-12 h-12 relative">
          <Image src={'/bone.svg'} width={68} height={68} alt='bone' />
        </div>
        <div className="w-[441px] text-gray-500 text-xl font-normal text-sitter">Simple and reliable payment system.</div>
      </div>
    </div>
  </div>
  )
}

export default Services