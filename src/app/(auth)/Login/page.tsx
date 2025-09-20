'use client'
import React from 'react'
import { useState } from 'react';
import {useRouter} from 'next/navigation';

import {signIn} from 'next-auth/react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault(); // isse backend p data nahi jayega unneccessry okkh..!

          // hamm yah dataBase actaully use nahi kar sakte bcz ye forntd hai that's why hamm yha p crdentails ka 
          // use karnge data k liye okkh!,,,

          // yha p ek aur check lag sakta hai ki like agar user parendt hoga to hi hamm aage chalnege otherwise nahi okkh..!

           if(!password && !email){
               // agar email and password nahi aya hai to wo error ayega yha p okkh!..
               console.log("password and email are not there!..");
               throw new Error("Email and password m dikkat nahi aya abhi yha p");
           }

          try{
               
              const result =  await signIn("credentails", {
                 email, 
                 password,
                 redirect: false
               });

               if(result?.error){
                // agar result okkh nahi ata to mai yha p error de dunga okkh!....
                 console.log(result.error);
                 throw new Error("error while Login throw credentails okkh!");
               }

               else{
                // agar result mai koi bhi error nahi aya to mughe actaully sara data router s push kar dena hai okkh!...
                   router.push('/'); // home page p chla jayega okkh!...
               }
          }

          catch(e){
             const err = e as Error;
             throw new Error("Error while login okkh!..", err);
          }
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
           
           <input type="email" 
           placeholder='email'
           value = {email}
           onChange={(e) => setEmail(e.target.value)}
           />

            <input type="Password" 
           placeholder='Password'
           value = {password}
           onChange={(e) => setPassword(e.target.value)}
           />

           <button type='submit'>Submit</button>
        </form>
            
          <p> If you not login by your credentials pls signUp first  <a href="/register">SignUp</a></p>

        <div>
            <button onClick={() => signIn("github")}>Login with Github</button> 
        </div>
    </div>
  )
}

export default LoginPage


// dekh bhai tu ye soch rha tha yha p ki yha backend s ayega data ya jayega to answer hai jayega okkh!...
// aur uke badd hamm form wale component m hamm dataBase use nahi karenge bcz ye alrady use hua pda hai 
// in next-auth providers m hamne authorization wala conecpt lagega okkkh!...
