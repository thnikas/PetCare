import Image from "next/image"
import Link from "next/link"

import { getCurrentUser } from "@/lib/session"
import { getPetDetails, getUserById } from "@/lib/actions"
import Modal from "@/components/Modal"
import { ProjectInterface,PetInterface, UserForm } from "@/common.types"
import PetActions from "@/components/PetActions"

const Pet = async ({ params: { id } }: { params: { id: string } }) => {//the page showed when the user clicks the eye in the petCard
    // const session = await getCurrentUser()
    const result=await getPetDetails(id) as {mongoDB:{pet:PetInterface}}
    const user= await getUserById(result.mongoDB.pet.createdBy) as {mongoDB:{user:UserForm}}
    if (!result?.mongoDB?.pet) return (
        <p className="no-result-text">Failed to fetch project info</p>
    )

    const petDetails = result?.mongoDB.pet

    const renderLink = () => `/profile/${petDetails?.createdBy}`
    return (
        <Modal customData={petDetails?.createdBy}>
            <section typeof="Show" className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
                <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
                    

                    <div className="flex-1 flexStart flex-col gap-1">
                        <p className="self-start  font-semibold text-primary-purple  relative text-6xl pet-title-view">
                            {petDetails?.name}
                        </p>
                       
                    </div>
                </div>

                
                    <div className="flex justify-end items-center gap-2">
                        <PetActions petId={petDetails?.id} />
                    </div>
                
            </section>

            <section className="mt-14">
                <Image
                    src={`${petDetails?.image}`}
                    className="object-cover rounded-2xl"
                    width={850}
                    height={600}
                    alt="poster"
                />
            </section>

            <section className="flexCenter flex-col mt-20 pet-container ">
                
                <div className="about ">
                    <Image src={'/pet-sign.svg'} width={100} height={100} alt='pet-sign'/>
                <p className="text-5xl pl-8 ">About {petDetails.name}</p>
                </div>
               <div className=" w-full overflow-hidden self-center pl-32">
               <div className="self-center">
                    <p className="max-w-5xl text-2xl font-semibold pb-4">Type of Pet?</p>
                    {petDetails.type=='Cat'?<Image src={'/cat5.svg'} width={70} height={70} alt='cat-sign'/>:
                    <Image src={'/labrador-retriever.svg'} width={70} height={70} alt='dog-sign'/>}
                    
                </div>
                <div className="self-centerpt-12">
                    <p className="max-w-5xl text-2xl font-semibold pb-4">Type of Sex?</p>
                    {petDetails.sex=='Female'?<Image src={'/female-symbol.svg'} width={70} height={70} alt='cat-sign'/>:
                    <Image src={'/male-symbol.svg'} width={70} height={70} alt='dog-sign'/>}
                    
                </div>
                {petDetails.ageY?
                <div className=" pt-12">
                    <p className="max-w-5xl text-2xl font-semibold pb-4">Age?</p>
                    <div className="flex">
                        <p className="max-w-5xl text-lg font-normal	">{petDetails.ageY} years</p>
                        {petDetails.ageM?
                        
                        <p className="max-w-5xl text-lg font-normal	">&nbsp;and {petDetails.ageY} months</p>:null}
                    </div>
                </div>
                :null}
                 {petDetails.friendly?
                <div className=" pt-12">
                    <p className="max-w-5xl text-2xl font-semibold pb-4">Friendly?</p>
                    
                    <p className="max-w-5xl text-lg font-normal	">{petDetails.friendly}</p>
                </div>
                :null}
                {petDetails.feeding?
                <div className=" pt-12">
                    <p className="max-w-5xl text-2xl font-semibold pb-4">Feeding?</p>
                    
                    <p className="max-w-5xl text-lg font-normal	">{petDetails.feeding}</p>
                </div>
                :null}
                {petDetails.energy?
                <div className=" pt-12">
                <p className="max-w-5xl text-2xl font-semibold pb-4">Energy?</p>
                
                <p className="max-w-5xl text-lg font-normal	">{petDetails.energy}</p>
                </div>
                :null}
                {petDetails.else?
                <div className=" pt-12">
                <p className="max-w-5xl text-2xl font-semibold pb-4">More informations</p>
                
                <p className="max-w-5xl text-lg font-normal	">{petDetails.else}</p>
                </div>
                :null}
               </div>
                
               
                

                
            </section>
      
            <section className="flexCenter w-full gap-8 mt-28">
                <span className="w-full h-0.5 bg-light-white-200" />
                <Link href={renderLink()} className="min-w-[100px] h-[100px]">
                    <Image
                        src={user.mongoDB.user.avatarUrl}
                        className="rounded-full"
                        width={100}
                        height={100}
                        alt="profile image"
                    />
                </Link>
                <span className="w-full h-0.5 bg-light-white-200" />
            </section>

            {/* <RelatedProjects userId={petDetails?.createdBy} projectId={petDetails?.id} /> */}
        </Modal>
    )
}

export default Pet