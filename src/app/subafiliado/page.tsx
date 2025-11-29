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
  Download,
  Share2,
  Eye
} from "lucide-react";

export default function SubafiliadoPage() {
  const [copied, setCopied] = useState(false);

  // Dados mockados do subafiliado
  const subafiliadoData = {
    nome: "Carlos Lima",
    email: "carlos@email.com",
    linkSubafiliado: "https://nutrix.com/ref/carloslima",
    afiliadosIndicados: 3,
    assinaturasTotal: 18,
    ganhoMensal: 46.80,
    ganhoTotal: 187.20,
    taxaConversao: 12.5,
    dataCadastro: "10/12/2024"
  };

  // Afiliados indicados
  const afiliadosIndicados = [
    { id: 1, nome: "João Silva", email: "joao@email.com", assinaturas: 8, ganhoGerado: 20.80, status: "ativo", dataIndicacao: "15/12/2024" },
    { id: 2, nome: "Maria Santos", email: "maria@email.com", assinaturas: 6, ganhoGerado: 15.60, status: "ativo", dataIndicacao: "20/12/2024" },
    { id: 3, nome: "Pedro Costa", email: "pedro@email.com", assinaturas: 4, ganhoGerado: 10.40, status: "ativo", dataIndicacao: "28/12/2024" },
  ];

  // Histórico de comissões
  const comissoes = [
    { mes: "Janeiro/2025", afiliados: 3, assinaturas: 18, valor: 46.80, status: "pendente", dataPagamento: "05/02/2025" },
    { mes: "Dezembro/2024", afiliados: 3, assinaturas: 15, valor: 39.00, status: "pago", dataPagamento: "05/01/2025" },
    { mes: "Novembro/2024", afiliados: 2, assinaturas: 10, valor: 26.00, status: "pago", dataPagamento: "05/12/2024" },
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(subafiliadoData.linkSubafiliado);
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
              Nutri<span className="text-[#00C897]">X</span> <span className="text-sm text-gray-400">Subafiliado</span>
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
                  {subafiliadoData.nome.charAt(0)}
                </div>
                <span className="hidden sm:block text-sm font-semibold">{subafiliadoData.nome}</span>
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
              Olá, {subafiliadoData.nome}! <span className="text-[#00C897]">Acompanhe sua rede de afiliados</span>
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
                <Users className="w-8 h-8 text-[#00C897]" />
                <span className="text-xs text-gray-400">Ativos</span>
              </div>
              <div className="text-3xl font-bold text-white">{subafiliadoData.afiliadosIndicados}</div>
              <div className="text-sm text-gray-400">Afiliados Indicados</div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <CheckCircle2 className="w-8 h-8 text-blue-500" />
                <span className="text-xs text-gray-400">Total</span>
              </div>
              <div className="text-3xl font-bold text-blue-500">{subafiliadoData.assinaturasTotal}</div>
              <div className="text-sm text-gray-400">Assinaturas Geradas</div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-8 h-8 text-purple-500" />
                <span className="text-xs text-gray-400">Este mês</span>
              </div>
              <div className="text-3xl font-bold text-purple-500">R$ {subafiliadoData.ganhoMensal.toFixed(2)}</div>
              <div className="text-sm text-gray-400">Ganho Mensal</div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-green-500" />
                <span className="text-xs text-gray-400">Total</span>
              </div>
              <div className="text-3xl font-bold text-green-500">R$ {subafiliadoData.ganhoTotal.toFixed(2)}</div>
              <div className="text-sm text-gray-400">Ganho Total</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Coluna Principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Link de Subafiliado */}
              <section className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-[#00C897]/10 p-3 rounded-xl">
                    <LinkIcon className="w-6 h-6 text-[#00C897]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Seu Link de Subafiliado</h2>
                    <p className="text-sm text-gray-400">Indique afiliados e ganhe R$ 2,60 por assinatura deles</p>
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-3">
                    <input 
                      type="text"
                      value={subafiliadoData.linkSubafiliado}
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

                <div className="mt-4 bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                  <p className="text-sm text-gray-300">
                    💡 <span className="font-semibold">Dica:</span> Indique pessoas que queiram se tornar afiliados da NutriX e ganhe comissão sobre todas as vendas deles!
                  </p>
                </div>
              </section>

              {/* Meus Afiliados */}
              <section className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#00C897]/10 p-3 rounded-xl">
                      <Users className="w-6 h-6 text-[#00C897]" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Meus Afiliados</h2>
                      <p className="text-sm text-gray-400">{subafiliadoData.afiliadosIndicados} afiliados ativos</p>
                    </div>
                  </div>
                  <button className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-all flex items-center gap-2 text-sm">
                    <Download className="w-4 h-4" />
                    Exportar
                  </button>
                </div>

                <div className="space-y-3">
                  {afiliadosIndicados.map((afiliado) => (
                    <div key={afiliado.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:border-[#00C897] transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#00C897] to-[#00B087] rounded-full flex items-center justify-center text-black font-bold">
                            {afiliado.nome.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-white">{afiliado.nome}</div>
                            <div className="text-xs text-gray-400">{afiliado.email}</div>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-500">
                          {afiliado.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gray-900 rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-[#00C897]">{afiliado.assinaturas}</div>
                          <div className="text-xs text-gray-400">Assinaturas</div>
                        </div>
                        <div className="bg-gray-900 rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-purple-500">R$ {afiliado.ganhoGerado.toFixed(2)}</div>
                          <div className="text-xs text-gray-400">Seu ganho</div>
                        </div>
                        <div className="bg-gray-900 rounded-lg p-3 text-center flex items-center justify-center">
                          <button className="text-gray-400 hover:text-white transition-colors">
                            <Eye className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-3 text-xs text-gray-500">
                        Indicado em {afiliado.dataIndicacao}
                      </div>
                    </div>
                  ))}
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
                          <div className="text-sm text-gray-400">{comissao.afiliados} afiliados • {comissao.assinaturas} assinaturas</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-purple-500">R$ {comissao.valor.toFixed(2)}</div>
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
                    <BarChart3 className="w-6 h-6 text-[#00C897]" />
                  </div>
                  <h2 className="text-xl font-bold">Performance</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Taxa de conversão</span>
                      <span className="text-sm font-bold text-[#00C897]">{subafiliadoData.taxaConversao}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                        style={{ width: `${subafiliadoData.taxaConversao * 8}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Média por afiliado</div>
                    <div className="text-2xl font-bold text-white">{(subafiliadoData.assinaturasTotal / subafiliadoData.afiliadosIndicados).toFixed(1)}</div>
                    <div className="text-xs text-gray-500">assinaturas</div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Ganho médio/afiliado</div>
                    <div className="text-2xl font-bold text-purple-500">R$ {(subafiliadoData.ganhoMensal / subafiliadoData.afiliadosIndicados).toFixed(2)}</div>
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Subafiliado desde</div>
                    <div className="text-sm font-semibold text-white">{subafiliadoData.dataCadastro}</div>
                  </div>
                </div>

                <div className="mt-6 bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                  <p className="text-sm text-gray-300 text-center">
                    Continue indicando afiliados para aumentar sua rede! 🚀
                  </p>
                </div>
              </section>

              {/* Informações */}
              <section className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-6">
                <h3 className="text-lg font-bold mb-4">Como funciona?</h3>
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">1</div>
                    <p>Compartilhe seu link de subafiliado</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">2</div>
                    <p>Pessoas se tornam afiliados através do seu link</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">3</div>
                    <p>Você ganha R$ 2,60 por cada assinatura que seus afiliados trouxerem</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-800">
                  <p className="text-xs text-gray-400 text-center">
                    Ganhos recorrentes enquanto as assinaturas dos seus afiliados estiverem ativas!
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
            <span className="font-bold text-white">NutriX</span> – Programa de Subafiliados
          </p>
          <p className="text-xs text-gray-600 mt-4">
            © 2025 NutriX. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
