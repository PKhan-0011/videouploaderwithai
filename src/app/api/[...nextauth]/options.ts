// Yha p 4-5 chize hoti hai banane k liye like providers, callbacks, session, pages, secret,.

import { dbConnect } from "@/dbConnect/connect";
import userModel from "@/Model/user";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
    providers: [
           CredentialsProvider({

                  name: 'Credentials',
                  
                  credentials: {

                      email: {label: 'Email', type: 'email', placeholder: 'write your email here!...'},
                      password: {label: 'password', type: 'password', placeholder: 'write your password here!..'},

                  },

                  // crednetials ka use hamm isliye karte hai bcz isse hamm ye restrict kar dete hai like ki user jab bhi login karega to use 
                  // hamm email and password s hi kare okkh!... and yahi email and password hona chaiye okkh!..

                   async authorize(credentials) {

                        // isme generally hota ye hai like ki jab bhi user login karega to sara data like jo bhi credentials m the 
                        // wo isme aa jayega and check karega like ki daatBase m exist karta hai bhi ya nahi okkh!...
                         
                        if(!credentials?.email || !credentials.password){
                            // iska matlb hai like ki email and password fill hi nahi kiye hai okkh! in foam okkh!..
                            throw new Error('Pleaese fill the login credentails  first!..')
                        }

                        try{
                            
                          await dbConnect();

                          const user = await userModel.findOne({
                              email: credentials.email
                          });

                            if(!user){
                                // agar email hi nahi mila to like galt mila ya kuch bhi to error dega okkh!..
                                throw new Error('email dont exist, or wrong maybe..');
                            }
                             
                            // in case user are right.. like email mil gya hame okkh!..

                            const isValidPassword = await bcrypt.compare(credentials.password, user.password);

                            if(!isValidPassword){
                                // agar ye glt hua like dataBase m glt hua password then hame aage nahi jana okkh!..
                                throw new Error('password are wrong, and did not match from database');
                            }
                             
                            // agar password bhi mil gya then user to tha hi and password bhi mil gya abb hame return karna hai email okkh..

                            return {

                                  Id: user._id as string, 
                                  email: user.email

                            }

                            // yha s jo bhi return hoga wo hi mai lunga like useSession m and session m okkh!...get serversession m bhi whai ayega 
                            
                            // Yha p mai github bhi use karunga okkh!.. like and other 3rd party signIn logic use kar sakta hu 
                            // to jo bhi hoga yha s return wo sabhi session m hi jate hai okkh!...



                        }
                        catch(error){
                             const err = error as Error;
                             console.log(err);
                             throw new Error('error hai like dataBase m chize exist nahi karta');
                        }
                          
                   }

           }),
    ],

    callbacks: {
        
    }


}

// jab bhi mai login page draw karunga to according to credentails hi karunga bcz isme s hi data aage jayega okkh!??..
// and then wo data like credentails jo hai wo authorize m jayega fir checking hogi..