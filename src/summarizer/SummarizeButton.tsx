import React, { useState } from "react"
import SummaryDrawer from "./SummaryDrawer"

type SummaryResponse = {
  sentences: string[]
}

type Props = {
  title: string
  content: string
}

const MIN_CHAR_LENGTH = 200
const MIN_SENTENCE_COUNT = 3

const countSentences = (text: string) =>
  text.split(/[.!?]+/).filter(s => s.trim().length > 0).length

const generateExtractiveSummary = async (
  title: string,
  content: string
): Promise<SummaryResponse> => {

  const model = import.meta.env.VITE_GEMINI_MODEL
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY

  const prompt = `
Perform extractive summarization.

Rules:
- Copy exact sentences only.
- Do NOT rewrite.
-  Ignore greetings, emojis, and casual chatter.
- Return at most 3 sentences.
- Output strictly valid JSON:

{
  "sentences": ["exact sentence 1"]
}

TITLE:
${title}

CONTENT:
${content}
`

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  )

  if (!res.ok) throw new Error("Gemini request failed")

  const data = await res.json()

  const raw =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ?? ""

  const cleaned = raw.replace(/```json|```/g, "").trim()

  return JSON.parse(cleaned)
}

const SummaryButton: React.FC<Props> = ({ title, content }) => {

  const [isOpen, setIsOpen] = useState(false)
  const [summary, setSummary] = useState<SummaryResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [view, setView] = useState<"paragraph" | "bullets">("bullets")

  const handleClick = async () => {

    setIsOpen(true)
    setMessage(null)
    setSummary(null)

    if (!content || content.trim().length < MIN_CHAR_LENGTH) {
      setMessage("Content too short to summarize meaningfully.")
      return
    }

    if (countSentences(content) < MIN_SENTENCE_COUNT) {
      setMessage("Not enough informational sentences to summarize.")
      return
    }

    try {
      setLoading(true)

      const result = await generateExtractiveSummary(
        title,
        content
      )

      const joined = result.sentences.join(" ").trim()

      if (joined.length >= content.trim().length * 0.9) {
        setMessage(
          "Content already concise. Nothing meaningful to summarize."
        )
        return
      }

      setSummary(result)

    } catch {
      setMessage("Failed to generate summary.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="btn"
      >
        Summarize
      </button>

      <SummaryDrawer
        isOpen={isOpen}
        summary={summary}
        loading={loading}
        message={message}
        view={view}
        setView={setView}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}

export default SummaryButton