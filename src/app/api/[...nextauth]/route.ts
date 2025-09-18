
import {authOptions} from '@/dbConnect/options';
import NextAuth from 'next-auth';

export const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}


// dekh mughe actaully na [...next] isme hame do chize jarrori hi dalni hoti hai like option.ts and auth.ts okkh!..;


