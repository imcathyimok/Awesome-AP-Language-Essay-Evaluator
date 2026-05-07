export type QuestionType = 'argument' | 'synthesis' | 'rhetorical'

export type PromptSource = {
  year: 2023 | 2024 | 2025
  set: 1 | 2
}

export type PromptSourcePacketItem = {
  label: string
  citation: string
  excerpt: string
  note?: string
  imageUrl?: string
  imageAlt?: string
}

export type Prompt = {
  id: string
  type: QuestionType
  title: string
  source: PromptSource
  promptText: string
  taskBullets: string[]
  pdfUrl?: string
  // For synthesis only: source labels list (A–F)
  synthesisSources?: string[]
  synthesisSourceText?: PromptSourcePacketItem[]
  // For rhetorical only: author/work context and excerpt may be long
  passageExcerpt?: string
  passageImageUrl?: string
}

export type RubricRowScore = {
  label: string
  score: number
  max: number
  note: string
}

export type Evaluation = {
  total: number
  maxTotal: 6
  rows: RubricRowScore[]
  strengths: string[]
  growth: string[]
  nextSteps: string[]
}

export type Submission = {
  id: string
  createdAt: string // ISO
  promptId: string
  promptType: QuestionType
  promptTitle: string
  promptYear: number
  promptSet: number
  essayText: string
  evaluation: Evaluation
}

