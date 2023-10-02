import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import Modal from "@/components/Modal";
import { getPetDetails } from "@/lib/actions";
import { PetInterface, } from "@/common.types";
import PetForm from "@/components/PetForm";
const EditPet = async ({params:{id}}:{params:{id:string}}) => {//edit already created Pet
  const session = await getCurrentUser();

  if (!session?.user) redirect("/")
  const result=await getPetDetails(id) as {pet?:PetInterface}//get the specific pet that is selected

  return (
    <Modal customData={session.user.id} goBack={true}>
      <h3 className="modal-head-text">Edit Pet</h3>
       <PetForm type="edit" session={session} petCr={result?.pet}/> 
    </Modal>
  );
};

export default EditPet;