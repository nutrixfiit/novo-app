"use client";

import { useState } from "react";
import {
  Brain,
  Dumbbell,
  ShoppingCart,
  Activity,
  MessageSquare,
  Camera,
  Apple,
  TrendingUp,
  Calendar,
  Settings,
  LogOut,
  User,
  Bell,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Menu,
  X,
  ArrowLeft,
  Edit2,
  Save,
  Mail,
  Phone,
  MapPin,
  Target,
  Weight,
  Ruler,
  Cake,
  Zap,
  Loader2,
  ChevronDown,
  ChevronUp,
  FileText,
  Send,
  Flame,
  Timer,
  Repeat,
  Upload,
  Image as ImageIcon
} from "lucide-react";

// Tipos para o formulário de treino
interface FormDataTreino {
  nome: string;
  objetivo: string;
  localTreino: string;
  nivel: string;
  frequenciaSemanal: string;
  tempoDisponivel: string;
  lesoes: string;
  gruposMuscularesFavoritos: string[];
  diasSemana: string[];
  intensidade: string;
  equipamentos: string[];
  usaHormonios: string;
  hormonioTipo: string;
  hormonioDose: string;
  hormonioTempo: string;
}

// Tipos para o formulário de dieta
interface FormData {
  nome: string;
  objetivo: string;
  peso: string;
  altura: string;
  idade: number;
  sexo: string;
  nivelTreino: string;
  frequenciaTreino: string;
  horarioTreino: string;
  rotina: string;
  quantidadeRefeicoes: number;
  horarioRefeicoes: string[];
  alimentosPreferidos: string[];
  alimentosNaoGosta: string[];
  restricoes: string[];
  alergias: string[];
  intolerancia: string[];
  usaHormonios: string;
  hormonioTipo: string;
  hormonioDose: string;
  hormonioTempo: string;
  diaRefeicaoLivre: string;
  objetivoDetalhado: string;
}

// Tipos para avaliação mensal
interface AvaliacaoMensal {
  pesoAtual: string;
  pesoInicial: string;
  medidasAtuais: string;
  energiaNivel: string;
  aderenciaDieta: string;
  dificuldades: string;
  alimentosFuncionaram: string;
  alimentosNaoFuncionaram: string;
  treinos: string;
  objetivoContinua: string;
  observacoes: string;
}

// Tipos para análise de calorias
interface AnaliseNutricional {
  alimentos: Array<{
    nome: string;
    porcao: string;
  }>;
  caloriasTotais: number;
  macros: {
    proteinas: number;
    carboidratos: number;
    gorduras: number;
  };
  resumo: string;
  observacoes: string;
  sugestoes: string[];
}

