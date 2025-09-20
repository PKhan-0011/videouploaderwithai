// 'use client'
// import React from 'react'
// import {useState} from 'react';
// import {useRouter} from 'next/navigation';

// const RegisterPage = () => {
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//    const router = useRouter();

//    // iske badd ek chiz ati hai like  handleSubmit ki ye ye submit foam handle karega okkh!...

//    const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//                // foam wala data kabhi bhi handle karnege to hame e.prevent default ka use hamse karna hai okkh!...
//                e.preventDefault();
               
//                if(password != confirmPassword){
//                    console.log("Password m kuch error hai isko dekhi sahi s okkh!..");
//                    throw new Error('password are not same as confirm password!')
//                }

//                try{
//                       // yha s ham data send karenge ge backend p okk!...
//                       const res = await axios.post('api/auth/register', {
//                           email,
//                           password,
//                           confirmPassword
//                       });

//                       // hame ye jo hai string m hi bhejne hote hai ye dhyan rakhna hota hai..
//                       // but your kind information hamm in case axios ka use karte hai to strings and json ka 
//                       // use nahi karte okkh!.. wo apne app hi handle kar leta hai.. okkh!...

//                       console.log(res);

//                       if(res.status == 200 && res.status <= 300){
//                           // tab to thik hai smjh lo like ki data jo hai uska status 200 and between 300 hai to 
//                           // server sahi chalega okkh!..
//                           console.log('server in the range of 200-300 abb sahi chalega..');
//                           router.push('/Login');
//                       }
//                       else{
//                           // yha agar ayega to smjh lena thik nahi hai like kuch gdbd kar di hamne okkh!...
//                           throw new Error("hamara status more than 200-300 k bich aa rha hai okkh!")
//                       }
//                }

//                catch(e){
//                         const err = e as Error;
//                         console.log(err);
//                         throw new Error(
//                           " Error in the catch part okkh!..."
//                         )

//                }
//    }

//   return (
//     <div>
//          <form onSubmit={handelSubmit}>
            
//             <input type="text" 
//               placeholder='email'
//               value = {email}
//               onChange={(e) => setEmail(e.target.value)}
//             />


//              <input type="text" 
//               placeholder='password'
//               value = {password}
//               onChange={(e) => setPassword(e.target.value)}
//             />


//              <input type="text" 
//               placeholder='confirmPassword'
//               value = {confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />

//             <button type='submit'>Submit</button>
//          </form>

//          <p>if You have already account pls <a href='/Login'>Login</a></p>
//     </div>
//   )
// }

// export default RegisterPage;



// ye tera sign-Up hai okkh..


// dekh yha p jo logic maine lagaya hai like ki ek paraGraph m login ka to 
// generally uska matlb ye hai ki agar user k pass already login ka materials hai to wo 
// login page p ja sakta hai okh!.. directly

// but button p bhi hamne logic lagaya tha like ki in case jab bhi button p click karunga to router 
// use push kar dega okkkh!.. on /route p..

// https://github.com/PKhan-0011/videouploaderwithai.git

// Yha p ek bar react hook form ka bhi use karke dekh liyo okkh!..


// signUp ki bat ayegi abb yha p okkh!...

'use client';
import {useState} from 'react';
import React from 'react';
import {useRouter} from 'next/navigation';


const SignUp = () => {
   
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const router = useRouter();


     const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

       e.preventDefault();
       // iska matlb ye hai generally ki  wo backend apne app s call nahi hogi okkh!...

        try{
                // Yha pe ek check lgta hai like ki data sara aya hai ya nahi okkh!...
                if(!password && !email && !confirmPassword){
                    console.log('Plaese fill the data form are not fill');
                    throw new Error('Plaese fill the data form are not fill');
                }

                // ek aur bat ayegi yha p like ki password to aa gya email bhi aa gya and confirm bhi aa gya in case password and confirm Password 
                // thik nahi hai to fir yha p bhi error hai..;

                if(password !== confirmPassword){
                     throw new Error('Password and confirm Password are not same!..');
                }

                // Yha p password email and confirm password aa jayega okkh!... abb isko mai us backend p send kar dunga..

                const response = await axios.post('/api/auth/register', {
                     password, 
                     confirmPassword,
                     email
                });

                  console.log(response);

                  // yha s backend p data chla jayega password confirmPassword and email wala okkh!..

                  if(response.status === 200 || response.status <= 300){
                        console.log('Iska generally matlb ye hai ki data actaully ja chuka hai response sahi hai sara okkh!..');
                        router.push('/dashboard');
                  }
                  
                  else{
                       console.log('response ka data more than 300 hai that why data are not put onto the backend!..');
                  }

        }
        catch(e){
            const error = e as Error;
            console.log(error);
            throw new Error('error while handling the submit button!...')
        }   
  }


  return (
    <div>
      
        <form onSubmit={handelSubmit}>
             
             <input type="text" 
               value = {email}
               placeholder='Enter Your Email'
               onChange={(e) => setEmail(e.target.value)}
             />
              
               <input type="text" 
               value = {password}
               placeholder='Enter Your Password'
               onChange={(e) => setPassword(e.target.value)}
             />

               <input type="text" 
               value = {confirmPassword}
               placeholder='Enter Your confirmPassword'
               onChange={(e) => setConfirmPassword(e.target.value)}
             />
            <button onClick={() => handelSubmit}>Submit</button>
        </form>
          <p>If you have already account visit login <a href="/Login">LogIn</a></p>
    </div>
  )
}

export default SignUp