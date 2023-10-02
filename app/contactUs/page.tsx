import ContactUs from '@/components/ContactUs'
import Modal from '@/components/Modal'
import React from 'react'

const page = () => {//the the to contact petCare
  return (
    <Modal goBack={true}>
      
    <h3 className="modal-head-text">Contact Us</h3>
    
    < ContactUs/>
  </Modal>
  )
}

export default page