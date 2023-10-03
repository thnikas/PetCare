'use client'
import { useLoadScript,GoogleMap,CircleF } from '@react-google-maps/api';

import React,{useState,useMemo} from 'react'
import Image from 'next/image'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { PlacesAutocomplete } from './sitter/PlacesAuto';
import Geocode from "react-geocode";
import { useGlobalContext } from '@/app/context';
import { Quicksand } from 'next/font/google'

PlacesAutocomplete
type Props={
  googleKey?:string
}
const sand = Quicksand({ subsets: ['latin'] })

export const Search = ({googleKey}:Props) => {//shows background of the main page and the button search
  Geocode.setApiKey(googleKey);
  const [searchValue, setSearchValue] = useState<string>('');
  const [lat, setLat] = useState(50.110924);
  const [lng, setLng] = useState(8.682127 );
  const handleInputBlur = () => {
    setSearchValue('');
  };
  const [place,setPlace]=useState('')
  const libraries = useMemo(() => ['places'], []);

  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleKey as string,
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return  (
    
      <Image
    src="/bgn3.jpg"
    alt="Background Image"
    width={0}
  height={0}
  objectFit='cover'
   sizes="
              100vw"
        style={{ height: '50vw', width: '100vw' }} //The point is right there!
  />
    )
   
  }
  return (
    <div>
      <div className='bg_image'>
      <div>
      <Image
    src="/bgn3.jpg"
    alt="Background Image"
    width={0}
  height={0}
   sizes="
              100vw"
        style={{ height: '50vw', width: '100vw' }} //The point is right there!
  />
      </div>
 
  
     <div style={{ top: '10%', }} className={sand.className}>
  <div style={{ width: '20.4%', left: '62.9%', top: '72.875%', position: 'absolute', color: '#FFFEFE' }} className='bg_text'>Search all</div>
  <div style={{ width: '18.1%', left: '81.5%', top: '89.875%', position: 'absolute', color: '#FFFEFE' }} className='bg_text'>the world</div>
  <div style={{ width: '19%', left: '76.9%', top: '82%', position: 'absolute', color: '#6171A3' }} className='bg_text'>around</div>
  <div style={{ width: '40.5%', left: '0.9%', top: '6.75%', position: 'absolute', color: '#FFFEFE' }} className='bg_text'>Find Pet Sitters</div>
  <div style={{ width: '32.6%', left: '27.5%', top: '20.625%', position: 'absolute', color: '#FFFEFE' }} className='bg_text'>become one</div>
  <div style={{ width: '5.8%', left: '27%', top: '13.125%', position: 'absolute', color: '#6171A3' }} className='bg_text'>or</div>
  
</div>
<div className='w-full absolute justify-center flex top-[50%] h-fit'>
<div className="search-box absolute top-[50%] ">
      <button className="btn-search" >
        <Image    //search button that is shows the list of the places based on the placeholder
          src={'/searchW.svg'} width={170} height={170} alt='search'/>
      </button>
  
      <PlacesAutocomplete push={true} place={place} setPlace={setPlace}  style='input-search' hasContainer={false} listStyle='suggestionSitLoc' placeholder='Search Sitter location'
          onAddressSelect={(address) => {
            getGeocode({ address: address }).then((results) => {
              const { lat, lng } = getLatLng(results[0]);
              setLat(lat);
              setLng(lng);
            });
          }}
      />
    </div>
  </div>

    </div>
    
    
  </div>
  )
}
