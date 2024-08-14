import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { userContext } from "../App";

function Bookings() {
  const [bookingData, setBookingData] = useState([]);
  const userInfo = useContext(userContext);

  useEffect(() => {
    fetchBookings();
  });

  async function fetchBookings() {
    let response = await fetch("http://localhost:3000/api/getBookings", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        owner: userInfo.userData._id,
      }),
    });
    response = await response.json();
    setBookingData(response);
  }

  return (
    <div className=" mx-10 mt-3 gap-6 grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {bookingData
        ? bookingData.map((booking) => (
            <NavLink
              to={`/place/${booking.place}`}
              className=" flex flex-col py-4 px-2 shadow-gray-500 shadow-lg rounded-2xl"
              key={booking._id}
            >
              <div className=" h-80 w-full rounded-2xl flex">
                <img
                  className="rounded-2xl h-full w-full object-cover"
                  src={`http://localhost:3000/Uploads/${booking.photo}`}
                  alt=""
                />
              </div>
              <div className="mt-2 px-2 flex flex-col">
                <h2 className="font-bold">{booking.address}</h2>
                <div className="flex justify-between">
                  <p className="truncate text-sm text-gray-600">
                    From : {booking.checkIn}
                  </p>
                  <div className="flex justify-center items-center">
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
                        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </div>
                  <p className="truncate text-sm text-gray-600">
                    To : {booking.checkOut}
                  </p>
                </div>
                <p>For : {booking.guests} Guests</p>
                <p>Total Amount : {booking.price}</p>
              </div>
            </NavLink>
          ))
        : ""}
    </div>
  );
}

export default Bookings;
