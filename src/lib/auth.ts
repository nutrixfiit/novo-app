// Sistema de autenticação da NutriX

export type UserRole = 'user' | 'affiliate' | 'subaffiliate' | 'admin';

export interface User {
  email: string;
  senha: string;
  nome: string;
  role: UserRole;
  planoAtivo: boolean;
  dataCadastro: string;
  dataPagamento?: string;
  affiliateId?: string; // ID do afiliado que indicou
  // Dados do formulário
  idade?: string;
  sexo?: string;
  peso?: string;
  altura?: string;
  meta?: string;
  nivelTreino?: string;
  frequenciaSemanal?: string;
  restricoes?: string;
  tempoTreino?: string;
  prazo?: string;
  lembretes?: string;
  comidasFavoritas?: string[];
  outrasComidas?: string;
}

export interface Affiliate {
  id: string;
  email: string;
  senha: string;
  nome: string;
  role: 'affiliate' | 'subaffiliate';
  dataCriacao: string;
  linkAfiliacao: string;
  assinaturasAtivas: number;
  totalGanhos: number;
  subaffiliateId?: string; // ID do subafiliado que o indicou (se for afiliado)
  afiliadosIndicados?: string[]; // IDs dos afiliados indicados (se for subafiliado)
}

export interface Subscription {
  userId: string;
  affiliateId?: string;
  status: 'active' | 'cancelled';
  dataInicio: string;
  dataProximoPagamento: string;
  valorMensal: number;
}

// Constantes
export const ADMIN_EMAIL = 'nutrix.fiit@gmail.com';
export const ADMIN_PASSWORD = 'nokia5200@@@@@';
export const AFFILIATE_COMMISSION = 8.00;
export const SUBAFFILIATE_COMMISSION = 2.60;
export const MONTHLY_PRICE = 29.90;

// Funções de autenticação
export function login(email: string, password: string): { success: boolean; user?: User | Affiliate; role?: UserRole } {
  // Verificar admin
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return {
      success: true,
      user: {
        email: ADMIN_EMAIL,
        senha: ADMIN_PASSWORD,
        nome: 'Administrador',
        role: 'admin',
        planoAtivo: true,
        dataCadastro: new Date().toISOString()
      },
      role: 'admin'
    };
  }

  // Verificar afiliados
  const affiliates = JSON.parse(localStorage.getItem('nutrix_affiliates') || '{}');
  if (affiliates[email] && affiliates[email].senha === password) {
    return {
      success: true,
      user: affiliates[email],
      role: affiliates[email].role
    };
  }

  // Verificar usuários
  const users = JSON.parse(localStorage.getItem('nutrix_users') || '{}');
  if (users[email] && users[email].senha === password) {
    if (users[email].planoAtivo) {
      return {
        success: true,
        user: users[email],
        role: 'user'
      };
    } else {
      return { success: false };
    }
  }

  return { success: false };
}

export function getCurrentUser(): User | Affiliate | null {
  const currentUserEmail = localStorage.getItem('nutrix_current_user');
  if (!currentUserEmail) return null;

  // Verificar admin
  if (currentUserEmail === ADMIN_EMAIL) {
    return {
      email: ADMIN_EMAIL,
      senha: ADMIN_PASSWORD,
      nome: 'Administrador',
      role: 'admin',
      planoAtivo: true,
      dataCadastro: new Date().toISOString()
    };
  }

  // Verificar afiliados
  const affiliates = JSON.parse(localStorage.getItem('nutrix_affiliates') || '{}');
  if (affiliates[currentUserEmail]) {
    return affiliates[currentUserEmail];
  }

  // Verificar usuários
  const users = JSON.parse(localStorage.getItem('nutrix_users') || '{}');
  if (users[currentUserEmail]) {
    return users[currentUserEmail];
  }

  return null;
}

export function logout() {
  localStorage.removeItem('nutrix_current_user');
}

// Funções de afiliados
export function createAffiliate(nome: string, email: string, senha: string, isSubaffiliate: boolean = false, subaffiliateId?: string): Affiliate {
  const affiliates = JSON.parse(localStorage.getItem('nutrix_affiliates') || '{}');
  
  const newAffiliate: Affiliate = {
    id: `aff_${Date.now()}`,
    email,
    senha,
    nome,
    role: isSubaffiliate ? 'subaffiliate' : 'affiliate',
    dataCriacao: new Date().toISOString(),
    linkAfiliacao: `https://nutrix.com/ref/${Date.now()}`,
    assinaturasAtivas: 0,
    totalGanhos: 0,
    subaffiliateId,
    afiliadosIndicados: isSubaffiliate ? [] : undefined
  };

  affiliates[email] = newAffiliate;
  localStorage.setItem('nutrix_affiliates', JSON.stringify(affiliates));

  return newAffiliate;
}

export function getAffiliateStats(affiliateId: string) {
  const users = JSON.parse(localStorage.getItem('nutrix_users') || '{}');
  const subscriptions = Object.values(users).filter((user: any) => 
    user.affiliateId === affiliateId && user.planoAtivo
  );

  return {
    assinaturasAtivas: subscriptions.length,
    totalGanhos: subscriptions.length * AFFILIATE_COMMISSION
  };
}

export function getSubaffiliateStats(subaffiliateId: string) {
  const affiliates = JSON.parse(localStorage.getItem('nutrix_affiliates') || '{}');
  const users = JSON.parse(localStorage.getItem('nutrix_users') || '{}');

  // Encontrar afiliados indicados por este subafiliado
  const indicatedAffiliates = Object.values(affiliates).filter((aff: any) => 
    aff.subaffiliateId === subaffiliateId
  );

  // Contar assinaturas de todos os afiliados indicados
  let totalSubscriptions = 0;
  indicatedAffiliates.forEach((aff: any) => {
    const subs = Object.values(users).filter((user: any) => 
      user.affiliateId === aff.id && user.planoAtivo
    );
    totalSubscriptions += subs.length;
  });

  return {
    afiliadosIndicados: indicatedAffiliates.length,
    assinaturasGeradas: totalSubscriptions,
    totalGanhos: totalSubscriptions * SUBAFFILIATE_COMMISSION
  };
}

// Funções de assinatura
export function createSubscription(userData: User, affiliateId?: string) {
  const users = JSON.parse(localStorage.getItem('nutrix_users') || '{}');
  
  users[userData.email] = {
    ...userData,
    planoAtivo: true,
    dataCadastro: new Date().toISOString(),
    dataPagamento: new Date().toISOString(),
    affiliateId,
    role: 'user'
  };

  localStorage.setItem('nutrix_users', JSON.stringify(users));

  // Atualizar estatísticas do afiliado
  if (affiliateId) {
    updateAffiliateStats(affiliateId);
  }
}

function updateAffiliateStats(affiliateId: string) {
  const affiliates = JSON.parse(localStorage.getItem('nutrix_affiliates') || '{}');
  const stats = getAffiliateStats(affiliateId);
  
  Object.keys(affiliates).forEach(email => {
    if (affiliates[email].id === affiliateId) {
      affiliates[email].assinaturasAtivas = stats.assinaturasAtivas;
      affiliates[email].totalGanhos = stats.totalGanhos;
    }
  });

  localStorage.setItem('nutrix_affiliates', JSON.stringify(affiliates));
}
