import { SketchCard } from '../components/SketchCard'

export function AboutPage() {
  return (
    <div className="grid gap-5">
      <SketchCard title="About" subtitle="AP Lang Essay Practice Dashboard">
        <div className="rounded-2xl border border-ink-900/10 bg-paper-100/60 p-4">
          <div className="font-hand text-2xl text-ink-900">Creator</div>
          <div className="mt-1 text-sm text-ink-800">Cathy Li</div>

          <div className="mt-5 font-hand text-2xl text-ink-900">Contact</div>
          <div className="mt-1 text-sm text-ink-800">
            <a className="underline" href="mailto:cathyzimingli19@gmail.com">
              cathyzimingli19@gmail.com
            </a>
          </div>
        </div>
      </SketchCard>
    </div>
  )
}

