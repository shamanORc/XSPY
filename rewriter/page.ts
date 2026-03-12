import GenericModulePage from '@/components/ui/GenericModulePage'
export default function RewriterPage() {
  return <GenericModulePage module="rewriter" moduleLabel="Copy Rewriter" title="Copy Rewriter" subtitle="5 variações de qualquer texto aplicando os gatilhos das copies que geraram bilhões" badge="Rewrite" endpoint="/api/rewriter" placeholder="Cole aqui o texto fraco ou mediano que você quer transformar em copy de alta conversão..." runLabel="⚡ Reescrever com Gatilhos" />
}
