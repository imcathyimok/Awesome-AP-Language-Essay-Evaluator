import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SketchCard } from '../components/SketchCard'
import { gradeEssay } from '../lib/grader'
import { upsertSubmission } from '../lib/storage'
import type { QuestionType, Submission } from '../types'

const TYPE_LABEL: Record<QuestionType, string> = {
  argument: 'Argument',
  synthesis: 'Synthesis',
  rhetorical: 'Rhetorical Analysis',
}

export function CustomPage() {
  const [type, setType] = useState<QuestionType>('argument')
  const [promptText, setPromptText] = useState('')
  const [essayText, setEssayText] = useState('')
  const [fileName, setFileName] = useState<string | null>(null)
  const [promptFileName, setPromptFileName] = useState<string | null>(null)

  const navigate = useNavigate()

  async function onPickFile(file: File | null) {
    if (!file) return
    setFileName(file.name)
    const text = await file.text()
    setEssayText(text)
  }

  async function onPickPromptFile(file: File | null) {
    if (!file) return
    setPromptFileName(file.name)
    const text = await file.text()
    setPromptText(text)
  }

  async function onEvaluate() {
    if (!promptText.trim() || !essayText.trim()) return

    const evaluation = await gradeEssay({
      type,
      promptTitle: 'Custom prompt',
      essayText,
    })

    const submission: Submission = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      promptId: `custom-${type}`,
      promptType: type,
      promptTitle: `Custom • ${TYPE_LABEL[type]}`,
      promptYear: new Date().getFullYear(),
      promptSet: 0,
      essayText: `PROMPT:\n${promptText.trim()}\n\n---\n\nESSAY:\n${essayText.trim()}`,
      evaluation,
    }

    upsertSubmission(submission)
    navigate(`/results/${submission.id}`)
  }

  return (
    <div className="grid gap-5">
      <SketchCard
        title="Custom question evaluation"
        subtitle="Paste a teacher-made prompt (or your own) + your essay, then evaluate with the same 6-point shape."
      >
        <div className="flex flex-wrap gap-2">
          {(Object.keys(TYPE_LABEL) as QuestionType[]).map((k, i) => (
            <button
              key={k}
              type="button"
              onClick={() => setType(k)}
              className={[
                'marker-hover rounded-full border border-ink-900/15 px-4 py-2 text-sm font-semibold text-ink-900 shadow-sketch transition-transform hover:-translate-y-0.5',
                type === k ? 'bg-accent-yellow/35' : 'bg-paper-50/70',
                i % 2 === 0 ? '' : '',
              ].join(' ')}
            >
              {TYPE_LABEL[k]}
            </button>
          ))}
        </div>
      </SketchCard>

      <div className="grid gap-5 md:grid-cols-2">
        <SketchCard title="Prompt" subtitle="What are you responding to? (paste or upload)">
          <div className="flex flex-wrap items-center gap-2 pb-3">
            <label className="marker-hover cursor-pointer rounded-full border border-ink-900/15 bg-paper-50/70 px-4 py-2 text-sm font-semibold text-ink-900">
              Upload prompt file
              <input
                type="file"
                accept=".txt,.md"
                className="hidden"
                onChange={(e) => void onPickPromptFile(e.target.files?.[0] ?? null)}
              />
            </label>
            {promptFileName ? <span className="text-xs text-ink-700/80">Loaded: {promptFileName}</span> : null}
          </div>
          <textarea
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder="Paste your custom prompt here…"
            className="h-72 w-full resize-y rounded-2xl border border-ink-900/15 bg-paper-50/70 p-4 text-sm text-ink-900 shadow-sketch outline-none focus:border-ink-900/35"
          />
        </SketchCard>

        <SketchCard title="Essay" subtitle="Paste or upload a text file">
          <div className="flex flex-wrap items-center gap-2">
            <label className="marker-hover cursor-pointer rounded-full border border-ink-900/15 bg-paper-50/70 px-4 py-2 text-sm font-semibold text-ink-900">
              Upload text file
              <input
                type="file"
                accept=".txt,.md"
                className="hidden"
                onChange={(e) => void onPickFile(e.target.files?.[0] ?? null)}
              />
            </label>
            {fileName ? <span className="text-xs text-ink-700/80">Loaded: {fileName}</span> : null}
          </div>

          <textarea
            value={essayText}
            onChange={(e) => setEssayText(e.target.value)}
            placeholder="Paste your essay…"
            className="mt-3 h-72 w-full resize-y rounded-2xl border border-ink-900/15 bg-paper-50/70 p-4 text-sm text-ink-900 shadow-sketch outline-none focus:border-ink-900/35"
          />

          <div className="mt-3 flex items-center justify-end">
            <button
              type="button"
              disabled={!promptText.trim() || !essayText.trim()}
              onClick={onEvaluate}
              className="marker-hover rounded-full border border-ink-900/15 bg-accent-yellow/45 px-5 py-2 text-sm font-bold text-ink-900 disabled:opacity-50"
            >
              Evaluate
            </button>
          </div>
        </SketchCard>
      </div>
    </div>
  )
}

