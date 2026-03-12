'use client'

export type HistoryItem = {
  id: string
  module: string
  moduleLabel: string
  title: string
  niche: string
  output: string
  createdAt: string
}

const KEY = 'xspy_history'

export function saveToHistory(item: Omit<HistoryItem, 'id' | 'createdAt'>) {
  const items = getHistory()
  const newItem: HistoryItem = {
    ...item,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  const updated = [newItem, ...items].slice(0, 200) // max 200 items
  localStorage.setItem(KEY, JSON.stringify(updated))
  return newItem
}

export function getHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export function deleteHistoryItem(id: string) {
  const items = getHistory().filter(i => i.id !== id)
  localStorage.setItem(KEY, JSON.stringify(items))
}

export function clearHistory() {
  localStorage.removeItem(KEY)
}

export function getHistoryByModule(module: string): HistoryItem[] {
  return getHistory().filter(i => i.module === module)
}
