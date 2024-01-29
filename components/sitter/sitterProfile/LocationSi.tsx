import { SitterServices } from '@/common.types'
import { useLoadScript,GoogleMap,CircleF } from '@react-google-maps/api';
import React, { useEffect, useMemo, useState } from 'react'
import Geocode from "react-geocode";
type Props={
   
    sitter:any,
    name:string|undefined,
    apikey:string|undefined

}

const LocationSi = ({sitter,name,apikey}:Props) => {//show the map of the sitter location

    Geocode.setApiKey(apikey);
    const [first,setFirst]=useState(true)
    const [lat, setLat] = useState(50.110924);//default values
    const [lng, setLng] = useState(8.682127 );
    const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);
    const libraries = useMemo(() => ['places'], []);

    const { isLoaded } = useLoadScript({//show loading until the map is loaded
        googleMapsApiKey: apikey as string,
        libraries: libraries as any,
      });
     
    useEffect(() => {
        if(first==true){//chages the location quordinates if the user has already a saved location
         sitter?.locationM?(Geocode.fromAddress(sitter?.locationM).then(
           (response:any) => {
             const { lat, lng } = response.results[0].geometry.location;
             setLat(lat)
             setLng(lng)
           },
           (error:string) => {
             console.error(error);
           }
         )):null
         setFirst(false)
        }
     }, []);
     if (!isLoaded) {
      return <p>Loading...</p>;
    }  
     return (
      <div className='w-[300px] pt-6'>
        <h1 className='userH1 text-xl font-bold w-[500px] pb-4'>{name}'s Location</h1>
        <GoogleMap
        zoom={14}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: '561px', height: '400px' }}
        onLoad={() => console.log('Map Component Loaded...')}
        >
        {sitter?.mapRadius?
          <CircleF //the border radius of user availability
            key={1}
            center={mapCenter}
            radius={sitter.mapRadius*1000}
            onLoad={() => console.log('Circle Load...')}
            options={{
              fillColor: '#6171A3',
              strokeColor:  "#6171A3",
              strokeOpacity: 0.8,
            }}
          /> 
        :null}
        </GoogleMap>
      </div>
  )
}

export default LocationSi