import { useState } from 'react';
import { useRouter } from "next/navigation";

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from 'use-places-autocomplete';

type Props={
  onAddressSelect?: (address: string) => void;
  setPlace?:any;
  style?:string
  placeholder:string;
  hasContainer:boolean;
  listStyle?:string;
  push:boolean
}
  export const PlacesAutocomplete = ({onAddressSelect,setPlace,style,placeholder,hasContainer,listStyle,push }: Props) => {//the list of places that is showed based on the placeholder in the search bar
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      
      debounce: 300,
      cache: 86400,
    });
    const [isFocus,setIsFocus]=useState(false)
    const router = useRouter();
    
    const renderSuggestions = () => {
      return data.map((suggestion) => {
        const {
          place_id,
          structured_formatting: { main_text, secondary_text },
          description,
        } = suggestion;
        
        return (
          push? <li
            key={place_id}
            onClick={() => {
              setValue(description, false);
              setPlace(main_text)
              clearSuggestions();
              onAddressSelect && onAddressSelect(description);

                     setIsFocus(false)
                     router.push(`/search`)   }}
          >
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </li>:<li
          key={place_id}
          onClick={() => {//when a value is selected
            setValue(description, false);
            setPlace(main_text)
            clearSuggestions();
            onAddressSelect && onAddressSelect(description);
          }}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
          
         
        );
      });
    };
 
    return (
      hasContainer? <div className='autocompleteWrapper'>
      <input
        value={value}
        className={style}
       disabled={!ready}
          onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />

      {status === 'OK' && (
        <ul className={listStyle}>{renderSuggestions()}</ul>
      )}
    </div>: <>
        <input
          className={style}
         value={value}
          placeholder={placeholder}
          disabled={!ready}
          onChange={(e) => setValue(e.target.value)}
          onFocus={()=>setIsFocus(true)}
        />
  
        {status === 'OK' && (
          isFocus && (
            <ul           onBlur={() => setIsFocus(!isFocus)}
            className={listStyle}>{renderSuggestions()}</ul>

          )
        )}
      </>
     
    );
  };