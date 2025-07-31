import React from 'react'
import {useState} from 'react'
import  {useRouter} from 'next/navigation'; 
import { NextResponse } from 'next/server';

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const router = useRouter(); // router s hi push karenge like router.push se hamm dusare route p chale jayenge okkh!..;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

                e.preventDefault();
                if(password !== confirmPassword){
                  alert("error in password");
                  return
                }

                try{
                   
                  

                }
                catch(e){
                    const err = e as Error;
                    console.log(err);
                    return NextResponse.json({
                      message: "Error are there while executing the code...",
                      success: false,
                    }, {status: 500});
                }
  }

  return (
    <div>
      Hey you r in the Register Page!..;
    </div>
  )
}

export default RegisterPage;


// ye tera sign-Up hai okkh..