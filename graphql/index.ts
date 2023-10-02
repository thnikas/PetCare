import { ServicePetSize } from "@/common.types";
//the mutations that are used in grafbase


export const createPet = `
	mutation CreatePet($input: PetCreateInput!) {
		petCreate(input: $input) {
			pet {
				 name,
  type,
  sex,
  ageY,
  ageM,
  friendly,
  feeding,
  energy,
  else,
  image,
  id,
  createdBy {
    email
    name,
    id,
            
            avatarUrl
  }
			}
     
		}
	}
`;
export const createSitter = `
	mutation CreateSitter($input: SitterCreateInput!) {
		sitterCreate(input: $input) {
			sitter {
        service{
          home,
          walk,
          drop
        },
        moneyH,
        moneyD,
        daysA{
          mon,tue,wed,
          thu,fri,sat,sun
        },
        locationM,
        mapRadius,
        sizePets {
          small
          medium
          big
          cat
        },
        review,
        rating,
        id
        createdBy {
          email,
          name,
          id,        
          avatarUrl
        }
			}
     
		}
	}
`;
export const updateProjectMutation = `
	mutation UpdateProject($id: ID!, $input: ProjectUpdateInput!) {
		projectUpdate(by: { id: $id }, input: $input) {
			project {
				id
				title
				description
				createdBy {
					email
					name
				}
			}
		}
	}
`;
export const updateUserMutation=`
mutation UserUpdate($id:ID!,$input:UserUpdateInput!) {
  userUpdate(by:{id:$id},input:$input){
    user{
      name
      email
      avatarUrl
      description
      githubUrl
      linkedinUrl
      
    }
  }
}`;
//change the structure so that it does not need all the fields
export const updatePetMutation = `
	mutation UpdatePet($id: ID!, $name: String!,
    $else: String!,
    $image: String!,
    $sex: String!,
    $friendly: String!,
    $feeding: String!,
    $energy: String!,
    $type: String!,
    $ageY: Int!,
    $ageM: Int!) {
		petUpdate(by: { id: $id }, input: {name: $name,
      else: $else,
      image: $image,
      sex: $sex,
      friendly: $friendly,
      feeding: $feeding,
      energy: $energy,
      type: $type, ageY: { set: $ageY },ageM:{set: $ageM}}) {
			pet {
				name
        id
        
  createdBy {
    email
    name
   
  }
			}
		}
	}
`;

//how to make custom types validatable
export const updateSitterMutation = `
	mutation UpdateSitter($id: ID!, $moneyH:Int!,$moneyD:Int!,$locationM:String!,$home:Boolean!,$walk:Boolean!,$drop:Boolean!,
  $mapRadius:Int!,$review:Int!,$rating:Int!,$mon:Boolean!,$tue:Boolean!,$wed:Boolean!,$thu:Boolean!,$fri:Boolean!,$sat:Boolean!,$sun:Boolean!,
  $small:Boolean!,$medium:Boolean!,$big:Boolean!,$cat:Boolean!) {
		sitterUpdate(by: { id: $id }, input: {service: {
      home: $home,
      walk: $walk,
      drop: $drop,
    },
      moneyH: {set:$moneyH},
      moneyD: {set:$moneyD},
      daysA: {mon:$mon,tue:$tue,wed:$wed,thu:$thu,fri:$fri,sat:$sat,sun:$sun},
      locationM: $locationM,
      mapRadius: {set:$mapRadius},
      review:{set:$review},
      rating:{set:$rating},
      sizePets: {small:$small,medium:$medium,big:$big,cat:$cat,},
      }) {
			sitter {
        id
        
  createdBy {
    email
    name
   id
  }
			}
		}
	}
`;

export const deleteProjectMutation = `
  mutation DeleteProject($id: ID!) {
    projectDelete(by: { id: $id }) {
      deletedId
    }
  }
`;

export const deletePetMutation = `
  mutation PetDelete($id: ID!) {
    petDelete(by: { id: $id }) {
      deletedId
    }
  }
`;
export const deleteUserMutation = `
  mutation UserDelete($id: ID!) {
    userDelete(by: { id: $id }) {
      deletedId
    }
  }
`;
export const deleteSitterMutation = `
  mutation SitterDelete($id: ID!) {
    sitterDelete(by: { id: $id }) {
      deletedId
    }
  }
`;
export const createUserMutation = `
	mutation CreateUser($input: UserCreateInput!) {
		userCreate(input: $input) {
			user {
				name
				email
				avatarUrl
				description
				githubUrl
				linkedinUrl
				id
			}
		}
	}
`;

