import React, { useState } from 'react'
import type { FollowingItem, FollowingType } from '../../features/profile/profile.types'
import type { UseQueryResult } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

interface ListProps {
  query: UseQueryResult<FollowingItem[], Error>
  followingUsers:number
  followingSubstacks:number
}

function List ({ query, followingUsers,followingSubstacks}: ListProps) {
  const [filterType, setFilterType] = useState<FollowingType | 'ALL'>('ALL')
  const data: FollowingItem[] = query.data || []
  
  const filteredData = filterType === 'ALL' 
    ? data 
    : data.filter(item => item.type === filterType)

  return (
    <div className='relative w-full  md:w-fit h-fit flex flex-col items-center gap-2 p-2 md:p-3 bg-white rounded-xl shadow-lg  md:items-start md:gap-3'>
      {/* Toggle Buttons */}
      <div className='flex gap-2 p-2'>
        <button
          onClick={() => setFilterType('ALL')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition ${
            filterType === 'ALL'
              ? 'bg-neutral-900 text-white'
              : 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300'
          }`}
        >
          All 
        </button>
        <button
          onClick={() => setFilterType('USER')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition ${
            filterType === 'USER'
              ? 'bg-neutral-900 text-white'
              : 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300'
          }`}
        >
          Users ({followingUsers})
        </button>
        <button
          onClick={() => setFilterType('SUBSTACK')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition ${
            filterType === 'SUBSTACK'
              ? 'bg-neutral-900 text-white'
              : 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300'
          }`}
        >
          Substacks  ({followingSubstacks})
        </button>
      </div>
      
      <div className='w-full '>
      <ul className='divide-y border border-neutral-200 rounded-lg overflow-hidden bg-white'>
        {filteredData.length > 0 ? (
          filteredData.map(user => (
            <Link
            to={user.type == 'USER' ? `/profile/${user.username}`:`/substack/${user.username}`}
            > <li
              key={user.id}
              className='flex items-center gap-3 p-4 hover:bg-neutral-50 border-b-2 border-neutral-300'
            >
              <img
                src={user.avatar}
                alt={user.username}
                className='w-10 h-10 rounded-full object-cover'
              />
              <div className='flex-1'>
                <p className='font-medium text-neutral-900'>{user.username}</p>
                <p className='text-xs text-neutral-500'>{user.type}</p>
              </div>
            </li>
            </Link>
           
          ))
        ) : (
          <li className='p-4 text-center text-neutral-500'>No following yet</li>
        )}
      </ul>
    </div>
    </div>
  )
}

export default List
