import { Link } from 'react-router-dom'
import { PencilLineChart } from '../components/PencilLineChart'
import { SketchCard } from '../components/SketchCard'
import { PROMPTS } from '../data/prompts'
import { clearAllSubmissions, loadSubmissions } from '../lib/storage'

function formatDateShort(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export function DashboardPage() {
  const submissions = loadSubmissions()

  const recent = submissions[0] ?? null
  const totalCount = submissions.length
  const validTotals = submissions
    .map((s) => s.evaluation.total)
    .filter((n): n is number => Number.isFinite(n))
  const avg =
    validTotals.length === 0
      ? 0
      : Math.round((validTotals.reduce((acc, n) => acc + n, 0) / validTotals.length) * 10) / 10

  const labels = submissions
    .slice()
    .reverse()
    .slice(-10)
    .map((s) => formatDateShort(s.createdAt))
  const values = submissions
    .slice()
    .reverse()
    .slice(-10)
    .map((s) => s.evaluation.total)

  const byType = submissions.reduce(
    (acc, s) => {
      acc[s.promptType]++
      return acc
    },
    { argument: 0, synthesis: 0, rhetorical: 0 } as Record<'argument' | 'synthesis' | 'rhetorical', number>,
  )
  const pdfPrompts = PROMPTS.filter((p) => p.pdfUrl)

  return (
    <div className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-3">
        <SketchCard
          title="Most recent score"
          subtitle={recent ? `${recent.promptYear} Set ${recent.promptSet} • ${recent.promptTitle}` : 'No submissions yet'}
          right={
            recent ? (
              <Link
                to={`/results/${recent.id}`}
                className="marker-hover rounded-full border border-ink-900/15 bg-paper-50/70 px-3 py-1.5 text-sm font-medium text-ink-900"
              >
                Open
              </Link>
            ) : null
          }
        >
          <div className="flex items-baseline gap-3">
            <div className="font-hand text-5xl text-ink-900">{recent ? recent.evaluation.total : '—'}</div>
            <div className="text-ink-700/70">/ 6</div>
          </div>
          {recent && (
            <div className="mt-2 text-sm text-ink-700/80">
              {new Date(recent.createdAt).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
            </div>
          )}
        </SketchCard>

        <SketchCard title="Overall average" subtitle="Across all submitted essays">
          <div className="flex items-baseline gap-3">
            <div className="font-hand text-5xl text-ink-900">{totalCount ? avg : '—'}</div>
            <div className="text-ink-700/70">/ 6</div>
          </div>
          <div className="mt-2 text-sm text-ink-700/80">{totalCount ? `${totalCount} total submissions` : 'Start with a prompt.'}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <div className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-900">
              AI Scored
            </div>
            <div className="rounded-full border border-ink-900/15 bg-paper-50/70 px-3 py-1.5 text-xs font-medium text-ink-700">
              Evaluated by claude-haiku-4-5
            </div>
          </div>
        </SketchCard>

        <SketchCard title="Practice mix" subtitle="How you’ve been practicing lately">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl border border-ink-900/10 bg-paper-100/60 px-3 py-3">
              <div className="font-hand text-2xl text-ink-900">{byType.argument}</div>
              <div className="text-xs text-ink-700/80">Argument</div>
            </div>
            <div className="rounded-2xl border border-ink-900/10 bg-paper-100/60 px-3 py-3">
              <div className="font-hand text-2xl text-ink-900">{byType.synthesis}</div>
              <div className="text-xs text-ink-700/80">Synthesis</div>
            </div>
            <div className="rounded-2xl border border-ink-900/10 bg-paper-100/60 px-3 py-3">
              <div className="font-hand text-2xl text-ink-900">{byType.rhetorical}</div>
              <div className="text-xs text-ink-700/80">Rhetorical</div>
            </div>
          </div>
        </SketchCard>
      </div>

      <SketchCard
        title="Score trend (last 10)"
        subtitle="A pencil-line snapshot of your progress"
        right={
          totalCount ? (
            <button
              type="button"
              onClick={() => {
                clearAllSubmissions()
                window.location.reload()
              }}
              className="marker-hover rounded-full border border-ink-900/15 bg-paper-50/70 px-3 py-1.5 text-sm font-medium text-ink-900"
            >
              Clear data
            </button>
          ) : null
        }
      >
        <div className="h-64">
          {totalCount ? (
            <PencilLineChart labels={labels} values={values} max={6} />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-ink-700/80">
              No data yet. Head to <Link className="ml-1 underline" to="/practice">Practice</Link>.
            </div>
          )}
        </div>
      </SketchCard>

      <SketchCard title="Original PDF packets" subtitle="Preview or download the official exam packets">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {pdfPrompts.map((p) => (
            <div key={p.id} className="rounded-2xl border border-ink-900/10 bg-paper-100/60 p-4">
              <div className="font-hand text-lg text-ink-900">{p.source.year} Set {p.source.set}</div>
              <div className="mt-1 text-sm text-ink-700/80">{p.title}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                <a href={p.pdfUrl} target="_blank" rel="noreferrer" className="marker-hover rounded-full border border-ink-900/15 bg-paper-50/70 px-3 py-1.5 text-xs font-medium text-ink-900">Preview</a>
                <a href={p.pdfUrl} download className="marker-hover rounded-full border border-ink-900/15 bg-accent-yellow/35 px-3 py-1.5 text-xs font-semibold text-ink-900">Download</a>
              </div>
            </div>
          ))}
        </div>
      </SketchCard>

      <div className="grid gap-5 md:grid-cols-2">
        <SketchCard title="Quick start" subtitle="Pick a prompt and write right away">
          <div className="flex flex-wrap gap-2">
            <Link
              to="/practice"
              className="marker-hover rounded-full border border-ink-900/15 bg-accent-yellow/35 px-4 py-2 text-sm font-semibold text-ink-900"
            >
              Browse prompts
            </Link>
            <Link
              to="/custom"
              className="marker-hover rounded-full border border-ink-900/15 bg-paper-50/70 px-4 py-2 text-sm font-semibold text-ink-900"
            >
              Evaluate a custom prompt
            </Link>
          </div>
        </SketchCard>

        <SketchCard title="Study tip" subtitle="Tiny habit, big score bump">
          <div className="rounded-2xl border border-ink-900/10 bg-paper-100/60 p-4">
            <div className="font-hand text-xl text-ink-900">Add a “so what?” sentence.</div>
            <div className="mt-1 text-sm text-ink-700/80">
              After each quote/example, write one sentence that explains how it proves your claim. That single move
              often upgrades Row B.
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-ink-900/10 bg-paper-50/70 px-4 py-3 text-sm text-ink-700/85">
            Evaluated by <span className="font-semibold text-ink-900">claude-haiku-4-5</span>
          </div>
        </SketchCard>
      </div>
    </div>
  )
}

