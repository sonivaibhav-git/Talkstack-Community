import { FaFire } from 'react-icons/fa'
import { useEffect, useState } from 'react'

type Props = {
  trust: number
  talkscore: number
}

export default function TrustCard({ trust, talkscore }: Props) {
  const pct = Math.round(trust * 100)

  const [animatedPct, setAnimatedPct] = useState(0)
  const [score, setScore] = useState(0)

  // 🎯 Smooth animations
  useEffect(() => {
    setTimeout(() => setAnimatedPct(pct), 200)

    let start = 0
    const interval = setInterval(() => {
      start += Math.ceil(talkscore / 20)
      if (start >= talkscore) {
        start = talkscore
        clearInterval(interval)
      }
      setScore(start)
    }, 30)

    return () => clearInterval(interval)
  }, [pct, talkscore])

  // ✅ Fixed tier logic (cleaner)
  const getTier = () => {
    if (trust < 0.4) return 'Beginner'
    if (trust < 0.6) return 'Emerging'
    if (trust < 0.8) return 'Trusted'
    return 'Elite'
  }

  const tier = getTier()

  return (
    <div className="group w-full rounded-2xl p-px bg-linear-to-r from-purple-600 via-violet-500 to-indigo-500 shadow-xl transition-all duration-300 hover:scale-[1.02]">

      <div className="rounded-2xl bg-neutral-900 p-6 text-white grid lg:grid-cols-2 gap-8">

        {/* 🔥 TRUST SECTION */}
        <div className="flex flex-col gap-3">
          <div className="text-sm text-neutral-400">Your Trust Score</div>

          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold tracking-tight">
              {animatedPct}%
            </div>

            <span className="text-xs px-3 py-1 rounded-full bg-purple-600/20 text-purple-300 border border-purple-500/30">
              {tier}
            </span>
          </div>

          {/* Progress */}
          <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-purple-400 via-violet-400 to-indigo-500 transition-all duration-1000 ease-out"
              style={{ width: `${animatedPct}%` }}
            />
          </div>

          {/* Goal Hint */}
          {/* <div className="text-xs text-neutral-500">
            {100 - pct}% more efforts and Engaging posts to reach next level 🚀
          </div> */}
        </div>

        {/* 🔥 TALKSCORE */}
        <div className="flex flex-col gap-3">
          <div className="text-sm text-neutral-400">Talkscore</div>

          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold">{score}</div>

            <div className="relative">
              <span className="absolute inset-0 animate-ping rounded-full bg-purple-500 opacity-30"></span>

              <span className="relative rounded-full bg-neutral-800 p-3 flex items-center justify-center">
                <FaFire size={20} className="text-purple-400" />
              </span>
            </div>
          </div>

          {/* Weekly growth
          <div className="text-xs text-neutral-500">
            +12 this week 🔥 Keep engaging!
          </div> */}
        </div>

      </div>
    </div>
  )
}