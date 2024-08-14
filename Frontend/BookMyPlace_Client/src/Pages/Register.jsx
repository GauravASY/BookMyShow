import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import {toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { toastOptions } from '../Utilities/ToastOptions';

function Register() {
    const [credentials, setCredentials] = useState({username:"", email:"", password:"", confirmPassword:""});

    function handleChange(e){
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }

   async function handleSubmit(e){
        e.preventDefault();
       try {
        if(credentials.password !== credentials.confirmPassword){
          toast.error("Incorrect Passwords", toastOptions);
        }
        else{
            console.log("in the else ")
            const response = await fetch("http://localhost:3000/api/register",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    username : credentials.username,
                    email: credentials.email,
                    password: credentials.password
                })
            });
            const responseData = await response.json();
            if(!responseData.status){
              toast.error(responseData.msg, toastOptions);
            }
            else{
              toast.success("Registration Successful", toastOptions);
            }
        }
       } catch (error) {
        console.error(error);
       }
    }

  return (
    <div className=" w-screen flex flex-col grow justify-center items-center mb-24">
      <form className="  bg-gray-100 w-1/3 flex flex-col px-10 py-8 shadow-lg gap-4 shadow-gray-400 rounded-xl " onSubmit={handleSubmit}>
        <span className="px-3 py-1 text-center font-bold font-mono text-xl">Register</span>
        <input
          className="px-4 py-2  rounded-full flex justify-center items-center border border-red-200"
          type="text"
          placeholder="Username"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          className="px-4 py-2  rounded-full flex justify-center items-center border border-red-200"
          type="email"
          placeholder="your@email.com"
          name="email"
          value={credentials.email}
          onChange={handleChange}
        />
        <input
          className="px-4 py-2  rounded-full flex justify-center items-center border border-red-200"
          type="password"
          placeholder="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
         <input
          className="px-4 py-2  rounded-full flex justify-center items-center border border-red-200"
          type="password"
          placeholder="confirm password"
          name="confirmPassword"
          value={credentials.confirmPassword}
          onChange={handleChange}
        />
        <button
          className=" bg-red-400 text-white px-4 py-2  rounded-full flex justify-center items-center hover:bg-red-500 hover:shadow-lg hover:shadow-gray-400"
          type="submit"
        >
          Register
        </button>
        <p className="text-center p-2">
          Already a Member! <NavLink className="text-blue-500" to="/login">Login</NavLink>
        </p>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Register