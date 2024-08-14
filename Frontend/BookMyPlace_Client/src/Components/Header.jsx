import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../App";
function Header() {

  const userInfo = useContext(userContext);

  return (
    <div className="flex px-10 py-3 rounded-lg">
      <NavLink to="/" className="flex px-4 py-4 gap-1 justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#FF385C"
          className="size-8 -rotate-90 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
        <span className="font-bold text-center items-center flex text-lg text-red-500">BookMyPlace</span>
      </NavLink>
      <div className="flex grow p-5 gap-2 justify-center items-center">
            <div className="py-2 px-4 hover:rounded-full hover:bg-gray-100">Stays</div>
            <div className="py-2 px-4 hover:rounded-full hover:bg-gray-100">Experiences</div>
            <div className="py-2 px-4 hover:rounded-full hover:bg-gray-100">Online Experiences</div>
        </div>


      <div className="flex justify-center items-center">
        <span className="font-bold px-4 py-2 rounded-full hover:rounded-full hover:bg-gray-100">Showcase your home</span>
        <div className="p-4 rounded-full hover:rounded-full hover:bg-gray-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 flex items-center"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
        </div>
      </div>

      <div className="flex justify-center items-center px-4 ">
      
        <div className="flex justify-center rounded-full px-4 py-2 items-center border-solid border-gray-300 border-2 gap-3  hover:shadow-gray-500 shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
            clipRule="evenodd"
          />
        </svg>
        <NavLink to={userInfo.userData? "/account/profile":"/login"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="size-8 bg-gray-600 rounded-full"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
            clipRule="evenodd"
          />
        </svg>
        </NavLink>
        {
          userInfo.userData ? <div>{userInfo.userData.username}</div> : <div></div>
        }
        </div>
      </div>
    </div>
  );
}

export default Header;
