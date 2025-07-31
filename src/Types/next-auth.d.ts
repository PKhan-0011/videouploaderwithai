import NextAuth, {DefaultSession} from "next-auth";

declare module "next-auth" {
 
  interface Session {
    user: {
      address: string  // yha p tera like address jo hai tera wo id bhi bna k use kiya hua hai hitesh sie n okkh!..

    } & DefaultSession["users"],
  }
}

console.log(NextAuth);