import { ServicePetSize } from "@/common.types";
//the mutations that are used in grafbase


export const createPet = `
	mutation CreatePet($input: PetCreateInput!) {
    mongoDB{
      petCreate(input: $input) {
        insertedId

     
      }
    }
		
	}
`;
export const createSitter = `
mutation CreateSitter($input: SitterCreateInput!) {
  mongoDB {
    sitterCreate(input: $input) {
      insertedId
    }
  }
}
`;

export const updateUserMutation = `
  mutation UserUpdate($id: ID!, $name: String!, $description: String!, $email: String!, $avatarUrl: String!) {
    mongoDB {
      userUpdate(by: { id: $id }, input: { name: { set: $name }, description: { set: $description }, email: { set: $email }, avatarUrl: { set: $avatarUrl } }) {
        modifiedCount
      }
    }
  }
`;
//change the structure so that it does not need all the fields
export const updatePetMutation = `
mutation UpdatePet(
  $id: ID!,
  $name: String!,
  $else: String!,
  $image: String!,
  $sex: String!,
  $friendly: String!,
  $feeding: String!,
  $energy: String!,
  $type: String!,
  $ageY: Int!,
  $ageM: Int!
) {
  mongoDB {
    petUpdate(
      by: { id: $id },
      input: {
        name: { set: $name },
        else: { set: $else },
        image: { set: $image },
        sex: { set: $sex },
        friendly: { set: $friendly },
        feeding: { set: $feeding },
        energy: { set: $energy },
        type: { set: $type },
        ageY: { set: $ageY },
        ageM: { set: $ageM }
      }
    ) {
      modifiedCount
    }
  }
}

`;

//how to make custom types validatable
export const updateSitterMutation = `
mutation UpdateSitter(
  $id: ID!,
  $moneyH: Int!,
  $moneyD: Int!,
  $locationM: String!,
  $home: Boolean!,
  $walk: Boolean!,
  $drop: Boolean!,
  $mapRadius: Int!,
  $review: Int!,
  $rating: Int!,
  $mon: Boolean!,
  $tue: Boolean!,
  $wed: Boolean!,
  $thu: Boolean!,
  $fri: Boolean!,
  $sat: Boolean!,
  $sun: Boolean!,
  $small: Boolean!,
  $medium: Boolean!,
  $big: Boolean!,
  $cat: Boolean!
) {
  mongoDB {
    sitterUpdate(
      by: { id: $id },
      input: {
        service: {
          home: { set: $home },
          walk: { set: $walk },
          drop: { set: $drop },
        },
        moneyH: { set: $moneyH },
        moneyD: { set: $moneyD },
        daysA: {
          mon: { set: $mon },
          tue: { set: $tue },
          wed: { set: $wed },
          thu: { set: $thu },
          fri: { set: $fri },
          sat: { set: $sat },
          sun: { set: $sun },
        },
        locationM: { set: $locationM },
        mapRadius: { set: $mapRadius },
        review: { set: $review },
        rating: { set: $rating },
        sizePets: {
          small: { set: $small },
          medium: { set: $medium },
          big: { set: $big },
          cat: { set: $cat },
        },
        
      }
    ) {
      modifiedCount
    }
  }
}
`;



export const deletePetMutation = `
  mutation PetDelete($id: ID!) {
    mongoDB{
      petDelete(by: { id: $id }) {
        deletedCount
      }
    }
    
  }
`;
export const deleteUserMutation = `
  mutation UserDelete($id: ID!) {
    mongDB{
      userDelete(by: { id: $id }) {
        deletedCount
      }
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
    mongoDB{
      userCreate(input: $input)  {
        insertedId
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
query getSitter($locationM: String) {
  mongoDB{
    sitterCollection( filter: {locationM: {eq: $locationM}}, first:10) {
      edges {
        node {
          service {
            home,
            walk,
            drop
          },
          moneyH,
          moneyD,
          rating,
          review,
          daysA {
            mon, tue, wed,
            thu, fri, sat, sun
          },
          locationM,
          mapRadius,
          sizePets {
            small
            medium
            big
            cat
          },
          id,
          createdBy
        }
      }
    }
  }
}
`;
export const sitterQueryN2 = `
  query getSitter($endcursor: String) {
    sitterSearch(first: 8, after: $endcursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          service {
            home
            walk
            drop
          }
          moneyH
          moneyD
          rating
          review
          daysA {
            mon
            tue
            wed
            thu
            fri
            sat
            sun
          }
          locationM
          mapRadius
          sizePets {
            small
            medium
            big
            cat
          }
          id
          createdBy {
            email
            name
            id
            avatarUrl
            description
          }
        }
      }
    }
  }
`;
export const sitterQueryN=`
query getSitter() {
  mongoDB{
    sitterCollection(first:20){
      edges{
        node{
          service {
            home
            walk
            drop
          }
          moneyH
          moneyD
          rating
          review
          daysA {
            mon
            tue
            wed
            thu
            fri
            sat
            sun
          }
          locationM
          mapRadius
          sizePets {
            small
            medium
            big
            cat
          }
          id
          createdBy
        }
      }
    }
  }
}
`

export const getPetByIdQuery = `
  query GetPetById($id: ID!) {
    mongoDB{
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
            createdBy 
      }
    }
   
  }
`;
export const getSitterByIdQuery = `
  query GetSitterById($id: ID!) {
    mongoDB {
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
        createdBy
      }
    }
    
  }
`;


export const getUserQuery = `
query GetUserByEmail($email: String!) {
  mongoDB {
    user(by: { email: $email }) {
      id
      name
      email
      avatarUrl
      description
      passwordHash
    }
  }
}

`;
   
export const getUserByIdQuery =`
query GetUserByEmail($id: ID!) {
  mongoDB {
    user(by: { id: $id }) {
      id
      name
      email
      avatarUrl
      description
      passwordHash
    }
  }
}`

export const getPetsOfUserQuery = `
query getUserPets($createdBy: MongoDBStringSearchFilterInput) {
  mongoDB {
    petCollection(filter: { createdBy: $createdBy }, first: 10) {
      edges {
        node {
          name
          type
          sex
          ageY
          ageM
          friendly
          feeding
          energy
          else
          image
          createdBy
          id
        }
      }
    }
  }
}
`;
export const getSitterOfUserQuery = `
  query GetSitter( $createdBy: String!) {
    mongoDB{
      sitter(by: { createdBy: $createdBy }) {
        id,
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
        createdBy,
        
      }
       
    }
   
  }
`;



