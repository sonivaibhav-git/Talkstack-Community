import type {
  FollowingItem,
  FollowingType
} from '../../features/profile/profile.types'
import type { UseQueryResult } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { IoCloseSharp } from 'react-icons/io5'
import { useState } from 'react'
import { createPortal } from 'react-dom'

interface ListProps {
  query: UseQueryResult<FollowingItem[], Error>
  followingUsers: number
  followingSubstacks: number
  onClose: () => void
}

function List({
  query,
  followingUsers,
  followingSubstacks,
  onClose
}: ListProps) {
  const [filterType, setFilterType] =
    useState<FollowingType | 'ALL'>('ALL')

  const data: FollowingItem[] = query.data || []

  const filteredData =
    filterType === 'ALL'
      ? data
      : data.filter(item => item.type === filterType)

  return createPortal(
    <div
      className="fixed inset-0 z-9999 flex items-start justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose} // 🔥 click outside closes
    >
      {/* STOP propagation so inner click doesn't close */}
      <div
        className="mt-20 w-[90vw] md:w-105 max-h-96 bg-white shadow-2xl rounded-2xl overflow-hidden animate-fadeIn"
        onClick={e => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="sticky top-0 bg-white flex justify-between p-3 border-b">
          <div className="flex gap-2">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                filterType === 'ALL'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-200 hover:bg-neutral-300'
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilterType('USER')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                filterType === 'USER'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-200 hover:bg-neutral-300'
              }`}
            >
              Users ({followingUsers})
            </button>

            <button
              onClick={() => setFilterType('SUBSTACK')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                filterType === 'SUBSTACK'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-200 hover:bg-neutral-300'
              }`}
            >
              Substacks ({followingSubstacks})
            </button>
          </div>

          <button
            onClick={onClose}
            className="text-xl text-neutral-500 hover:text-neutral-800"
          >
            <IoCloseSharp />
          </button>
        </div>

        {/* LIST */}
        <div className="overflow-y-auto max-h-96">
          <ul className="divide-y">
            {filteredData.length > 0 ? (
              filteredData.map(user => (
                <Link
                  key={user.id} // ✅ fixed key placement
                  to={
                    user.type === 'USER'
                      ? `/profile/${user.username}`
                      : `/substack/${user.username}`
                  }
                  onClick={onClose} // optional: close on navigation
                >
                  <li className="flex items-center gap-3 p-4 hover:bg-neutral-50 transition">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />

                    <div className="flex-1">
                      <p className="font-medium text-neutral-900">
                        {user.username}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {user.type}
                      </p>
                    </div>
                  </li>
                </Link>
              ))
            ) : (
              <li className="p-4 text-center text-neutral-500">
                No following yet
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default List