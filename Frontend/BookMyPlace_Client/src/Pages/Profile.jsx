import React, { useEffect } from "react";
import { useContext } from "react";
import { userContext } from "../App";
import { NavLink, useNavigate } from "react-router-dom";

function Profile() {
  const userInfo = useContext(userContext);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    userInfo.setUserData(undefined);
    navigate("/");
  }

  useEffect(() => {
    if (userInfo.userData === undefined) {
      navigate("/");
    }
  }, [userInfo.userData,]);

  return (
    <div className="grow p-8 flex flex-col mx-10 mt-12 gap-2 items-center">
      <div className="px-4 py-2 flex justify-center items-center">
        Username : {userInfo.userData?.username}
      </div>
      <div className="px-4 py-2 flex justify-center items-center">
        Email ID : {userInfo.userData?.email}
      </div>
      <button
        className="w-1/2 py-2 mt-2 flex justify-center items-center bg-red-400 text-white rounded-full hover:shadow-lg "
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
