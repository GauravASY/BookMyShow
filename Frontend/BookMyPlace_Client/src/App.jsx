import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Layout from "./Layout";
import IndexPage from "./Pages/IndexPage";
import Register from "./Pages/Register";
import { createContext, useEffect, useState } from "react";
import Profile from "./Pages/Profile";
import AccountLayout from "./AccountLayout";
import Bookings from "./Pages/Bookings";
import AccomodationForm from "./Pages/AccomodationForm";
import Accomodation from "./Pages/Accomodation";
import PlacePage from "./Pages/PlacePage";

export const userContext = createContext(null);

function App() {
  const [userData, setUserData] = useState(undefined);

  useEffect(() => {
    let user = localStorage.getItem("Current_User");
    if (user) {
      user = JSON.parse(user);
      setUserData(user);
    }
  }, []);

  return (
    <userContext.Provider value={{ userData, setUserData }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/account" element={<AccountLayout />}>
            <Route path="/account/profile" element={<Profile />} />
            <Route path="/account/bookings" element={<Bookings />} />
            <Route path="/account/accomodation" element={<Accomodation />} />
            <Route
              path="/account/accomodation/edit/:id"
              element={<AccomodationForm />}
            />
            <Route
              path="/account/accomodation/form"
              element={<AccomodationForm />}
            />
          </Route>
        </Route>
      </Routes>
    </userContext.Provider>
  );
}

export default App;