export const projectsQuery = `
  query getProjects($category: String, $endcursor: String) {
    projectSearch(first: 8, after: $endcursor, filter: {category: {eq: $category}}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          githubUrl
          description
          liveSiteUrl
          id
          image
          category
          createdBy {
            id
            email
            name
            avatarUrl
          }
        }
      }
    }
  }
`;
export const petsQuery = `
  query getPets($type: String, $endcursor: String) {
    petSearch(first: 8, after: $endcursor, filter: {type: {eq: $type}}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          name,
          type,
          sex,
          ageY,
          ageM,
          friendly,
          feeding,
          energy,
          else,
          image,
          id,
          createdBy {
            id
            email
            name
            avatarUrl
          }
        }
      }
    }
  }
`;
export const sitterQuery = `
  query getSitter($locationM: String, $endcursor: String) {
    sitterSearch(first: 8, after: $endcursor, filter: {locationM: {eq: $locationM}}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          service{
            home,
            walk,
            drop
          },
          moneyH,
          moneyD,
          rating,
          review,
          daysA{
            mon,tue,wed,
            thu,fri,sat,sun
          },
          locationM,
          mapRadius,
          sizePets {
            small
            medium
            big
            cat
          },
          id
          createdBy {
            email,
            name,
            id,        
            avatarUrl,
            description
          }
        }
      }
    }
  }
`;
export const getProjectByIdQuery = `
  query GetProjectById($id: ID!) {
    project(by: { id: $id }) {
      id
      title
      description
      image
      liveSiteUrl
      githubUrl
      category
      createdBy {
        id
        name
        email
        avatarUrl
      }
    }
  }
`;
export const getPetByIdQuery = `
  query GetPetById($id: ID!) {
    pet(by: { id: $id }) {
      name,
          type,
          sex,
          ageY,
          ageM,
          friendly,
          feeding,
          energy,
          else,
          image,
          id,
          createdBy {
            id
            email
            name
            avatarUrl
          }
    }
  }
`;
export const getSitterByIdQuery = `
  query GetSitterById($id: ID!) {
    sitter(by: { id: $id }) {
      service{
        home,
        walk,
        drop
      },
      moneyH,
      moneyD,
      daysA{
        mon,tue,wed,
        thu,fri,sat,sun
      },
      locationM,
      mapRadius,
      review,
      rating,
      sizePets {
        small
        medium
        big
        cat
      },
      id
      createdBy {
        email,
        name,
        id,        
        avatarUrl,
        description
      }
    }
  }
`;

export const getUserQuery = `
  query GetUser($email: String!) {
    user(by: { email: $email }) {
      id
      name
      email
      avatarUrl
      description
      githubUrl
      linkedinUrl
    }
  }
`;
      
export const getProjectsOfUserQuery = `
  query getUserProjects($id: ID!, $last: Int = 4) {
    user(by: { id: $id }) {
      id
      name
      email
      description
      avatarUrl
      githubUrl
      linkedinUrl
      projects(last: $last) {
        edges {
          node {
            id
            title
            image
          }
        }
      }
    }
  }
`;
export const getPetsOfUserQuery = `
  query getUserPets($id: ID!, $last: Int = 4) {
    user(by: { id: $id }) {
      id
      name
      email
      description
      avatarUrl
      githubUrl
      linkedinUrl
      pets(last: $last) {
        edges {
          node {
            name,
            type,
            sex,
            ageY,
            ageM,
            friendly,
            feeding,
            energy,
            else,
            image,
            id,
          }
        }
      }
    }
  }
`;
export const getSitterOfUserQuery = `
  query getUserSitter($id: ID!, $last: Int = 4) {
    user(by: { id: $id }) {
      id
      name
      email
      description
      avatarUrl
      githubUrl
      linkedinUrl
      sitter(last: $last) {
        edges {
          node {
            service{
              home,
              walk,
              drop
            },
            moneyH,
            moneyD,
            daysA{
              mon,tue,wed,
              thu,fri,sat,sun
            },
            locationM,
            mapRadius,
            review,
            rating,
            sizePets {
              small
              medium
              big
              cat
            }
            id
            createdBy {
              email,
              name,
              id,        
              avatarUrl,
              description
            }
          }
        }
      }
    }
  }
`;
