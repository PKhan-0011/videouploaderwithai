// Yha p 4-5 chize hoti hai banane k liye like providers, callbacks, session, pages, secret,.

import { dbConnect } from "@/dbConnect/connect";
import userModel from "@/Model/user";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

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

                   async authorize(credentials : any): Promise<any> {

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
                             
                           console.log(user);

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
                                  email: user.email as string,
                                  password: user.password as string
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

           GitHubProvider({
             clientId: process.env.GITHUB_ID!,
             clientSecret: process.env.GITHUB_SECRET!
          }),
           
          GoogleProvider({
           clientId: process.env.GOOGLE_CLIENT_ID!,
           clientSecret: process.env.GOOGLE_CLIENT_SECRET!
         })

    ],
         
    // bass ye dhyan rakhio like ki callbacks ka hamm isliye use karte hai like session hame bydefault 
    // 2-3 chize hi return karta hai okkh!..images email and name but id nahi karta taht's why hamm callback ka use karte hai 
    // and  isme s jo return hua authrize s wo use ma jata hai and jwt m s hamm token m send karwa dere hai 
    // uske badd session.user k andar sara data bhej dete hai token s okkh!.. and then hamm session use kar pate hai okkh??..

    callbacks: {
          // isko hamm isliye lete hai bcz jab bhi hamm call karenge like authrize wala to wha s jo bhi data hota ahi 
          // wo session m jata hai and in case maine ye use nahi kiya hai callback ka to default name email and images return hoga 
          // id return nahi hota okkh!..

          // agr id return karwana hai to callbacks ka likhte hai and token m jata hai pehle uske badd session m jayega okkh..

           async jwt({ token, user}) {
                 
                  // ye jo user hoga wo like jo bhi maine wha s return kiya tha authorize s wo hoga okkh!...
                   // like id and email okkh!..

                   if(user){
                      // user barbar nahi ata ek bar hi ayega that's why mai isme koi checking nahi lagunga okkh!///
                      token.id = user.id
                   }

                return token
            },
            
            // session m data bhejne s pehle mughe token m send karna padta hai okkh!...
            
            async session({ session, token }){
                 // token s jab bhi data lenge hamm to wo sara session.user m jayega okkh!..
                  if(session.user){
                      session.user.id = token.id as string;
                      session.user.email = token.email as string;
                  }
                  console.log(session);
                 return session;
            },

            // ek yha p hamare pass callback ka url bhi ata hai 
            // jisse hamm decide karte hai ki wo user kha jayega aftre login??..

    },


    pages: {

        // isme 5 chize ati hai bydefault.. signIn, signOut, error, newUser, verifyRequtes..
        // to agar hamm ye pages ka section nahi likhte to smjh le ye apne app hi custimze kar leta okkh..
        // apne app hi khud k pages bna leta but in case jo hamm yha p likhnge wo hame banane padega pages okkh!..
        // aur generally wo frontend ka route hi likhte hai hamm jo frontend ke pages hote hai wahi..
        
         signIn: '/auth/sign-in',
         error: '/auth/sign-in',

          // abb ye do pages jo hai signIn and error ek page p hi ban jayenge kuch bhi galati hui to login wale page p hi wo error bhi show ho jayega okkh!..

          // and jo hamne nahi banaya hai usko hamm like signOut, and newUser, verifyRequest..

          
    },
    

    session:{
        strategy: 'jwt',
        maxAge: 30*24*60*60,
    },
    
    secret: process.env.NEXT_AUTH_SECRET!,

}

// jab bhi mai login page draw karunga to according to credentails hi karunga bcz isme s hi data aage jayega okkh!??..
// and then wo data like credentails jo hai wo authorize m jayega fir checking hogi..


// *** Need to remeber always *:- authorize → jwt → session..;

// Yha p mughe like 2 data smj nahi aya but koi bat nahi rest chize aa gayi hai okkh! inko rat le bass ki ek session hota hai and secret hota hai..;
