"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
    id: string;
    image: string;
    title: string;
   
};

const PetCard = ({ id, image, title,   }: Props) => {//the petCard that is showed in userProfile where user can edit or see the Pet
    useEffect(() => {
        
    }, []);
    return (
        <div className="flexCenter flex-col rounded-2xl drop-shadow-card w-64 h-56">
            <div  className=" card_icons  group relative " >
                <Image
                    src={image}
                    width={250}
                    height={240}
                    className="w-64 h-56 rounded-2xl object-fill"
                    alt="project image"
                    style={{width:250,height:240}}
                />

                <div className=" hidden group-hover:flex card_pet pet-title ">
                    <Link href={`/edit-pet/${id}`}>
                    <Image src={'/pencil1.svg'} alt="pencil" width={50} height={50}/>

                    </Link>
                    <Link href={`/pet/${id}`}>
                    <Image src={'/eye1.svg'} alt="eye" width={50} height={50}/>

                    </Link>
                </div>
            </div>

        </div>
    );
};

export default PetCard;