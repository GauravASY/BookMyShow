import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../App";

function Accomodation() {
  const [places, setPlace] = useState([]);
  const navigate = useNavigate();
  const userInfo = useContext(userContext);

  useEffect(() => {
    if (userInfo.userData._id) {
      fetchPlaces();
    }
  }, []);

  async function fetchPlaces() {
    const response = await fetch("http://localhost:3000/api/places", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userInfo.userData._id,
      }),
    });
    const placeData = await response.json();
    setPlace(placeData);
  }


  function handleClick() {
    navigate("/account/accomodation/form");
  }
  return (
    <>
      <div className=" ml-10 mr-14 mt-5 flex justify-center">
        <button
          className="py-2 px-4 bg-red-400 rounded-full text-white"
          onClick={handleClick}
        >
          + Add new place
        </button>
      </div>
      <div className="mt-4 mx-10">
        {places.length > 0 ? (
          <div className="flex flex-col gap-4">
            {places.map((data) => (
              <NavLink to={'edit/'+ data._id} key={data._id} className="p-4 flex rounded-2xl bg-gray-200 gap-2 cursor-pointer hover:shadow-lg hover:shadow-gray-500">
                <div className="h-32 w-32 rounded-2xl shrink-0">
                  <img className="h-full w-full rounded-2xl object-fill" src={`http://localhost:3000/Uploads/${data.photos[0]}`} alt="" />
                </div>
                <div className="h-32 w-32 rounded-2xl shrink-0">
                  <img className="h-full w-full rounded-2xl object-fill" src={`http://localhost:3000/Uploads/${data.photos[1]}`} alt="" />
                </div>
                <div className="grow flex flex-col gap-1 overflow-hidden">
                  <h2 className="text-lg font-medium">{data.title}</h2>
                  <p className="text-sm truncate">{data.description}</p>
                  <p className="text-sm">{data.extraInfo}</p>
                  <p className="text-sm">Max-Guests : {data.maxGuest}</p>
                  <p className="text-sm">Price : {data.price}</p>
                </div> 
              </NavLink>
            ))}
          </div>
        ) : (
          <div>No places available.</div>
        )}
      </div>
    </>
  );
}

export default Accomodation;
