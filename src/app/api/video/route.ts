import { dbConnect } from "@/dbConnect/connect";
import videoModel from '@/Model/Video';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/dbConnect/options";

export async function GET(){
     // iss method m actally hota ye hai like ki hamm sara data le lete hai from dataBase..;
     try{
          await dbConnect();
          const videos = await videoModel.find({}).sort({created: -1}).lean(); // iska generally matlb hota hai ki videos sari lelo without filter in desecding order okkh!>>>;
           
          // .lean() s hamm data ko  "Document ko plain JavaScript object me laa, Mongoose ke heavy features na lagan ye karta hai.. normal object m hi rakhta hai aur .save() and .populate() nahi kar sakte okkh!..;

          if(!videos || videos.length === 0){
              return NextResponse.json(
                [], {status: 500}
              )
          }
          return NextResponse.json(videos); // sari video backend p dikhegi 
     }
     catch(e){
        const err = e as Error;
        console.log(err);
        return NextResponse.json(
            {error: "Failed to fetch videos"},
            {status: 500}
        );
     }
}

// abb yha s POST request ayegi jha p actully mai sara data nahi bhejna chata kisi authtentication p lagana cahta hu okkh!..;

export async function POST(){
    try{
         // getServer sesion s session launga okkh!..;
         const session = await getServerSession(authOptions);

         if(!session){
            return NextResponse.json({
                error: 'Unauthorize',
                success: false,
            }, {status: 500})
         }

         await dbConnect();

         // agar session thik hua to mere pass alrday ek video ka dataBase hai wha s sara data le lenge okkh!..;
          
         
           
    }
    catch(e){
       const err = e as Error;
       console.log(err);
       return NextResponse.json({
           message: "yha p error aya hai from dbConnect..!;",
           success: false,
       }, {status: 500});
    }
}
