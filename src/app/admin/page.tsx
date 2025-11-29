"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  DollarSign,
  TrendingUp,
  UserPlus,
  LogOut,
  X,
  Mail,
  Lock,
  User,
  Link as LinkIcon,
  CheckCircle2,
  XCircle,
  Search,
  Filter
} from "lucide-react";
import { getCurrentUser, createAffiliate, getAffiliateStats, getSubaffiliateStats, AFFILIATE_COMMISSION, SUBAFFILIATE_COMMISSION } from "@/lib/auth";

export default function AdminPanel() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [affiliates, setAffiliates] = useState<any[]>([]);
  const [showCreateAffiliate, setShowCreateAffiliate] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Form states
  const [newAffiliate, setNewAffiliate] = useState({
    nome: "",
    email: "",
    senha: "",
    isSubaffiliate: false
  });

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') {
      router.push('/');
      return;
    }
    setCurrentUser(user);
    loadData();
  }, [router]);

  const loadData = () => {
    // Carregar usuários
    const usersData = JSON.parse(localStorage.getItem('nutrix_users') || '{}');
    const usersArray = Object.values(usersData);
    setUsers(usersArray);

    // Carregar afiliados
    const affiliatesData = JSON.parse(localStorage.getItem('nutrix_affiliates') || '{}');
    const affiliatesArray = Object.values(affiliatesData);
    setAffiliates(affiliatesArray);
  };

  const handleCreateAffiliate = () => {
    if (!newAffiliate.nome || !newAffiliate.email || !newAffiliate.senha) {
      alert('Preencha todos os campos!');
      return;
    }

    createAffiliate(
      newAffiliate.nome,
      newAffiliate.email,
      newAffiliate.senha,
      newAffiliate.isSubaffiliate
    );

    setShowCreateAffiliate(false);
    setNewAffiliate({ nome: "", email: "", senha: "", isSubaffiliate: false });
    loadData();
    alert('Afiliado criado com sucesso!');
  };

  const handleCancelSubscription = (userEmail: string) => {
    if (!confirm('Tem certeza que deseja cancelar esta assinatura?')) return;

    const usersData = JSON.parse(localStorage.getItem('nutrix_users') || '{}');
    if (usersData[userEmail]) {
      usersData[userEmail].planoAtivo = false;
      localStorage.setItem('nutrix_users', JSON.stringify(usersData));
      loadData();
      alert('Assinatura cancelada com sucesso!');
    }
  };

  const handleCancelAffiliate = (affiliateEmail: string) => {
    if (!confirm('Tem certeza que deseja remover este afiliado?')) return;

    const affiliatesData = JSON.parse(localStorage.getItem('nutrix_affiliates') || '{}');
    delete affiliatesData[affiliateEmail];
    localStorage.setItem('nutrix_affiliates', JSON.stringify(affiliatesData));
    loadData();
    alert('Afiliado removido com sucesso!');
  };

  const handleLogout = () => {
    localStorage.removeItem('nutrix_current_user');
    router.push('/');
  };

  // Calcular estatísticas
  const activeUsers = users.filter((u: any) => u.planoAtivo).length;
  const totalRevenue = activeUsers * 29.90;
  const totalAffiliateCommissions = affiliates.reduce((sum, aff: any) => {
    if (aff.role === 'affiliate') {
      const stats = getAffiliateStats(aff.id);
      return sum + stats.totalGanhos;
    }
    return sum;
  }, 0);
  const totalSubaffiliateCommissions = affiliates.reduce((sum, aff: any) => {
    if (aff.role === 'subaffiliate') {
      const stats = getSubaffiliateStats(aff.id);
      return sum + stats.totalGanhos;
    }
    return sum;
  }, 0);

  // Filtrar usuários
  const filteredUsers = users.filter((user: any) => {
    const matchesSearch = user.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' ||
                         (filterStatus === 'active' && user.planoAtivo) ||
                         (filterStatus === 'cancelled' && !user.planoAtivo);
    return matchesSearch && matchesFilter;
  });

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00C897] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando painel administrativo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-[#00C897]/20 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              <span className="text-white">Nutri</span>
              <span className="text-[#00C897]">X</span>
              <span className="text-gray-400 text-sm ml-3">Admin</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-gray-900 rounded-full px-4 py-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#00C897] to-[#00B087] rounded-full flex items-center justify-center text-black font-bold text-sm">
                  A
                </div>
                <span className="hidden sm:block text-sm font-semibold">Administrador</span>
              </div>

              <button 
                onClick={handleLogout}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-[#00C897]" />
                <span className="text-sm text-gray-400">Usuários Ativos</span>
              </div>
              <div className="text-3xl font-bold text-[#00C897]">{activeUsers}</div>
              <div className="text-xs text-gray-500 mt-1">Total: {users.length}</div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-6 h-6 text-green-500" />
                <span className="text-sm text-gray-400">Receita Mensal</span>
              </div>
              <div className="text-3xl font-bold text-green-500">R$ {totalRevenue.toFixed(2)}</div>
              <div className="text-xs text-gray-500 mt-1">Assinaturas ativas</div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6 text-blue-500" />
                <span className="text-sm text-gray-400">Afiliados</span>
              </div>
              <div className="text-3xl font-bold text-blue-500">{affiliates.filter(a => a.role === 'affiliate').length}</div>
              <div className="text-xs text-gray-500 mt-1">Comissões: R$ {totalAffiliateCommissions.toFixed(2)}</div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <UserPlus className="w-6 h-6 text-purple-500" />
                <span className="text-sm text-gray-400">Subafiliados</span>
              </div>
              <div className="text-3xl font-bold text-purple-500">{affiliates.filter(a => a.role === 'subaffiliate').length}</div>
              <div className="text-xs text-gray-500 mt-1">Comissões: R$ {totalSubaffiliateCommissions.toFixed(2)}</div>
            </div>
          </div>

          {/* Área de Convite de Afiliados */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Área de Convite de Afiliados</h2>
                <p className="text-sm text-gray-400 mt-1">Crie e gerencie afiliados e subafiliados</p>
              </div>
              <button
                onClick={() => setShowCreateAffiliate(true)}
                className="bg-[#00C897] text-black px-6 py-3 rounded-xl font-semibold hover:bg-[#00B087] transition-all flex items-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                Criar Afiliado
              </button>
            </div>

            {/* Lista de Afiliados */}
            <div className="space-y-3">
              {affiliates.slice(0, 12).map((affiliate: any, index) => {
                const stats = affiliate.role === 'affiliate' 
                  ? getAffiliateStats(affiliate.id)
                  : getSubaffiliateStats(affiliate.id);

                return (
                  <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#00C897] to-[#00B087] rounded-full flex items-center justify-center text-black font-bold">
                          {affiliate.nome.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold">{affiliate.nome}</div>
                          <div className="text-sm text-gray-400">{affiliate.email}</div>
                          <div className="text-xs text-[#00C897] mt-1">
                            {affiliate.role === 'affiliate' ? '🔹 Afiliado' : '🔹 Subafiliado'}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                          <div className="text-sm text-gray-400">
                            {affiliate.role === 'affiliate' ? 'Assinaturas' : 'Afiliados Indicados'}
                          </div>
                          <div className="font-bold text-[#00C897]">
                            {affiliate.role === 'affiliate' ? stats.assinaturasAtivas : stats.afiliadosIndicados}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm text-gray-400">Ganhos</div>
                          <div className="font-bold text-green-500">R$ {stats.totalGanhos.toFixed(2)}</div>
                        </div>

                        <button
                          onClick={() => handleCancelAffiliate(affiliate.email)}
                          className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-red-500"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-700 flex items-center gap-2">
                      <LinkIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-400 truncate">{affiliate.linkAfiliacao}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lista de Usuários */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Usuários Cadastrados</h2>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-[#00C897] focus:outline-none"
                  />
                </div>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:border-[#00C897] focus:outline-none"
                >
                  <option value="all">Todos</option>
                  <option value="active">Ativos</option>
                  <option value="cancelled">Cancelados</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredUsers.map((user: any, index) => (
                <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#00C897] to-[#00B087] rounded-full flex items-center justify-center text-black font-bold">
                        {user.nome?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <div className="font-bold">{user.nome}</div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                        <div className="flex items-center gap-2 mt-1">
                          {user.planoAtivo ? (
                            <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Ativo
                            </span>
                          ) : (
                            <span className="text-xs bg-red-500/20 text-red-500 px-2 py-1 rounded-full flex items-center gap-1">
                              <XCircle className="w-3 h-3" />
                              Cancelado
                            </span>
                          )}
                          {user.affiliateId && (
                            <span className="text-xs bg-blue-500/20 text-blue-500 px-2 py-1 rounded-full">
                              Via Afiliado
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <div className="text-sm text-gray-400">Cadastro</div>
                        <div className="text-xs text-gray-500">
                          {new Date(user.dataCadastro).toLocaleDateString('pt-BR')}
                        </div>
                      </div>

                      {user.planoAtivo && (
                        <button
                          onClick={() => handleCancelSubscription(user.email)}
                          className="bg-red-500/10 text-red-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-500/20 transition-all text-sm"
                        >
                          Cancelar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Modal Criar Afiliado */}
      {showCreateAffiliate && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 max-w-md w-full relative">
            <button 
              onClick={() => setShowCreateAffiliate(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-3xl font-bold mb-6">
              Criar Novo Afiliado
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Nome</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={newAffiliate.nome}
                    onChange={(e) => setNewAffiliate({...newAffiliate, nome: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[#00C897] focus:outline-none"
                    placeholder="Nome completo"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={newAffiliate.email}
                    onChange={(e) => setNewAffiliate({...newAffiliate, email: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[#00C897] focus:outline-none"
                    placeholder="email@exemplo.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={newAffiliate.senha}
                    onChange={(e) => setNewAffiliate({...newAffiliate, senha: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[#00C897] focus:outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-800/50 rounded-xl p-4">
                <input
                  type="checkbox"
                  id="isSubaffiliate"
                  checked={newAffiliate.isSubaffiliate}
                  onChange={(e) => setNewAffiliate({...newAffiliate, isSubaffiliate: e.target.checked})}
                  className="w-5 h-5 rounded border-gray-700 text-[#00C897] focus:ring-[#00C897]"
                />
                <label htmlFor="isSubaffiliate" className="text-sm text-gray-300">
                  Criar como <span className="text-[#00C897] font-semibold">Subafiliado</span>
                  <p className="text-xs text-gray-500 mt-1">
                    Subafiliados ganham R$ {SUBAFFILIATE_COMMISSION.toFixed(2)} por assinatura de afiliados indicados
                  </p>
                </label>
              </div>

              <button
                onClick={handleCreateAffiliate}
                className="w-full bg-[#00C897] text-black px-6 py-4 rounded-xl font-bold hover:bg-[#00B087] transition-all"
              >
                Criar Afiliado
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
