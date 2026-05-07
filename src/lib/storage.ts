import type { Submission } from '../types'

const KEY = 'citruStudy.apLang.submissions.v1'

export function loadSubmissions(): Submission[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Submission[]
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

export function saveSubmissions(next: Submission[]) {
  localStorage.setItem(KEY, JSON.stringify(next))
}

export function upsertSubmission(submission: Submission) {
  const all = loadSubmissions()
  const idx = all.findIndex((s) => s.id === submission.id)
  const next = idx === -1 ? [submission, ...all] : all.map((s) => (s.id === submission.id ? submission : s))
  saveSubmissions(next)
  return next
}

export function getSubmission(submissionId: string) {
  return loadSubmissions().find((s) => s.id === submissionId) ?? null
}

export function clearAllSubmissions() {
  localStorage.removeItem(KEY)
}

