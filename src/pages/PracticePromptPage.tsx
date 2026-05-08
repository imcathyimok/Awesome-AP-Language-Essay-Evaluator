import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SketchCard } from '../components/SketchCard'
import { promptById } from '../data/prompts'
import { gradeEssay } from '../lib/grader'
import { upsertSubmission } from '../lib/storage'
import type { Submission } from '../types'

function highlightWriteAnEssay(text: string) {
  const re = /(write an essay[^.]*\.)/i
  const match = text.match(re)
  if (!match) return text
  return text.replace(re, '<mark class="rounded bg-accent-yellow/50 px-1 py-0.5 font-semibold text-ink-900">$1</mark>')
}

export function PracticePromptPage() {
  const { promptId } = useParams()
  const prompt = useMemo(() => (promptId ? promptById(promptId) : null), [promptId])
  const navigate = useNavigate()

  const [essayText, setEssayText] = useState('')
  const [busy, setBusy] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [secondsLeft, setSecondsLeft] = useState(45 * 60)
  const [timerRunning, setTimerRunning] = useState(false)
  const [customMinutes, setCustomMinutes] = useState('45')
  const [alarmPlayed, setAlarmPlayed] = useState(false)
  const [zoomedImage, setZoomedImage] = useState<{ src: string; alt: string } | null>(null)

  useEffect(() => {
    if (!timerRunning) return
    const interval = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setTimerRunning(false)
          if (!alarmPlayed) {
            try {
              const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
              if (AudioCtx) {
                const ctx = new AudioCtx()
                const osc = ctx.createOscillator()
                const gain = ctx.createGain()
                osc.type = 'sine'
                osc.frequency.value = 880
                gain.gain.value = 0.05
                osc.connect(gain)
                gain.connect(ctx.destination)
                osc.start()
                osc.stop(ctx.currentTime + 0.18)
                osc.onended = () => ctx.close()
              }
            } catch {
              // no-op if audio fails
            }
            setAlarmPlayed(true)
          }
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => window.clearInterval(interval)
  }, [timerRunning, alarmPlayed])

  if (!prompt) {
    return (
      <SketchCard title="Prompt not found" subtitle="Try going back to Practice.">
        <div className="text-sm text-ink-700/80">This prompt ID doesn’t exist in the current prompt list.</div>
      </SketchCard>
    )
  }

  const p = prompt
  const timerLabel = `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, '0')}`

  async function onPickFile(file: File | null) {
    if (!file) return
    setFileName(file.name)
    setEssayText(await file.text())
  }

  async function onSubmit() {
    if (!essayText.trim()) return
    setBusy(true)
    setTimerRunning(false)
    try {
      const evaluation = await gradeEssay({ type: p.type, promptTitle: p.title, essayText })
      const submission: Submission = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        promptId: p.id,
        promptType: p.type,
        promptTitle: p.title,
        promptYear: p.source.year,
        promptSet: p.source.set,
        essayText,
        evaluation,
      }
      upsertSubmission(submission)
      navigate(`/results/${submission.id}`)
    } catch (error) {
      console.error(error)
      window.alert('AI grading is not available right now. Please check your API key and connection.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid gap-5">
      <SketchCard
        title={`${p.source.year} • Set ${p.source.set}`}
        subtitle={p.title}
        right={
          <div className="flex items-center gap-2">
            <div className="rounded-full border border-ink-900/10 bg-paper-100/60 px-3 py-1 text-xs text-ink-800">
              {p.type === 'argument' ? 'Argument' : p.type === 'synthesis' ? 'Synthesis' : 'Rhetorical'}
            </div>
            <button
              type="button"
              onClick={() => setTimerRunning((v) => !v)}
              className="marker-hover rounded-full border border-ink-900/15 bg-accent-yellow/35 px-3 py-1 text-xs font-semibold text-ink-900"
            >
              {timerRunning ? 'Pause timer' : 'Start timer'}
            </button>
          </div>
        }
      >
        <div className="flex flex-wrap items-end justify-between gap-3 rounded-2xl border border-ink-900/10 bg-paper-100/60 p-4">
          <div>
            <div className="text-xs uppercase tracking-wide text-ink-700/70">Timer</div>
            <div className="font-hand text-3xl text-ink-900">{timerLabel}</div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="number"
              min={1}
              value={customMinutes}
              onChange={(e) => setCustomMinutes(e.target.value)}
              className="w-24 rounded-full border border-ink-900/15 bg-paper-50/70 px-3 py-2 text-sm outline-none"
            />
            <button
              type="button"
              onClick={() => {
                setAlarmPlayed(false)
                setSecondsLeft(Math.max(1, Number(customMinutes || 45)) * 60)
              }}
              className="marker-hover rounded-full border border-ink-900/15 bg-paper-50/70 px-3 py-1.5 text-sm font-medium text-ink-900"
            >
              Set minutes
            </button>
            <button
              type="button"
              onClick={() => {
                setAlarmPlayed(false)
                setSecondsLeft(45 * 60)
              }}
              className="marker-hover rounded-full border border-ink-900/15 bg-paper-50/70 px-3 py-1.5 text-sm font-medium text-ink-900"
            >
              Reset to 45:00
            </button>
          </div>
        </div>
        <div className="mt-2 text-xs text-ink-700/75">Ideal timing suggestion: 45 minutes is the best practice target for this essay.</div>
      </SketchCard>

      <div className="grid gap-5 xl:grid-cols-2 xl:items-start">
        <div className="xl:sticky xl:top-4 xl:self-start">
          <SketchCard title="Prompt and sources" subtitle="Read everything here while you write in the other panel">
            <div className="max-h-[calc(100vh-11rem)] overflow-y-auto pr-1 grid gap-4">
              <div className="rounded-2xl border border-ink-900/10 bg-paper-100/60 p-4">
                <div className="text-xs uppercase tracking-wide text-ink-700/70">Prompt</div>
                <div
                  className="mt-2 whitespace-pre-wrap text-sm leading-7 text-ink-800"
                  dangerouslySetInnerHTML={{ __html: highlightWriteAnEssay(p.promptText) }}
                />
                {p.type === 'rhetorical' ? <div className="mt-2 font-bold text-ink-900">{p.title}</div> : null}
              </div>

              {p.taskBullets?.length ? (
                <div className="rounded-2xl border border-ink-900/10 bg-paper-100/60 p-4">
                  <div className="font-hand text-lg text-ink-900">What your essay must do</div>
                  <ul className="mt-2 list-disc pl-5 text-sm leading-7 text-ink-700/90">
                    {p.taskBullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </div>
              ) : null}

              {p.synthesisSources?.length ? (
                <div className="rounded-2xl border border-ink-900/10 bg-paper-100/60 p-4">
                  <div className="font-hand text-lg text-ink-900">Synthesis sources</div>
                  <ul className="mt-2 list-disc pl-5 text-sm leading-7 text-ink-700/90">
                    {p.synthesisSources.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                </div>
              ) : null}

              {p.pdfUrl ? (
                <div className="rounded-2xl border border-ink-900/10 bg-paper-100/60 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="font-hand text-lg text-ink-900">Original PDF</div>
                      <div className="text-xs text-ink-700/75">Open the source packet for this set.</div>
                    </div>
                    <a href={p.pdfUrl} target="_blank" rel="noreferrer" className="marker-hover rounded-full border border-ink-900/15 bg-paper-50/70 px-3 py-1.5 text-sm font-medium text-ink-900">View PDF</a>
                  </div>
                </div>
              ) : null}

              {p.synthesisSourceText?.length ? (
                <div className="rounded-2xl border border-ink-900/10 bg-paper-100/60 p-4">
                  <div className="font-hand text-lg text-ink-900">Full source packet</div>
                  <div className="mt-3 grid gap-4">
                    {p.synthesisSourceText.map((src) => (
                      <section key={src.label} className="rounded-2xl border border-ink-900/10 bg-paper-50/90 px-4 py-4">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <div className="font-hand text-2xl text-ink-900">{src.label}</div>
                          <div className="text-xs text-ink-700/80">{src.citation}</div>
                        </div>
                        {src.note ? <div className="mt-2 text-xs italic text-ink-700/75">{src.note}</div> : null}
                        {src.imageUrl ? (
                          <button
                            type="button"
                            onClick={() => setZoomedImage({ src: src.imageUrl!, alt: src.imageAlt ?? src.label })}
                            className="mt-3 block w-full overflow-hidden rounded-2xl border border-ink-900/10 bg-white text-left"
                            title="Click to zoom"
                          >
                            <img src={src.imageUrl} alt={src.imageAlt ?? src.label} className="h-auto w-full object-contain transition-transform duration-200 hover:scale-[1.01]" />
                          </button>
                        ) : null}
                        <div className="mt-3 whitespace-pre-wrap text-sm leading-7 text-ink-800/90">{src.excerpt}</div>
                      </section>
                    ))}
                  </div>
                </div>
              ) : null}

              {p.passageExcerpt ? (
                <div className="rounded-2xl border border-ink-900/10 bg-paper-100/60 p-4">
                  <div className="font-hand text-lg text-ink-900">Full reading</div>
                  {p.passageImageUrl ? (
                    <button
                      type="button"
                      onClick={() => setZoomedImage({ src: p.passageImageUrl!, alt: p.title })}
                      className="mt-3 block w-full overflow-hidden rounded-2xl border border-ink-900/10 bg-white text-left"
                      title="Click to zoom"
                    >
                      <img src={p.passageImageUrl} alt={p.title} className="h-auto w-full object-contain transition-transform duration-200 hover:scale-[1.01]" />
                    </button>
                  ) : null}
                  <div className="mt-3 whitespace-pre-wrap text-sm leading-7 text-ink-700/90">{p.passageExcerpt}</div>
                </div>
              ) : null}
            </div>
          </SketchCard>
        </div>

        <div className="xl:sticky xl:top-4 xl:self-start">
          <SketchCard title="Your writing space" subtitle="Read on the left and type on the right">
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
              placeholder="Write here…"
              className="mt-3 h-[42rem] w-full resize-y rounded-2xl border border-ink-900/15 bg-paper-50/70 p-4 font-sans text-sm text-ink-900 shadow-sketch outline-none focus:border-ink-900/35"
            />

            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="text-xs text-ink-700/75">Tip: Use 2–3 body paragraphs with clear topic sentences + “so what?” explanation after evidence.</div>
              <button
                type="button"
                disabled={busy || !essayText.trim()}
                onClick={onSubmit}
                className="marker-hover rounded-full border border-ink-900/15 bg-accent-yellow/45 px-5 py-2 text-sm font-bold text-ink-900 disabled:opacity-50"
              >
                Submit for grading
              </button>
            </div>
          </SketchCard>
        </div>
      </div>

      {zoomedImage ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setZoomedImage(null)}
          role="presentation"
        >
          <div className="max-h-[92vh] max-w-[92vw] overflow-auto rounded-2xl bg-paper-50 p-3 shadow-2xl" onClick={(e) => e.stopPropagation()} role="presentation">
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-ink-900">Zoomed image</div>
              <button
                type="button"
                onClick={() => setZoomedImage(null)}
                className="marker-hover rounded-full border border-ink-900/15 bg-paper-100/80 px-3 py-1 text-sm font-medium text-ink-900"
              >
                Close
              </button>
            </div>
            <img src={zoomedImage.src} alt={zoomedImage.alt} className="max-h-[85vh] w-auto max-w-[90vw] object-contain" />
          </div>
        </div>
      ) : null}
    </div>
  )
}
