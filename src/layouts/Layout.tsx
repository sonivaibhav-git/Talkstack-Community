import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/navigation/Footer'
import Navbar from '../components/navigation/Navbar'
import Sidebar from '../components/navigation/Sidebar'
import MobileBottomNav from '../components/navigation/MobileBottomNav'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="h-screen bg-neutral-100 overflow-hidden">
      <Navbar onMenuClick={() => setSidebarOpen(v => !v)} />

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Scroll container */}
      <main
        className="
          pt-12
          md:pl-54
          h-full
          overflow-y-auto
          rounded-xl
        "
      >
        <Outlet />
        <Footer />
      </main>

      <MobileBottomNav />
    </div>
  )
}


export default Layout
