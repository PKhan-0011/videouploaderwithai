// import {SessionProvider} from 'next-auth/react';
// import { ImageKitProvider } from '@imagekit/next';

// const urlEndPoints = process.env.NEXT_PUBLIC_PUBLIC_KEY;

// export default function Providers(
//     {children}: {children: React.ReactNode}){
//     return (
          
//          <SessionProvider refetchInterval={5*60}>
//          <ImageKitProvider urlEndpoint={urlEndPoints}> {children} </ImageKitProvider>
//          </SessionProvider>

//     );
// }


import { SessionProvider } from 'next-auth/react';
import { ImageKitProvider } from '@imagekit/next';
import React from 'react'

const providers = ({children}: {children: React.ReactNode}) => {
  return (
    <SessionProvider>
        <ImageKitProvider>
             {children}
        </ImageKitProvider>
    </SessionProvider>
  )
}

export default providers;

// SessionProvider ke andar refetchInterval hota hai jisme hamm time dete hai aur wo bydefault in seconds m chal rha hota hai..;