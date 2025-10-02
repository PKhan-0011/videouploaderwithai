import {NextResponse, NextRequest} from 'next/server';
import { dbConnect } from '@/dbConnect/connect';
import userModel from '@/Model/user';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest){

     try{
          
     const {email, password}= await request.json(); // ye jo data hai wo sara frontend s ayega okkh!..;
     
     if(!email || !password){
         return NextResponse.json({
            message: "Ye aya hi nahi hai abhi absent hai okkh!.",
            success: false,
         }, {status: 500});
     }

     // yha p abb dataBase acttuly connect karna padega okkh!...;
     await dbConnect();

     // abb yha s data findout karlo like email verification and etc etc..;
      const existingEmail = await userModel.findOne({
            email
      });
        
      if(existingEmail){
          // iska matlb ye hia ki email exist karta hai okkh!..
          const passordChecking = await bcrypt.compare(password, existingEmail.password);

          if(passordChecking){
            // iska matlb ye hai ki password bhi hai and email bhi exist karta hai okkh!..
            return NextResponse.json({
              message: 'data already exist!..',
              success: false,
            }, {status: 500});
          }
      }

        // agar email hi exist nahi karta to mughe user aya hi first time hai okkh!...
        // isko dataBase m dalo okkh!..

      const result =  await userModel.create({
             email, 
             password
        });

        console.log(result);

        // ye note karne wali bat like ki hamne yha p koi hash ka logic nahi lagaya hai bcz
        // userModel p jo hamne logic likha hai wo userSchema.pre usme hi hash ho jayega ye...
       
        return NextResponse.json({
          message: result, 
          success: true,
        }, {status: 200}); // ye frontend p jayega okkh!...
        
     }
     catch(err){
          console.error("error in catch part", err);
           return NextResponse.json({
             message: "error in catch part",
             success: false,
           }, {status: 500});
     }
}


// Yha p bhi jo data ayega like email and pasword from frontend and login hoga uske according 
// to mai data frotend p iska bhi dikha sakta hu from useSession() okkh!..


