import { FaFire } from 'react-icons/fa'

type Props = {
  trust: number
  talkscore: number
}

export default function TrustCard ({ trust, talkscore }: Props) {
  const pct = Math.round(trust * 100)

  const tier =
    trust < 0.5
      ? 'Low Trusted'
      : trust < 0.7
      ? 'Newbie'
      : trust < 0.85
      ? 'Emerging'
      : 'Highly Trusted'

  return (
    <div className='w-full h-fit rounded-2xl bg-neutral-900 p-5 text-white shadow-xl flex flex-row justify-evenly md:gap-10'>
      <div>
     
        <div className='text-sm text-neutral-400'>Trust </div>
        <div className=' flex items-baseline gap-2'>
          <div className='text-3xl font-semibold'>{pct}%</div>
          <span className='rounded-full bg-neutral-800 px-3 py-1 text-xs'>
            {tier}
          </span>
        </div>
        <div className='mt-2 h-1 w-full rounded-full bg-neutral-800 overflow-hidden'>
          <div
            className=' h-full rounded-full bg-linear-to-r from-purple-400 via-violet-400 to-violet-800 transition-all'
            style={{ width: `${pct}%` }}
          >
            </div>
        </div>
      </div>
      <div>
        <div className='text-sm text-neutral-400'>Talkscore </div>
        <div className=' flex items-center  gap-2'>
          <div className='text-3xl font-semibold'>{talkscore}</div>
          <span className='rounded-full bg-neutral-800 px-2 py-2 text-xs'>
            <FaFire size={30} className='text-purple-500' />
          </span>
        </div>
      </div>
    </div>
  )
}
