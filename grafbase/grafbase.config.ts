import { g, config, auth } from '@grafbase/sdk';

//the fields that each model will have in the grafbase
// @ts-ignore
const User = g.model('User', {
  name: g.string().length({ min: 2, max: 100 }),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description: g.string().length({ min: 2, max: 1000 }).optional(),
  githubUrl: g.url().optional(),
  linkedinUrl: g.url().optional(), 
  projects: g.relation(() => Project).list().optional(),
  pets:g.relation(()=>Pet).list().optional(),
  sitter:g.relation(()=>Sitter).list().optional()
})
// @ts-ignore
const Project = g.model('Project', {
  title: g.string().length({ min: 3 }),
  description: g.string(), 
  image: g.url(),
  liveSiteUrl: g.url(), 
  githubUrl: g.url(), 
  category: g.string().search(),
  createdBy: g.relation(() => User),
}).auth((rules) => {
  rules.public().read()
  rules.private().create().delete().update()
}) 

const Pet = g.model('Pet', {
  name: g.string().length({ min: 3 }),
  type: g.string().search(), 
  sex: g.string(),
  ageY: g.int().optional(), 
  ageM: g.int().optional(), 
  friendly: g.string(), 
  feeding: g.string(),
  energy:g.string(),
  else:g.string(),
  image: g.string(),
  createdBy: g.relation(() => User),
}).auth((rules) => {
  rules.public().read()
  rules.private().create().delete().update()
})
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

const Sitter = g.model('Sitter', {
  service:g.ref(Service),
  moneyH:g.int(),
  moneyD:g.int(),
  daysA:g.ref(Days),
  locationM:g.string().search(),
  mapRadius:g.int(),
  sizePets: g.ref(SizePets),
  review:g.int(),
  rating:g.int(),
  createdBy: g.relation(() => User),

}).auth((rules) => {
  rules.public().read()
  rules.private().create().delete().update()
}) 
const jwt = auth.JWT({
  issuer: 'grafbase',
  secret:  g.env('NEXTAUTH_SECRET')
})

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.public()  },
})
