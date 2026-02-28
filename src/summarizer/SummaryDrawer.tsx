import React from "react"

type SummaryResponse = {
  sentences: string[]
}

type Props = {
  isOpen: boolean
  summary: SummaryResponse | null
  loading: boolean
  message: string | null
  view: "paragraph" | "bullets"
  setView: (v: "paragraph" | "bullets") => void
  onClose: () => void
}

const SummaryDrawer: React.FC<Props> = ({
  isOpen,
  summary,
  loading,
  message,
  view,
  setView,
  onClose
}) => {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-105 rounded-l-xl
        bg-white border-l border-neutral-200 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="h-full flex flex-col p-6">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-neutral-800">
              Summary
            </h2>
            <button
              onClick={onClose}
              className="px-3 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition"
            >
              X
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto text-sm text-neutral-700 leading-relaxed">

            {loading && (
              <p className="animate-pulse">Generating summary...</p>
            )}

            {message && !loading && (
              <p className="text-neutral-500">{message}</p>
            )}

            {summary && !loading && !message && (
              <>
                <div className="mb-4 flex gap-2">
                  <button
                    onClick={() => setView("bullets")}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      view === "bullets"
                        ? "bg-neutral-900 text-white"
                        : "bg-neutral-100"
                    }`}
                  >
                    Bullets
                  </button>
                  <button
                    onClick={() => setView("paragraph")}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      view === "paragraph"
                        ? "bg-neutral-900 text-white"
                        : "bg-neutral-100"
                    }`}
                  >
                    Paragraph
                  </button>
                </div>

                {view === "bullets" ? (
                  <ul className="list-disc pl-5 space-y-2">
                    {summary.sentences.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{summary.sentences.join(" ")}</p>
                )}
              </>
            )}

          </div>
        </div>
      </div>
    </>
  )
}

export default SummaryDrawer