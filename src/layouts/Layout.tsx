import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from '../components/navigation/Navbar'
import Sidebar from '../components/navigation/Sidebar'
import MobileBottomNav from '../components/navigation/MobileBottomNav'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="h-screen bg-neutral-100 overflow-hidden">
     

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Scroll container */}
      <main
        className="
          md:ml-72
          h-full
          overflow-y-auto
          rounded-xl
        "
      >
        <Navbar onMenuClick={() => setSidebarOpen(v => !v)} />
        <Outlet />
      </main>

      <MobileBottomNav />
    </div>
  )
}


export default Layout
