"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import DialogC from '../DialogC'
import { useGlobalContext } from '@/app/context'

type Props={
    session:any;
    sitter:any;
    title:string
}
const ButtonStr = ({session,sitter,title}:Props) => {//the button that exist in the sitter page
    const [showDialog, setShowDialog] = useState(false);
    const { setLoader} = useGlobalContext();

  return (
    <div className='hidden-xs col-sm-3 col-md-4'>
      {session ? (//if user if logged redirect to create sitter if he has not still an account or to edit if he has already an account
        <Link href={sitter.length==0?`/create-sitter`:`/edit-sitter/${sitter[0].node.id}`} >
          <button onClick={()=>setLoader(true)}  className={`buttonS`}>{title}</button>
        </Link>
      ) : (//if user not logged if show pop up modal
        <button onClick={() => setShowDialog(true)} className={`buttonS`}>
        {title}        
</button>
      )}

      {showDialog && <DialogC isOpen={showDialog} setIsOpen={setShowDialog} />}
    </div>
  );
}

export default ButtonStr