"use client";

import { useState } from "react";
import { 
  Users,
  DollarSign,
  TrendingUp,
  Bell,
  LogOut,
  Link as LinkIcon,
  Copy,
  CheckCircle2,
  Calendar,
  BarChart3,
  Eye,
  Download,
  Share2
} from "lucide-react";

export default function AfiliadoPage() {
  const [copied, setCopied] = useState(false);

  // Dados mockados do afiliado
  const afiliadoData = {
    nome: "João Silva",
    email: "joao@email.com",
    linkAfiliado: "https://nutrix.com/ref/joaosilva",
    assinaturasAtivas: 12,
    assinaturasTotal: 15,
    ganhoMensal: 96.00,
    ganhoTotal: 384.00,
    taxaConversao: 8.5,
    dataCadastro: "15/12/2024"
  };

  // Histórico de assinaturas
  const assinaturas = [
    { id: 1, cliente: "Roberto Alves", status: "ativa", valor: 8.00, dataInicio: "01/01/2025", proximoPagamento: "01/02/2025" },
    { id: 2, cliente: "Fernanda Lima", status: "ativa", valor: 8.00, dataInicio: "28/12/2024", proximoPagamento: "28/01/2025" },
    { id: 3, cliente: "Lucas Souza", status: "cancelada", valor: 0.00, dataInicio: "20/12/2024", dataCancelamento: "05/01/2025" },
    { id: 4, cliente: "Mariana Costa", status: "ativa", valor: 8.00, dataInicio: "15/12/2024", proximoPagamento: "15/01/2025" },
  ];

  // Histórico de comissões
  const comissoes = [
    { mes: "Janeiro/2025", assinaturas: 12, valor: 96.00, status: "pendente", dataPagamento: "05/02/2025" },
    { mes: "Dezembro/2024", assinaturas: 10, valor: 80.00, status: "pago", dataPagamento: "05/01/2025" },
    { mes: "Novembro/2024", assinaturas: 8, valor: 64.00, status: "pago", dataPagamento: "05/12/2024" },
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(afiliadoData.linkAfiliado);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Fixo */}
      <header className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-[#00C897]/20 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <span className="text-2xl font-bold">
              Nutri<span className="text-[#00C897]">X</span> <span className="text-sm text-gray-400">Afiliado</span>
            </span>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              {/* Notificações */}
              <button className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#00C897] rounded-full"></span>
              </button>

              {/* Perfil */}
              <div className="flex items-center gap-3 bg-gray-900 rounded-full px-4 py-2 hover:bg-gray-800 transition-colors cursor-pointer">
                <div className="w-8 h-8 bg-gradient-to-br from-[#00C897] to-[#00B087] rounded-full flex items-center justify-center text-black font-bold text-sm">
                  {afiliadoData.nome.charAt(0)}
                </div>
                <span className="hidden sm:block text-sm font-semibold">{afiliadoData.nome}</span>
              </div>

              {/* Sair */}
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Saudação */}
          <div className="mt-4">
            <h1 className="text-xl sm:text-2xl font-bold">
              Olá, {afiliadoData.nome}! <span className="text-[#00C897]">Acompanhe seus ganhos e performance</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle2 className="w-8 h-8 text-[#00C897]" />
                <span className="text-xs text-gray-400">Ativas</span>
              </div>
              <div className="text-3xl font-bold text-white">{afiliadoData.assinaturasAtivas}</div>
              <div className="text-sm text-gray-400">Assinaturas Ativas</div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-8 h-8 text-green-500" />
                <span className="text-xs text-gray-400">Este mês</span>
              </div>
              <div className="text-3xl font-bold text-green-500">R$ {afiliadoData.ganhoMensal.toFixed(2)}</div>
              <div className="text-sm text-gray-400">Ganho Mensal</div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-blue-500" />
                <span className="text-xs text-gray-400">Total</span>
              </div>
              <div className="text-3xl font-bold text-blue-500">R$ {afiliadoData.ganhoTotal.toFixed(2)}</div>
              <div className="text-sm text-gray-400">Ganho Total</div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <BarChart3 className="w-8 h-8 text-purple-500" />
                <span className="text-xs text-gray-400">Taxa</span>
              </div>
              <div className="text-3xl font-bold text-purple-500">{afiliadoData.taxaConversao}%</div>
              <div className="text-sm text-gray-400">Conversão</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Coluna Principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Link de Afiliado */}
              <section className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-[#00C897]/10 p-3 rounded-xl">
                    <LinkIcon className="w-6 h-6 text-[#00C897]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Seu Link de Afiliado</h2>
                    <p className="text-sm text-gray-400">Compartilhe e ganhe R$ 8,00 por assinatura ativa</p>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-3">
                    <input 
                      type="text"
                      value={afiliadoData.linkAfiliado}
                      readOnly
                      className="flex-1 bg-transparent text-white text-sm focus:outline-none"
                    />
                    <button 
                      onClick={copyLink}
                      className="bg-[#00C897] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#00B087] transition-all flex items-center gap-2"
                    >
                      {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? "Copiado!" : "Copiar"}
                    </button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  <button className="bg-gray-800 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all flex items-center justify-center gap-2">
                    <Share2 className="w-4 h-4" />
                    WhatsApp
                  </button>
                  <button className="bg-gray-800 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all flex items-center justify-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Instagram
                  </button>
                  <button className="bg-gray-800 text-white px-4 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all flex items-center justify-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Facebook
                  </button>
                </div>

                <div className="mt-4 bg-[#00C897]/10 border border-[#00C897]/30 rounded-xl p-4">
                  <p className="text-sm text-gray-300">
                    💡 <span className="font-semibold">Dica:</span> Compartilhe seu link em suas redes sociais, grupos de WhatsApp e com amigos interessados em fitness e nutrição!
                  </p>
                </div>
              </section>

              {/* Minhas Assinaturas */}
              <section className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#00C897]/10 p-3 rounded-xl">
                      <Users className="w-6 h-6 text-[#00C897]" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Minhas Assinaturas</h2>
                      <p className="text-sm text-gray-400">{afiliadoData.assinaturasAtivas} ativas de {afiliadoData.assinaturasTotal} total</p>
                    </div>
                  </div>
                  <button className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-all flex items-center gap-2 text-sm">
                    <Download className="w-4 h-4" />
                    Exportar
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Cliente</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-gray-400">Status</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-gray-400">Comissão</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-gray-400">Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assinaturas.map((assinatura) => (
                        <tr key={assinatura.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                          <td className="py-4 px-4">
                            <span className="font-semibold text-white">{assinatura.cliente}</span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              assinatura.status === "ativa" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                            }`}>
                              {assinatura.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`font-bold ${assinatura.status === "ativa" ? "text-green-500" : "text-gray-500"}`}>
                              R$ {assinatura.valor.toFixed(2)}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="text-sm text-gray-400">{assinatura.dataInicio}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Histórico de Comissões */}
              <section className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-[#00C897]/10 p-3 rounded-xl">
                    <Calendar className="w-6 h-6 text-[#00C897]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Histórico de Comissões</h2>
                    <p className="text-sm text-gray-400">Pagamentos mensais</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {comissoes.map((comissao, i) => (
                    <div key={i} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:border-[#00C897] transition-all">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-white">{comissao.mes}</div>
                          <div className="text-sm text-gray-400">{comissao.assinaturas} assinaturas ativas</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#00C897]">R$ {comissao.valor.toFixed(2)}</div>
                          <div className="flex items-center gap-2 justify-end mt-1">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              comissao.status === "pago" ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
                            }`}>
                              {comissao.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 text-xs text-gray-500">
                        {comissao.status === "pago" ? `Pago em ${comissao.dataPagamento}` : `Pagamento previsto para ${comissao.dataPagamento}`}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Coluna Lateral */}
            <div className="space-y-6">
              {/* Resumo de Performance */}
              <section className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-6 sticky top-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-[#00C897]/10 p-3 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-[#00C897]" />
                  </div>
                  <h2 className="text-xl font-bold">Performance</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Taxa de conversão</span>
                      <span className="text-sm font-bold text-[#00C897]">{afiliadoData.taxaConversao}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#00C897] to-[#00B087] h-2 rounded-full"
                        style={{ width: `${afiliadoData.taxaConversao * 10}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Cliques no link</div>
                    <div className="text-2xl font-bold text-white">176</div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Conversões</div>
                    <div className="text-2xl font-bold text-[#00C897]">{afiliadoData.assinaturasTotal}</div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Afiliado desde</div>
                    <div className="text-sm font-semibold text-white">{afiliadoData.dataCadastro}</div>
                  </div>
                </div>

                <div className="mt-6 bg-[#00C897]/10 border border-[#00C897]/30 rounded-xl p-4">
                  <p className="text-sm text-gray-300 text-center">
                    Continue compartilhando seu link para aumentar seus ganhos! 💪
                  </p>
                </div>
              </section>

              {/* Informações */}
              <section className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-6">
                <h3 className="text-lg font-bold mb-4">Como funciona?</h3>
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#00C897] rounded-full flex items-center justify-center text-black font-bold text-xs flex-shrink-0">1</div>
                    <p>Compartilhe seu link exclusivo</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#00C897] rounded-full flex items-center justify-center text-black font-bold text-xs flex-shrink-0">2</div>
                    <p>Pessoas se cadastram através do seu link</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#00C897] rounded-full flex items-center justify-center text-black font-bold text-xs flex-shrink-0">3</div>
                    <p>Você ganha R$ 8,00 por cada assinatura ativa mensalmente</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-800">
                  <p className="text-xs text-gray-400 text-center">
                    Ganhos recorrentes enquanto as assinaturas estiverem ativas!
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-gray-400 mb-2">
            <span className="font-bold text-white">NutriX</span> – Programa de Afiliados
          </p>
          <p className="text-xs text-gray-600 mt-4">
            © 2025 NutriX. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
