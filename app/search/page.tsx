import { SitterServices } from '@/common.types';


import SearchForm from '@/components/searchResults/SearchForm';

import { fetchAllSitters, fetchAllSittersN } from '@/lib/actions'
import React from 'react'

type SearchParams = {
    locationM?: string | undefined;
    endcursor?: string | null;
  }
  type SitterSearch = {
    sitterSearch: {
      edges: { node: SitterServices }[];
      pageInfo: {
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        startCursor: string;
        endCursor: string;
      };
    },
  }
  type Props = {
    searchParams: SearchParams
  }
const Search = async({ searchParams: { locationM, endcursor } }: Props) => {//the page is showed when the user enters a location in the search bar
  
  const data =locationM? await fetchAllSitters(locationM, endcursor) as SitterSearch :await fetchAllSittersN(endcursor) as SitterSearch//get all the sitters that have the searched location

    const sittersToDisplay = data?.sitterSearch?.edges || [];
    {/**the component accepts 2 times the same array because the firstArray is used so it can be accepted all the filters that can be applied in the search form */}
  return (
    <SearchForm sittersArray={sittersToDisplay} firstArray={sittersToDisplay}/>
  )
}

export default Search