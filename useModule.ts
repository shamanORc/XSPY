'use client'
import { useState, useCallback } from 'react'
import { parseStream } from '@/lib/stream'
import { saveToHistory } from '@/lib/storage'
import toast from 'react-hot-toast'

export function useModule(module: string, moduleLabel: string) {
  const [output, setOutput]   = useState('')
  const [loading, setLoading] = useState(false)
  const [niche, setNiche]     = useState('SaaS/Tech')
  const [text, setText]       = useState('')

  const run = useCallback(async (
    endpoint: string,
    body: Record<string, any>,
    title: string,
  ) => {
    if (!body.text?.trim() && !body.url?.trim() && !body.prompt?.trim()) {
      toast.error('Insira um conteúdo ou texto')
      return ''
    }
    setLoading(true)
    setOutput('')
    let result = ''
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, niche }),
      })
      if (!res.ok) throw new Error('Erro na API')
      result = await parseStream(res, setOutput)
      if (result.length > 100) {
        saveToHistory({ module, moduleLabel, title, niche, output: result })
      }
    } catch (e: any) {
      toast.error(e.message || 'Erro ao processar')
    } finally {
      setLoading(false)
    }
    return result
  }, [module, moduleLabel, niche])

  const download = useCallback((filename: string) => {
    if (!output) return
    const blob = new Blob([output], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = filename + '.md'; a.click()
    URL.revokeObjectURL(url)
  }, [output])

  return { output, loading, niche, setNiche, text, setText, run, download }
}
