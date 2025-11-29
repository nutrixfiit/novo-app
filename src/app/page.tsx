"use client";

import { useState } from "react";
import { 
  Sparkles, 
  Brain, 
  Video, 
  MessageSquare, 
  Camera, 
  TrendingUp,
  CheckCircle2,
  Star,
  ArrowRight,
  Menu,
  X,
  Dumbbell,
  Apple,
  Zap,
  Shield,
  Clock,
  Award,
  Users,
  ChevronRight,
  CreditCard,
  Loader2,
  ShoppingCart,
  Activity,
  LogIn
} from "lucide-react";

export default function NutriXLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"mensal" | "anual">("mensal");
  const [paymentMethod, setPaymentMethod] = useState<"credito" | "debito" | "pix">("credito");

  // Form data
  const [formData, setFormData] = useState({
    // Dados de login (primeiros 3 steps)
    nome: "",
    email: "",
    senha: "",
    // Dados do formulário
    idade: "",
    sexo: "",
    peso: "",
    altura: "",
    meta: "",
    nivelTreino: "",
    frequenciaSemanal: "",
    restricoes: "",
    tempoTreino: "",
    prazo: "",
    lembretes: "",
    comidasFavoritas: [] as string[],
    outrasComidas: "",
    // Novos campos para hormônios
    usaHormonios: "",
    tipoHormonios: [] as string[],
    outrosHormonios: "",
    tempoUsoHormonios: "",
    doseSemanal: "",
    tipoProtocolo: "" // TRT, ciclo leve, moderado, pesado, blast
  });

  // Calcular data de validade do plano
  const calcularDataValidade = () => {
    const hoje = new Date();
    const dataValidade = new Date(hoje);
    
    if (selectedPlan === "anual") {
      dataValidade.setFullYear(dataValidade.getFullYear() + 1);
    } else {
      dataValidade.setMonth(dataValidade.getMonth() + 1);
    }
    
    return dataValidade.toLocaleDateString("pt-BR");
  };

  const scrollToForm = () => {
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('formulario-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleFormSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowPayment(true);
      setTimeout(() => {
        document.getElementById('pagamento-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 2000);
  };

  const handlePaymentSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      setTimeout(() => {
        document.getElementById('sucesso-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 2000);
  };

  const toggleComidaFavorita = (comida: string) => {
    if (formData.comidasFavoritas.includes(comida)) {
      setFormData({
        ...formData,
        comidasFavoritas: formData.comidasFavoritas.filter(c => c !== comida)
      });
    } else {
      setFormData({
        ...formData,
        comidasFavoritas: [...formData.comidasFavoritas, comida]
      });
    }
  };

  const toggleHormonio = (hormonio: string) => {
    if (formData.tipoHormonios.includes(hormonio)) {
      setFormData({
        ...formData,
        tipoHormonios: formData.tipoHormonios.filter(h => h !== hormonio)
      });
    } else {
      setFormData({
        ...formData,
        tipoHormonios: [...formData.tipoHormonios, hormonio]
      });
    }
  };

  const totalSteps = 18; // 3 login + 11 formulário básico + 4 hormônios
  const progress = (formStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header/Navbar */}
      <header className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-[#00C897]/20 z-50">
        <nav className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              <span className="text-white">Nutri</span>
              <span className="text-[#00C897]">X</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#como-funciona" className="hover:text-[#00C897] transition-colors">Como Funciona</a>
              <a href="#funcionalidades" className="hover:text-[#00C897] transition-colors">Funcionalidades</a>
              <a href="#depoimentos" className="hover:text-[#00C897] transition-colors">Depoimentos</a>
              <a 
                href="/login" 
                className="flex items-center gap-2 border-2 border-[#00C897] text-[#00C897] px-5 py-2 rounded-full font-semibold hover:bg-[#00C897]/10 transition-all"
              >
                <LogIn className="w-4 h-4" />
                Acessar conta
              </a>
              <button 
                onClick={scrollToForm}
                className="bg-[#00C897] text-black px-6 py-2 rounded-full font-semibold hover:bg-[#00B087] transition-all hover:scale-105"
              >
                Começar Agora
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
              <a href="#como-funciona" className="hover:text-[#00C897] transition-colors">Como Funciona</a>
              <a href="#funcionalidades" className="hover:text-[#00C897] transition-colors">Funcionalidades</a>
              <a href="#depoimentos" className="hover:text-[#00C897] transition-colors">Depoimentos</a>
              <a 
                href="/login" 
                className="flex items-center justify-center gap-2 border-2 border-[#00C897] text-[#00C897] px-5 py-2 rounded-full font-semibold hover:bg-[#00C897]/10 transition-all"
              >
                <LogIn className="w-4 h-4" />
                Acessar conta
              </a>
              <button 
                onClick={scrollToForm}
                className="bg-[#00C897] text-black px-6 py-2 rounded-full font-semibold hover:bg-[#00B087] transition-all"
              >
                Começar Agora
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00C897] rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00C897] rounded-full blur-[120px] animate-pulse delay-1000"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#00C897]/10 border border-[#00C897]/30 rounded-full px-4 py-2 mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-[#00C897]" />
              <span className="text-sm text-[#00C897]">IA + Acompanhamento Profissional</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
              Sua evolução começa aqui
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-300 mb-4 animate-fade-in-up delay-200">
              Dieta personalizada com <span className="text-[#00C897] font-semibold">Inteligência Artificial</span>
            </p>
            <p className="text-lg sm:text-xl text-gray-400 mb-8 animate-fade-in-up delay-300">
              e <span className="text-[#00C897] font-semibold">acompanhamento profissional</span> da NutriX
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up delay-400">
              <button 
                onClick={scrollToForm}
                className="group bg-[#00C897] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-[#00B087] transition-all hover:scale-105 flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                Monte seu plano personalizado agora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-[#00C897] text-[#00C897] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#00C897]/10 transition-all w-full sm:w-auto">
                Ver como funciona
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400 animate-fade-in-up delay-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00C897]" />
                <span>A partir de R$ 49,90/mês</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00C897]" />
                <span>Cancele quando quiser</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00C897]" />
                <span>Acesso total ilimitado</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#00C897] rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-[#00C897] rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section id="como-funciona" className="py-20 sm:py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              Como a <span className="text-[#00C897]">NutriX</span> funciona?
            </h2>
            <p className="text-xl text-gray-400">
              Tecnologia de ponta + Acompanhamento profissional
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 hover:border-[#00C897]/50 transition-all hover:scale-105">
              <div className="w-16 h-16 bg-[#00C897]/10 rounded-2xl flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-[#00C897]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">1. IA Analisa Você</h3>
              <p className="text-gray-400">
                Nossa inteligência artificial cria uma <span className="text-[#00C897] font-semibold">dieta 100% personalizada</span> baseada no seu corpo, objetivos e preferências alimentares.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 hover:border-[#00C897]/50 transition-all hover:scale-105">
              <div className="w-16 h-16 bg-[#00C897]/10 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-[#00C897]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">2. Profissionais Validam</h3>
              <p className="text-gray-400">
                <span className="text-[#00C897] font-semibold">Nutricionistas e educadores físicos</span> da NutriX revisam e ajustam seu plano para garantir resultados reais e seguros.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 hover:border-[#00C897]/50 transition-all hover:scale-105">
              <div className="w-16 h-16 bg-[#00C897]/10 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-[#00C897]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">3. Você Evolui</h3>
              <p className="text-gray-400">
                Acompanhe seu progresso em tempo real com <span className="text-[#00C897] font-semibold">check-ins</span>, tire dúvidas com a Luna (IA) e receba ajustes conforme você evolui.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Funcionalidades Section */}
      <section id="funcionalidades" className="py-20 sm:py-32 bg-black">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              Tudo que você precisa em <span className="text-[#00C897]">um só lugar</span>
            </h2>
            <p className="text-xl text-gray-400">
              Ferramentas profissionais ao alcance de um clique
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Feature Cards */}
            {[
              {
                icon: <Brain className="w-8 h-8" />,
                title: "Dieta Personalizada com IA",
                description: "Cardápio completo adaptado ao seu corpo e objetivos com acompanhamento profissional"
              },
              {
                icon: <Dumbbell className="w-8 h-8" />,
                title: "Treinos Personalizados",
                description: "Exercícios específicos para seu nível e meta com orientação profissional"
              },
              {
                icon: <Camera className="w-8 h-8" />,
                title: "Contador de Calorias por Foto",
                description: "Tire foto do prato e saiba as calorias instantaneamente"
              },
              {
                icon: <MessageSquare className="w-8 h-8" />,
                title: "Luna - Assistente Virtual 24h",
                description: "Tire dúvidas sobre nutrição e treino a qualquer hora"
              },
              {
                icon: <ShoppingCart className="w-8 h-8" />,
                title: "Criador de Lista de Compras",
                description: "Sua lista de compras pronta automaticamente assim que a dieta for montada"
              },
              {
                icon: <Activity className="w-8 h-8" />,
                title: "Check-in de Evolução",
                description: "Acompanhe seu progresso com relatórios detalhados"
              },
              {
                icon: <Apple className="w-8 h-8" />,
                title: "Dieta para Uso de Hormônios",
                description: "Planos especializados para quem faz utilização de hormônios"
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Acompanhamento Profissional",
                description: "Suporte contínuo de nutricionistas e educadores físicos"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 hover:border-[#00C897]/50 transition-all hover:scale-105"
              >
                <div className="w-14 h-14 bg-[#00C897]/10 rounded-xl flex items-center justify-center mb-4 text-[#00C897]">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos Section */}
      <section id="depoimentos" className="py-20 sm:py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              Quem usa <span className="text-[#00C897]">aprova</span>
            </h2>
            <p className="text-xl text-gray-400">
              Mais de 10.000 pessoas transformando seus corpos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Maria Silva",
                result: "Perdeu 12kg em 3 meses",
                text: "A NutriX mudou minha vida! O plano personalizado e o acompanhamento profissional constante fizeram toda a diferença.",
                rating: 5
              },
              {
                name: "João Santos",
                result: "Ganhou 8kg de massa muscular",
                text: "Finalmente consegui ganhar massa magra de forma saudável. A dieta e os treinos são perfeitos para mim!",
                rating: 5
              },
              {
                name: "Ana Costa",
                result: "Definiu o corpo em 2 meses",
                text: "Adorei poder tirar foto da comida e saber as calorias na hora. A Luna me ajuda sempre que tenho dúvidas!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#00C897] text-[#00C897]" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div className="border-t border-gray-800 pt-4">
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-[#00C897]">{testimonial.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final Section - Planos */}
      <section className="py-20 sm:py-32 bg-black">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6">
              Pronto para <span className="text-[#00C897]">transformar</span> seu corpo?
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              Escolha o plano ideal para você
            </p>

            {/* Planos */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Plano Mensal */}
              <div className="bg-gradient-to-br from-gray-900 to-black border border-[#00C897]/30 rounded-3xl p-8 hover:scale-105 transition-all">
                <div className="text-left mb-6">
                  <h3 className="text-2xl font-bold mb-2">Plano Mensal</h3>
                  <p className="text-gray-400 text-sm">Flexibilidade total</p>
                </div>
                <div className="text-left mb-6">
                  <p className="text-5xl font-bold text-[#00C897] mb-2">R$ 49,90</p>
                  <p className="text-gray-400">por mês • Cancele quando quiser</p>
                  <div className="mt-3 inline-block bg-[#00C897]/10 border border-[#00C897]/30 rounded-lg px-3 py-1">
                    <p className="text-[#00C897] font-semibold text-sm">💰 Menos de R$ 2 por dia</p>
                  </div>
                </div>

                {/* Lista COMPLETA de serviços */}
                <div className="space-y-3 mb-6">
                  <div className="bg-[#00C897]/5 rounded-xl p-4 border border-[#00C897]/20">
                    <p className="text-[#00C897] font-bold text-center mb-3">✨ ACESSO TOTAL A TUDO:</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#00C897] flex-shrink-0" />
                        <span className="text-sm text-gray-300">Dieta personalizada com IA</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#00C897] flex-shrink-0" />
                        <span className="text-sm text-gray-300">Treinos personalizados</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#00C897] flex-shrink-0" />
                        <span className="text-sm text-gray-300">Acompanhamento profissional</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#00C897] flex-shrink-0" />
                        <span className="text-sm text-gray-300">Contador de calorias por foto</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#00C897] flex-shrink-0" />
                        <span className="text-sm text-gray-300">Lista de compras automática</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#00C897] flex-shrink-0" />
                        <span className="text-sm text-gray-300">Check-in de evolução</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#00C897] flex-shrink-0" />
                        <span className="text-sm text-gray-300">Dieta para uso de hormônios</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#00C897] flex-shrink-0" />
                        <span className="text-sm text-gray-300">Luna - Assistente 24h</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-400 italic">
                    Sem restrições • Acesso completo a todos os recursos
                  </p>
                </div>

                <button 
                  onClick={() => {
                    setSelectedPlan("mensal");
                    scrollToForm();
                  }}
                  className="w-full bg-[#00C897] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-[#00B087] transition-all flex items-center justify-center gap-2"
                >
                  Começar agora
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Plano Anual - PROMOCIONAL */}
              <div className="bg-gradient-to-br from-[#00C897]/20 to-black border-2 border-[#00C897] rounded-3xl p-8 hover:scale-105 transition-all relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00C897] text-black px-6 py-2 rounded-full font-bold text-sm">
                  🔥 PROMOÇÃO
                </div>
                <div className="text-left mb-6">
                  <h3 className="text-2xl font-bold mb-2">Plano Anual</h3>
                  <p className="text-gray-400 text-sm">Melhor custo-benefício</p>
                </div>
                <div className="text-left mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <p className="text-5xl font-bold text-[#00C897]">R$ 299,90</p>
                    <span className="text-gray-500 line-through text-xl">R$ 598,80</span>
                  </div>
                  <p className="text-gray-400">por ano • Economize 50%</p>
                  <p className="text-[#00C897] font-semibold mt-1">Apenas R$ 24,99/mês</p>
                  <div className="mt-3 bg-gradient-to-r from-[#00C897]/20 to-transparent border border-[#00C897]/40 rounded-lg px-3 py-2">
                    <p className="text-white font-bold text-sm">
                      💎 Se R$ 24,99/mês te impede, o problema não é o preço
                    </p>
                  </div>
                </div>

                {/* Lista COMPLETA de serviços */}
                <div className="space-y-3 mb-6">
                  <div className="bg-[#00C897]/5 rounded-xl p-4 border border-[#00C897]/20">
                    <p className="text-[#00C897] font-bold text-center mb-3">✨ ACESSO TOTAL A TUDO:</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#00C897] flex-shrink-0" />
                        <span className="text-sm text-gray-300">Dieta personalizada com IA</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#00C897] flex-shrink-0" />
                        <span className="text-sm text-gray-300">Treinos personalizados</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#00C897] flex-shrink-0" />
                        <span className="text-sm text-gray-300">Acompanhamento profissional</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#00C897] flex-shrink-0" />
                        <span className="text-sm text-gray-300">Contador de calorias por foto</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#00C897] flex-shrink-0" />
                        <span className="text-sm text-gray-300">Lista de compras automática</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#00C897] flex-shrink-0" />
                        <span className="text-sm text-gray-300">Check-in de evolução</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#00C897] flex-shrink-0" />
                        <span className="text-sm text-gray-300">Dieta para uso de hormônios</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#00C897] flex-shrink-0" />
                        <span className="text-sm text-gray-300">Luna - Assistente 24h</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#00C897] flex-shrink-0" />
                        <span className="text-sm text-gray-300 font-semibold">+ Economize R$ 298,90 no ano</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-400 italic">
                    Sem restrições • Acesso completo a todos os recursos
                  </p>
                </div>

                <button 
                  onClick={() => {
                    setSelectedPlan("anual");
                    scrollToForm();
                  }}
                  className="w-full bg-[#00C897] text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-[#00B087] transition-all flex items-center justify-center gap-2"
                >
                  Aproveitar promoção
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              Pagamento seguro • Dados protegidos • Satisfação garantida
            </p>
          </div>
        </div>
      </section>

      {/* Formulário Section */}
      {showForm && (
        <section id="formulario-section" className="py-20 sm:py-32 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Progresso</span>
                  <span className="text-sm font-semibold text-[#00C897]">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-[#00C897] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Form Card */}
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 sm:p-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                  {formStep <= 2 ? "Crie sua conta" : "Monte seu plano personalizado"}
                </h2>
                <p className="text-gray-400 mb-8">
                  {formStep <= 2 
                    ? "Primeiro, vamos criar seu acesso à plataforma" 
                    : "Agora responda algumas perguntas para criarmos o plano perfeito para você"}
                </p>

                {/* Form Steps */}
                <div className="space-y-6">
                  {/* Step 0: Nome */}
                  {formStep === 0 && (
                    <div className="animate-fade-in">
                      <label className="block text-lg font-semibold mb-3">Qual é o seu nome completo?</label>
                      <input
                        type="text"
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#00C897] focus:outline-none"
                        placeholder="Digite seu nome completo"
                      />
                    </div>
                  )}

                  {/* Step 1: Email */}
                  {formStep === 1 && (
                    <div className="animate-fade-in">
                      <label className="block text-lg font-semibold mb-3">Qual é o seu melhor email?</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#00C897] focus:outline-none"
                        placeholder="seu@email.com"
                      />
                      <p className="text-sm text-gray-400 mt-2">Você receberá seu acesso neste email</p>
                    </div>
                  )}

                  {/* Step 2: Senha */}
                  {formStep === 2 && (
                    <div className="animate-fade-in">
                      <label className="block text-lg font-semibold mb-3">Crie uma senha segura</label>
                      <input
                        type="password"
                        value={formData.senha}
                        onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#00C897] focus:outline-none"
                        placeholder="Mínimo 6 caracteres"
                      />
                      <p className="text-sm text-gray-400 mt-2">Use esta senha para acessar sua conta</p>
                    </div>
                  )}

                  {/* Step 3: Idade */}
                  {formStep === 3 && (
                    <div className="animate-fade-in">
                      <label className="block text-lg font-semibold mb-3">Quantos anos você tem?</label>
                      <input
                        type="number"
                        value={formData.idade}
                        onChange={(e) => setFormData({ ...formData, idade: e.target.value })}
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#00C897] focus:outline-none"
                        placeholder="Ex: 25"
                      />
                    </div>
                  )}

                  {/* Step 4: Sexo */}
                  {formStep === 4 && (
                    <div className="animate-fade-in">
                      <label className="block text-lg font-semibold mb-3">Qual é o seu sexo biológico?</label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => setFormData({ ...formData, sexo: "masculino" })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            formData.sexo === "masculino"
                              ? "border-[#00C897] bg-[#00C897]/10"
                              : "border-gray-700 hover:border-gray-600"
                          }`}
                        >
                          Masculino
                        </button>
                        <button
                          onClick={() => setFormData({ ...formData, sexo: "feminino" })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            formData.sexo === "feminino"
                              ? "border-[#00C897] bg-[#00C897]/10"
                              : "border-gray-700 hover:border-gray-600"
                          }`}
                        >
                          Feminino
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Peso */}
                  {formStep === 5 && (
                    <div className="animate-fade-in">
                      <label className="block text-lg font-semibold mb-3">Qual é o seu peso atual? (kg)</label>
                      <input
                        type="number"
                        value={formData.peso}
                        onChange={(e) => setFormData({ ...formData, peso: e.target.value })}
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#00C897] focus:outline-none"
                        placeholder="Ex: 75"
                      />
                    </div>
                  )}

                  {/* Step 6: Altura */}
                  {formStep === 6 && (
                    <div className="animate-fade-in">
                      <label className="block text-lg font-semibold mb-3">Qual é a sua altura? (cm)</label>
                      <input
                        type="number"
                        value={formData.altura}
                        onChange={(e) => setFormData({ ...formData, altura: e.target.value })}
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#00C897] focus:outline-none"
                        placeholder="Ex: 175"
                      />
                    </div>
                  )}

                  {/* Step 7: Meta */}
                  {formStep === 7 && (
                    <div className="animate-fade-in">
                      <label className="block text-lg font-semibold mb-3">Qual é o seu objetivo principal?</label>
                      <div className="space-y-3">
                        {["Emagrecer", "Ganhar massa muscular", "Definir o corpo", "Manter o peso"].map((meta) => (
                          <button
                            key={meta}
                            onClick={() => setFormData({ ...formData, meta })}
                            className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                              formData.meta === meta
                                ? "border-[#00C897] bg-[#00C897]/10"
                                : "border-gray-700 hover:border-gray-600"
                            }`}
                          >
                            {meta}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 8: Nível de Treino */}
                  {formStep === 8 && (
                    <div className="animate-fade-in">
                      <label className="block text-lg font-semibold mb-3">Qual é o seu nível de treino?</label>
                      <div className="space-y-3">
                        {[
                          { nivel: "Iniciante", desc: "Nunca treinei ou parei há muito tempo" },
                          { nivel: "Intermediário", desc: "Treino há alguns meses regularmente" },
                          { nivel: "Avançado", desc: "Treino há mais de 1 ano consistentemente" }
                        ].map((item) => (
                          <button
                            key={item.nivel}
                            onClick={() => setFormData({ ...formData, nivelTreino: item.nivel })}
                            className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                              formData.nivelTreino === item.nivel
                                ? "border-[#00C897] bg-[#00C897]/10"
                                : "border-gray-700 hover:border-gray-600"
                            }`}
                          >
                            <div className="font-semibold">{item.nivel}</div>
                            <div className="text-sm text-gray-400">{item.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 9: Frequência Semanal */}
                  {formStep === 9 && (
                    <div className="animate-fade-in">
                      <label className="block text-lg font-semibold mb-3">Quantas vezes por semana você pode treinar?</label>
                      <div className="grid grid-cols-3 gap-3">
                        {["3x", "4x", "5x", "6x", "7x"].map((freq) => (
                          <button
                            key={freq}
                            onClick={() => setFormData({ ...formData, frequenciaSemanal: freq })}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              formData.frequenciaSemanal === freq
                                ? "border-[#00C897] bg-[#00C897]/10"
                                : "border-gray-700 hover:border-gray-600"
                            }`}
                          >
                            {freq}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 10: Tempo de Treino */}
                  {formStep === 10 && (
                    <div className="animate-fade-in">
                      <label className="block text-lg font-semibold mb-3">Quanto tempo você tem disponível por treino?</label>
                      <div className="space-y-3">
                        {["30 minutos", "45 minutos", "1 hora", "1h30 ou mais"].map((tempo) => (
                          <button
                            key={tempo}
                            onClick={() => setFormData({ ...formData, tempoTreino: tempo })}
                            className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                              formData.tempoTreino === tempo
                                ? "border-[#00C897] bg-[#00C897]/10"
                                : "border-gray-700 hover:border-gray-600"
                            }`}
                          >
                            {tempo}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 11: Restrições Alimentares */}
                  {formStep === 11 && (
                    <div className="animate-fade-in">
                      <label className="block text-lg font-semibold mb-3">Você tem alguma restrição alimentar?</label>
                      <textarea
                        value={formData.restricoes}
                        onChange={(e) => setFormData({ ...formData, restricoes: e.target.value })}
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#00C897] focus:outline-none h-32"
                        placeholder="Ex: Intolerância à lactose, alergia a frutos do mar, vegetariano... (deixe em branco se não tiver)"
                      />
                    </div>
                  )}

                  {/* Step 12: Comidas Favoritas */}
                  {formStep === 12 && (
                    <div className="animate-fade-in">
                      <label className="block text-lg font-semibold mb-3">Quais são suas comidas favoritas?</label>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {["Frango", "Carne vermelha", "Peixe", "Ovos", "Arroz", "Batata", "Macarrão", "Salada"].map((comida) => (
                          <button
                            key={comida}
                            onClick={() => toggleComidaFavorita(comida)}
                            className={`p-3 rounded-xl border-2 transition-all ${
                              formData.comidasFavoritas.includes(comida)
                                ? "border-[#00C897] bg-[#00C897]/10"
                                : "border-gray-700 hover:border-gray-600"
                            }`}
                          >
                            {comida}
                          </button>
                        ))}
                      </div>
                      <input
                        type="text"
                        value={formData.outrasComidas}
                        onChange={(e) => setFormData({ ...formData, outrasComidas: e.target.value })}
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#00C897] focus:outline-none"
                        placeholder="Outras comidas que você gosta..."
                      />
                    </div>
                  )}

                  {/* Step 13: Prazo */}
                  {formStep === 13 && (
                    <div className="animate-fade-in">
                      <label className="block text-lg font-semibold mb-3">Em quanto tempo você quer alcançar seu objetivo?</label>
                      <div className="space-y-3">
                        {["1 mês", "3 meses", "6 meses", "1 ano"].map((prazo) => (
                          <button
                            key={prazo}
                            onClick={() => setFormData({ ...formData, prazo })}
                            className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                              formData.prazo === prazo
                                ? "border-[#00C897] bg-[#00C897]/10"
                                : "border-gray-700 hover:border-gray-600"
                            }`}
                          >
                            {prazo}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 14: Lembretes */}
                  {formStep === 14 && (
                    <div className="animate-fade-in">
                      <label className="block text-lg font-semibold mb-3">Deseja receber lembretes de treino e alimentação?</label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => setFormData({ ...formData, lembretes: "sim" })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            formData.lembretes === "sim"
                              ? "border-[#00C897] bg-[#00C897]/10"
                              : "border-gray-700 hover:border-gray-600"
                          }`}
                        >
                          Sim, quero receber
                        </button>
                        <button
                          onClick={() => setFormData({ ...formData, lembretes: "não" })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            formData.lembretes === "não"
                              ? "border-[#00C897] bg-[#00C897]/10"
                              : "border-gray-700 hover:border-gray-600"
                          }`}
                        >
                          Não, obrigado
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 15: Uso de Hormônios */}
                  {formStep === 15 && (
                    <div className="animate-fade-in">
                      <label className="block text-lg font-semibold mb-3">Você utiliza hormônios atualmente?</label>
                      <div className="bg-[#00C897]/5 border border-[#00C897]/20 rounded-xl p-4 mb-4">
                        <p className="text-sm text-gray-300">
                          💊 Oferecemos planos nutricionais especializados para quem faz uso de hormônios anabolizantes
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => setFormData({ ...formData, usaHormonios: "sim" })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            formData.usaHormonios === "sim"
                              ? "border-[#00C897] bg-[#00C897]/10"
                              : "border-gray-700 hover:border-gray-600"
                          }`}
                        >
                          Sim, utilizo
                        </button>
                        <button
                          onClick={() => setFormData({ ...formData, usaHormonios: "não" })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            formData.usaHormonios === "não"
                              ? "border-[#00C897] bg-[#00C897]/10"
                              : "border-gray-700 hover:border-gray-600"
                          }`}
                        >
                          Não utilizo
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 16: Tipo de Hormônios (só aparece se usaHormonios === "sim") */}
                  {formStep === 16 && formData.usaHormonios === "sim" && (
                    <div className="animate-fade-in">
                      <label className="block text-lg font-semibold mb-3">Quais hormônios você utiliza atualmente?</label>
                      <p className="text-sm text-gray-400 mb-4">Selecione todos que você utiliza</p>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {[
                          "Testosterona",
                          "Oxandrolona",
                          "Stanozolol",
                          "GH",
                          "Nandrolona",
                          "Deca",
                          "Masteron",
                          "Trembolona",
                          "Cipionato",
                          "Enantato",
                          "Durateston",
                          "HCG"
                        ].map((hormonio) => (
                          <button
                            key={hormonio}
                            onClick={() => toggleHormonio(hormonio)}
                            className={`p-3 rounded-xl border-2 transition-all text-sm ${
                              formData.tipoHormonios.includes(hormonio)
                                ? "border-[#00C897] bg-[#00C897]/10"
                                : "border-gray-700 hover:border-gray-600"
                            }`}
                          >
                            {hormonio}
                          </button>
                        ))}
                      </div>
                      <input
                        type="text"
                        value={formData.outrosHormonios}
                        onChange={(e) => setFormData({ ...formData, outrosHormonios: e.target.value })}
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#00C897] focus:outline-none"
                        placeholder="Outros hormônios não listados..."
                      />
                    </div>
                  )}

                  {/* Step 16 alternativo: Pular se não usa hormônios */}
                  {formStep === 16 && formData.usaHormonios === "não" && (
                    <div className="animate-fade-in text-center py-8">
                      <CheckCircle2 className="w-16 h-16 text-[#00C897] mx-auto mb-4" />
                      <p className="text-xl font-semibold mb-2">Perfeito!</p>
                      <p className="text-gray-400">Vamos criar seu plano personalizado sem hormônios</p>
                    </div>
                  )}

                  {/* Step 17: Tempo de Uso (só aparece se usaHormonios === "sim") */}
                  {formStep === 17 && formData.usaHormonios === "sim" && (
                    <div className="animate-fade-in">
                      <label className="block text-lg font-semibold mb-3">Há quanto tempo você utiliza hormônios?</label>
                      <div className="space-y-3">
                        {[
                          "Menos de 3 meses",
                          "3 a 6 meses",
                          "6 meses a 1 ano",
                          "1 a 2 anos",
                          "Mais de 2 anos"
                        ].map((tempo) => (
                          <button
                            key={tempo}
                            onClick={() => setFormData({ ...formData, tempoUsoHormonios: tempo })}
                            className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                              formData.tempoUsoHormonios === tempo
                                ? "border-[#00C897] bg-[#00C897]/10"
                                : "border-gray-700 hover:border-gray-600"
                            }`}
                          >
                            {tempo}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 17 alternativo: Pular se não usa hormônios */}
                  {formStep === 17 && formData.usaHormonios === "não" && (
                    <div className="animate-fade-in text-center py-8">
                      <Loader2 className="w-16 h-16 text-[#00C897] mx-auto mb-4 animate-spin" />
                      <p className="text-xl font-semibold mb-2">Preparando seu plano...</p>
                      <p className="text-gray-400">Estamos calculando suas necessidades nutricionais</p>
                    </div>
                  )}

                  {/* Step 18: Dose e Tipo de Protocolo (só aparece se usaHormonios === "sim") */}
                  {formStep === 18 && formData.usaHormonios === "sim" && (
                    <div className="animate-fade-in space-y-6">
                      <div>
                        <label className="block text-lg font-semibold mb-3">Qual é a dose semanal total?</label>
                        <input
                          type="text"
                          value={formData.doseSemanal}
                          onChange={(e) => setFormData({ ...formData, doseSemanal: e.target.value })}
                          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#00C897] focus:outline-none"
                          placeholder="Ex: 500mg/semana, 250mg 2x/semana, etc."
                        />
                        <p className="text-sm text-gray-400 mt-2">Informe a dose total de todos os compostos</p>
                      </div>

                      <div>
                        <label className="block text-lg font-semibold mb-3">Qual tipo de protocolo você está fazendo?</label>
                        <div className="space-y-3">
                          {[
                            { tipo: "TRT", desc: "Terapia de Reposição Hormonal (doses baixas)" },
                            { tipo: "Ciclo leve", desc: "Doses moderadas, foco em saúde" },
                            { tipo: "Ciclo moderado", desc: "Doses médias, ganhos consistentes" },
                            { tipo: "Ciclo pesado", desc: "Doses altas, ganhos acelerados" },
                            { tipo: "Blast intenso", desc: "Doses muito altas, máximo desempenho" }
                          ].map((item) => (
                            <button
                              key={item.tipo}
                              onClick={() => setFormData({ ...formData, tipoProtocolo: item.tipo })}
                              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                                formData.tipoProtocolo === item.tipo
                                  ? "border-[#00C897] bg-[#00C897]/10"
                                  : "border-gray-700 hover:border-gray-600"
                              }`}
                            >
                              <div className="font-semibold">{item.tipo}</div>
                              <div className="text-sm text-gray-400">{item.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 18 alternativo: Pular se não usa hormônios */}
                  {formStep === 18 && formData.usaHormonios === "não" && (
                    <div className="animate-fade-in text-center py-8">
                      <CheckCircle2 className="w-16 h-16 text-[#00C897] mx-auto mb-4" />
                      <p className="text-xl font-semibold mb-2">Tudo pronto!</p>
                      <p className="text-gray-400">Seu plano está sendo finalizado</p>
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-8">
                  {formStep > 0 && (
                    <button
                      onClick={() => setFormStep(formStep - 1)}
                      className="flex-1 border-2 border-gray-700 text-white px-6 py-3 rounded-xl font-semibold hover:border-gray-600 transition-all"
                    >
                      Voltar
                    </button>
                  )}
                  {formStep < totalSteps ? (
                    <button
                      onClick={() => {
                        // Se está no step 15 e não usa hormônios, pula direto para o step 18
                        if (formStep === 15 && formData.usaHormonios === "não") {
                          setFormStep(18);
                        } else {
                          setFormStep(formStep + 1);
                        }
                      }}
                      className="flex-1 bg-[#00C897] text-black px-6 py-3 rounded-xl font-semibold hover:bg-[#00B087] transition-all"
                    >
                      Próximo
                    </button>
                  ) : (
                    <button
                      onClick={handleFormSubmit}
                      disabled={isProcessing}
                      className="flex-1 bg-[#00C897] text-black px-6 py-3 rounded-xl font-semibold hover:bg-[#00B087] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processando...
                        </>
                      ) : (
                        "Ir para pagamento"
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pagamento Section */}
      {showPayment && !showSuccess && (
        <section id="pagamento-section" className="py-20 sm:py-32 bg-black">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 sm:p-12">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-[#00C897]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-[#00C897]" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                    Seu plano está pronto, {formData.nome}!
                  </h2>
                  <p className="text-gray-400">
                    Falta apenas um passo para começar sua transformação
                  </p>
                </div>

                {/* Seleção de Plano */}
                <div className="mb-8">
                  <h3 className="font-bold text-xl mb-4">Escolha seu plano:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setSelectedPlan("mensal")}
                      className={`p-6 rounded-2xl border-2 transition-all text-left ${
                        selectedPlan === "mensal"
                          ? "border-[#00C897] bg-[#00C897]/10"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      <div className="font-bold text-lg mb-1">Mensal</div>
                      <div className="text-2xl font-bold text-[#00C897] mb-1">R$ 49,90</div>
                      <div className="text-sm text-gray-400">por mês</div>
                    </button>
                    <button
                      onClick={() => setSelectedPlan("anual")}
                      className={`p-6 rounded-2xl border-2 transition-all text-left relative ${
                        selectedPlan === "anual"
                          ? "border-[#00C897] bg-[#00C897]/10"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      <div className="absolute -top-3 right-4 bg-[#00C897] text-black px-3 py-1 rounded-full text-xs font-bold">
                        50% OFF
                      </div>
                      <div className="font-bold text-lg mb-1">Anual</div>
                      <div className="text-2xl font-bold text-[#00C897] mb-1">R$ 299,90</div>
                      <div className="text-sm text-gray-400">R$ 24,99/mês</div>
                    </button>
                  </div>
                </div>

                {/* Resumo do Plano */}
                <div className="bg-gray-800/50 rounded-2xl p-6 mb-8">
                  <h3 className="font-bold text-xl mb-4">Resumo do seu plano:</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Plano escolhido:</span>
                      <span className="font-semibold">{selectedPlan === "mensal" ? "Mensal" : "Anual"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Válido até:</span>
                      <span className="font-semibold text-[#00C897]">{calcularDataValidade()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email de acesso:</span>
                      <span className="font-semibold">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Objetivo:</span>
                      <span className="font-semibold">{formData.meta}</span>
                    </div>
                    {formData.usaHormonios === "sim" && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Protocolo:</span>
                        <span className="font-semibold text-[#00C897]">{formData.tipoProtocolo}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Método de Pagamento */}
                <div className="mb-8">
                  <h3 className="font-bold text-xl mb-4">Método de pagamento:</h3>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <button
                      onClick={() => setPaymentMethod("credito")}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === "credito"
                          ? "border-[#00C897] bg-[#00C897]/10"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      <CreditCard className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm font-semibold">Crédito</div>
                    </button>
                    {selectedPlan === "anual" && (
                      <>
                        <button
                          onClick={() => setPaymentMethod("debito")}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            paymentMethod === "debito"
                              ? "border-[#00C897] bg-[#00C897]/10"
                              : "border-gray-700 hover:border-gray-600"
                          }`}
                        >
                          <CreditCard className="w-6 h-6 mx-auto mb-2" />
                          <div className="text-sm font-semibold">Débito</div>
                        </button>
                        <button
                          onClick={() => setPaymentMethod("pix")}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            paymentMethod === "pix"
                              ? "border-[#00C897] bg-[#00C897]/10"
                              : "border-gray-700 hover:border-gray-600"
                          }`}
                        >
                          <Sparkles className="w-6 h-6 mx-auto mb-2" />
                          <div className="text-sm font-semibold">PIX</div>
                        </button>
                      </>
                    )}
                  </div>

                  {selectedPlan === "mensal" && (
                    <p className="text-sm text-gray-400 text-center mb-6">
                      Plano mensal disponível apenas via cartão de crédito
                    </p>
                  )}
                </div>

                {/* Preço */}
                <div className="bg-gradient-to-br from-[#00C897]/10 to-transparent border border-[#00C897]/30 rounded-2xl p-6 mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">
                        {selectedPlan === "mensal" ? "Investimento mensal" : "Investimento anual"}
                      </p>
                      <p className="text-4xl font-bold text-[#00C897]">
                        {selectedPlan === "mensal" ? "R$ 49,90" : "R$ 299,90"}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        {selectedPlan === "mensal" ? "Cancele quando quiser" : "Economize 50% no ano"}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-[#00C897]" />
                        <span>Acesso total</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-[#00C897]" />
                        <span>Suporte 24h</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <CheckCircle2 className="w-4 h-4 text-[#00C897]" />
                        <span>Sem fidelidade</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Formulário de Pagamento Simulado */}
                {(paymentMethod === "credito" || paymentMethod === "debito") && (
                  <div className="space-y-4 mb-8">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Número do cartão</label>
                      <input
                        type="text"
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#00C897] focus:outline-none"
                        placeholder="0000 0000 0000 0000"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Validade</label>
                        <input
                          type="text"
                          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#00C897] focus:outline-none"
                          placeholder="MM/AA"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">CVV</label>
                        <input
                          type="text"
                          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#00C897] focus:outline-none"
                          placeholder="123"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Nome no cartão</label>
                      <input
                        type="text"
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-[#00C897] focus:outline-none"
                        placeholder="Nome como está no cartão"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === "pix" && (
                  <div className="bg-gray-800/50 rounded-2xl p-6 mb-8 text-center">
                    <div className="w-48 h-48 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center">
                      <p className="text-black font-bold">QR CODE PIX</p>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">Escaneie o QR Code para pagar</p>
                    <p className="text-xs text-gray-500">Pagamento confirmado automaticamente</p>
                  </div>
                )}

                {/* Botão de Pagamento */}
                <button
                  onClick={handlePaymentSubmit}
                  disabled={isProcessing}
                  className="w-full bg-[#00C897] text-black px-6 py-4 rounded-xl font-bold text-lg hover:bg-[#00B087] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Processando pagamento...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-6 h-6" />
                      Confirmar pagamento
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Pagamento 100% seguro e criptografado
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sucesso Section */}
      {showSuccess && (
        <section id="sucesso-section" className="py-20 sm:py-32 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              {/* Animação de Sucesso */}
              <div className="mb-8 relative">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#00C897] to-[#00B087] rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-16 h-16 text-black" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 bg-[#00C897] rounded-full blur-3xl opacity-20 animate-pulse"></div>
                </div>
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                🎉 Bem-vindo(a) à <span className="text-[#00C897]">NutriX</span>, {formData.nome}!
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Pagamento confirmado! Seu plano personalizado está pronto e aguardando por você.
              </p>

              <div className="bg-gradient-to-br from-gray-900 to-black border border-[#00C897]/30 rounded-2xl p-6 mb-8 inline-block">
                <p className="text-sm text-gray-400 mb-2">Suas credenciais de acesso:</p>
                <p className="text-lg"><span className="text-gray-400">Email:</span> <span className="font-semibold text-[#00C897]">{formData.email}</span></p>
                <p className="text-lg"><span className="text-gray-400">Senha:</span> <span className="font-semibold">A que você criou</span></p>
                <p className="text-sm text-gray-400 mt-3">
                  Plano válido até: <span className="font-semibold text-[#00C897]">{calcularDataValidade()}</span>
                </p>
              </div>

              <p className="text-lg text-gray-400 mb-8">
                Prepare-se para transformar seu corpo com tecnologia e acompanhamento profissional!
              </p>

              {/* Próximos Passos */}
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 mb-8 text-left">
                <h3 className="text-xl font-bold mb-4 text-center">Próximos passos:</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#00C897] rounded-full flex items-center justify-center flex-shrink-0 font-bold text-black">
                      1
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Acesse sua conta</p>
                      <p className="text-sm text-gray-400">Use o email e senha que você criou</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#00C897] rounded-full flex items-center justify-center flex-shrink-0 font-bold text-black">
                      2
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Conheça seu plano</p>
                      <p className="text-sm text-gray-400">Veja sua dieta personalizada com IA e treinos com acompanhamento profissional</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#00C897] rounded-full flex items-center justify-center flex-shrink-0 font-bold text-black">
                      3
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Use suas ferramentas</p>
                      <p className="text-sm text-gray-400">Lista de compras automática, check-in de evolução e muito mais</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#00C897] rounded-full flex items-center justify-center flex-shrink-0 font-bold text-black">
                      4
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Converse com a Luna</p>
                      <p className="text-sm text-gray-400">Tire todas as suas dúvidas com nossa assistente virtual 24h</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botão de Acesso */}
              <a 
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-[#00C897] text-black px-10 py-5 rounded-full font-bold text-xl hover:bg-[#00B087] transition-all hover:scale-105"
              >
                Acessar minha conta agora
                <ArrowRight className="w-6 h-6" />
              </a>

              {/* Suporte */}
              <div className="mt-12 inline-flex items-center gap-2 bg-[#00C897]/10 border border-[#00C897]/30 rounded-xl px-6 py-4">
                <MessageSquare className="w-5 h-5 text-[#00C897]" />
                <p className="text-sm text-gray-300">
                  Dúvidas? Nossa equipe está disponível 24h no chat!
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                <span className="text-white">Nutri</span>
                <span className="text-[#00C897]">X</span>
              </div>
              <p className="text-gray-400 text-sm mt-4">
                Tecnologia e ciência transformando o seu corpo.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Plataforma</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#como-funciona" className="hover:text-[#00C897] transition-colors">Como Funciona</a></li>
                <li><a href="#funcionalidades" className="hover:text-[#00C897] transition-colors">Funcionalidades</a></li>
                <li><a href="#depoimentos" className="hover:text-[#00C897] transition-colors">Depoimentos</a></li>
                <li><a href="#" className="hover:text-[#00C897] transition-colors">Preços</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-[#00C897] transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-[#00C897] transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-[#00C897] transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-[#00C897] transition-colors">Política de Privacidade</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 NutriX. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
