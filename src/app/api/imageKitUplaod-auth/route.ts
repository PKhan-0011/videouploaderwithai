// hamne yha p app router slecet kiya hai uplaod file options mai okkh from imagekit docs .
// aur ye appRouter new Version hai aur pagesRouter old version taht's why we shift to old to new version okkh!??,.


import { getUploadAuthParams } from "@imagekit/next/server";
import { getServerSession } from "next-auth";
import { authOptions } from '../[...nextauth]/options';
import { NextResponse } from "next/server";

export async function GET() {
      
    try{
         
        const session = await getServerSession(authOptions); // for checking like login hai ya nahi okkh!...
         
        console.log(session);

        // Yha p data jo ayega session ka wo like jo credentails s ayega wahi hai okkh!..

        if(!session){
            // iska matlb ye hai ki data aya hi nahi hai okkh!..
            console.log('Login nahi hai');

            return NextResponse.json({
                 message: 'Login nahi hai okkh!...',
                 success: false,
            }, {status: 500});
        }
           

         const { token, expire, signature } = getUploadAuthParams({

               privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, // Never expose this on client side
               publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
               
         });

          return Response.json({ token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY })

    }

    catch(e){
        const error = e as Error;
        console.log(error);
        return NextResponse.json({
            message: 'error hai yha p kuch okkh!..',
            success: false,
        }, {status: 500})
    }
}



// note** yha p mera 1st doubt ki hamne dbConnect kyu nahi kiya okkh!?. bcz uska use hamm
// tab hi karte hai like jab mughe actaully dataBase s kuch chize leni hoti hai tab hi karte hai okkh!??>;
// and is case m to nahi kiya but mai karke dekhunga bcz ist check use karunag ki user Exist karta hai login hai ya nhai 
// jo ki dataBase s ayega okkh!??..;

// yha s hamara token,expire,signature,and public key gayi hai dhyan s okkh!..;
// mughe yha p token expiry and signature milta hai and isko hamm frontend s excess kar sakte hai...
