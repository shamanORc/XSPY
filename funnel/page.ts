import GenericModulePage from '@/components/ui/GenericModulePage'
export default function FunnelPage() {
  return <GenericModulePage module="funnel" moduleLabel="Funil Completo" title="Gerador de Funil" subtitle="Topo, meio e fundo — copy, ads, emails e métricas para cada etapa do funil" badge="Funil" endpoint="/api/funnel" placeholder="Descreva seu produto/serviço, público-alvo e objetivo de vendas para gerar o funil completo..." runLabel="⚡ Gerar Funil Completo" />
}
