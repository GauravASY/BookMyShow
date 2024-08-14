import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../Utilities/ToastOptions";
import { userContext } from "../App";

function Login() {
    const[loginCredentials, setLoginCredentials] = useState({email : "", password: ""});
    const navigate = useNavigate();
    const userInfo = useContext(userContext);

async function handleSubmit(e){
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/login", {
        method:"POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            email : loginCredentials.email,
            password : loginCredentials.password
        })
    });

    const responseData = await response.json();
    if(!responseData.status){
      toast.error(responseData.msg, toastOptions);
    }
    else{
      toast.success("login successful", toastOptions);
      localStorage.setItem("Current_User", JSON.stringify(responseData.user));
      userInfo.setUserData(responseData.user);
      setTimeout(()=>{
        navigate("/");
      }, 2000);
    }
}

function handleChange(e){
    setLoginCredentials({...loginCredentials, [e.target.name] : e.target.value});
}

  return (
    <div className=" w-screen flex flex-col grow justify-center items-center mb-24">
      <form className="  bg-gray-100 w-1/3 flex flex-col px-10 py-8 shadow-lg gap-4 shadow-gray-400 rounded-xl " onSubmit={handleSubmit}>
        <span className="px-3 py-1 text-center font-bold font-mono text-xl">Login</span>
        <input
          className="px-4 py-2  rounded-full flex justify-center items-center border border-red-200"
          type="email"
          placeholder="your@email.com"
          name="email"
          value={loginCredentials.email}
          onChange={handleChange}
        />
        <input
          className="px-4 py-2  rounded-full flex justify-center items-center border border-red-200"
          type="password"
          placeholder="password"
          name="password"
          value={loginCredentials.password}
          onChange={handleChange}
        />
        <button
          className=" bg-red-400 text-white px-4 py-2  rounded-full flex justify-center items-center hover:bg-red-500 hover:shadow-lg hover:shadow-gray-400"
          type="submit"
        >
          Login
        </button>
        <p className="text-center p-2">
          Don't have an account? <NavLink className="text-blue-500" to="/register">Register</NavLink>
        </p>
      </form>
      <ToastContainer/>
    </div>
  );
}

export default Login;
