import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export function SketchCard(props: {
  title?: ReactNode
  subtitle?: ReactNode
  right?: ReactNode
  children: ReactNode
  className?: string
  tilt?: -2 | -1 | 0 | 1 | 2
}) {
  return (
    <section className={cn('sketch-border bg-paper-50/85 shadow-paper', props.className)}>
      {(props.title || props.subtitle || props.right) && (
        <div className="flex items-start justify-between gap-4 px-5 pb-2 pt-5">
          <div>
            {props.title && <div className="font-hand text-lg text-ink-900">{props.title}</div>}
            {props.subtitle && <div className="mt-0.5 text-sm text-ink-700/80">{props.subtitle}</div>}
          </div>
          {props.right}
        </div>
      )}
      <div className="px-5 pb-5">{props.children}</div>
    </section>
  )
}

