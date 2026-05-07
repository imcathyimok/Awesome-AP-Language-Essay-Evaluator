import { Link, useParams } from 'react-router-dom'
import { SketchCard } from '../components/SketchCard'
import { getSubmission } from '../lib/storage'

export function ResultsPage() {
  const { submissionId } = useParams()
  const submission = submissionId ? getSubmission(submissionId) : null

  if (!submission) {
    return (
      <SketchCard title="Result not found" subtitle="This submission isn’t in local storage.">
        <div className="text-sm text-ink-700/80">
          Try going back to <Link className="underline" to="/practice">Practice</Link> and submitting again.
        </div>
      </SketchCard>
    )
  }

  const e = submission.evaluation

  return (
    <div className="grid gap-5">
      <SketchCard
        title="Results card"
        subtitle={`${submission.promptYear} Set ${submission.promptSet} • ${submission.promptTitle}`}
        right={
          <Link
            to={`/practice/${submission.promptId}`}
            className="marker-hover rounded-full border border-ink-900/15 bg-paper-50/70 px-3 py-1.5 text-sm font-medium text-ink-900"
          >
            Practice again
          </Link>
        }
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <div className="font-hand text-6xl text-ink-900">{e.total}</div>
            <div className="text-ink-700/70">/ {e.maxTotal}</div>
          </div>
          <div className="text-sm text-ink-700/80">
            {new Date(submission.createdAt).toLocaleString(undefined, {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      </SketchCard>

      <div className="grid gap-5 md:grid-cols-2">
        <SketchCard title="Rubric breakdown" subtitle="Rows A–C">
          <div className="grid gap-2">
            {e.rows.map((r) => (
              <div
                key={r.label}
                className="rounded-2xl border border-ink-900/10 bg-paper-100/60 px-4 py-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-hand text-lg text-ink-900">{r.label}</div>
                    <div className="mt-0.5 text-sm text-ink-700/80">{r.note}</div>
                  </div>
                  <div className="font-hand text-3xl text-ink-900">
                    {r.score}
                    <span className="text-ink-700/70">/{r.max}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SketchCard>

        <div className="grid gap-5">
          <SketchCard title="Sticky-note feedback" subtitle="Actionable + kind">
            <div className="grid gap-3">
              <div className="rounded-2xl border border-ink-900/10 bg-[rgba(246,216,75,0.28)] p-4">
                <div className="font-hand text-xl text-ink-900">Strengths</div>
                <ul className="mt-2 list-disc pl-5 text-sm text-ink-800/90">
                  {e.strengths.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-ink-900/10 bg-[rgba(255,107,107,0.18)] p-4">
                <div className="font-hand text-xl text-ink-900">Areas to grow</div>
                <ul className="mt-2 list-disc pl-5 text-sm text-ink-800/90">
                  {e.growth.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-ink-900/10 bg-[rgba(45,183,163,0.16)] p-4">
                <div className="font-hand text-xl text-ink-900">Next steps</div>
                <ol className="mt-2 list-decimal pl-5 text-sm text-ink-800/90">
                  {e.nextSteps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              </div>
            </div>
          </SketchCard>

          <SketchCard title="Your essay" subtitle="Saved locally for review">
            <div className="max-h-72 overflow-auto whitespace-pre-wrap rounded-2xl border border-ink-900/10 bg-paper-50/70 p-4 text-sm text-ink-900">
              {submission.essayText}
            </div>
            <div className="mt-3">
              <Link className="underline text-sm text-ink-800" to="/">
                Back to dashboard
              </Link>
            </div>
          </SketchCard>
        </div>
      </div>
    </div>
  )
}

