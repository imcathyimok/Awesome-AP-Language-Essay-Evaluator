import type { Evaluation, QuestionType, RubricRowScore } from '../types'

const AI_GRADER_SYSTEM_PROMPT = `System Prompt (English)
You are a maximally strict AP English Language reader. Your task is to score student essays conservatively according to the official AP scoring guidelines (Row A: Thesis 0–1 point, Row B: Evidence & Commentary 0–4 points, Row C: Sophistication 0–1 point). The final score is the sum of the three rows, with a maximum of 6 points. When in doubt, score lower. Do not reward near-misses, generic commentary, partially developed claims, or broad but unsupported assertions. A response must clearly, repeatedly, and explicitly satisfy the rubric to earn a point.

You will receive three types of essays:
- Type 1: Synthesis (uses at least 3 provided sources)
- Type 2: Rhetorical Analysis (analyzes rhetorical choices in a given passage)
- Type 3: Argument (argues a position on a given claim)

## Scoring Criteria (Based on Official AP Rubric)

### Row A – Thesis (0–1 point)
- 0 points: No defensible thesis; only restates the prompt; summarizes the issue with no coherent claim; thesis does not respond to the prompt.
- 1 point: Responds to the prompt with a defensible thesis that presents a clear, explicit position.
  For Type 2, the thesis must analyze the writer’s rhetorical choices (not just summarize content). Vague, implied, or purely thematic claims do not count.

### Row B – Evidence & Commentary (0–4 points)
- 0 points: Simply restates the thesis (if present), repeats provided information, or references fewer than two sources (Type 1) / offers irrelevant evidence.
- 1 point: Provides evidence (at least 2 sources for Type 1; general evidence for Types 2/3) BUT commentary mostly summarizes, labels, or paraphrases—there is little or no explanation of how the evidence advances the claim.
- 2 points:
  - Type 1: References at least 3 sources. Types 2/3: Provides some specific evidence.
  - Commentary is minimal or partial. The response may simply state what the evidence is, repeat it in different words, or make only a weak/implicit connection to the argument. The line of reasoning is underdeveloped.
- 3 points: Provides specific evidence to support claims in a line of reasoning, but the explanation is still incomplete, uneven, or only occasionally linked back to the claim. Do not award 3 for commentary that mainly identifies evidence without explaining its significance.
  For Type 2 (Rhetorical Analysis): Must also explain how at least one rhetorical choice contributes to the writer’s argument, purpose, or message in a concrete way.
- 4 points: Reserved only for responses with consistently specific evidence and consistently clear, precise commentary that repeatedly explains significance, not just content. If commentary is even somewhat generic or repetitive, cap at 3.
  For Type 2: Must explain how multiple rhetorical choices contribute to the writer’s argument, purpose, or message.
  Note: Writing with grammatical/mechanical errors that interfere with communication cannot earn 4 points, and polished language alone does not earn 4 points.

### Row C – Sophistication (0–1 point)
- 0 points: Does not meet the criteria for 1 point.
- 1 point: Demonstrates sophistication of thought and/or a complex understanding of the rhetorical situation. This should be sustained and integral, not occasional or decorative. This may include:
  - Crafting a nuanced argument by consistently identifying and exploring complexities or tensions (across sources for Type 1; within the passage for Type 2; within the issue for Type 3).
  - Articulating the implications or limitations of an argument by situating it within a broader context (historical, social, ethical, etc.).
  - Making effective rhetorical choices that consistently strengthen the force and impact of the argument.
  - Employing a style that is consistently vivid and persuasive.
  - A single concession, broad generalization, brief mention of context, or token counterargument is not enough.

## Scoring Procedure

1. Identify the essay type (1, 2, or 3).
2. Score each row:
   - Row A: 0 or 1
   - Row B: 0–4
   - Row C: 0 or 1
3. Calculate total: Row A + Row B + Row C = final score (out of 6).
4. Output format:
Scoring Results
Final Score: X / 6
Row A (Thesis): X/1
Row B (Evidence & Commentary): X/4
Row C (Sophistication): X/1

Detailed Feedback
Strengths:

Areas for Improvement:

Row-by-Row Comments:

## Important Constraints
- Base your score solely on what is actually written in the student’s essay. Do not infer missing content.
- For Type 1 (Synthesis), verify that at least three sources are explicitly cited (quotation, paraphrase, or summary).
- For Type 2 (Rhetorical Analysis), the thesis must explicitly name rhetorical choices (e.g., tone, imagery, anecdote, structure) — not just restate the passage’s main idea.
- If grammatical/mechanical errors significantly interfere with communication, Row B cannot earn 4 points (maximum 3).
- After scoring, provide at least two actionable recommendations for improvement, directly tied to points lost in Row B or Row C.`

