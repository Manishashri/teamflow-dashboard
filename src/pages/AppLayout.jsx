import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar  from '../components/Navbar'

const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/tasks':     'Tasks',
  '/team':      'Team',
}

export default function AppLayout() {
  const [collapsed,     setCollapsed]     = useState(false)
  const [mobileSidebar, setMobileSidebar] = useState(false)
  const location = useLocation()
  const title = PAGE_TITLES[location.pathname] || 'TeamFlow'

  const sidebarWidth = collapsed ? 72 : 256

  return (
    <div className="min-h-screen bg-mesh">
      {/* Mobile overlay */}
      {mobileSidebar && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setMobileSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`lg:block ${mobileSidebar ? 'block' : 'hidden'}`}>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Main content */}
      <div
        className="min-h-screen transition-all duration-300 flex flex-col"
        style={{ paddingLeft: `${sidebarWidth}px` }}
      >
        {/* Responsive: no padding on mobile since sidebar is overlay */}
        <div className="lg:hidden" style={{ paddingLeft: 0 }} />

        <Navbar
          onMenuClick={() => setMobileSidebar(v => !v)}
          pageTitle={title}
        />

        <main className="flex-1 p-4 sm:p-6 max-w-screen-2xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
