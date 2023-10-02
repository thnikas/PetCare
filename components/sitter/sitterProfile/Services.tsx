import React, { useEffect, useState } from 'react';
import { ServiceTypes } from '@/common.types';
import Image from 'next/image';
import { Skeleton } from '@mui/material';

type Props = {
  servicesSitter: ServiceTypes | undefined;
  servicePriceD:number|undefined;
  servicePriceH:number|undefined;
};

const servicesList = [
  { title: 'Wait at home', name: 'home', icon: '/baggage.svg' },
  { title: 'Go for a walk', name: 'walk', icon: '/dog_foot.svg' },
  { title: 'Drop in Visits', name: 'drop', icon: '/house.svg' },
];

const Services = ({ servicesSitter,servicePriceD,servicePriceH }: Props) => {//the services
  const [checkServices, setCheckServices] = useState<string[]>([]);
  const [showSkeleton, setShowSkeleton] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (servicesSitter) {
      const checkedServices = [];

      if (servicesSitter.drop) {
        checkedServices.push('drop');
      }
      if (servicesSitter.home) {
        checkedServices.push('home');
      }
      if (servicesSitter.walk) {
        checkedServices.push('walk');
      }

      setCheckServices(checkedServices);
    }
  }, [servicesSitter]);

  return (
    
      showSkeleton?<Skeleton width='18rem' height='20rem' variant='rounded' style={{borderRadius:'10%',gap:'6rem',paddingRight:'5rem'}}/>:
      <div className='sitterServicesC'>
      
        <h1 className='userH1 text-3xl text-center pt-2'>Services</h1>
        {checkServices.length > 0 ? (
          <div className='flex flex-col gap-4 pt-2'>
            {servicesList.map((ser, index) => (
              checkServices.includes(ser.name) && 
              <div className='flex-row flex justify-center gap-5 pt-1'  key={index}> 
                <Image src={ser.icon} width={35} height={35} alt='dog-sign'/>
                <h2 className='items-center flex h2-sitter text-lg'>{ser.title}</h2>
              </div>
            
            ))}
          </div>
      ) : (
      null
      )}
      <h1 className='userH1 text-3xl text-center pt-3'>Prices</h1>

      <div className='flex gap-5 text-center justify-center pt-3'>
        {servicePriceD?  <h2 className='items-center flex pageC text-lg font-semibold'>{servicePriceD}€/day</h2>:null}
        {servicePriceH?      <h2 className='items-center flex pageC  text-lg font-semibold'>{servicePriceH}€/hour</h2>
        :null}
      </div>
    </div>
  );
};

export default Services;
