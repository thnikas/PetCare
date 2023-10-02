
import React from 'react'
import { Search } from '@/components/Search';
import Loader from '@/components/Loader';
import PetCareDetails from '@/components/PetCareDetails';

type SearchParams = {
  category?: string | null;
  endcursor?: string | null;
}
type Props = {
  searchParams: SearchParams
}

const Home = async({ searchParams: { category, endcursor } }: Props,) => {
  const googleApiKey = process.env.GOOGLE_MAPS_KEY

  return (
    <section className='flexStart flex-col paddings mb-16'>
        <Search googleKey={googleApiKey}/>{/**the backgrouund image with the search icon */}
        <Loader/>{/**the loader that is showed when the value is true */}
        <section className="projects-grid ">
          <PetCareDetails/>{/**the main page under the background image */}
      </section>
    </section>
  )
}

export default Home