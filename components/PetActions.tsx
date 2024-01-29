"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { deletePet, fetchToken } from '@/lib/actions'

type Props = {
    petId: string
}

const PetActions = ({ petId }: Props) => {//icons that is showed in pet View when user can edit or delete the pet
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const router = useRouter()

    
    const handleDeletePet = async () => {
        setIsDeleting(true)
        
        const { token } = await fetchToken();

        try {
            await deletePet(petId);
            
            router.push("/");
            router.refresh()

        } catch (error) {
            console.error(error)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <>
            <Link href={`/edit-pet/${petId}`} className="flexCenter edit-action_btn">
                <Image src="/pencile.svg" width={15} height={15} alt="edit" />
            </Link>

            <button
                type="button"
                disabled={isDeleting}
                className={`flexCenter delete-action_btn ${isDeleting ? "bg-gray" : "bg-primary-purple"}`}
                onClick={handleDeletePet}
            >
                <Image src="/trash.svg" width={15} height={15} alt="delete" />
            </button>
        </>
    )
}

export default PetActions