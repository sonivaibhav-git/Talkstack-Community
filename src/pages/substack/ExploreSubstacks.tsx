import { useState, useMemo } from 'react'
import {
  useAllSubstacks,
  useTopSubstacks
} from '../../features/substacks/substack.queries'
import { IoSearchSharp } from 'react-icons/io5'
import SubstackCard from '../../components/cards/SubstackCard'
import SubBlock from '../../components/cards/SubBlock'
import Loader from '../../components/skeletons/Loader'

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

  if (top.isLoading || all.isLoading) {
    return (
      <div className='w-full h-full flex justify-center items-center'>  <Loader /></div>
    )
  }

  if (top.isError || all.isError) {
    return (
      <div className='w-full flex justify-center py-10'>
        <p className='text-sm text-neutral-500'>Failed to load substacks</p>
      </div>
    )
  }

  return (
    <div className='w-full max-w-7xl mx-auto  sm:px-6 py-4 '>
      {/* Search */}
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
      {!!top.data!.length && (
        <section className='mb-10 flex flex-col '>
          <h1 className='text-2xl font-semibold text-neutral-800 mb-4'>
            Top Substacks
          </h1>
         <div className="grid grid-cols-2 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-2 gap-2">
            {top.data!.map(substack => (
              <div key={substack.id} className=''>
                <SubBlock substack={substack} />
              </div>
            ))}
            </div>
          
        </section>
      )}

      {/* All Substacks */}
      <section>
        <h1 className='text-2xl font-semibold text-neutral-800 mb-4'>
          All Substacks
        </h1>

        {!!filteredAll.length ? (
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

export default ExploreSubstacks
