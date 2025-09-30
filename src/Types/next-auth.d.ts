import  { DefaultSession } from "next-auth"

declare module "next-auth" {
  
  interface Session {
    user: {
      id: string,
    } & DefaultSession["user"]
  }
}


//Pehle NextAuth ka session bolta tha: “mere paas sirf name/email/image hai”.
//Tumne bola: “nahi bhai, mere session me id bhi hamesha hoga”.
//Ab TypeScript maan gaya aur tumhe error nahi deta.

// session.user ke andar kabhi bhi id nahi hota that's why hamm ye extra id put karte hai taki use kar sake okkh!.. ye value above wala dete hai..

// kabhi bhi in case mugghe next-auth banana padega to mai next-auth.d.ts ka use jarror karunga bcz ye mughe 
// type safety deta hai okkh!..


// declare module likhna isliye zaruri hai taki TypeScript
//  ko yeh pata chale ki hum apne session me default fields 
// ke alawa aur bhi custom data daal rahe hain.


// and ek aur matlb hota hai jaise in case mughe data kuch extra chaiye in session jiska dataType nahi pta to ye 
// hame bina error k use k use karne deta hai okkh!...


// &DefaultSession["user"] isko generally hamm user k object k baad lagate hai iska matlb ye hoga like ki
// user k andar jo pehle s elements the wo rahenge replace nahi honge and ye value extra add ho jayegi okkh!...


// Use & DefaultSession["user"]
// Agar tu & DefaultSession["user"] likhega, iska matlab hai:
// Pehle se jo default user fields the (name, email, image), wo bache rahenge.
// Tumhare naye fields (id, role, address, etc.) bhi add ho jayenge.