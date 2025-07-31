// ye jo hai na actauly option.ts isme generally hamm 
// nextauth ka code likhte hai like ki kaise login karega user okkh!..;

import { dbConnect } from '@/dbConnect/connect';
import bcrypt from 'bcrypt'
import userModel from '@/Model/user';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
          CredentialsProvider({
            name: "Credentials",
            
            credentials:{
                 email: {label: "email", type: "text", placeholder: "Enter your email"},
                 password: { label: "Password", type: "password" }
            },

            async authorize(credentials){
                // yha p mughe actaully logic likhna hoga authorize ka okkh!..;
                if(!credentials?.email || !credentials.password){
                    // iska generally matlb ye hota hai ki credentials ke andar email hai ya nahi aur password hai ya nahi okkh!..;
                    throw new Error("email and password are not in credentails!");
                }

                // yha s abb dataBase s bat karni hoti hai okkh!.;
                try{
                     await dbConnect();

                   const user =  await userModel.findOne({
                        email: credentials.email,
                     });
                     
                     if(!user){
                        // iska generally matlb ye hai ki agar user aya hi nahi to kya karna hai okkh!.;
                        throw new Error("No user found with this");
                     }

                     // agar user true hai to kya karna hai..;
                     // password ko bcrypt karo and password ko compare karo...;
                     const isValid = await bcrypt.compare(credentials.password, user.password);

                     if(!isValid){
                        throw new Error("Invalid password");
                     }

                     return {
                        id: user._id as string,
                        email: user.email
                     }
                }
                catch(e){
                    const err = e as Error;
                    throw new Error("Error hai yha p ", err);
                }
            }
          })
    ],

    callbacks:{
        async jwt({user, token}){
             if(user){
                token.id = user.id as string
             }

             return token;
        },

        async session({session, token}){
            if(session.user){
                session.user.id = token.id as string
            }
            return session;
        }
    },
    
    pages: {
        signIn: '/login',
        error: "/login",
    },

    session: {
      strategy: "jwt",
      maxAge: 30*24*60*60
    },
    
    secret: process.env.NEXTAUTH_SECRET,
};

// isse hame like is credentials s hame session and jwt mil jata hai..; apne app okkh!..;
// callback k generally hamm karte ye hai ki jab bhi user login karne ko kosishis karega 
// to wo callbacks s chize excess kar sakta hai okkh!...



// authoptions ka jo call back hoga usme hamm generally providers dalegne 
// callbacks dalenge secret, pages, and ek optional session okkh..;   


