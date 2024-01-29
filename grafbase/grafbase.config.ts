import { graph, config, auth,connector } from '@grafbase/sdk';
const g = graph.Standalone()

//the fields that each model will have in the grafbase
// @ts-ignore
const mongodb = connector.MongoDB('MongoDB', {
  url: g.env("MONGO_ATLAS_URL"),
  apiKey: g.env("MONGO_API_KEY"),
  dataSource: g.env("MONGO_DATASOURCE"),
  database: g.env("MONGO_DATABASE")
})
g.datasource(mongodb)
// @ts-ignore
const Service=g.type('Service',{
  home:g.boolean(),
    walk:g.boolean(),
    drop:g.boolean()
 })


const Days=g.type('Days',{
  mon:g.boolean(),tue:g.boolean(),wed:g.boolean(),
  thu:g.boolean(),fri:g.boolean(),sat:g.boolean(),sun:g.boolean()
 })
  const DaysIn=g.input('DaysIn',{
  mon:g.boolean(),tue:g.boolean(),wed:g.boolean(),
  thu:g.boolean(),fri:g.boolean(),sat:g.boolean(),sun:g.boolean()
 })
const SizePets=g.type('SizePets',{
    small:g.boolean(),
    medium:g.boolean(),
    big:g.boolean(),
    cat:g.boolean(),
 })
const sitterType =g.type('sitterType', {
  service:g.ref(Service),
  moneyH:g.int(),
  moneyD:g.int(),
  daysA:g.ref(Days),
// @ts-ignore

  locationM:g.string().search(),
  mapRadius:g.int(),
  sizePets: g.ref(SizePets),
  review:g.int(),
  rating:g.int(),
})



const User = mongodb.model('User', {
  name: g.string().length({ min: 2, max: 100 }),
  email: g.string().unique(),
  passwordHash:g.string(),
  avatarUrl: g.string(),
  description: g.string().length({ min: 2, max: 1000 }).optional(),
  githubUrl: g.url().optional(),
  linkedinUrl: g.url().optional(), 
// @ts-ignore

//   projects: g.relation(() => Project).list().optional(),
// // @ts-ignore

//   pets:g.relation(()=>Pet).list().optional(),

  // sitter:g.relation(()=>Sitter).list().optional()
}).collection('Users')

// const Project = mongodb.model('Project', {
//   title: g.string().length({ min: 3 }),
//   description: g.string(), 
//   image: g.url(),
//   liveSiteUrl: g.url(), 
//   githubUrl: g.url(), 
// // @ts-ignore

//   category: g.string().search(),
// // @ts-ignore

//   createdBy: g.relation(() => User),
// }).auth((rules) => {
//   rules.public().read()
//   rules.private().create().delete().update()
// })

const Pet = mongodb.model('Pet', {
  name: g.string().length({ min: 3 }),
// @ts-ignore

  type: g.string().search(), 
  sex: g.string(),
  ageY: g.int().optional(), 
  ageM: g.int().optional(), 
  friendly: g.string(), 
  feeding: g.string(),
  energy:g.string(),
  else:g.string(),
  image: g.string(),
// @ts-ignore

  createdBy: g.string().search()
}).collection('Pets')
// .auth((rules) => {
//   rules.public().read()
//   rules.private().create().delete().update()
// })
 
// @ts-ignore

const Sitter = mongodb.model('Sitter', {
  // sitterId:g.string().unique(),
  service:g.ref(Service),
  moneyH:g.int(),
  moneyD:g.int(),
  daysA:g.ref(Days),
// @ts-ignore

  locationM:g.string().search(),
  mapRadius:g.int(),
  sizePets: g.ref(SizePets),
  review:g.int(),
  rating:g.int(),

  createdBy: g.string().unique(),

}).collection('Sitters')

// const jwt = auth.JWT({ //used to authentikate with login
//   issuer: 'grafbase',
//   secret:  g.env('NEXTAUTH_SECRET')
// })

export default config({
  graph: g,

  
  // auth: {//used to authentikate with login to allow create
  //   providers: [jwt],
  //   rules: (rules) => rules.public()  },
})



