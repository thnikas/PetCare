import { GraphQLClient } from "graphql-request";

import {  createUserMutation, deleteProjectMutation, updateProjectMutation, getProjectByIdQuery,getPetByIdQuery, getProjectsOfUserQuery, getUserQuery, projectsQuery, createPet, petsQuery,updatePetMutation, deletePetMutation, createSitter, sitterQuery, getSitterByIdQuery, getPetsOfUserQuery, getSitterOfUserQuery, updateSitterMutation, updateUserMutation, deleteUserMutation } from "@/graphql";
import { PetForm, PetFormState,SitterServices, SitterServicesForm, UserForm } from "@/common.types";

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : 'http://127.0.0.1:4000/graphql';
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'letmein';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';

const client = new GraphQLClient(apiUrl);
//consist functions that are used to update,create,delete sitters,pets,users from grafbase

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (err) {
    throw err;
  }
};

export const uploadImage = async (imagePath: string) => {//used to upload image in the forms
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({
        path: imagePath,
      }),
    });
    return response.json();
  } catch (err) {
    throw err;
  }
};

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (err) {
    throw err;
  }
};

export const fetchAllProjects = (category?: string | null, endcursor?: string | null) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(projectsQuery, { category, endcursor });
};
export const fetchAllPets = (type?: string | null, endcursor?: string | null) => {
  client.setHeader("x-api-key", apiKey);

  return makeGraphQLRequest(petsQuery, { type, endcursor });
};
export const fetchAllSitters = (locationM?: string | null, endcursor?: string | null) => {
  client.setHeader("x-api-key", apiKey);

  return makeGraphQLRequest(sitterQuery, { locationM, endcursor });
};
export const fetchAllUsers=(id?:string | null, endcursor?: string | null)=>{
  client.setHeader("x-api-key", apiKey);

  return makeGraphQLRequest(sitterQuery, { id, endcursor });
}
export const createNewPet = async (form: PetForm, creatorId: string, token: string) => {
  const imageUrl = await uploadImage(form.image);

  if (imageUrl.url) {
    client.setHeader("Authorization", `Bearer ${token}`);

    const variables = {
      input: { 
        ...form, 
        image: imageUrl.url, 
         createdBy: { 
           link: creatorId 
         }
      }
    };

    return makeGraphQLRequest(createPet, variables);
  }
};
export const createNewSitter = async (form: SitterServicesForm, creatorId: string, token: string) => {
  // const imageUrl = await uploadImage(form.image);
  
    client.setHeader("Authorization", `Bearer ${token}`);

    const variables = {
      input: { 
        ...form, 
         
         createdBy: { 
           link: creatorId 
         }
      }
    };

    return makeGraphQLRequest(createSitter, variables);
  
};


export const updateUser = async (form: UserForm, userId: string, token: string) => {
  function isBase64DataURL(value: string) {
    const base64Regex = /^data:image\/[a-z]+;base64,/;
    return base64Regex.test(value);
  }

  let updatedForm = { ...form };

  const isUploadingNewImage = isBase64DataURL(form.avatarUrl);

  if (isUploadingNewImage) {
    const imageUrl = await uploadImage(form.avatarUrl);

    if (imageUrl.url) {
      updatedForm = { ...updatedForm, avatarUrl: imageUrl.url };
    }
  }

  client.setHeader("Authorization", `Bearer ${token}`);

  const variables = {
    id: userId,
    input: updatedForm,
  };

  return makeGraphQLRequest(updateUserMutation, variables);
};
export const updatePet = async (form: PetForm, petId: string, token: string) => {
  function isBase64DataURL(value: string) {
    const base64Regex = /^data:image\/[a-z]+;base64,/;
    return base64Regex.test(value);
  }

  let updatedForm = { ...form };
  
  const isUploadingNewImage = isBase64DataURL(form.image);

  if (isUploadingNewImage) {
    const imageUrl = await uploadImage(form.image);

    if (imageUrl.url) {
      updatedForm = { ...updatedForm, image: imageUrl.url };
    }
  }

  client.setHeader("Authorization", `Bearer ${token}`);

  const variables = {
    id: petId,
    ageM:updatedForm.ageM,
    ageY:updatedForm.ageY,
    name: updatedForm.name,
    type: updatedForm.type,
    sex: updatedForm.sex,
    friendly: updatedForm.friendly, 
    feeding: updatedForm.feeding,
    energy:updatedForm.energy,
    else:updatedForm.else,
    image:updatedForm.image
  };

  return makeGraphQLRequest(updatePetMutation, variables);
};
export const updateSitter = async (form: SitterServicesForm, sitterId: string, token: string) => {
  function isBase64DataURL(value: string) {
    const base64Regex = /^data:image\/[a-z]+;base64,/;
    return base64Regex.test(value);
  }

  let updatedForm = { ...form };
  


  client.setHeader("Authorization", `Bearer ${token}`);

  const variables = {
      id: sitterId,
      moneyH: updatedForm.moneyH,
      moneyD: updatedForm.moneyD,
      daysA: updatedForm.daysA,
      locationM: updatedForm.locationM,
      mapRadius: updatedForm.mapRadius,
      sizePets: updatedForm.sizePets,
      home:updatedForm.service.home,
      drop:updatedForm.service.drop,
      walk:updatedForm.service.walk,
      mon:updatedForm.daysA.mon,
      tue:updatedForm.daysA.tue,
      wed:updatedForm.daysA.wed,
      thu:updatedForm.daysA.thu,
      fri:updatedForm.daysA.fri,
      sat:updatedForm.daysA.sat,
      sun:updatedForm.daysA.sun,
      small:updatedForm.sizePets.small,
      medium:updatedForm.sizePets.medium,
      big:updatedForm.sizePets.big,
      cat:updatedForm.sizePets.cat,
      review:updatedForm.review,
      rating:updatedForm.rating
  };

  return makeGraphQLRequest(updateSitterMutation, variables);
};
export const deleteProject = (id: string, token: string) => {
  client.setHeader("Authorization", `Bearer ${token}`);
  return makeGraphQLRequest(deleteProjectMutation, { id });
};
export const deleteUser = (id: string, token: string) => {
  client.setHeader("Authorization", `Bearer ${token}`);
  return makeGraphQLRequest(deleteUserMutation, { id });
};
export const deletePet = (id: string, token: string) => {
  client.setHeader("Authorization", `Bearer ${token}`);
  return makeGraphQLRequest(deletePetMutation, { id });
};

export const getProjectDetails = (id: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getProjectByIdQuery, { id });
};

export const getPetDetails = (id: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getPetByIdQuery, { id });
};
export const getSitterDetails = (id: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getSitterByIdQuery, { id });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader("x-api-key", apiKey);

  const variables = {
    input: {
      name: name,
      email: email,
      avatarUrl: avatarUrl
    },
  };
  
  return makeGraphQLRequest(createUserMutation, variables);
};

export const getUserProjects = (id: string, last?: number) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getProjectsOfUserQuery, { id, last });
};
export const getUserPets = (id: string, last?: number) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getPetsOfUserQuery, { id, last });
};
export const getUserSitter = (id: string, last?: number) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getSitterOfUserQuery, { id, last });
};

export const getUser = (email: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
};