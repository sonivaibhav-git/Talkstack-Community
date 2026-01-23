import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/navigation/Footer'
import Navbar from '../components/navigation/Navbar'
import Sidebar from '../components/navigation/Sidebar'
import MobileBottomNav from '../components/navigation/MobileBottomNav'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      <Navbar onMenuClick={() => setSidebarOpen(v => !v)} />

      <div className="flex flex-1">
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1">
          <Outlet />
          <Footer />
        </main>
      </div>

      <MobileBottomNav />
    </div>
  )
}

export default Layout
