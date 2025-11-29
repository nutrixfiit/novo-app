"use client";

import { useState } from "react";
import { LogIn, Mail, Lock, ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulação de login (aqui você integraria com seu backend/Supabase)
    setTimeout(() => {
      if (email && senha) {
        // Redireciona para o dashboard após login bem-sucedido
        router.push("/dashboard");
      } else {
        setError("Por favor, preencha todos os campos");
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      {/* Background animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00C897] rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00C897] rounded-full blur-[120px] animate-pulse delay-1000"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Botão Voltar */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00C897] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para home
        </a>

        {/* Card de Login */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 sm:p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="text-3xl font-bold mb-2">
              <span className="text-white">Nutri</span>
              <span className="text-[#00C897]">X</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">Bem-vindo de volta!</h1>
            <p className="text-gray-400">Acesse sua conta para continuar</p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[#00C897] focus:outline-none"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-semibold mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[#00C897] focus:outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Erro */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Esqueci a senha */}
            <div className="text-right">
              <a href="#" className="text-sm text-[#00C897] hover:underline">
                Esqueci minha senha
              </a>
            </div>

            {/* Botão de Login */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00C897] text-black px-6 py-4 rounded-xl font-bold text-lg hover:bg-[#00B087] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Entrar na minha conta
                </>
              )}
            </button>
          </form>

          {/* Divisor */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-900 text-gray-400">Ainda não tem conta?</span>
            </div>
          </div>

          {/* Link para cadastro */}
          <a
            href="/#formulario-section"
            className="block w-full border-2 border-[#00C897] text-[#00C897] px-6 py-4 rounded-xl font-bold text-lg hover:bg-[#00C897]/10 transition-all text-center"
          >
            Criar minha conta grátis
          </a>
        </div>

        {/* Suporte */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Problemas para acessar?{" "}
          <a href="#" className="text-[#00C897] hover:underline">
            Fale com o suporte
          </a>
        </p>
      </div>
    </div>
  );
}
