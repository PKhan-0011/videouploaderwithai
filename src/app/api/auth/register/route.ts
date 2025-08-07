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
         // to iska generally matlb ye hai ki email exist karta hai database m and passwod bhi check karlo
         // agar password bhi hua to error send kardo okkh!..;
         const hashedPassword = await bcrypt.compare(password, existingEmail.password); // yha p galati ho jati hai pehle plain password ayega okkh!.,

         // to isse check ho jayega ki password exist karta hai bhi ya nahi okkh!...;
         if(hashedPassword){
             // iska matlb ye hai ki password bhi match kar gya hai 
             return NextResponse.json({
               message: "password match ho gya hai and email bhi match ho gay hai!...",
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

        
      
     }
     catch(err){
          console.error("error in catch part", err);
           return NextResponse.json({
             message: "error in catch part",
             success: false,
           }, {status: 500});
     }
}