// Estado para chat com Luna
interface LunaMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showFormTreino, setShowFormTreino] = useState(false);
  const [generatingDiet, setGeneratingDiet] = useState(false);
  const [generatingTreino, setGeneratingTreino] = useState(false);
  const [dietGenerated, setDietGenerated] = useState(false);
  const [treinoGenerated, setTreinoGenerated] = useState(false);
  const [generatedDiet, setGeneratedDiet] = useState<string>("");
  const [editingProfile, setEditingProfile] = useState(false);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [showMonthlyCheckIn, setShowMonthlyCheckIn] = useState(false);
  const [submittingCheckIn, setSubmittingCheckIn] = useState(false);

  // Estados para Contador de Calorias
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analyzingImage, setAnalyzingImage] = useState(false);
  const [analiseResult, setAnaliseResult] = useState<AnaliseNutricional | null>(null);

  // Estados para Luna Chat
  const [lunaMessages, setLunaMessages] = useState<LunaMessage[]>([
    {
      role: 'assistant',
      content: 'Olá! Sou a Luna, sua assistente especializada em nutrição, treinos e bem-estar. Como posso te ajudar hoje?',
      timestamp: new Date()
    }
  ]);
  const [lunaInput, setLunaInput] = useState('');
  const [lunaLoading, setLunaLoading] = useState(false);

  // Dados simulados do usuário
  const [userData, setUserData] = useState({
    nome: "João Silva",
    email: "joao@email.com",
    telefone: "(11) 98765-4321",
    cidade: "São Paulo, SP",
    plano: "Anual",
    dataInicio: "28/11/2024",
    dataValidade: "28/11/2025",
    diasRestantes: 365,
    objetivo: "Ganhar massa muscular",
    peso: "75kg",
    altura: "175cm",
    idade: 28,
    treino: "5x por semana",
    hormonio: "Sim",
    hormonioTipo: "Oxandrolona",
    hormonioTempo: "3 meses",
    hormonioDose: "20mg/dia",
    restricoes: "Lactose",
    preferencias: "Frango, arroz, batata doce",
    dietaAtiva: true,
    dataUltimaDieta: "01/12/2024",
    proximaAvaliacao: "01/01/2025"
  });

  const [editedData, setEditedData] = useState(userData);

  // Estado do formulário de dieta
  const [formData, setFormData] = useState<FormData>({
    nome: userData.nome,
    objetivo: "ganho_massa",
    peso: "75",
    altura: "175",
    idade: 28,
    sexo: "masculino",
    nivelTreino: "intermediario",
    frequenciaTreino: "5x",
    horarioTreino: "manha",
    rotina: "trabalho_integral",
    quantidadeRefeicoes: 6,
    horarioRefeicoes: ["07:00", "10:00", "13:00", "16:00", "19:00", "22:00"],
    alimentosPreferidos: ["frango", "arroz", "batata_doce", "ovos", "aveia"],
    alimentosNaoGosta: ["brocolis", "couve_flor"],
    restricoes: [],
    alergias: [],
    intolerancia: ["lactose"],
    usaHormonios: "sim",
    hormonioTipo: "oxandrolona",
    hormonioDose: "20mg",
    hormonioTempo: "3_meses",
    diaRefeicaoLivre: "domingo",
    objetivoDetalhado: "Ganhar massa muscular mantendo baixo percentual de gordura"
  });

  // Estado do formulário de treino
  const [formDataTreino, setFormDataTreino] = useState<FormDataTreino>({
    nome: userData.nome,
    objetivo: "hipertrofia",
    localTreino: "academia",
    nivel: "intermediario",
    frequenciaSemanal: "5x",
    tempoDisponivel: "60",
    lesoes: "",
    gruposMuscularesFavoritos: ["peito", "costas"],
    diasSemana: ["segunda", "terca", "quarta", "quinta", "sexta"],
    intensidade: "moderada",
    equipamentos: ["halteres", "barras", "maquinas"],
    usaHormonios: "sim",
    hormonioTipo: "oxandrolona",
    hormonioDose: "20mg",
    hormonioTempo: "3_meses"
  });

  // Estado da avaliação mensal
  const [avaliacaoMensal, setAvaliacaoMensal] = useState<AvaliacaoMensal>({
    pesoAtual: "",
    pesoInicial: "75",
    medidasAtuais: "",
    energiaNivel: "boa",
    aderenciaDieta: "80-100",
    dificuldades: "",
    alimentosFuncionaram: "",
    alimentosNaoFuncionaram: "",
    treinos: "mantive",
    objetivoContinua: "sim",
    observacoes: ""
  });

  const handleSaveProfile = () => {
    setUserData(editedData);
    setEditingProfile(false);
  };

  const handleGenerateDiet = async () => {
    setGeneratingDiet(true);
    
    // Simular chamada à API (aqui você integraria com OpenAI)
    setTimeout(() => {
      setGeneratingDiet(false);
      setDietGenerated(true);
      setShowForm(false);
      setUserData({
        ...userData,
        dietaAtiva: true,
        dataUltimaDieta: new Date().toLocaleDateString('pt-BR'),
        proximaAvaliacao: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')
      });
    }, 3000);
  };

  const handleGenerateTreino = async () => {
    setGeneratingTreino(true);
    
    // Simular chamada à API (aqui você integraria com OpenAI)
    setTimeout(() => {
      setGeneratingTreino(false);
      setTreinoGenerated(true);
      setShowFormTreino(false);
    }, 3000);
  };

  const handleSubmitCheckIn = async () => {
    setSubmittingCheckIn(true);
    
    // Processar avaliação e preparar dados para nova dieta
    setTimeout(() => {
      // Atualizar formData com base nas respostas do check-in
      const updatedFormData = {
        ...formData,
        peso: avaliacaoMensal.pesoAtual,
        // Atualizar alimentos preferidos com base no feedback
        alimentosPreferidos: avaliacaoMensal.alimentosFuncionaram 
          ? [...formData.alimentosPreferidos, ...avaliacaoMensal.alimentosFuncionaram.split(',').map(s => s.trim())]
          : formData.alimentosPreferidos,
        // Adicionar alimentos que não funcionaram à lista de não gosta
        alimentosNaoGosta: avaliacaoMensal.alimentosNaoFuncionaram
          ? [...formData.alimentosNaoGosta, ...avaliacaoMensal.alimentosNaoFuncionaram.split(',').map(s => s.trim())]
          : formData.alimentosNaoGosta,
        // Ajustar objetivo se necessário
        objetivo: avaliacaoMensal.objetivoContinua === "mudar" ? "recomposicao" : formData.objetivo,
        // Ajustar frequência de treino baseado no feedback
        frequenciaTreino: avaliacaoMensal.treinos === "aumentei" ? "6x" : 
                          avaliacaoMensal.treinos === "diminui" ? "4x" : 
                          formData.frequenciaTreino
      };

      setFormData(updatedFormData);
      setSubmittingCheckIn(false);
      setShowMonthlyCheckIn(false);
      setGeneratingDiet(true);
      
      // Gerar nova dieta baseada nas respostas do check-in + informações anteriores
      setTimeout(() => {
        setGeneratingDiet(false);
        setDietGenerated(true);
        
        // Atualizar dados do usuário com informações do check-in
        setUserData({
          ...userData,
          peso: avaliacaoMensal.pesoAtual + "kg",
          dataUltimaDieta: new Date().toLocaleDateString('pt-BR'),
          proximaAvaliacao: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
          // Atualizar preferências com base no feedback
          preferencias: avaliacaoMensal.alimentosFuncionaram || userData.preferencias,
          // Atualizar objetivo se mudou
          objetivo: avaliacaoMensal.objetivoContinua === "mudar" ? "Recomposição corporal" : userData.objetivo,
          // Atualizar treino se mudou
          treino: avaliacaoMensal.treinos === "aumentei" ? "6x por semana" :
                  avaliacaoMensal.treinos === "diminui" ? "4x por semana" :
                  userData.treino
        });

        // Resetar formulário de avaliação para próximo mês
        setAvaliacaoMensal({
          pesoAtual: "",
          pesoInicial: avaliacaoMensal.pesoAtual,
          medidasAtuais: "",
          energiaNivel: "boa",
          aderenciaDieta: "80-100",
          dificuldades: "",
          alimentosFuncionaram: "",
          alimentosNaoFuncionaram: "",
          treinos: "mantive",
          objetivoContinua: "sim",
          observacoes: ""
        });

        // Redirecionar para visualização da nova dieta
        setSelectedService("dieta");
      }, 3000);
    }, 2000);
  };

  // Função para upload de imagem
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setAnaliseResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Função para analisar imagem com NutriX Vision
  const handleAnalyzeImage = async () => {
    if (!uploadedImage) return;

    setAnalyzingImage(true);

    // Simular análise com IA (aqui você integraria com OpenAI Vision API)
    setTimeout(() => {
      // Resultado simulado seguindo o formato da NutriX Vision
      const resultado: AnaliseNutricional = {
        alimentos: [
          { nome: "Arroz branco", porcao: "150g" },
          { nome: "Peito de frango grelhado", porcao: "120g" },
          { nome: "Brócolis", porcao: "70g" },
          { nome: "Tomate", porcao: "40g" }
        ],
        caloriasTotais: 520,
        macros: {
          proteinas: 45,
          carboidratos: 60,
          gorduras: 12
        },
        resumo: "Refeição equilibrada com boa quantidade de proteínas e carboidratos complexos. O prato apresenta proporções adequadas para uma refeição pós-treino ou almoço completo.",
        observacoes: "A estimativa foi baseada na proporção dos alimentos no prato e no tamanho padrão de uma porção vista de cima. A análise assume preparo comum sem excesso de óleo. Há presença de vegetais, mas a quantidade poderia ser maior para aumentar o aporte de fibras e micronutrientes.",
        sugestoes: [
          "Aumentar a quantidade de vegetais para maior aporte de fibras e vitaminas",
          "Reduzir o óleo no preparo para diminuir as calorias totais se o objetivo for emagrecimento",
          "Considere adicionar uma fonte de gordura boa como abacate ou azeite extra virgem (1 colher de sopa)"
        ]
      };

      setAnaliseResult(resultado);
      setAnalyzingImage(false);
    }, 3000);
  };

  // Função para enviar mensagem para Luna
  const handleSendLunaMessage = async () => {
    if (!lunaInput.trim()) return;

    const userMessage: LunaMessage = {
      role: 'user',
      content: lunaInput,
      timestamp: new Date()
    };

    setLunaMessages(prev => [...prev, userMessage]);
    setLunaInput('');
    setLunaLoading(true);

    // Simular resposta da Luna (aqui você integraria com OpenAI)
    setTimeout(() => {
      const assistantMessage: LunaMessage = {
        role: 'assistant',
        content: 'Esta é uma resposta simulada da Luna. Em produção, aqui seria integrado com a API da OpenAI seguindo todas as diretrizes da persona Luna: acolhedora, educativa e profissional.',
        timestamp: new Date()
      };

      setLunaMessages(prev => [...prev, assistantMessage]);
      setLunaLoading(false);
    }, 2000);
  };

  // Renderizar Chat com Luna
  const renderLunaChat = () => {
    return (
      <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] sm:h-[calc(100vh-12rem)] flex flex-col">
        <div className="mb-6">
          <button
            onClick={() => {
              setSelectedService(null);
              setLunaMessages([
                {
                  role: 'assistant',
                  content: 'Olá! Sou a Luna, sua assistente especializada em nutrição, treinos e bem-estar. Como posso te ajudar hoje?',
                  timestamp: new Date()
                }
              ]);
            }}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar aos serviços
          </button>
          
          <div className="bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Luna - Assistente 24h</h1>
                <p className="text-gray-400">Tire suas dúvidas sobre nutrição, treinos e bem-estar</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden flex flex-col">
          {/* Área de mensagens */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4">
            {lunaMessages.map((message, idx) => (
              <div
                key={idx}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-3 sm:p-4 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                      : 'bg-gray-800 text-gray-100'
                  }`}
                >
                  <p className="text-xs sm:text-sm leading-relaxed">{message.content}</p>
                  <p className="text-[10px] sm:text-xs mt-1 sm:mt-2 opacity-70">
                    {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {lunaLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 rounded-2xl p-4">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                    <span className="text-sm text-gray-400">Luna está digitando...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input de mensagem */}
          <div className="border-t border-gray-800 p-3 sm:p-4">
            <div className="flex gap-2 sm:gap-3">
              <input
                type="text"
                value={lunaInput}
                onChange={(e) => setLunaInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendLunaMessage()}
                placeholder="Digite sua pergunta..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-white focus:border-indigo-500 focus:outline-none"
              />
              <button
                onClick={handleSendLunaMessage}
                disabled={!lunaInput.trim() || lunaLoading}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold hover:scale-105 transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Enviar</span>
              </button>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-2 text-center">
              A Luna responde sobre nutrição, treinos, suplementação e bem-estar geral
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Renderizar Contador de Calorias
  const renderContadorCalorias = () => {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => {
              setSelectedService(null);
              setUploadedImage(null);
              setAnaliseResult(null);
            }}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar aos serviços
          </button>
          
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 border border-yellow-500/30 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">📸 Calculadora de Calorias por Foto</h1>
                <p className="text-gray-400">Envie uma foto da sua refeição e nossa IA identifica cada alimento</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 mt-4">
              A NutriX Vision analisa sua foto com precisão profissional, identificando alimentos, estimando porções e calculando valores nutricionais automaticamente.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 space-y-8">
          {/* Área de Upload */}
          {!uploadedImage ? (
            <div className="border-2 border-dashed border-gray-700 rounded-2xl p-12 text-center hover:border-yellow-500 transition-colors">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Envie uma foto da sua refeição</h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Nossa IA irá identificar os alimentos, estimar porções e calcular calorias e macronutrientes automaticamente
              </p>
              <label className="inline-block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <span className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-lg shadow-yellow-500/25 cursor-pointer inline-flex items-center gap-3">
                  <Camera className="w-5 h-5" />
                  Escolher Foto
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-4">
                Formatos aceitos: JPG, PNG, HEIC • Tamanho máximo: 10MB
              </p>
            </div>
          ) : (
            <>
              {/* Preview da Imagem */}
              <div className="space-y-6">
                <div className="relative rounded-2xl overflow-hidden border border-gray-700">
                  <img
                    src={uploadedImage}
                    alt="Refeição"
                    className="w-full h-auto max-h-96 object-cover"
                  />
                  <button
                    onClick={() => {
                      setUploadedImage(null);
                      setAnaliseResult(null);
                    }}
                    className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {!analiseResult && !analyzingImage && (
                  <button
                    onClick={handleAnalyzeImage}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-lg shadow-yellow-500/25 flex items-center justify-center gap-3"
                  >
                    <Sparkles className="w-6 h-6" />
                    Analisar Refeição com NutriX Vision
                  </button>
                )}
              </div>

              {/* Loading Análise */}
              {analyzingImage && (
                <div className="bg-gray-800/50 rounded-2xl p-8 text-center border border-gray-700">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Analisando sua refeição...</h3>
                  <p className="text-gray-400 mb-6">
                    A NutriX Vision está identificando os alimentos e calculando os valores nutricionais
                  </p>
                  <div className="space-y-2 text-sm text-gray-400 max-w-md mx-auto">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span>Identificando alimentos visíveis...</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span>Estimando porções e volumes...</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span>Calculando valores nutricionais...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Resultado da Análise */}
              {analiseResult && (
                <div className="space-y-6">
                  {/* Identificação dos Alimentos */}
                  <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#00C897]">
                      🍽️ Identificação dos Alimentos
                    </h3>
                    <ul className="space-y-2">
                      {analiseResult.alimentos.map((alimento, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-gray-300">
                          <div className="w-2 h-2 bg-[#00C897] rounded-full"></div>
                          <span className="font-semibold">{alimento.nome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Estimativa das Porções */}
                  <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-400">
                      ⚖️ Estimativa das Porções
                    </h3>
                    <ul className="space-y-2">
                      {analiseResult.alimentos.map((alimento, idx) => (
                        <li key={idx} className="flex items-center justify-between text-gray-300">
                          <span>{alimento.nome}</span>
                          <span className="font-bold text-blue-400">{alimento.porcao}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Calorias Totais */}
                  <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-500/30 rounded-2xl p-8 text-center">
                    <h3 className="text-xl font-bold mb-2 text-orange-400">🔥 Calorias Totais Estimadas</h3>
                    <p className="text-5xl font-bold text-white mb-2">{analiseResult.caloriasTotais} kcal</p>
                    <p className="text-sm text-gray-400">aproximadamente</p>
                  </div>

                  {/* Macronutrientes */}
                  <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-purple-400">
                      📊 Macronutrientes
                    </h3>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <span className="text-2xl font-bold text-blue-400">{analiseResult.macros.proteinas}g</span>
                        </div>
                        <p className="text-sm text-gray-400">Proteínas</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-purple-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <span className="text-2xl font-bold text-purple-400">{analiseResult.macros.carboidratos}g</span>
                        </div>
                        <p className="text-sm text-gray-400">Carboidratos</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <span className="text-2xl font-bold text-orange-400">{analiseResult.macros.gorduras}g</span>
                        </div>
                        <p className="text-sm text-gray-400">Gorduras</p>
                      </div>
                    </div>
                  </div>

                  {/* Resumo Nutricional */}
                  <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-green-400">
                      💡 Resumo Nutricional
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4">{analiseResult.resumo}</p>
                  </div>

                  {/* Observações Técnicas */}
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6">
                    <h3 className="text-lg font-bold mb-3 text-blue-400">🔍 Observações Técnicas</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">{analiseResult.observacoes}</p>
                  </div>

                  {/* Sugestões de Melhoria */}
                  {analiseResult.sugestoes.length > 0 && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-green-400">
                        🌱 Sugestões de Melhoria
                      </h3>
                      <ul className="space-y-3">
                        {analiseResult.sugestoes.map((sugestao, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-300">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                            <span>{sugestao}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Botão Nova Análise */}
                  <button
                    onClick={() => {
                      setUploadedImage(null);
                      setAnaliseResult(null);
                    }}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-lg shadow-yellow-500/25 flex items-center justify-center gap-3"
                  >
                    <Camera className="w-6 h-6" />
                    Analisar Nova Refeição
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  const services = [
    {
      id: "dieta",
      icon: <Apple className="w-6 h-6" />,
      title: "Dieta Personalizada",
      description: "Seu cardápio completo gerado com IA",
      color: "from-green-500 to-emerald-600"
    },
    {
      id: "treino",
      icon: <Dumbbell className="w-6 h-6" />,
      title: "Treino Personalizado",
      description: "Exercícios adaptados ao seu nível",
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: "lista-compras",
      icon: <ShoppingCart className="w-6 h-6" />,
      title: "Lista de Compras",
      description: "Gerada automaticamente da sua dieta",
      color: "from-purple-500 to-pink-600"
    },
    {
      id: "check-in",
      icon: <Activity className="w-6 h-6" />,
      title: "Check-in de Evolução",
      description: "Acompanhe seu progresso",
      color: "from-orange-500 to-red-600"
    },
    {
      id: "contador-calorias",
      icon: <Camera className="w-6 h-6" />,
      title: "Contador de Calorias",
      description: "Tire foto e saiba as calorias",
      color: "from-yellow-500 to-orange-600"
    },
    {
      id: "luna",
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Luna - Assistente 24h",
      description: "Tire suas dúvidas a qualquer hora",
      color: "from-indigo-500 to-purple-600"
    },
    {
      id: "ajuste-dieta",
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Ajuste de Dieta",
      description: "Recalcule suas necessidades",
      color: "from-teal-500 to-green-600"
    },
    {
      id: "calculadora",
      icon: <Brain className="w-6 h-6" />,
      title: "Calculadora de Macros",
      description: "Calcule calorias e macronutrientes",
      color: "from-pink-500 to-rose-600"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-white"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div className="text-2xl font-bold">
                <span className="text-white">Nutri</span>
                <span className="text-[#00C897]">X</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#00C897] rounded-full"></span>
              </button>
              <div className="hidden sm:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold">{userData.nome}</p>
                  <p className="text-xs text-gray-400">Plano {userData.plano}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-[#00C897] to-[#00B087] rounded-full flex items-center justify-center font-bold">
                  {userData.nome.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-gray-900 border-r border-gray-800 transition-transform duration-300 z-40 overflow-y-auto ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-6 space-y-6">
            <div className="bg-gradient-to-br from-[#00C897]/20 to-transparent border border-[#00C897]/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-[#00C897]" />
                <span className="font-semibold">Plano Ativo</span>
              </div>
              <p className="text-sm text-gray-400 mb-1">
                Válido até: <span className="text-white font-semibold">{userData.dataValidade}</span>
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{userData.diasRestantes} dias restantes</span>
              </div>
            </div>

            <nav className="space-y-2">
              <a
                href="#"
                onClick={() => {
                  setSelectedService(null);
                  setShowForm(false);
                  setShowFormTreino(false);
                  setDietGenerated(false);
                  setTreinoGenerated(false);
                  setShowMonthlyCheckIn(false);
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#00C897]/10 text-[#00C897] font-semibold"
              >
                <Sparkles className="w-5 h-5" />
                Meus Serviços
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <User className="w-5 h-5" />
                Meu Perfil
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Calendar className="w-5 h-5" />
                Histórico
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Settings className="w-5 h-5" />
                Configurações
              </a>
            </nav>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors">
              <LogOut className="w-5 h-5" />
              Sair da conta
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {selectedService === "luna" ? (
            renderLunaChat()
          ) : selectedService === "contador-calorias" ? (
            renderContadorCalorias()
          ) : (
            <>
              {/* Services Grid */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Seus Serviços</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 hover:border-[#00C897]/50 transition-all hover:scale-105 text-left"
                    >
                      <div
                        className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform`}
                      >
                        {service.icon}
                      </div>
                      <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                      <p className="text-sm text-gray-400 mb-4">{service.description}</p>
                      <div className="flex items-center gap-2 text-[#00C897] text-sm font-semibold">
                        Acessar
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
