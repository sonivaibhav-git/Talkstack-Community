import { useState } from 'react'
import {
  useAllSubstacks,
  useTopSubstacks
} from '../../features/substacks/substack.queries'
import SubstackCard from '../../components/cards/SubstackCard'
// import SubstackPill from '../../components/substack/SubstackPill'
import { IoSearchSharp } from 'react-icons/io5'

const ExploreSubstacks = () => {
  const [query, setQuery] = useState('')
  const top = useTopSubstacks()
  const all = useAllSubstacks()

  if (top.isLoading || all.isLoading) {
    return (
      <div className='w-full flex justify-center py-10'>
        <p className='text-sm text-neutral-500'>Loading…</p>
      </div>
    )
  }

  if (top.isError || all.isError) {
    return (
      <div className='w-full flex justify-center py-10'>
        <p className='text-sm text-neutral-500'>Failed to load substacks</p>
      </div>
    )
  }

  const filtered = all.data!.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className='w-fit bg-neutral-100 '>
      {/* Search (optional, does not affect layout contract) */}
      <div className=' w-screen md:max-w-6xl mx-auto p-2 pb-18'>
        <div className='w-full flex items-center gap-3'>
        <span className='bg-white p-3 rounded-xl'>
          <IoSearchSharp size={22} />
        </span>

        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder='Search substacks…'
          className='w-full p-3 rounded-xl bg-white'
        />
      </div>
       <h1 className='text-2xl font-semibold text-neutral-800 my-3'>
                  Top Substacks
                </h1>
{/* Substack Slider */}
      {!!top.data!.length && (
        <section className='flex flex-col gap-4 overflow-x-auto pb-2 scrollbar-hide'>
          

          <div className='flex flex-row gap-2'>
            {top.data!.map(substack => (
              <div
                key={substack.id}
                 className='min-w-[300px]'
              >
               <SubstackCard substack={substack}/>
              </div>
            ))}
          </div>
        </section>
      )}

      </div>
      
     
      
    </div>
  )
}

export default ExploreSubstacks
