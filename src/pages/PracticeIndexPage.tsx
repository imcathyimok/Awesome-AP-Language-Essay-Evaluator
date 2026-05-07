import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SketchCard } from '../components/SketchCard'
import { cn } from '../lib/cn'
import { promptsByType } from '../data/prompts'
import type { QuestionType } from '../types'

const TYPE_LABEL: Record<QuestionType, string> = {
  argument: 'Argument',
  synthesis: 'Synthesis',
  rhetorical: 'Rhetorical Analysis',
}

export function PracticeIndexPage() {
  const [type, setType] = useState<QuestionType>('argument')
  const prompts = useMemo(() => promptsByType(type), [type])

  return (
    <div className="grid gap-5">
      <SketchCard
        title="Select a prompt & practice"
        subtitle="Choose from past exam prompts (2023–2025). Preview the task + rubric before you write."
      >
        <div className="flex flex-wrap gap-2">
          {(Object.keys(TYPE_LABEL) as QuestionType[]).map((k, i) => (
            <button
              key={k}
              type="button"
              onClick={() => setType(k)}
              className={cn(
                'marker-hover rounded-full border border-ink-900/15 px-4 py-2 text-sm font-semibold text-ink-900 shadow-sketch transition-transform hover:-translate-y-0.5',
                type === k ? 'bg-accent-yellow/35' : 'bg-paper-50/70',
                i % 2 === 0 ? '' : '',
              )}
            >
              {TYPE_LABEL[k]}
            </button>
          ))}
        </div>
      </SketchCard>

      <div className="grid gap-5 md:grid-cols-2">
        {prompts.map((p) => (
          <SketchCard
            key={p.id}
            title={
              <div className="flex items-center gap-2">
                <span className="font-hand text-xl">{p.source.year}</span>
                <span className="text-sm text-ink-700/70">Set {p.source.set}</span>
              </div>
            }
            subtitle={p.type === 'rhetorical' ? <span className="font-bold text-ink-900">{p.title}</span> : p.title}
            right={
              <Link
                to={`/practice/${p.id}`}
                className="marker-hover rounded-full border border-ink-900/15 bg-paper-50/70 px-3 py-1.5 text-sm font-medium text-ink-900"
              >
                Open
              </Link>
            }
          >
            <div className="text-sm text-ink-700/80">{p.promptText}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-ink-900/10 bg-paper-100/60 px-3 py-1 text-xs text-ink-800">
                {TYPE_LABEL[p.type]}
              </span>
              <span className="rounded-full border border-ink-900/10 bg-paper-100/60 px-3 py-1 text-xs text-ink-800">
                6-point rubric
              </span>
            </div>
          </SketchCard>
        ))}
      </div>
    </div>
  )
}

