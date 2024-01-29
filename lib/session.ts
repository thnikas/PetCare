import { getServerSession } from "next-auth/next";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from 'jsonwebtoken'
import { JWT } from "next-auth/jwt";
import {compare,hash} from 'bcrypt'

import { createUser,  } from "./actions";
import { SessionInterface, UserProfile } from "@/common.types";
import { GraphQLClient } from "graphql-request";
import Credentials from "next-auth/providers/credentials";
const grafbase = new GraphQLClient(process.env.GRAFBASE_API_URL as string, {
  headers: {
    'x-api-key': process.env.GRAFBASE_API_KEY as string,
  },
})
// export const authOptions: NextAuthOptions = {//get the logged in user
//   providers: [
//     Credentials({
//       name: 'Credentials',
//       credentials: {
//         username: {
//           label: 'Username',
//           type: 'text',
//           placeholder: 'grafbase',
//         },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         const { username, password } = credentials as {
//           username: string
//           password: string
//         }

//         const { user } = await grafbase.request(GetUserByUsername, {
//           username,
//         })
//         if (!user) {
//           const { userCreate } = await grafbase.request(CreateUserByUsername, {
//             username,
//             passwordHash: await hash(password, 12),
//           })

//           return {
//             id: userCreate.id,
//             username,
//           }
//         }
//         const isValid = await compare(password, user.passwordHash)
//         if (!isValid) {
//           throw new Error('Wrong credentials. Try again.')
//         }

//         return user
//       },
//     }),
//   ],
//   // providers: [
//   //   GoogleProvider({
//   //     clientId: process.env.GOOGLE_CLIENT_ID!,
//   //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//   //   }),
//   // ],
//   // jwt: {
//   //   encode: ({ secret, token }) => {
//   //     const encodedToken = jsonwebtoken.sign(
//   //       {
//   //         ...token,
//   //         iss: "grafbase",
//   //         exp: Math.floor(Date.now() / 1000) + 60 * 60,
//   //       },
//   //       secret
//   //     );
      
//   //     return encodedToken;
//   //   },
//   //   decode: async ({ secret, token }) => {
//   //     const decodedToken = jsonwebtoken.verify(token!, secret);
//   //     return decodedToken as JWT;
//   //   },
//   // },
//   // theme: {
//   //   colorScheme: "light",
//   //   logo: "/logo.svg",
//   // },
//   // callbacks: {
//   //   async session({ session }) {
//   //     const email = session?.user?.email as string;

//   //     try { 
//   //       const data = await getUser('8nikas@gmail.com') as { user?: UserProfile }

//   //       const newSession = {
//   //         ...session,
//   //         user: {
//   //           ...session.user,
//   //           ...data?.user,
//   //         },
//   //       };

//   //       return newSession;
//   //     } catch (error: any) {
//   //       console.error("Error retrieving user data: ", error.message);
//   //       return session;
//   //     }
//   //   },
//   //   async signIn({ user }: {
//   //     user: AdapterUser | User
//   //   }) {
//   //     try {
//   //       const userExists = await getUser(user?.email as string) as { user?: UserProfile }
        
//   //       if (!userExists.user) {
//   //         await createUser(user.name as string, user.email as string, user.image as string)
//   //       }

//   //       return true;
//   //     } catch (error: any) {
//   //       console.log("Error checking if user exists: ", error.message);
//   //       return false;
//   //     }
//   //   },
//   // },
// };

export async function getCurrentUser() {
  // const session = await getServerSession(authOptions) as SessionInterface;

  // return session;
}