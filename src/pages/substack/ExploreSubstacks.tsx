import { useState, useMemo } from 'react'
import {useAllSubstacks,useTopSubstacks} from '../../features/substacks/substack.queries'
import { IoSearchSharp } from 'react-icons/io5'
import SubstackCard from '../../components/cards/SubstackCard'
import SubBlock from '../../components/cards/SubBlock'

const ExploreSubstacks = () => {
  const [query, setQuery] = useState('')

  const top = useTopSubstacks()
  const all = useAllSubstacks()

  const filteredAll = useMemo(() => {
    if (!all.data) return []
    const q = query.trim().toLowerCase()
    if (!q) return all.data
    return all.data.filter(s =>
      s.name.toLowerCase().includes(q)
    )
  }, [all.data, query])

  return (
    <div className='w-full max-w-4xl sm:px-6 py-4'>

      {/* 🔍 Search (always render instantly) */}
      <div className='mb-6'>
        <div className='flex items-center gap-2 bg-white border rounded-lg px-3'>
          <IoSearchSharp size={20} className='text-neutral-500' />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder='Search substacks…'
            className='w-full py-2 text-sm outline-none'
          />
        </div>
      </div>

      {/* 🔥 Popular */}
      <section className='mb-10 w-full '>
        <h1 className='text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2'>
          Popular
        </h1>

        <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {top.isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <SubBlockSkeleton key={i} />
              ))
            : top.data?.map(substack => (
                <SubBlock key={substack.id} substack={substack} />
              ))}
        </div>
      </section>

      {/* 📦 All Substacks */}
      <section className='w-full '>
        <h1 className='text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2'>
          All Substacks
        </h1>

        {all.isLoading ? (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {Array.from({ length: 6 }).map((_, i) => (
              <SubstackCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredAll.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {filteredAll.map(substack => (
              <SubstackCard
                key={substack.id}
                substack={substack}
              />
            ))}
          </div>
        ) : (
          <div className='py-10 text-center text-sm text-neutral-500'>
            No substacks match your search
          </div>
        )}
      </section>

    </div>
  )
}
const SubstackCardSkeleton = () => (
  <div className="bg-white rounded-xl p-4 animate-pulse space-y-3">
    <div className="w-full h-32 bg-neutral-300 rounded" />
    <div className="w-2/3 h-4 bg-neutral-300 rounded" />
    <div className="w-1/2 h-3 bg-neutral-200 rounded" />
  </div>
)
const SubBlockSkeleton = () => (
  <div className="bg-white rounded-xl p-3 animate-pulse">
    <div className="w-full h-20 bg-neutral-300 rounded mb-2" />
    <div className="w-3/4 h-3 bg-neutral-300 rounded" />
  </div>
)
export default ExploreSubstacks
