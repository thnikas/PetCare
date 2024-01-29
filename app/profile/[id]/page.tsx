import {  getUserPets, getUserSitter,  getUserById } from '@/lib/actions'
import ProfilePage from '@/components/ProfilePage'
import { SitterServices, UserProfile } from '@/common.types';

type Props = {
    params: {
        id: string,
    },
    searchParams: {
        type?: string | null;
        endcursor?: string | null;
      }
}

  
 
const UserProfile = async ({ params }: Props) => {//the profile page of the user
  
  let petsToDisplay:any
  let sitter:any
  let result:any
  const petIdsArray:any = []; // Create an empty array to store the pet IDs
  const finalPet:any=[]
   let finalSitter:any=null
    try {
      sitter=await getUserSitter(params.id) as { user: UserProfile }
      const data = await getUserPets(params.id) as { mongoDB: any };
      result = await getUserById(params.id) as {user: UserProfile}
      petsToDisplay=data.mongoDB.petCollection
     
      // petsToDisplay.edges.map((pet:any)=>{
      //   const petId = pet.node._id; // Get the ID of the current pet
      //   petIdsArray.push(petId); // Add the ID to the petIdsArray
      // })
      // for(let i=0;i<petIdsArray.length;i++){//check how many pets the user has
      //   const result=await getPetDetails(petIdsArray[i]) as {pet?:PetInterface}
      //   finalPet.push(result)
      // }
      // finalSitter=await getSitterDetails(sitter.user.sitter.edges[0].node.id) as{sitter:SitterServices}//check if the user is sitter
    } catch (error) {
      console.error("Error fetching pets:", error);
      petsToDisplay=[]//returns empty if the user has no pets
      sitter=[]//returns empty if the user is not sitter
      // Your logic with the data (when fetch encounters an error)
    }    
    if (!sitter?.mongoDB?.sitter) return (
      <p className="no-result-text">Failed to fetch user info</p>
    )
   {/**the data is passed in the ProfilePage component */}
    return     <ProfilePage user={result.mongoDB}  data={petsToDisplay} sitter={sitter}/>

}

export default UserProfile