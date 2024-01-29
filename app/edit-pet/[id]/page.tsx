// 'use client'
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import Modal from "@/components/Modal";
import { getPetDetails } from "@/lib/actions";
import { PetInterface, } from "@/common.types";
import PetForm from "@/components/PetForm";
import { useGlobalContext } from "@/app/context";
const EditPet = async ({params:{id}}:{params:{id:string}}) => {//edit already created Pet
  // const {logUser} = useGlobalContext()
  // const session = logUser;

  // if (!session?.user) redirect("/")
  const result=await getPetDetails(id) as {mongoDB?:{pet:PetInterface}}//get the specific pet that is selected
  return (
    <Modal  goBack={true}>
      <h3 className="modal-head-text">Edit Pet</h3>
       <PetForm type="edit"  petCr={result?.mongoDB?.pet}/> 
    </Modal>
  );
};

export default EditPet;