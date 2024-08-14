import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { differenceInDays } from "date-fns";
import { userContext } from "../App";


function PlacePage() {
  const placeID = useParams();
  const userInfo = useContext(userContext);
  const [place, setPlace] = useState({});
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [totalGuest, setTotalGuest] = useState(1);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  let numberOfDays = 0;
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlace();
  }, []);


  if(checkIn && checkOut){
    numberOfDays = differenceInDays(new Date(checkOut), new Date(checkIn));
  }

  async function fetchPlace() {
    console.log(placeID);
    let response = await fetch("http://localhost:3000/api/currentPlace", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: placeID.id,
      }),
    });
    response = await response.json();
    setPlace(response);
  }

  async function handleBooking(e){
      e.preventDefault();
      const response = await fetch("http://localhost:3000/api/makeBooking", {
        method:"POST", 
        headers :{
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          place : placeID.id,
          owner : userInfo.userData._id,
          checkIn: checkIn, 
          checkOut : checkOut,
          guests : totalGuest,
          name : name,
          contact : mobile, 
          price : numberOfDays*place?.price,
          photo : place.photos[0],
          address : place.address
        })
      })
      const data = await response.json();
      navigate("/account/bookings");
  }

  return (
    <>
      {showAllPhotos === false ? (
        <div className="mx-40 px-5 pb-4 bg-gray-100 rounded-2xl md:mx-40 sm:mx-5 transition-all ease-in-out delay-0">
          <div className="flex justify-between">
            <div className="text-2xl font-medium mt-2 mb-2 py-2">
              <h2>{place.title}</h2>
              <a target="_blank" href={`https://maps.google.com/?q=${place?.address}`} className="text-sm text-gray-500 mt-2 underline hover:text-blue-500">
                {place?.address}
              </a>
            </div>

            <div className="flex justify-center items-center gap-2 hover:cursor-pointer mt-4 mb-4 px-2 rounded-2xl h-8 hover:bg-gray-200 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                />
              </svg>
              <span className="text-sm">share</span>
            </div>
          </div>

          <div className=" grid grid-cols-4 gap-2 mt-4 rounded-2xl overflow-hidden relative hover:cursor-pointer ">
            <div className="h-128 col-span-2 flex">
              <img
                className="aspect-video h-full w-full object-cover"
                src={`http://localhost:3000/Uploads/${place?.photos?.[0]}`}
                alt=""
                onClick={() => setShowAllPhotos(true)}
              />
            </div>
            <div className="grid grid-rows-2 gap-2">
              <div className="flex h-64">
                <img
                  className=" h-full w-full object-cover"
                  src={`http://localhost:3000/Uploads/${place?.photos?.[1]}`}
                  alt=""
                  onClick={() => setShowAllPhotos(true)}
                />
              </div>
              <div className="flex h-64">
                <img
                  className=" h-full w-full object-cover"
                  src={`http://localhost:3000/Uploads/${place?.photos?.[2]}`}
                  alt=""
                  onClick={() => setShowAllPhotos(true)}
                />
              </div>
            </div>
            <div className="grid grid-rows-2 gap-2">
              <div className="flex h-64">
                <img
                  className=" h-full w-full object-cover"
                  src={`http://localhost:3000/Uploads/${place?.photos?.[3]}`}
                  alt=""
                  onClick={() => setShowAllPhotos(true)}
                />
              </div>
              <div className="flex h-64">
                <img
                  className=" h-full w-full object-cover"
                  src={`http://localhost:3000/Uploads/${place?.photos?.[4]}`}
                  alt=""
                  onClick={() => setShowAllPhotos(true)}
                />
              </div>
            </div>
            <button
              className="absolute flex gap-1 right-2 bottom-2 bg-gray-100 text-black rounded-2xl px-2 py-1  shadow-gray-500 shadow-md hover:cursor-pointer hover:border-black hover:border"
              onClick={() => setShowAllPhotos(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              All photos
            </button>
          </div>

          <div>
            <div className="grid grid-cols-2 mt-10 gap-8">
              <div>
                <div className="flex flex-col">
                  <h1 className="text-2xl font-medium mb-1">Description : </h1>
                  <div>{place?.description}</div>
                </div>
                <div className="mt-2">
                  
                  <p className="font-medium">Check In : {place.checkIn}</p>
                  <p className="font-medium">Check Out : {place.checkOut}</p>
                  <p className="font-medium">Max-Guests : {place.maxGuest}</p>
                  <h2 className="text-2xl font-medium mb-1 mt-2"> Extra Information : </h2>
                  <p>{place.extraInfo}</p>
                </div>
              </div>

              <form className="flex justify-end" onSubmit={handleBooking} >
                <div className="shadow-gray-500 w-4/5 flex flex-col bg-white rounded-2xl shadow-lg px-6 py-4">
                  <h2 className="font-medium text-2xl mb-3 ">
                    Price : {place?.price} /per night
                  </h2>
                  <div className="border rounded-2xl">
                    <div className="flex mt-2 justify-between ">
                      <div className="flex flex-col  px-4 py-2">
                        <label> CHECK-IN : </label>
                        <input type="date" className="text-gray-400" name='check-in' value={checkIn} onChange={(e)=> setCheckIn(e.target.value)}/>
                      </div>

                      <div className="flex flex-col px-4 py-2">
                        <label> CHECK-OUT : </label>
                        <input type="date" className="text-gray-400" value={checkOut} onChange={(e)=> setCheckOut(e.target.value)}/>
                      </div>
                    </div>
                    <div className="flex flex-col px-4 py-2">
                      <label>Guests : </label>
                      <input type="number" placeholder="1 Guest" className="py-1 px-2 rounded-2xl" value={totalGuest} onChange={(e)=> setTotalGuest(e.target.value)}/>
                    </div>
                  </div>
                    {
                      numberOfDays !== 0 ? (
                        <>
                        <div className="flex flex-col gap-1 mt-2 p-2">
                        <label className="px-3" > Name : </label>
                        <input className="py-1 px-3 rounded-2xl focus:border focus:border-black" type="text" placeholder="Your Name" value={name} onChange={(e)=> setName(e.target.value)} />
                      </div>
    
                      <div className="flex flex-col gap-1 mt-2 p-2">
                        <label className="px-3" > Contact-No. : </label>
                        <input className="py-1 px-3 rounded-2xl focus:border focus:border-black" type="tel" placeholder="contact number" value={mobile} onChange={(e)=> setMobile(e.target.value)} />
                      </div>
                      </>
                      ) : ('')
                    }
                 



                  <div>
                    <button className="px-4 py-2 w-full mt-4 rounded-2xl text-white text-lg bg-red-500"
                    type="submit"
                    >
                      {numberOfDays !==0 ? `Price : ${numberOfDays * place?.price}` : `Reserve`}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="px-10 w-3/4 mt-3 shadow-lg shadow-gray-500 rounded-2xl lg:w-1/2 md:w-3/4 sm:w-full">
            <div className="py-5 mt-2 flex justify-between relative ">
              <h1 className="text-2xl font-medium">{place?.title}</h1>
              <button className="fixed mt-16 ml-2 px-2 py-1 rounded-2xl bg-red-500 text-white shadow-lg hover:shadow-gray-700 "
                onClick={()=> setShowAllPhotos(false)}
              >
                close
              </button>
            </div>
            {place?.photos?.map((photo) => (
              <div key={photo} className="flex aspect-video mb-2">
                <img
                  className="aspect-video h-full w-full object-cover"
                  src={`http://localhost:3000/Uploads/${photo}`}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default PlacePage;