const DEFAULT_API_URL = 'https://yinli.one/v1/chat/completions'
const DEFAULT_MODEL = 'gemini-5'

type AIGraderResponse = Evaluation

function extractJson(text: string) {
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start === -1 || end === -1 || end <= start) return null
  try {
    return JSON.parse(text.slice(start, end + 1)) as AIGraderResponse
  } catch {
    return null
  }
}

function readEnv(name: string) {
  return (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.[name]
}

async function aiGradeEssay(args: { type: QuestionType; promptTitle: string; essayText: string }): Promise<Evaluation | null> {
  const apiKey = readEnv('VITE_YINLI_API_KEY')
  if (!apiKey) return null

  const apiUrl = readEnv('VITE_YINLI_API_URL') ?? DEFAULT_API_URL
  const model = readEnv('VITE_YINLI_MODEL') ?? DEFAULT_MODEL

  const userPrompt = [
    `Prompt type: ${args.type}`,
    `Prompt title: ${args.promptTitle}`,
    '',
    'Essay:',
    args.essayText,
    '',
    'Return ONLY valid JSON matching this shape:',
    '{"total":0,"maxTotal":6,"rows":[{"label":"Row A — Thesis","score":0,"max":1,"note":""}],"strengths":[],"growth":[],"nextSteps":[]}',
  ].join('\n')

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: AI_GRADER_SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.2,
      }),
    })

    if (!res.ok) return null
    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>
      output_text?: string
      result?: unknown
    }

    const content = data.output_text ?? data.choices?.[0]?.message?.content
    if (typeof content === 'string') {
      const parsed = extractJson(content)
      if (parsed) return parsed
    }

    if (data.result && typeof data.result === 'object') return data.result as Evaluation
    return null
  } catch {
    return null
  }
}

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
  if (p1.length < 12) return false
  const stanceSignals = new RegExp(
    [
      'should',
      'must',
      'ought',
      'need(?:s| to)?',
      "can(?:not|'t)?",
      'is (?:more|less|important|valuable|effective|helpful|harmful|problematic|valid|invalid)',
      'should be',
      'is not',
      'does not',
      'would',
      'could',
      'may',
      'therefore',
      'because',
      'although',
      'while',
      'instead',
      'however',
      'in conversation with',
      'not (?:just|only)',
      'not merely',
      'rather than',
      'most important',
      'least effective',
      'best way',
      'the key',
      'the best',
    ].join('|'),
    'i',
  )
  return stanceSignals.test(p1)
}

function evidenceSignals(text: string, type: QuestionType) {
  const t = text.toLowerCase()
  const quoteLike = countMatches(text, /"[^"]{8,}"/g)
  const parenthetical = countMatches(text, /\([^)]+\)/g)
  const sourceLabels = countMatches(t, /\bsource\s*[a-f]\b/g)
  const examples = countMatches(t, /\bfor example\b|\bfor instance\b|\bsuch as\b|\bconsider\b/g)
  const rhetoricalTerms =
    type === 'rhetorical'
      ? countMatches(
          t,
          /\b(diction|syntax|imagery|metaphor|tone|appeal|ethos|pathos|logos|anecdote|parallel|juxtaposition|contrast|repetition|personification|allusion|rhetorical question|choice|purpose|effect)\b/g,
        )
      : 0
  return { quoteLike, parenthetical, sourceLabels, examples, rhetoricalTerms }
}

