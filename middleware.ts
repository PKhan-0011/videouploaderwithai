import { withAuth } from "next-auth/middleware";
import { NextResponse} from 'next/server';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware() {
     return NextResponse.next();
  },
  {
    callbacks: {

      authorized({ token, req }) {

           const {pathname} = req.nextUrl; 
           
           if(pathname.startsWith('/api/auth') || pathname === '/login' || pathname === '/register' || pathname === '/api/auth/videos')
            return true

           return !!token
      }
    },
  },
)

export const config = { matcher: ['/((?!api|_next|static|favicon.ico).*)'], };

// isme hai yrr kuch galatiya okkh dhyan s kario isko..;


