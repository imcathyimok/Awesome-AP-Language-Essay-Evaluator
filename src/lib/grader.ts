import type { Evaluation, QuestionType, RubricRowScore } from '../types'

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function countMatches(text: string, re: RegExp) {
  const m = text.match(re)
  return m ? m.length : 0
}

function firstNonEmptyParagraph(text: string) {
  return (
    text
      .split(/\n\s*\n/g)
      .map((p) => p.trim())
      .find(Boolean) ?? ''
  )
}

function hasDefensibleThesis(text: string) {
  const p1 = firstNonEmptyParagraph(text).toLowerCase()
  if (p1.length < 40) return false
  const stanceSignals = /(should|must|ought|is (?:more|less)|therefore|because|although|while|instead|however)/i
  return stanceSignals.test(p1)
}

function evidenceSignals(text: string, type: QuestionType) {
  const t = text.toLowerCase()
  const quoteLike = countMatches(text, /"[^"]{12,}"/g)
  const parenthetical = countMatches(text, /\([^)]+\)/g)
  const sourceLabels = countMatches(t, /\bsource\s*[a-f]\b/g)
  const examples = countMatches(t, /\bfor example\b|\bfor instance\b|\bsuch as\b/g)
  const rhetoricalTerms =
    type === 'rhetorical'
      ? countMatches(
          t,
          /\b(diction|syntax|imagery|metaphor|tone|appeal|ethos|pathos|logos|anecdote|parallel|juxtaposition|contrast)\b/g,
        )
      : 0
  return { quoteLike, parenthetical, sourceLabels, examples, rhetoricalTerms }
}

function sophisticationSignals(text: string) {
  const t = text.toLowerCase()
  const counter = /\b(although|while|however|on the other hand|nevertheless|yet)\b/.test(t)
  const nuance = /\b(limitation|trade-?off|complicate|tension|context)\b/.test(t)
  return counter || nuance
}

export function gradeEssay(args: {
  type: QuestionType
  promptTitle: string
  essayText: string
}): Evaluation {
  const { type, essayText } = args
  const words = essayText.trim().split(/\s+/).filter(Boolean).length
  const thesis = hasDefensibleThesis(essayText) ? 1 : 0

  const ev = evidenceSignals(essayText, type)
  const evScoreRaw =
    ev.sourceLabels * 0.9 + ev.quoteLike * 0.7 + ev.parenthetical * 0.3 + ev.examples * 0.2 + ev.rhetoricalTerms * 0.45
  const lengthBonus = words >= 650 ? 0.5 : words >= 450 ? 0.2 : 0

  // Generous Row B scoring: focused support should earn credit sooner.
  let rowB = clamp(Math.round((evScoreRaw + lengthBonus) / 1.2), 0, 4)

  // Guardrails: keep truly thin drafts from over-scoring.
  if (words < 140) rowB = Math.min(rowB, 1)
  if (words < 220) rowB = Math.min(rowB, 2)

  const soph = sophisticationSignals(essayText) && words >= 350 ? 1 : 0

  const rows: RubricRowScore[] =
    type === 'rhetorical'
      ? [
          {
            label: 'Row A — Thesis (Rhetorical)',
            score: thesis,
            max: 1,
            note: thesis
              ? 'You make an arguable claim about the writer’s choices.'
              : 'Aim for a 1–2 sentence thesis that names choices + purpose/effect.',
          },
          {
            label: 'Row B — Evidence & Commentary',
            score: rowB,
            max: 4,
            note:
              rowB >= 3
                ? 'Evidence is specific and you explain how choices build meaning.'
                : 'Add more specific textual moments and explain how they support your claim.',
          },
          {
            label: 'Row C — Sophistication',
            score: soph,
            max: 1,
            note: soph
              ? 'You add nuance (context, tension, or layered purpose).'
              : 'Push past “device spotting” by linking choices to situation + implications.',
          },
        ]
      : [
          {
            label: 'Row A — Thesis',
            score: thesis,
            max: 1,
            note: thesis ? 'You take a defensible position.' : 'State a clear, defensible position (not a summary).',
          },
          {
            label: 'Row B — Evidence & Commentary',
            score: rowB,
            max: 4,
            note:
              rowB >= 3
                ? 'Evidence is specific and generally connected to claims.'
                : 'Use more specific evidence and explain how it supports each claim.',
          },
          {
            label: 'Row C — Sophistication',
            score: soph,
            max: 1,
            note: soph
              ? 'You acknowledge complexity (counterargument or limits).'
              : 'Add a thoughtful concession, tension, or broader implication.',
          },
        ]

  const total = (rows[0]?.score ?? 0) + (rows[1]?.score ?? 0) + (rows[2]?.score ?? 0)

  const strengths: string[] = []
  if (thesis) strengths.push('Defensible thesis/position is present early.')
  if (rowB >= 3) strengths.push('Specific evidence supports multiple claims.')
  if (type === 'rhetorical' && ev.rhetoricalTerms >= 2) strengths.push('You identify relevant rhetorical choices.')
  if (soph) strengths.push('You include complexity (tension, limits, or counterargument).')
  if (strengths.length === 0) strengths.push('You have a starting draft — now aim for clarity + specificity.')

  const growth: string[] = []
  if (!thesis) growth.push('Write a sharper thesis (choice + purpose/effect OR stance + reason).')
  if (rowB <= 2) growth.push('Add more specific evidence and explain the “so what” after each quote/example.')
  if (!soph) growth.push('Add a concession or limitation and show why your position still holds.')

  const nextSteps: string[] = [
    type === 'synthesis'
      ? 'Underline three moments where you used sources; add 1–2 sentences explaining how each supports a claim.'
      : type === 'rhetorical'
        ? 'Pick 2–3 choices (not 6). For each: quote → name choice → explain effect → tie back to purpose.'
        : 'Add one paragraph that handles a counterargument and refines your position.',
    'Revise topic sentences so each paragraph makes a claim (not a summary).',
  ]

  return { total, maxTotal: 6, rows, strengths, growth, nextSteps }
}

