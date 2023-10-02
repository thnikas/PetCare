import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import Modal from "@/components/Modal";
import PetForm from "@/components/PetForm";

//when the user wants to add a pet

const CreatePet = async () => {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/")

  return (
    <Modal customClass="addPet-wrapper" goBack={true}>
      <h3 className="modal-head-text custom-text-center">Create your Pet profile</h3>
      <PetForm type="create" session={session} />
    </Modal>
  );
};

export default CreatePet;