import NextAuth, {DefaultSession} from "next-auth";

declare module "next-auth" {
 
  interface Session {
    user: {
      address: string  // yha p tera like address jo hai tera wo id bhi bna k use kiya hua hai hitesh sie n okkh!..

    } & DefaultSession["users"],
  }
}

console.log(NextAuth);


// kabhi bhi in case mugghe next-auth banana padega to mai next-auth.d.ts ka use jarror karunga bcz ye mughe 
// type safety deta hai okkh!..



// declare module likhna isliye zaruri hai taki TypeScript
//  ko yeh pata chale ki hum apne session me default fields 
// ke alawa aur bhi custom data daal rahe hain.


// and ek aur matlb hota hai jaise in case mughe data kuch extra chaiye in session jiska dataType nahi pta to ye 
// hame bina error k use k use karne deta hai okkh!...
