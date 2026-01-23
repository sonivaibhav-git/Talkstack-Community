import { Link, useLocation } from 'react-router-dom'
import {
  IoHomeOutline,
  IoCompassOutline,
  IoCreateOutline,
  IoTrendingUp,
  IoPersonCircleOutline
} from 'react-icons/io5'
import type { ReactNode } from 'react'

type ItemProps = {
  to: string
  icon: ReactNode
  activePath: string
}

function Item({ to, icon, activePath }: ItemProps) {
  const active = activePath === to

    
  return (
    <Link
      to={to}
      className={`
        flex items-center justify-center
        p-2 rounded-full transition
        ${active ? 'bg-red-500 text-white' : 'text-neutral-500'}
      `}
    >
      <span className="text-xl">{icon}</span>
    </Link>
  )
}

export default function MobileBottomNav() {
  const { pathname } = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full md:hidden">
      <div className="flex justify-between gap-6 border-t-2 border-neutral-300
                      bg-white px-6 py-1 shadow-lg">
        <Item
          to="/"
          icon={<IoHomeOutline size={24} />}
          activePath={pathname}
        />
        <Item
          to="/substacks"
          icon={<IoCompassOutline size={24} />}
          activePath={pathname}
        />
        <Item
          to="/posts/create"
          icon={<IoCreateOutline size={24} />}
          activePath={pathname}
        />
        <Item
          to="/posts/trending"
          icon={<IoTrendingUp size={24} />}
          activePath={pathname}
        />
        <Item
          to="/profile/me"
          icon={<IoPersonCircleOutline size={24} />}
          activePath={pathname}
        />
      </div>
    </nav>
  )
}
