
import { authOptions } from "./options";
import  NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}

// dekh mughe actaully na [...next] isme hame do chize jarrori hi dalni hoti hai like option.ts and auth.ts okkh!..;

// Dekh hamne signUp ka backend part banaya hai jisse wo dataBase m chize store kar leta hai okkh!...
// But Login ka hamm sperate nahi bnate bcz nextauth s ban jata hai wo signIn wala okkh!...




