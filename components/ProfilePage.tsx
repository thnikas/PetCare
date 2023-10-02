import { ProjectInterface, UserProfile,PetInterface, SitterServices } from '@/common.types'
import Image from 'next/image'

import Link from 'next/link'

import PetCard from './PetCard';
import SitterCard from './sitter/SitterCard';

type Props = {
    user: UserProfile;
    data:any,
    sitter:any
}


const ProfilePage = async({ user,data,sitter }: Props,) => {//shows the profile page
    return(
    <section className='flexCenter flex-col max-w-10xl w-full mx-auto paddings profile-section'>
        <section className="flexBetween max-lg:flex-col gap-10 w-full flex-col">
            <div className='flex items-start flex-col w-full'>
                <Image src={user?.avatarUrl} width={100} height={100} className="rounded-full w-24 h-24" alt="user image" />
                <p className="text-4xl font-bold mt-10">{user?.name}</p>   
            </div>
            <div className='card_container'>
                <Link href={`/add-pet`} className='card-add'>
            <div>
            <Image src="/plus.svg" width={200} height={100} className="rounded-full" alt="plus" />
            <p className='text-2xl font  text-white'>Add Pet</p>
            </div>
            </Link>{/**shows the User Pets if exists */}
                {data[0]? 
                data.map((pet:any)=>(
                <PetCard
                key={`${pet.pet?.id}`}
                id={pet.pet?.id}
                image={pet.pet?.image}
                title={pet.pet?.name}
            />            ))
                :null}      
            </div>
            {/**shows sitter card if the user is sitter */}
            {sitter?<SitterCard data={sitter.sitter}/>:null}            
        </section>  
    </section>
    )
    
}

export default ProfilePage