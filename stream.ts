export async function parseStream(
  res: Response,
  onChunk: (text: string) => void
): Promise<string> {
  const reader = res.body!.getReader()
  const decoder = new TextDecoder()
  let full = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    const lines = decoder.decode(value).split('\n')
    for (const line of lines) {
      if (!line.startsWith('data: ')) continue
      try {
        const data = JSON.parse(line.slice(6))
        const text = data?.delta?.text || data?.content?.[0]?.text || ''
        if (text) { full += text; onChunk(full) }
      } catch {}
    }
  }
  return full
}
