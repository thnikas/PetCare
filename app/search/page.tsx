import { SitterServices } from '@/common.types';


import SearchForm from '@/components/searchResults/SearchForm';

import { fetchAllSitters, fetchAllSittersN } from '@/lib/actions'
import React from 'react'

type SearchParams = {
    locationM?: string | undefined;
    endcursor?: string | null;
  }
  type SitterSearch = {
    mongoDB:{
      sitterCollection: {
        edges: { node: SitterServices }[];
        pageInfo: {
          hasPreviousPage: boolean;
          hasNextPage: boolean;
          startCursor: string;
          endCursor: string;
        };
      },
    }
    
  }
  type Props = {
    searchParams: SearchParams
  }
  // const dataSample=[
  //   {
  //     service: {home:true,
  //       walk:false,
  //       drop:true},
  // moneyH:5,
  // moneyD:25,
  // daysA:{
  //   mon:true,
  // tue:false,
  // wed:true,
  // thu:false,
  // fri:true,
  // sat:true,
  // sun:false
  // },
  // locationM:'Berling',
  // mapRadius:2,
  // sizePets:{small:true,
  //   medium:false,
  //   big:true,
  //   cat:true},
  // rating:3,
  // review:3
  //   }
  // ]
const Search = async({ searchParams: { locationM, endcursor } }: Props) => {//the page is showed when the user enters a location in the search bar
  
  const data =locationM? await fetchAllSitters(locationM) as SitterSearch :await fetchAllSittersN() as SitterSearch//get all the sitters that have the searched location
    const sittersToDisplay = data?.mongoDB?.sitterCollection?.edges || [];
    {/**the component accepts 2 times the same array because the firstArray is used so it can be accepted all the filters that can be applied in the search form */}
  return (
    <SearchForm sittersArray={sittersToDisplay} firstArray={sittersToDisplay}/>
  )
}

export default Search