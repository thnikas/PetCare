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
        style={{top:'13%'}}
        src="/bgn3.jpg"
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className='bg_image'
        />
    )
   
  }
  return (
    <div>
      <div className='bg_image'>
        <Image
        style={{top:'13%'}}
        src="/bgn3.jpg"
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className='bg_image'
        />
      <div style={{top:100}} className={sand.className}>
        <div style={{ width: '20.4%', left: '62.9%', top: '85.875%', position: 'absolute', color: '#FFFEFE' }} className='bg_text'>Search all</div>
        <div style={{ width: '18.1%', left: '81.5%', top: '102.875%', position: 'absolute', color: '#FFFEFE' }} className='bg_text'>the world</div>
        <div style={{ width: '19%', left: '76.9%', top: '95%', position: 'absolute', color: '#6171A3' }} className='bg_text'>around</div>
        <div style={{ width: '40.5%', left: '0.9%', top: '14.75%', position: 'absolute', color: '#FFFEFE' }} className='bg_text'>Find Pet Sitters</div>
        <div style={{ width: '32.6%', left: '27.5%', top: '28.625%', position: 'absolute', color: '#FFFEFE' }} className='bg_text'>become one</div>
        <div style={{ width: '5.8%', left: '27%', top: '21.125%', position: 'absolute', color: '#6171A3' }} className='bg_text'>or</div>
      </div>
    </div>

    <div className="search-box pt-64">
      <button className="btn-search" >
        <Image    //search button that is shows the list of the places based on the placeholder
          src={'/searchW.svg'} width={70} height={70} alt='search'/>
      </button>
  
      <PlacesAutocomplete push={true} setPlace={setPlace}  style='input-search' hasContainer={false} listStyle='suggestionSitLoc' placeholder='Search Sitter location'
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
  )
}