function sophisticationSignals(text: string) {
  const t = text.toLowerCase()
  const counter = /\b(although|while|however|on the other hand|nevertheless|yet|still|even so|at the same time|but|instead|rather than)\b/.test(t)
  const nuance = /\b(limitation|trade-?off|complicate|tension|context|mixed|both\b|not always|not necessarily|depends|in some cases|conversation with|hard-won|tested|resilient|dialogue)\b/.test(t)
  return counter || nuance
}

function localFallback(args: { type: QuestionType; essayText: string }): Evaluation {
  const { type, essayText } = args
  const words = essayText.trim().split(/\s+/).filter(Boolean).length
  const thesis = hasDefensibleThesis(essayText) ? 1 : 0

  const ev = evidenceSignals(essayText, type)
  const evScoreRaw =
    ev.sourceLabels * 0.9 + ev.quoteLike * 0.75 + ev.parenthetical * 0.25 + ev.examples * 0.15 + ev.rhetoricalTerms * 0.5
  const lengthBonus = words >= 800 ? 0.15 : words >= 550 ? 0.1 : 0

  let rowB = clamp(Math.round((evScoreRaw + lengthBonus) / 1.7), 0, 4)
  if (words < 120) rowB = Math.min(rowB, 1)
  if (words < 220) rowB = Math.min(rowB, 2)
  if (words < 350) rowB = Math.min(rowB, 3)

  const soph = sophisticationSignals(essayText) && words >= 220 ? 1 : 0

  const rows: RubricRowScore[] =
    type === 'rhetorical'
      ? [
          { label: 'Row A — Thesis (Rhetorical)', score: thesis, max: 1, note: thesis ? 'You make an arguable claim about the writer’s choices.' : 'Aim for a 1–2 sentence thesis that names choices + purpose/effect.' },
          { label: 'Row B — Evidence & Commentary', score: rowB, max: 4, note: rowB >= 3 ? 'Evidence is specific and you explain how choices build meaning.' : 'Add more specific textual moments and explain how they support your claim.' },
          { label: 'Row C — Sophistication', score: soph, max: 1, note: soph ? 'You add nuance (context, tension, or layered purpose).' : 'Push past “device spotting” by linking choices to situation + implications.' },
        ]
      : [
          { label: 'Row A — Thesis', score: thesis, max: 1, note: thesis ? 'You take a defensible position.' : 'State a clear, defensible position (not a summary).' },
          { label: 'Row B — Evidence & Commentary', score: rowB, max: 4, note: rowB >= 3 ? 'Evidence is specific and generally connected to claims.' : 'Use more specific evidence and explain how it supports each claim.' },
          { label: 'Row C — Sophistication', score: soph, max: 1, note: soph ? 'You acknowledge complexity (counterargument or limits).' : 'Add a thoughtful concession, tension, or broader implication.' },
        ]

  const total = (rows[0]?.score ?? 0) + (rows[1]?.score ?? 0) + (rows[2]?.score ?? 0)
  const strengths: string[] = []
  if (thesis) strengths.push('Defensible thesis/position is present early.')
  if (rowB >= 3) strengths.push('Specific evidence supports multiple claims.')
  if (type === 'rhetorical' && ev.rhetoricalTerms >= 1) strengths.push('You identify relevant rhetorical choices.')
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

export async function gradeEssay(args: {
  type: QuestionType
  promptTitle: string
  essayText: string
}): Promise<Evaluation> {
  const ai = await aiGradeEssay(args)
  if (ai && typeof ai.total === 'number' && Array.isArray(ai.rows)) return { ...ai, gradingSource: 'ai' }
  return { ...localFallback(args), gradingSource: 'local' }
}
