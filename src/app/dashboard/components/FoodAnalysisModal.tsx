"use client";

import { useState, useRef } from "react";
import { 
  X, 
  Camera, 
  Upload, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  RefreshCw,
  Flame,
  Apple,
  Droplet,
  Activity
} from "lucide-react";

interface FoodAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NutritionData {
  foodName: string;
  confidence: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sodium: number;
  servingSize: string;
  detailedDescription?: string;
}

export default function FoodAnalysisModal({ isOpen, onClose }: FoodAnalysisModalProps) {
  const [step, setStep] = useState<'upload' | 'analyzing' | 'confirm' | 'result'>('upload');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);
  const [manualInput, setManualInput] = useState("");
  const [isReanalyzing, setIsReanalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  if (!isOpen) return null;

  // Função para abrir câmera
  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      setIsCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Erro ao acessar câmera:", error);
      alert("Não foi possível acessar a câmera. Tente fazer upload de uma imagem.");
    }
  };

  // Função para tirar foto
  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setImagePreview(imageData);
        stopCamera();
        analyzeFood(imageData);
      }
    }
  };

  // Função para parar câmera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCameraActive(false);
    }
  };

  // Função para fazer upload de imagem
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setImagePreview(imageData);
        analyzeFood(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  // Função para analisar alimento com IA REAL (OpenAI Vision)
  const analyzeFood = async (imageData: string, userDescription?: string) => {
    setStep('analyzing');
    setAnalysisError(null);
    
    try {
      // Chamar API de análise de imagem
      const response = await fetch('/api/analyze-food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: imageData,
          userDescription: userDescription || null
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao analisar imagem');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Processar resposta da IA
      const nutritionData: NutritionData = {
        foodName: data.foodName || "Alimento não identificado",
        confidence: data.confidence || 75,
        calories: data.calories || 0,
        protein: data.protein || 0,
        carbs: data.carbs || 0,
        fat: data.fat || 0,
        fiber: data.fiber || 0,
        sodium: data.sodium || 0,
        servingSize: data.servingSize || "Porção estimada",
        detailedDescription: data.detailedDescription
      };
      
      setNutritionData(nutritionData);
      setStep('confirm');
    } catch (error) {
      console.error("Erro na análise:", error);
      setAnalysisError("Não foi possível analisar a imagem. Tente novamente ou descreva o alimento manualmente.");
      
      // Fallback para modo manual
      setStep('upload');
      alert("Não conseguimos identificar automaticamente. Por favor, descreva o alimento que você está comendo.");
    }
  };

  // Função para confirmar identificação
  const confirmFood = () => {
    setStep('result');
  };

  // Função para reanalisar com input manual
  const reanalyzeWithManualInput = async () => {
    if (!manualInput.trim()) {
      alert("Por favor, descreva o alimento");
      return;
    }
    
    setIsReanalyzing(true);
    
    try {
      // Reanalisar com descrição do usuário
      await analyzeFood(imagePreview || "", manualInput);
      setIsReanalyzing(false);
    } catch (error) {
      console.error("Erro na reanálise:", error);
      setIsReanalyzing(false);
      alert("Erro ao reanalisar. Tente novamente.");
    }
  };

  // Função para análise apenas por texto (sem imagem)
  const analyzeByTextOnly = async () => {
    if (!manualInput.trim()) {
      alert("Por favor, descreva o alimento");
      return;
    }
    
    setStep('analyzing');
    setAnalysisError(null);
    
    try {
      const response = await fetch('/api/analyze-food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: null,
          userDescription: manualInput
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao analisar descrição');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      const nutritionData: NutritionData = {
        foodName: data.foodName || manualInput,
        confidence: data.confidence || 85,
        calories: data.calories || 0,
        protein: data.protein || 0,
        carbs: data.carbs || 0,
        fat: data.fat || 0,
        fiber: data.fiber || 0,
        sodium: data.sodium || 0,
        servingSize: data.servingSize || "Porção estimada",
        detailedDescription: data.detailedDescription
      };
      
      setNutritionData(nutritionData);
      setStep('result');
    } catch (error) {
      console.error("Erro na análise por texto:", error);
      setAnalysisError("Não foi possível analisar. Tente novamente.");
      setStep('upload');
    }
  };

  // Função para resetar e analisar novo alimento
  const resetAnalysis = () => {
    setStep('upload');
    setImagePreview(null);
    setNutritionData(null);
    setManualInput("");
    setIsReanalyzing(false);
    setAnalysisError(null);
    stopCamera();
  };

  // Função para fechar modal
  const handleClose = () => {
    stopCamera();
    resetAnalysis();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#00C897]/10 p-3 rounded-xl">
              <Camera className="w-6 h-6 text-[#00C897]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Análise de Alimento</h2>
              <p className="text-sm text-gray-400">Descubra os valores nutricionais com IA</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* STEP 1: Upload/Camera */}
          {step === 'upload' && (
            <div className="space-y-6">
              {/* Preview da câmera */}
              {isCameraActive && (
                <div className="relative">
                  <video 
                    ref={videoRef}
                    autoPlay 
                    playsInline
                    className="w-full rounded-xl"
                  />
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                    <button
                      onClick={capturePhoto}
                      className="bg-[#00C897] text-black px-6 py-3 rounded-full font-bold hover:bg-[#00B087] transition-all"
                    >
                      Tirar Foto
                    </button>
                    <button
                      onClick={stopCamera}
                      className="bg-gray-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition-all"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              {/* Opções de captura */}
              {!isCameraActive && (
                <>
                  <div className="text-center py-8">
                    <div className="w-24 h-24 bg-[#00C897]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Camera className="w-12 h-12 text-[#00C897]" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Como deseja analisar o alimento?
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Tire uma foto, faça upload ou descreva o alimento
                    </p>
                  </div>

                  {analysisError && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-sm text-red-400">
                      <p className="font-semibold mb-1">⚠️ Erro na análise</p>
                      <p>{analysisError}</p>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Botão Câmera */}
                    <button
                      onClick={openCamera}
                      className="bg-gradient-to-r from-[#00C897] to-[#00B087] text-black p-6 rounded-xl font-bold hover:scale-105 transition-all flex flex-col items-center gap-3"
                    >
                      <Camera className="w-8 h-8" />
                      <span>Abrir Câmera</span>
                    </button>

                    {/* Botão Upload */}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-gray-800 text-white p-6 rounded-xl font-bold hover:bg-gray-700 transition-all flex flex-col items-center gap-3 border border-gray-700"
                    >
                      <Upload className="w-8 h-8" />
                      <span>Fazer Upload</span>
                    </button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>

                  {/* Opção de entrada manual */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                    <p className="text-sm font-semibold text-white mb-3">
                      Ou descreva o alimento manualmente:
                    </p>
                    <input
                      type="text"
                      placeholder="Ex: 200g de frango grelhado com arroz integral"
                      value={manualInput}
                      onChange={(e) => setManualInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          analyzeByTextOnly();
                        }
                      }}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:border-[#00C897] focus:outline-none mb-3"
                    />
                    <button
                      onClick={analyzeByTextOnly}
                      disabled={!manualInput.trim()}
                      className="w-full bg-[#00C897] text-black px-4 py-3 rounded-lg font-semibold hover:bg-[#00B087] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Analisar por Descrição
                    </button>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-sm text-gray-300">
                    <p className="font-semibold text-blue-400 mb-1">💡 Dica</p>
                    <p>Para melhores resultados com foto, use boa iluminação e enquadre todo o prato. Ou descreva detalhadamente o alimento e a quantidade.</p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* STEP 2: Analyzing */}
          {step === 'analyzing' && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-[#00C897]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Loader2 className="w-12 h-12 text-[#00C897] animate-spin" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Analisando com IA...
              </h3>
              <p className="text-gray-400">
                Nossa inteligência artificial está identificando os ingredientes e calculando os valores nutricionais
              </p>
              
              {imagePreview && (
                <div className="mt-6">
                  <img 
                    src={imagePreview} 
                    alt="Alimento" 
                    className="max-w-sm mx-auto rounded-xl border border-gray-700"
                  />
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Confirm */}
          {step === 'confirm' && nutritionData && (
            <div className="space-y-6">
              {imagePreview && (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Alimento" 
                    className="w-full rounded-xl border border-gray-700"
                  />
                </div>
              )}

              <div className="bg-[#00C897]/10 border border-[#00C897]/30 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-[#00C897] flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">
                      Identificamos seu alimento!
                    </h3>
                    <p className="text-2xl font-bold text-[#00C897] mb-2">
                      {nutritionData.foodName}
                    </p>
                    {nutritionData.detailedDescription && (
                      <p className="text-sm text-gray-400 mb-2">
                        {nutritionData.detailedDescription}
                      </p>
                    )}
                    <p className="text-sm text-gray-400">
                      Confiança: {nutritionData.confidence}%
                    </p>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-300 mb-2">
                    <span className="font-semibold">Porção:</span> {nutritionData.servingSize}
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-400">Calorias:</span>
                      <span className="font-bold text-orange-500 ml-2">{nutritionData.calories} kcal</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Proteína:</span>
                      <span className="font-bold text-red-500 ml-2">{nutritionData.protein}g</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Carboidratos:</span>
                      <span className="font-bold text-blue-500 ml-2">{nutritionData.carbs}g</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Gorduras:</span>
                      <span className="font-bold text-yellow-500 ml-2">{nutritionData.fat}g</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-400 text-center mb-4">
                  Este é o alimento correto?
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={confirmFood}
                    className="flex-1 bg-[#00C897] text-black px-6 py-3 rounded-xl font-bold hover:bg-[#00B087] transition-all"
                  >
                    Sim, está correto!
                  </button>
                  <button
                    onClick={() => setStep('confirm')}
                    className="flex-1 bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-all"
                  >
                    Não, corrigir
                  </button>
                </div>
              </div>

              {/* Opção de correção manual */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                <div className="flex items-start gap-3 mb-3">
                  <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white mb-2">
                      Não é esse alimento?
                    </p>
                    <p className="text-xs text-gray-400 mb-3">
                      Descreva o que você está comendo e vamos reanalisar
                    </p>
                    <input
                      type="text"
                      placeholder="Ex: Frango grelhado com batata doce"
                      value={manualInput}
                      onChange={(e) => setManualInput(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:border-[#00C897] focus:outline-none mb-3"
                    />
                    <button
                      onClick={reanalyzeWithManualInput}
                      disabled={isReanalyzing}
                      className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isReanalyzing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Reanalisando...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-4 h-4" />
                          Reanalisar
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Result */}
          {step === 'result' && nutritionData && (
            <div className="space-y-6">
              {imagePreview && (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Alimento" 
                    className="w-full rounded-xl border border-gray-700"
                  />
                </div>
              )}

              <div className="bg-gradient-to-r from-[#00C897]/20 to-transparent border border-[#00C897]/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-8 h-8 text-[#00C897]" />
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Análise Completa!
                    </h3>
                    <p className="text-sm text-gray-400">
                      Valores nutricionais calculados por IA
                    </p>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-xl p-4 mb-4">
                  <h4 className="text-xl font-bold text-[#00C897] mb-2">
                    {nutritionData.foodName}
                  </h4>
                  <p className="text-sm text-gray-400 mb-4">
                    Porção: {nutritionData.servingSize}
                  </p>

                  {/* Macros Principais */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-800 rounded-lg p-4 text-center">
                      <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                      <div className="text-3xl font-bold text-orange-500">{nutritionData.calories}</div>
                      <div className="text-xs text-gray-400">Calorias</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 text-center">
                      <Apple className="w-6 h-6 text-red-500 mx-auto mb-2" />
                      <div className="text-3xl font-bold text-red-500">{nutritionData.protein}g</div>
                      <div className="text-xs text-gray-400">Proteína</div>
                    </div>
                  </div>

                  {/* Macros Secundários */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-800 rounded-lg p-3">
                      <span className="text-gray-400">Carboidratos:</span>
                      <span className="font-bold text-blue-500 ml-2">{nutritionData.carbs}g</span>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3">
                      <span className="text-gray-400">Gorduras:</span>
                      <span className="font-bold text-yellow-500 ml-2">{nutritionData.fat}g</span>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3">
                      <span className="text-gray-400">Fibras:</span>
                      <span className="font-bold text-green-500 ml-2">{nutritionData.fiber}g</span>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3">
                      <span className="text-gray-400">Sódio:</span>
                      <span className="font-bold text-purple-500 ml-2">{nutritionData.sodium}mg</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-sm text-gray-300 mb-4">
                  <p className="font-semibold text-blue-400 mb-1">💡 Dica Nutricional</p>
                  <p>Esta refeição fornece {Math.round((nutritionData.protein * 4 / nutritionData.calories) * 100)}% de calorias vindas de proteína, ideal para ganho de massa muscular!</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={resetAnalysis}
                    className="flex-1 bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Camera className="w-5 h-5" />
                    Analisar Outro
                  </button>
                  <button
                    onClick={handleClose}
                    className="flex-1 bg-[#00C897] text-black px-6 py-3 rounded-xl font-bold hover:bg-[#00B087] transition-all"
                  >
                    Concluir
                  </button>
                </div>
              </div>

              <div className="text-center text-xs text-gray-500">
                Os valores são estimativas baseadas em análise de IA e podem variar conforme o preparo
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
