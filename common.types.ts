import { User, Session } from 'next-auth'

export type FormState = {
    title: string;
    description: string;
    image: string;
    liveSiteUrl: string;
    githubUrl: string;
    category: string;
};
export interface PetForm {
  name: string;
  type: string;
  sex: string;
  ageY: number; 
  ageM: number; 
  friendly: string; 
  feeding: string;
  energy:string;
  else:string;
  image: string;

}
export type PetFormState={
  name: string;
  type: string;
  sex: string;
  ageY: number; 
  ageM: number; 
  friendly: string; 
  feeding: string;
  energy:string;
  else:string;
  image: string;
  createdBy:string
}
export interface SitterServicesForm {
  service: ServiceTypes;
  moneyH:number;
  moneyD:number;
  daysA:ServiceDays;
  locationM:string;
  mapRadius:number;
  sizePets:ServicePetSize;
  rating:number;
  review:number
  createdBy: string

}
export type SitterServicesFormState={
  service: ServiceTypes;
  moneyH:number;
  moneyD:number;
  daysA:ServiceDays;
  locationM:string;
  mapRadius:number;
  sizePets:ServicePetSize;
  review:number;
  rating:number;
  createdBy: string

}

export type SitterServices={
  sitter:{
    service: ServiceTypes;
    moneyH:number;
    moneyD:number;
    daysA:ServiceDays;
    locationM:string;
    mapRadius:number;
    sizePets:ServicePetSize;
    review:number;
    rating:number
    id: string;
    createdBy: string
  }
   
  
  
}
export type ServiceTypes={
  home:boolean;
  walk:boolean;
  drop:boolean;

}
export type ServicePetSize={
  small:boolean;
  medium:boolean;
  big:boolean;
  cat:boolean
}
export type ServiceDays={
  mon:boolean;
  tue:boolean;
  wed:boolean;
  thu:boolean;
  fri:boolean;
  sat:boolean;
  sun:boolean;
  [key: string]: boolean; // Add an index signature

}
export interface ProjectInterface {
    title: string;
    description: string;
    image: string;
    liveSiteUrl: string;
    githubUrl: string;
    category: string;
    id: string;
    createdBy: {
      name: string;
      email: string;
      avatarUrl: string;
      id: string;
    };
}
export interface PetInterface {
  name: string;
  type: string;
  sex: string;
  ageY: number; 
  ageM: number; 
  friendly: string; 
  feeding: string;
  energy:string;
  else:string;
  image: string;
  id: string;
  createdBy: {
    name: string;
    email: string;
    avatarUrl: string;
    id: string;
  };
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    description: string | null;
    avatarUrl: string;
    githubUrl: string | null;
    linkedinUrl: string | null;
    projects: {
      edges: { node: ProjectInterface }[];
      pageInfo: {
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        startCursor: string;
        endCursor: string;
      };
    };
    pets: {
      edges: { node: PetInterface }[];
      pageInfo: {
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        startCursor: string;
        endCursor: string;
      };
    };
    sitter: {
      edges: { node: SitterServices }[];
      pageInfo: {
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        startCursor: string;
        endCursor: string;
      };
    };
}

export interface SessionInterface extends Session {
 mongoDB:{
  user: User & {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    passwordHash:string
  };
 }
  
}
export interface UserForm{
  name: string;
    email: string;
    avatarUrl: string;
    passwordHash:string
}
export interface ProjectForm {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
}

export interface UserForm{
  name:string;
  email: string;
  avatarUrl:string;
  description:string;
  passwordHash:string
}

export interface FilterSitters{
  service:{home:boolean,walk:boolean,drop:boolean, [key: string]: any;},
          money:{
            moneyA:number,
            moneyO:number,
          },
        
          dates:{
            dateA:Date,
            dateB:Date , 
            dayA:string,
            dayB:string,
          },
         
          sizePets:{small:boolean,medium:boolean,big:boolean,cat:boolean,[key: string]: any;}
}