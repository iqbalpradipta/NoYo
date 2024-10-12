import React from 'react'
import Headers from './headers'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='p-4 flex flex-col min-h-screen'>
        <Headers />
        <Outlet />
    </div>
  )
}

export default Layout