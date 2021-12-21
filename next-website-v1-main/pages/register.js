

import Image from 'next/image'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
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


export default function Register() {
  
  const { register,  formState: { errors }} = useForm();
  const router = useRouter();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");


  let handleSubmit = async (e) =>  {
    e.preventDefault();
    try {
      let res = await fetch('http://localhost:3030/user/register', {
        method: "POST",
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setMessage("User created successfully");
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
        <div className='name'>
        <input
          id="firstname"
        aria-invalid={errors.lirstname ? "true" : "false"}
        {...register('firstname', { required: true, maxLength: 20 })} 
        placeholder='FirstName*'
        onChange={(e) => setFirstName(e.target.value)}
      />
      {errors.firstname && errors.firstname.type === "required" && (
        <span role="alert">This is required</span>
      )}
      {errors.firstname && errors.firstname.type === "maxLength" && (
        <span role="alert">Max length exceeded</span>
      )}
        
          <input
          id="lastname"
        aria-invalid={errors.lirstname ? "true" : "false"}
        {...register('lastname', { required: true, maxLength: 20 })} 
        placeholder='LastName*'
        onChange={(e) => setLastName(e.target.value)}
      />
      {errors.lastname && errors.lastname.type === "required" && (
        <span role="alert">This is required</span>
      )}
      {errors.lastname && errors.lastname.type === "maxLength" && (
        <span role="alert">Max length exceeded</span>
      )}
        </div>
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
                value: 8,
                message: "min length is 8"
              }
            })}
            type="password"  
            placeholder='Password*'
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span role="alert">{errors.password.message}</span>}
          </div>
          <div>
          <input
            id="rpassword"
            {...register("rpassword", {
              required: "required",
              minLength: {
                value: 8,
                message: "min length is 8"
              }
            })}
            type="password" placeholder='Reapter password*'
          />
          {errors.rpassword && <span role="alert">{errors.rpassword.message}</span>}
          </div>
          <div className='button'>
            <button type="submit">
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