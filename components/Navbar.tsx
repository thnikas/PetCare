
import { getCurrentUser } from "@/lib/session";


import { getUser } from "@/lib/actions";
import { UserProfile } from "@/common.types";
import NavBarL from "./NavBarL";

const Navbar = async () => {
{/**Navbar where the user can redirect in different pages */}
  const session = await getCurrentUser()
  if(session){
    const userExists = await getUser(session.user?.email as string) as { user?: UserProfile }
  }

  return (
    <nav className='flexBetween navbar'>
      <NavBarL session={session}/>
    </nav>
  );
};

export default Navbar;