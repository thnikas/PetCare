import Modal from '@/components/Modal'
import ProfileEdit from '@/components/profileEdit/ProfileEdit'
import ContactSi from '@/components/sitter/sitterProfile/ContactSi'
import { getCurrentUser } from '@/lib/session'
import React from 'react'

const page =  async ({ params: { id } }: { params: { id: string } })  => {//the page to contact a sitter
  // const session = await getCurrentUser();

  return (
    <Modal goBack={true}>
      
      <h3 className="modal-head-text">Contact Sitter</h3>
      
      <ContactSi/>
    </Modal>
  )
}

export default page