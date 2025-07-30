import {NextResponse, NextRequest} from 'next/server';
import { dbConnect } from '@/dbConnect/connect';
import userModel from '@/Model/user';

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
         return NextResponse.json({
            message: "yha p acttauly email already exist krta hai in dataBase",
            success: false,
         }, {status: 500})
      }
       
      // else m generally data store ho jata hai in dataBase again okkh!..;
      
      // yha ane ka matlb ye hai ki yha p actaully email exist hi nahi karta tha okkh!..;


     const data =  await userModel.create({
        email, 
        password,
      });

      return NextResponse.json({
         message: "data store ho gya hai in dataBase",
         data: {email: data.email, password: data.password},
         success: true,
      }, {status: 500});

     }
     catch(err){
          console.error("error in catch part", err);
           return NextResponse.json({
             message: "error in catch part",
             success: false,
           }, {status: 500});
     }
}




