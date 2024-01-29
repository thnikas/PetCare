import React from 'react'
import Modal from '@/components/Modal'
import ProfileEdit from '@/components/profileEdit/ProfileEdit'
import { getCurrentUser } from '@/lib/session';
const pageEditProfile = async({params:{id,}}:{params:{id:string}}) => {//edit user profile
  // const session = await getCurrentUser();
  return (
    <Modal>
      <h3 className="modal-head-text">Edit User</h3>
    
      <ProfileEdit />
    </Modal>
  )
}

export default pageEditProfile