
'use client'


import { UserProfile } from "@/common.types";
import NavBarL from "./NavBarL";
import { useContext } from "react";
import { useGlobalContext } from "@/app/context";

const Navbar = async () => {
{/**Navbar where the user can redirect in different pages */}
  // const session = await getCurrentUser()
  // if(session){
  //   const userExists = await getUser(session.user?.email as string) as { user?: UserProfile }
  // }
  const {logUser} = useGlobalContext()
  const session = logUser
  return (
    <nav className='flexBetween navbar'>
      <NavBarL session={session}/>
    </nav>
  );
};

export default Navbar;