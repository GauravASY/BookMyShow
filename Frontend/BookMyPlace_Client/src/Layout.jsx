import React from 'react'
import Header from './Components/Header'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className=' flex flex-col min-h-screen'>
        <Header/>
        <Outlet/>
    </div>
  )
}

export default Layout