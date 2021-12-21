
import Image from 'next/image'
import { useForm } from 'react-hook-form';
import { Router, useRouter } from 'next/router';
import Head from 'next/head';
import styled from 'styled-components';
import { useState } from "react";

const Hero = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F2F2F2;
`;


export default function Signin() {
  
  const { register,  formState: { errors }} = useForm();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");


 let handleSubmit = async (e) =>  {
    e.preventDefault();
    try {
      let res = await fetch('http://localhost:3030/user/singin', {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setMessage("Signin successful");
        setEmail("");
        setPassword("");
        Router.puch('/');

      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  
  

  return (
    <>
    <Head>
      <title>Home</title>
      <link rel='icon' href='/logo.png' />
    </Head>
    <Hero>
    <div className='page'>
    <div className='bar'>
    <div >
    <div className='ImageRegister' >
    <Image  src="/add.png" width={27} height={27} />    </div>
    <div className='Register'>Register</div>
    <div className='textRegister'>Browse and find what you need</div>


    </div >
    <span class="vertical-line"></span>
    <div >
    <div className='ImageSignin'>

    <Image src="/login.png" width={18} height={30}/>    </div>
    <div className='Signin'>Sign_in</div>
    <div className='textSignin'>Already have an account, then welcom back. </div>
     </div >

    </div >
   
   
      <div >
        <form onSubmit={handleSubmit}>
       
        <div>
          <input
            id="email"
            aria-invalid={errors.Email ? "true" : "false"}
            {...register("email", {
              required: "required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format"
              }
            })} placeholder='Email*'
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span role="alert">{errors.email.message}</span>}
        </div>
        <div>
          <input
            id="password"
            {...register("password", {
              required: "required",
              minLength: {
                value: 5,
                message: "min length is 5"
              }
            })}
            type="password"  
            placeholder='Password*'
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span role="alert">{errors.password.message}</span>}
          </div>
         
          <div className='button'>
            <button type="submit"
              >
              Submit
            </button>
          </div>
          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
      </div>
      </div>
    </Hero>
  </>
  );
}