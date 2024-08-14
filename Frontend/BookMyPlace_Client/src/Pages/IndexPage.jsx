import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

function IndexPage() {
  const [allPlaces, setAllPlaces] = useState([]);

  useEffect(()=>{
      fetchAllPlaces();
  },[])


  async function fetchAllPlaces(){
    let response = await fetch("http://localhost:3000/api/allPlaces");
    response = await response.json();
    setAllPlaces(response);
  }

  return (
    <div className='mx-10 mt-3'>
    {
      allPlaces.length > 0 ? (
        <div className=' gap-6 grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {
              allPlaces.map((place)=>(
                
                  <NavLink to={`/place/${place._id}`} className=" flex flex-col py-4 px-2 shadow-gray-500 shadow-lg rounded-2xl" key={place._id}>
                    <div className=' h-80 w-full rounded-2xl flex'>
                       <img className='rounded-2xl object-cover' src={`http://localhost:3000/Uploads/${place.photos[0]}`} alt="" />
                    </div> 
                    <div className='mt-2 px-2 flex flex-col'>
                      <h2 className='font-bold'>{place.address}</h2>
                      <p className='truncate text-sm text-gray-600'>{place.description}</p>
                      <p>Rs. {place.price}</p>
                    </div>                 
                    
                  </NavLink>
              
              ))
            }
        </div>
      ):(
        <div>
            from the else of length
        </div>
      )
    }
    </div>
  )
}

export default IndexPage