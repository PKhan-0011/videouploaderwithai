// hamne yha p app router slecet kiya hai uplaod file options mai okkh from imagekit docs .
// aur ye appRouter new Version hai aur pagesRouter old version taht's why we shift to old to new version okkh!??,.

import { getUploadAuthParams } from "@imagekit/next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/dbConnect/options";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        // Your application logic to authenticate the user
    // For example, you can check if the user is logged in or has the necessary permissions
    // If the user is not authenticated, you can return an error response
    
     const session = await getServerSession(authOptions);

     // yha pe ye dhya jarror rakhio ki session m lane k liye kuch callBacks m chize dalni padengi okkh!.. agar nahi hui to;
     // jaise hamm daln rahe the na like callbacks: { token and session etc etc okkh!.. } token and session k andar 
     // chize jarror dalni padnegi okkh na ??.  

     if(!session){
         return NextResponse.json({
            message: "Session k nadar kuch hai ki nahi khali hai hai sara ka sara !",
            success: false,
         }, {status: 500 });
     }
     
    
    const { token, expire, signature } = getUploadAuthParams({
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, // Never expose this on client side
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
        // expire: 30 * 60, // Optional, controls the expiry time of the token in seconds, maximum 1 hour in the future
        // token: "random-token", // Optional, a unique token for request
    })

    return Response.json({ 
        token, 
        expire, 
        signature, 
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY
    })
    }
    catch(e){
       const err = e as Error;
       console.log(err);
       return NextResponse.json({
           message: "err hai idhar",
           success: false,
       }, {status: 500});
    }
}



// note** yha p mera 1st doubt ki hamne dbConnect kyu nahi kiya okkh!?. bcz uska use hamm
// tab hi karte hai like jab mughe actaully dataBase s kuch chize leni hoti hai tab hi karte hai okkh!??>;
// and is case m to nahi kiya but mai karle dekhunga bcz ist check use karunag ki user Exist karta hai login hai ya nhai 
// jo ki dataBase s ayega okkh!??..;

// yha s hamara token,expire,signature,and public key gayi hai dhyan s okkh!..;