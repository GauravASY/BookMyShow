import React, { useEffect } from "react";
import { useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { userContext } from "./App";

function AccountLayout() {
    const userInfo = useContext(userContext);
    const navigate = useNavigate();
    
   useEffect(()=>{
    if(!userInfo.userData){
      navigate("/login");
  }
   }, [userInfo.userData])
  return (
    <div className="flex flex-col">
      <div className="grow flex-col">
        <div className="mx-10 grow flex justify-around">
          <div
            className={`className="px-4 py-2 rounded-full flex justify-center items-center `}
          >
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "py-2 px-4 bg-red-400 rounded-full text-white"
                  : "py-2 px-4"
              }
              to="/account/profile"
            >
              {" "}
              My Profile
            </NavLink>
          </div>
          <div
            className={`className="px-4 py-2 rounded-full flex justify-center items-center `}
          >
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "py-2 px-4 bg-red-400 rounded-full text-white"
                  : "py-2 px-4"
              }
              to="/account/accomodation"
            >
              My Accomodations
            </NavLink>
          </div>
          <div
            className={`className="px-4 py-2 rounded-full flex justify-center items-center `}
          >
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "py-2 px-4 bg-red-400 rounded-full text-white"
                  : "py-2 px-4"
              }
              to="/account/bookings"
            >
              {" "}
              My Bookings
            </NavLink>
          </div>
        </div>
      </div>
      <Outlet/>
    </div>
  );
}

export default AccountLayout;
