import { useLoadScript,GoogleMap,CircleF } from '@react-google-maps/api';
import type { NextPage } from 'next';
import { useMemo,useState } from 'react';
import { PlacesAutocomplete } from './PlacesAuto';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import Geocode from "react-geocode";
import { useEffect } from 'react';

type Props={
  apiKey:string|undefined
  radius?:number
  locationM?:string
  setState:(value:string) =>void
}
const Map = ({apiKey,radius,locationM,setState}:Props) => {//the map that is shoed in the sitter creation form
  Geocode.setApiKey(apiKey);

  const [lat, setLat] = useState(50.110924);//default values
  const [lng, setLng] = useState(8.682127 );
  const [first,setFirst]=useState(true)
  const libraries = useMemo(() => ['places'], []);
  const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);
  
  
  useEffect(() => {
   if(first==true){//chages the location quordinates if the user has already a saved location
    locationM?(Geocode.fromAddress(locationM).then(
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

  const { isLoaded } = useLoadScript({//show loading until the map is loaded
    googleMapsApiKey: apiKey as string,
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  return (
    <div >
      {/**the text input where the user though google api can find his location this com is also used in the search bar in home page */}
      <PlacesAutocomplete push={false} setPlace={setState} hasContainer={true} style='autocompleteInput'
          placeholder='Select you base'
          listStyle='suggestionWrapper'
          onAddressSelect={(address) => {
            getGeocode({ address: address }).then((results) => {
              const { lat, lng } = getLatLng(results[0]);
              setLat(lat);
              setLng(lng);
            });
          }}
        />
      <GoogleMap
        zoom={14}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: '561px', height: '400px' }}
        onLoad={() => console.log('Map Component Loaded...')}
      >
        
    {radius?<CircleF //the border radius of user availability
        key={1}
        center={mapCenter}
        radius={radius*1000}
        onLoad={() => console.log('Circle Load...')}
        options={{
          fillColor: '#6171A3',
          strokeColor:  "#6171A3",
          strokeOpacity: 0.8,
        }}
      /> :null}
      </GoogleMap>
    </div>
  );
};

export default Map;