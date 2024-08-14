import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { userContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";

function Accomodation() {
  const userInfo = useContext(userContext);
  const placeID = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photolink, setPhotolink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);
  const [price, setPrice] = useState(100);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuest,
      price
    };

    if (placeID.id) {
      let response1 = await fetch("http://localhost:3000/api/updateForm", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          placeID,
          data,
          userData: userInfo.userData,
        }),
      });
      response1 = await response1.json();
      console.log(response1);
    } 
    else {
      let response = await fetch("http://localhost:3000/api/saveForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data,
          userData: userInfo.userData,
        }),
      });
      response = await response.json();
      console.log(response);
    }
    navigate("/account/accomodation");
  }

  function handleInputChange(e) {
    switch (e.target.name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "address":
        setAddress(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "extraInfo":
        setExtraInfo(e.target.value);
        break;
      case "checkIn":
        setCheckIn(e.target.value);
        break;
      case "checkOut":
        setCheckOut(e.target.value);
        break;
      case "maxGuest":
        setMaxGuest(e.target.value);
        break;
      case "price":
        setPrice(e.target.value);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (placeID) {
      getPlaceData();
    }
  }, [placeID]);


  async function getPlaceData() {
    let data = await fetch("http://localhost:3000/api/placeEdit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: placeID,
      }),
    });
    data = await data.json();
    setTitle(data.title);
    setAddress(data.address);
    setAddedPhotos(data.photos);
    setDescription(data.description);
    setPerks(data.perks);
    setExtraInfo(data.extraInfo);
    setCheckIn(data.checkIn);
    setCheckOut(data.checkOut);
    setMaxGuest(data.maxGuest);
    setPrice(data.price);
  }


  function handlePerks(e) {
    const { checked } = e.target;
    if (checked) {
      setPerks([...perks, e.target.name]);
    } else {
      setPerks([...perks.filter((name) => name !== e.target.name)]);
    }
  }


  async function handleFileChange(e) {
    const files = e.target.files;
    const data = new FormData();
    for (let index = 0; index < files.length; index++) {
      data.append("photos", files[index]);
    }


    let response = await fetch("http://localhost:3000/api/uploadViaStorage", {
      method: "POST",
      body: data,
    });


    response = await response.json();
    setAddedPhotos((prev) => {
      return [...prev, ...response];
    });
    setPhotolink("");
  }


  async function addPhotoLink(e) {
    e.preventDefault();
    let response = await fetch("http://localhost:3000/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        link: photolink,
      }),
    });
    response = await response.json();
    setAddedPhotos((prev) => {
      return [...prev, response];
    });
    setPhotolink("");
  }


  function handlePhotoDelete(e, filename) {
    e.preventDefault();
    const newAddedPhotos = addedPhotos.filter((file) => file !== filename);
    setAddedPhotos(newAddedPhotos);
  }

  function handleMainPhoto(e, filename){
    e.preventDefault();
    const newAddedPhotos = addedPhotos.filter((file) => file!==filename);
    setAddedPhotos([filename, ...newAddedPhotos]);
  }
  

  return (
    <div className=" px-10 mt-6 flex justify-center">
      <form
        className="w-3/4 h-3/4 py-8 px-8 rounded-xl shadow-gray-500 shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="mt-3">
          <h2 className="text-xl font-medium">Title</h2>
          <p className="text-gray-500 text-sm mb-2">
            Give a catchy and short title
          </p>
          <input
            className="w-full px-4 py-1 rounded-full shadow-md shadow-gray-300 bg-slate-100"
            type="text"
            placeholder="Enter title of your Place"
            name="title"
            value={title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-3">
          <h2 className="text-xl font-medium">Address</h2>
          <p className="text-gray-500 text-sm mb-2">
            Give correct address to your place
          </p>
          <input
            className="w-full px-4 py-1 rounded-full shadow-md shadow-gray-300 bg-slate-100"
            type="text"
            placeholder="Enter address"
            name="address"
            value={address}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-3">
          <h2 className="text-xl font-medium">Photos</h2>
          <p className="text-gray-500 text-sm mb-2">The more the better</p>
          <div className="flex gap-2">
            <input
              className="grow px-4 py-1 rounded-full shadow-md shadow-gray-300 bg-slate-100"
              type="text"
              placeholder="add image address here"
              value={photolink}
              onChange={(e) => setPhotolink(e.target.value)}
            />
            <button
              className="px-4 rounded-full bg-red-500 text-white hover:shadow-lg hover:shadow-gray-500"
              onClick={addPhotoLink}
            >
              Add
            </button>
          </div>

          <div className="mt-3 h-54 w-50 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 ">
            <label className="border-2 h-full w-full border-gray-500 rounded-2xl flex justify-center items-center gap-2 hover:shadow-xl hover: shadow-gray-500">
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="black"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                />
              </svg>{" "}
              ADD{" "}
            </label>
            {addedPhotos.map((link) => {
              return (
                <div className="h-full w-full flex relative" key={link}>
                  <img
                    className=" h-full w-full rounded-2xl object-fill"
                    src={`http://localhost:3000/Uploads/${link}`}
                    alt=""
                  />
                  {link === addedPhotos[0] ? (
                    <button
                      className="absolute bottom-1 left-1 rounded-2xl p-1 bg-gray-800 bg-opacity-75 hover:bg-black"
                      onClick={(e) => handleMainPhoto(e, link)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="yellow"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      className="absolute bottom-1 left-1 rounded-2xl p-1 bg-gray-800 bg-opacity-75 hover:bg-black"
                      onClick={(e) => handleMainPhoto(e, link)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                        />
                      </svg>
                    </button>
                  )}
                  <button
                    className="absolute bottom-1 right-1 rounded-2xl p-1 bg-gray-800 bg-opacity-75 hover:bg-black"
                    onClick={(e) => handlePhotoDelete(e, link)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-3">
          <h2 className="text-xl font-medium">Description</h2>
          <p className="text-gray-500 text-sm mb-2">
            provide concise description; for example : A comfortable sea facing
            bungalow
          </p>
          <textarea
            className="w-3/4 px-3 py-1 h-12 rounded-2xl shadow-md shadow-gray-300 bg-gray-100"
            name="description"
            value={description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="mt-3">
          <h2 className="text-xl font-medium">Perks</h2>
          <p className="text-gray-500 text-sm mb-2">
            Select Amenities and other things
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 py-2">
            <div className="px-2 py-4 flex items-center gap-1">
              <input
                type="checkbox"
                checked={perks.includes("wifi")}
                name="wifi"
                onChange={handlePerks}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                />
              </svg>

              <span>Wifi</span>
            </div>
            <div className="px-2 py-4 flex items-center gap-1">
              <input
                type="checkbox"
                checked={perks.includes("parking")}
                name="parking"
                onChange={handlePerks}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>

              <span> Free Parking</span>
            </div>
            <div className="px-2 py-4 flex items-center gap-1">
              <input
                type="checkbox"
                checked={perks.includes("pets")}
                name="pets"
                onChange={handlePerks}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                />
              </svg>

              <span>Pets</span>
            </div>
            <div className="px-2 py-4 flex items-center gap-1">
              <input
                type="checkbox"
                checked={perks.includes("entrance")}
                name="entrance"
                onChange={handlePerks}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
                />
              </svg>

              <span>Private Entrance</span>
            </div>
            <div className="px-2 py-4 flex items-center gap-1">
              <input
                type="checkbox"
                checked={perks.includes("tv")}
                name="tv"
                onChange={handlePerks}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>

              <span>TV</span>
            </div>
            <div className="px-2 py-4 flex items-center gap-1">
              <input
                type="checkbox"
                checked={perks.includes("Radio")}
                name="Radio"
                onChange={handlePerks}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m3.75 7.5 16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 0 0 4.5 21h15a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0 0 12 6.75Zm-1.683 6.443-.005.005-.006-.005.006-.005.005.005Zm-.005 2.127-.005-.006.005-.005.005.005-.005.005Zm-2.116-.006-.005.006-.006-.006.005-.005.006.005Zm-.005-2.116-.006-.005.006-.005.005.005-.005.005ZM9.255 10.5v.008h-.008V10.5h.008Zm3.249 1.88-.007.004-.003-.007.006-.003.004.006Zm-1.38 5.126-.003-.006.006-.004.004.007-.006.003Zm.007-6.501-.003.006-.007-.003.004-.007.006.004Zm1.37 5.129-.007-.004.004-.006.006.003-.004.007Zm.504-1.877h-.008v-.007h.008v.007ZM9.255 18v.008h-.008V18h.008Zm-3.246-1.87-.007.004L6 16.127l.006-.003.004.006Zm1.366-5.119-.004-.006.006-.004.004.007-.006.003ZM7.38 17.5l-.003.006-.007-.003.004-.007.006.004Zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007Zm-.5 1.873h-.008v-.007h.008v.007ZM17.25 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 4.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>

              <span>Radio</span>
            </div>
            <div className="px-2 py-4 flex items-center gap-1">
              <input
                type="checkbox"
                checked={perks.includes("seafacing")}
                name="seafacing"
                onChange={handlePerks}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>

              <span>Sea facing</span>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <h2 className="text-xl font-medium">Extra Info</h2>
          <p className="text-gray-500 text-sm mb-2">House rules etc.</p>
          <textarea
            className="w-3/4 px-3 py-1 rounded-2xl shadow-md shadow-gray-300 bg-gray-100"
            name="extraInfo"
            onChange={handleInputChange}
            value={extraInfo}
          ></textarea>
        </div>
        <div className="mt-3">
          <h2 className="text-xl font-medium">Check In-n-Out Time</h2>
          <div className="flex gap-5">
            <div>
              <p className="ml-2">Check-In</p>
              <input
                className="w-full px-4 py-1 rounded-full shadow-md shadow-gray-300 bg-gray-100"
                type="text"
                placeholder="14:00"
                name="checkIn"
                value={checkIn}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <p className="ml-2">Check-Out</p>
              <input
                className="w-full px-4 py-1 rounded-full shadow-md shadow-gray-300 bg-gray-100"
                type="text"
                placeholder="2:45"
                name="checkOut"
                value={checkOut}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <p className="ml-2">Max Guests</p>
              <input
                className="w-full px-4 py-1 rounded-full shadow-md shadow-gray-300 bg-gray-100"
                type="number"
                placeholder="2"
                name="maxGuest"
                value={maxGuest}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <p className="ml-2">Price</p>
              <input
                className="w-full px-4 py-1 rounded-full shadow-md shadow-gray-300 bg-gray-100"
                type="number"
                placeholder="100"
                name="price"
                value={price}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-red-400 mt-10 text-white w-full px-4 py-3 rounded-full flex justify-center items-center hover:bg-red-500 hover:shadow-lg hover:shadow-gray-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Accomodation;
