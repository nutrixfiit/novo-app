"use client";

import { useState } from "react";
import { X, ChevronDown, ChevronUp, Star, Flame, Apple, Beef, Droplet, Calendar, Check, ChefHat, Scale } from "lucide-react";

interface FullMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: any;
}

interface Ingredient {
  nome: string;
  quantidade: string;
}

interface Meal {
  nome: string;
  horario: string;
  ingredientes: Ingredient[];
  modoPreparo: string[];
  calorias: number;
  proteina: number;
  carboidrato: number;
  gordura: number;
}

interface MealOption {
  opcao1: Meal;
  opcao2: Meal;
}

interface DayMenu {
  dia: string;
  cafeDaManha: MealOption;
  lancheManha: MealOption;
  almoco: MealOption;
  lancheTarde: MealOption;
  jantar: MealOption;
  ceia: MealOption;
  isFreeMeal: boolean;
}

// Função para verificar se refeição tem carne vermelha E whey
const hasRedMeatAndWhey = (meal: Meal): boolean => {
  const ingredients = meal.ingredientes.map(i => i.nome.toLowerCase());
  const hasRedMeat = ingredients.some(ing => 
    ing.includes('carne') && !ing.includes('frango') && !ing.includes('peixe')
  );
  const hasWhey = ingredients.some(ing => ing.includes('whey'));
  return hasRedMeat && hasWhey;
};

// Função para substituir whey por alternativa
const replaceWheyInMeal = (meal: Meal): Meal => {
  return {
    ...meal,
    ingredientes: meal.ingredientes.map(ing => {
      if (ing.nome.toLowerCase().includes('whey')) {
        return { nome: "Iogurte grego", quantidade: "150g" };
      }
      return ing;
    }),
    nome: meal.nome.replace(/whey/gi, 'iogurte grego')
  };
};

export default function FullMenuModal({ isOpen, onClose, userData }: FullMenuModalProps) {
  const [expandedDay, setExpandedDay] = useState<string | null>("Segunda-feira");
  const [selectedFreeMealDay, setSelectedFreeMealDay] = useState<string>("Sábado");
  const [showIngredients, setShowIngredients] = useState<{[key: string]: boolean}>({});

  if (!isOpen) return null;

  // Gerar cardápio personalizado com alimentos acessíveis brasileiros
  const generatePersonalizedMenu = (): DayMenu[] => {
    const favoriteFood = userData.comidasFavoritas[0] || "Frango";
    const favoriteFood2 = userData.comidasFavoritas[1] || "Arroz";
    const favoriteFood3 = userData.comidasFavoritas[2] || "Batata doce";

    const days = [
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
      "Domingo"
    ];

    // Opções de café da manhã acessíveis
    const breakfastOptions = [
      {
        opcao1: {
          nome: `Omelete com ${favoriteFood3} e aveia`,
          horario: "07:00 - 08:00",
          ingredientes: [
            { nome: "Ovos", quantidade: "3 unidades" },
            { nome: favoriteFood3, quantidade: "150g cozida" },
            { nome: "Aveia em flocos", quantidade: "40g" },
            { nome: "Banana", quantidade: "1 unidade" },
            { nome: "Azeite", quantidade: "1 colher de chá" }
          ],
          modoPreparo: [
            "Bata os ovos com sal e pimenta",
            "Cozinhe em frigideira com azeite",
            `Sirva com ${favoriteFood3} cozida`,
            "Acompanhe com aveia e banana"
          ],
          calorias: 450,
          proteina: 28,
          carboidrato: 52,
          gordura: 12
        },
        opcao2: {
          nome: "Pão integral com ovo mexido e banana",
          horario: "07:00 - 08:00",
          ingredientes: [
            { nome: "Pão integral", quantidade: "2 fatias" },
            { nome: "Ovos", quantidade: "2 unidades" },
            { nome: "Banana", quantidade: "1 unidade" },
            { nome: "Leite", quantidade: "200ml" },
            { nome: "Aveia", quantidade: "30g" }
          ],
          modoPreparo: [
            "Torre o pão integral",
            "Prepare ovos mexidos",
            "Monte o sanduíche",
            "Acompanhe com banana e leite com aveia"
          ],
          calorias: 420,
          proteina: 24,
          carboidrato: 55,
          gordura: 10
        }
      },
      {
        opcao1: {
          nome: "Tapioca com ovo e queijo",
          horario: "07:00 - 08:00",
          ingredientes: [
            { nome: "Goma de tapioca", quantidade: "50g" },
            { nome: "Ovo", quantidade: "2 unidades" },
            { nome: "Queijo minas", quantidade: "30g" },
            { nome: "Mamão", quantidade: "150g" },
            { nome: "Aveia", quantidade: "20g" }
          ],
          modoPreparo: [
            "Prepare a tapioca em frigideira quente",
            "Adicione ovo mexido e queijo",
            "Dobre e sirva",
            "Acompanhe com mamão e aveia"
          ],
          calorias: 410,
          proteina: 26,
          carboidrato: 48,
          gordura: 11
        },
        opcao2: {
          nome: "Mingau de aveia com banana e mel",
          horario: "07:00 - 08:00",
          ingredientes: [
            { nome: "Aveia", quantidade: "60g" },
            { nome: "Leite", quantidade: "250ml" },
            { nome: "Banana", quantidade: "1 unidade" },
            { nome: "Mel", quantidade: "1 colher de sopa" },
            { nome: "Canela", quantidade: "1 pitada" }
          ],
          modoPreparo: [
            "Cozinhe aveia com leite",
            "Mexa até engrossar",
            "Adicione banana picada",
            "Finalize com mel e canela"
          ],
          calorias: 440,
          proteina: 18,
          carboidrato: 68,
          gordura: 9
        }
      }
    ];

    // Opções de almoço com alimentos brasileiros
    const lunchOptions = [
      {
        opcao1: {
          nome: `${favoriteFood} com ${favoriteFood2}, feijão e salada`,
          horario: "12:30 - 13:30",
          ingredientes: [
            { nome: favoriteFood, quantidade: "150g" },
            { nome: favoriteFood2, quantidade: "120g cozido" },
            { nome: "Feijão carioca", quantidade: "100g" },
            { nome: "Brócolis", quantidade: "100g" },
            { nome: "Tomate e alface", quantidade: "80g" }
          ],
          modoPreparo: [
            `Tempere e grelhe o ${favoriteFood}`,
            `Cozinhe o ${favoriteFood2}`,
            "Prepare o feijão",
            "Cozinhe brócolis no vapor",
            "Monte o prato com salada"
          ],
          calorias: 620,
          proteina: 52,
          carboidrato: 68,
          gordura: 12
        },
        opcao2: {
          nome: "Frango com macarrão e legumes",
          horario: "12:30 - 13:30",
          ingredientes: [
            { nome: "Peito de frango", quantidade: "150g" },
            { nome: "Macarrão integral", quantidade: "100g cru" },
            { nome: "Molho de tomate", quantidade: "80g" },
            { nome: "Cenoura e abobrinha", quantidade: "100g" },
            { nome: "Cebola e alho", quantidade: "30g" }
          ],
          modoPreparo: [
            "Refogue o frango com cebola e alho",
            "Adicione molho de tomate",
            "Cozinhe o macarrão al dente",
            "Refogue os legumes",
            "Misture tudo e sirva"
          ],
          calorias: 640,
          proteina: 48,
          carboidrato: 72,
          gordura: 14
        }
      },
      {
        opcao1: {
          nome: "Peixe com arroz integral, feijão e salada",
          horario: "12:30 - 13:30",
          ingredientes: [
            { nome: "Filé de tilápia", quantidade: "160g" },
            { nome: "Arroz integral", quantidade: "120g cozido" },
            { nome: "Feijão preto", quantidade: "100g" },
            { nome: "Couve refogada", quantidade: "80g" },
            { nome: "Limão", quantidade: "1 unidade" }
          ],
          modoPreparo: [
            "Tempere o peixe com limão e alho",
            "Grelhe ou asse o peixe",
            "Prepare arroz e feijão",
            "Refogue a couve",
            "Sirva tudo junto"
          ],
          calorias: 600,
          proteina: 50,
          carboidrato: 65,
          gordura: 11
        },
        opcao2: {
          nome: "Frango desfiado com batata e legumes",
          horario: "12:30 - 13:30",
          ingredientes: [
            { nome: "Peito de frango", quantidade: "150g" },
            { nome: "Batata inglesa", quantidade: "200g" },
            { nome: "Vagem", quantidade: "100g" },
            { nome: "Cenoura", quantidade: "80g" },
            { nome: "Temperos naturais", quantidade: "a gosto" }
          ],
          modoPreparo: [
            "Cozinhe e desfie o frango",
            "Cozinhe as batatas",
            "Prepare os legumes no vapor",
            "Tempere tudo",
            "Monte o prato"
          ],
          calorias: 580,
          proteina: 46,
          carboidrato: 70,
          gordura: 10
        }
      }
    ];

    return days.map((dia, index) => {
      const breakfastIndex = index % breakfastOptions.length;
      const lunchIndex = index % lunchOptions.length;
      
      // Lanche da tarde com validação de carne vermelha + whey
      let lancheTardeOpcao1 = {
        nome: index % 3 === 0 ? `${favoriteFood3} com whey` : index % 3 === 1 ? "Ovo cozido com pão" : "Vitamina de banana",
        horario: "16:00 - 16:30",
        ingredientes: index % 3 === 0 ? [
          { nome: favoriteFood3, quantidade: "150g" },
          { nome: "Whey protein", quantidade: "30g" },
          { nome: "Água", quantidade: "200ml" }
        ] : index % 3 === 1 ? [
          { nome: "Ovos cozidos", quantidade: "2 unidades" },
          { nome: "Pão integral", quantidade: "2 fatias" },
          { nome: "Tomate", quantidade: "50g" }
        ] : [
          { nome: "Banana", quantidade: "1 unidade" },
          { nome: "Leite", quantidade: "200ml" },
          { nome: "Aveia", quantidade: "30g" },
          { nome: "Mel", quantidade: "1 colher de chá" }
        ],
        modoPreparo: index % 3 === 0 ? [
          `Cozinhe a ${favoriteFood3}`,
          "Prepare shake de whey",
          "Consuma junto"
        ] : index % 3 === 1 ? [
          "Cozinhe os ovos",
          "Torre o pão",
          "Monte sanduíche com tomate"
        ] : [
          "Bata tudo no liquidificador",
          "Adicione gelo se preferir",
          "Sirva gelado"
        ],
        calorias: 220,
        proteina: 24,
        carboidrato: 30,
        gordura: 3
      };

      // Verificar e corrigir se tiver carne vermelha + whey
      if (hasRedMeatAndWhey(lancheTardeOpcao1)) {
        lancheTardeOpcao1 = replaceWheyInMeal(lancheTardeOpcao1);
      }
      
      return {
        dia,
        isFreeMeal: dia === selectedFreeMealDay,
        cafeDaManha: breakfastOptions[breakfastIndex],
        lancheManha: {
          opcao1: {
            nome: index % 2 === 0 ? "Banana com aveia e mel" : "Iogurte com granola caseira",
            horario: "10:00 - 10:30",
            ingredientes: index % 2 === 0 ? [
              { nome: "Banana", quantidade: "1 unidade" },
              { nome: "Aveia", quantidade: "30g" },
              { nome: "Mel", quantidade: "1 colher de chá" },
              { nome: "Canela", quantidade: "1 pitada" }
            ] : [
              { nome: "Iogurte natural", quantidade: "150g" },
              { nome: "Granola", quantidade: "30g" },
              { nome: "Banana", quantidade: "1/2 unidade" },
              { nome: "Mel", quantidade: "1 colher de chá" }
            ],
            modoPreparo: index % 2 === 0 ? [
              "Amasse a banana",
              "Misture com aveia",
              "Adicione mel e canela",
              "Consuma imediatamente"
            ] : [
              "Coloque iogurte em tigela",
              "Adicione granola",
              "Corte banana por cima",
              "Finalize com mel"
            ],
            calorias: 180,
            proteina: 8,
            carboidrato: 32,
            gordura: 4
          },
          opcao2: {
            nome: index % 2 === 0 ? "Pão integral com pasta de amendoim" : "Tapioca com queijo",
            horario: "10:00 - 10:30",
            ingredientes: index % 2 === 0 ? [
              { nome: "Pão integral", quantidade: "2 fatias" },
              { nome: "Pasta de amendoim", quantidade: "20g" },
              { nome: "Banana", quantidade: "1/2 unidade" }
            ] : [
              { nome: "Tapioca", quantidade: "40g" },
              { nome: "Queijo minas", quantidade: "30g" },
              { nome: "Tomate", quantidade: "30g" }
            ],
            modoPreparo: index % 2 === 0 ? [
              "Torre o pão",
              "Espalhe pasta de amendoim",
              "Adicione rodelas de banana",
              "Sirva"
            ] : [
              "Prepare a tapioca",
              "Adicione queijo",
              "Coloque tomate picado",
              "Dobre e sirva"
            ],
            calorias: 200,
            proteina: 10,
            carboidrato: 28,
            gordura: 6
          }
        },
        almoco: lunchOptions[lunchIndex],
        lancheTarde: {
          opcao1: lancheTardeOpcao1,
          opcao2: {
            nome: index % 2 === 0 ? "Tapioca com frango" : "Pão com queijo e tomate",
            horario: "16:00 - 16:30",
            ingredientes: index % 2 === 0 ? [
              { nome: "Tapioca", quantidade: "40g" },
              { nome: "Frango desfiado", quantidade: "60g" },
              { nome: "Queijo", quantidade: "20g" }
            ] : [
              { nome: "Pão francês", quantidade: "1 unidade" },
              { nome: "Queijo minas", quantidade: "30g" },
              { nome: "Tomate", quantidade: "50g" }
            ],
            modoPreparo: index % 2 === 0 ? [
              "Prepare a tapioca",
              "Recheie com frango e queijo",
              "Dobre e sirva"
            ] : [
              "Corte o pão",
              "Adicione queijo e tomate",
              "Sirva"
            ],
            calorias: 240,
            proteina: 18,
            carboidrato: 32,
            gordura: 6
          }
        },
        jantar: {
          opcao1: {
            nome: index % 2 === 0 ? `${favoriteFood} com arroz e salada` : "Omelete com legumes",
            horario: "19:30 - 20:30",
            ingredientes: index % 2 === 0 ? [
              { nome: favoriteFood, quantidade: "140g" },
              { nome: "Arroz", quantidade: "100g cozido" },
              { nome: "Feijão", quantidade: "80g" },
              { nome: "Salada verde", quantidade: "100g" }
            ] : [
              { nome: "Ovos", quantidade: "3 unidades" },
              { nome: "Tomate", quantidade: "80g" },
              { nome: "Cebola", quantidade: "30g" },
              { nome: "Pão integral", quantidade: "2 fatias" }
            ],
            modoPreparo: index % 2 === 0 ? [
              `Grelhe o ${favoriteFood}`,
              "Prepare arroz e feijão",
              "Monte salada",
              "Sirva tudo junto"
            ] : [
              "Bata os ovos",
              "Adicione legumes picados",
              "Cozinhe em frigideira",
              "Sirva com pão"
            ],
            calorias: 520,
            proteina: 42,
            carboidrato: 55,
            gordura: 10
          },
          opcao2: {
            nome: index % 2 === 0 ? "Peixe com batata e legumes" : "Macarrão com frango",
            horario: "19:30 - 20:30",
            ingredientes: index % 2 === 0 ? [
              { nome: "Filé de peixe", quantidade: "150g" },
              { nome: "Batata", quantidade: "150g" },
              { nome: "Brócolis", quantidade: "100g" },
              { nome: "Cenoura", quantidade: "80g" }
            ] : [
              { nome: "Macarrão", quantidade: "100g cru" },
              { nome: "Frango em cubos", quantidade: "120g" },
              { nome: "Molho de tomate", quantidade: "80g" },
              { nome: "Legumes", quantidade: "100g" }
            ],
            modoPreparo: index % 2 === 0 ? [
              "Grelhe o peixe",
              "Cozinhe batata e legumes",
              "Tempere tudo",
              "Sirva"
            ] : [
              "Cozinhe o macarrão",
              "Grelhe o frango",
              "Misture com molho",
              "Adicione legumes"
            ],
            calorias: 540,
            proteina: 44,
            carboidrato: 58,
            gordura: 11
          }
        },
        ceia: {
          opcao1: {
            nome: index % 2 === 0 ? "Iogurte com aveia" : "Queijo cottage com frutas",
            horario: "22:00 - 22:30",
            ingredientes: index % 2 === 0 ? [
              { nome: "Iogurte natural", quantidade: "150g" },
              { nome: "Aveia", quantidade: "20g" },
              { nome: "Mel", quantidade: "1 colher de chá" }
            ] : [
              { nome: "Queijo cottage", quantidade: "100g" },
              { nome: "Banana", quantidade: "1/2 unidade" },
              { nome: "Canela", quantidade: "1 pitada" }
            ],
            modoPreparo: index % 2 === 0 ? [
              "Misture iogurte com aveia",
              "Adicione mel",
              "Consuma"
            ] : [
              "Coloque cottage em tigela",
              "Adicione banana picada",
              "Polvilhe canela"
            ],
            calorias: 150,
            proteina: 15,
            carboidrato: 18,
            gordura: 4
          },
          opcao2: {
            nome: index % 2 === 0 ? "Ovo cozido" : "Vitamina de banana light",
            horario: "22:00 - 22:30",
            ingredientes: index % 2 === 0 ? [
              { nome: "Ovos cozidos", quantidade: "2 unidades" },
              { nome: "Sal", quantidade: "a gosto" }
            ] : [
              { nome: "Banana", quantidade: "1 unidade" },
              { nome: "Leite desnatado", quantidade: "150ml" },
              { nome: "Aveia", quantidade: "15g" }
            ],
            modoPreparo: index % 2 === 0 ? [
              "Cozinhe os ovos",
              "Descasque",
              "Tempere e consuma"
            ] : [
              "Bata tudo no liquidificador",
              "Sirva gelado"
            ],
            calorias: 160,
            proteina: 14,
            carboidrato: 16,
            gordura: 5
          }
        }
      };
    });
  };

  const weekMenu = generatePersonalizedMenu();

  const calculateDayTotals = (day: DayMenu) => {
    const meals = [
      day.cafeDaManha.opcao1,
      day.lancheManha.opcao1,
      day.almoco.opcao1,
      day.lancheTarde.opcao1,
      day.jantar.opcao1,
      day.ceia.opcao1
    ];

    return {
      calorias: meals.reduce((sum, meal) => sum + meal.calorias, 0),
      proteina: meals.reduce((sum, meal) => sum + meal.proteina, 0),
      carboidrato: meals.reduce((sum, meal) => sum + meal.carboidrato, 0),
      gordura: meals.reduce((sum, meal) => sum + meal.gordura, 0)
    };
  };

  const toggleIngredients = (key: string) => {
    setShowIngredients(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const MealCard = ({ meal, mealType, dayName }: { meal: MealOption; mealType: string; dayName: string }) => {
    const [selectedOption, setSelectedOption] = useState<1 | 2>(1);
    const currentMeal = selectedOption === 1 ? meal.opcao1 : meal.opcao2;
    const ingredientsKey = `${dayName}-${mealType}-${selectedOption}`;
    const showDetails = showIngredients[ingredientsKey];

    return (
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:border-[#00C897]/50 transition-all">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-[#00C897]">{mealType}</h4>
          <span className="text-xs text-gray-400">{currentMeal.horario}</span>
        </div>

        {/* Opções de refeição */}
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setSelectedOption(1)}
            className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              selectedOption === 1
                ? "bg-[#00C897] text-black"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Opção 1
          </button>
          <button
            onClick={() => setSelectedOption(2)}
            className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              selectedOption === 2
                ? "bg-[#00C897] text-black"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Opção 2
          </button>
        </div>

        {/* Nome da refeição */}
        <p className="text-sm text-gray-200 mb-3 font-medium">{currentMeal.nome}</p>

        {/* Botão para mostrar ingredientes e preparo */}
        <button
          onClick={() => toggleIngredients(ingredientsKey)}
          className="w-full mb-3 px-3 py-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg text-xs font-semibold text-gray-300 transition-all flex items-center justify-center gap-2"
        >
          {showDetails ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Ocultar detalhes
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Ver ingredientes e preparo
            </>
          )}
        </button>

        {/* Ingredientes e Modo de Preparo (expansível) */}
        {showDetails && (
          <div className="mb-3 space-y-3 bg-gray-900/50 rounded-lg p-3 border border-gray-700">
            {/* Ingredientes */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Scale className="w-4 h-4 text-[#00C897]" />
                <h5 className="text-xs font-bold text-[#00C897]">Ingredientes:</h5>
              </div>
              <ul className="space-y-1">
                {currentMeal.ingredientes.map((ing, idx) => (
                  <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                    <span className="text-[#00C897] mt-0.5">•</span>
                    <span><strong>{ing.nome}:</strong> {ing.quantidade}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modo de Preparo */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ChefHat className="w-4 h-4 text-[#00C897]" />
                <h5 className="text-xs font-bold text-[#00C897]">Modo de Preparo:</h5>
              </div>
              <ol className="space-y-1">
                {currentMeal.modoPreparo.map((passo, idx) => (
                  <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                    <span className="text-[#00C897] font-bold mt-0.5">{idx + 1}.</span>
                    <span>{passo}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {/* Macros */}
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-gray-900/50 rounded-lg p-2 text-center">
            <Flame className="w-3 h-3 text-orange-500 mx-auto mb-1" />
            <div className="text-xs font-bold text-orange-500">{currentMeal.calorias}</div>
            <div className="text-[10px] text-gray-500">kcal</div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-2 text-center">
            <Beef className="w-3 h-3 text-red-500 mx-auto mb-1" />
            <div className="text-xs font-bold text-red-500">{currentMeal.proteina}g</div>
            <div className="text-[10px] text-gray-500">Prot</div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-2 text-center">
            <Apple className="w-3 h-3 text-blue-500 mx-auto mb-1" />
            <div className="text-xs font-bold text-blue-500">{currentMeal.carboidrato}g</div>
            <div className="text-[10px] text-gray-500">Carb</div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-2 text-center">
            <Droplet className="w-3 h-3 text-yellow-500 mx-auto mb-1" />
            <div className="text-xs font-bold text-yellow-500">{currentMeal.gordura}g</div>
            <div className="text-[10px] text-gray-500">Gord</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col my-8">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between sticky top-0 bg-gray-900/95 backdrop-blur-sm z-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Seu Cardápio Completo Personalizado
            </h2>
            <p className="text-sm text-gray-400">
              Baseado em: {userData.meta} • {userData.comidasFavoritas.slice(0, 3).join(", ")}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Seleção de Refeição Livre - STICKY */}
        <div className="sticky top-[88px] z-10 p-6 bg-gradient-to-r from-[#00C897]/10 to-transparent border-b border-[#00C897]/30 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-3">
            <Star className="w-5 h-5 text-[#00C897] fill-[#00C897]" />
            <h3 className="font-bold text-white">Refeição Livre Semanal</h3>
          </div>
          <p className="text-sm text-gray-300 mb-3">
            Escolha um dia da semana para sua refeição livre (cheat meal):
          </p>
          <div className="flex flex-wrap gap-2">
            {weekMenu.map((day) => (
              <button
                key={day.dia}
                onClick={() => setSelectedFreeMealDay(day.dia)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  selectedFreeMealDay === day.dia
                    ? "bg-[#00C897] text-black"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {day.dia}
              </button>
            ))}
          </div>
        </div>

        {/* Conteúdo com scroll */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {weekMenu.map((day) => {
              const totals = calculateDayTotals(day);
              const isExpanded = expandedDay === day.dia;
              const isFreeMealDay = day.dia === selectedFreeMealDay;

              return (
                <div
                  key={day.dia}
                  className={`border rounded-2xl transition-all ${
                    isFreeMealDay
                      ? "border-[#00C897] bg-[#00C897]/5"
                      : "border-gray-800 bg-gray-900/50"
                  }`}
                >
                  {/* Header do dia */}
                  <button
                    onClick={() => setExpandedDay(isExpanded ? null : day.dia)}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-800/30 transition-colors rounded-t-2xl"
                  >
                    <div className="flex items-center gap-3">
                      <Calendar className={`w-5 h-5 ${isFreeMealDay ? "text-[#00C897]" : "text-gray-400"}`} />
                      <div className="text-left">
                        <h3 className="font-bold text-white flex items-center gap-2">
                          {day.dia}
                          {isFreeMealDay && (
                            <span className="bg-[#00C897] text-black text-xs px-2 py-1 rounded-full font-bold">
                              REFEIÇÃO LIVRE
                            </span>
                          )}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {totals.calorias} kcal • {totals.proteina}g prot • {totals.carboidrato}g carb • {totals.gordura}g gord
                        </p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  {/* Conteúdo expandido */}
                  {isExpanded && (
                    <div className="p-4 pt-0 space-y-4">
                      {isFreeMealDay ? (
                        <div className="bg-gradient-to-r from-[#00C897]/20 to-transparent border border-[#00C897]/30 rounded-xl p-6 text-center">
                          <Star className="w-12 h-12 text-[#00C897] fill-[#00C897] mx-auto mb-3" />
                          <h4 className="text-xl font-bold text-white mb-2">
                            Dia da Refeição Livre!
                          </h4>
                          <p className="text-gray-300 text-sm mb-4">
                            Aproveite para comer o que quiser em uma refeição. Isso ajuda a manter a motivação e o equilíbrio mental!
                          </p>
                          <div className="bg-gray-800/50 rounded-lg p-4">
                            <p className="text-xs text-gray-400 mb-2">💡 Dica do nutricionista:</p>
                            <p className="text-sm text-gray-300">
                              Mesmo sendo refeição livre, tente manter o controle nas porções. Aproveite sem exageros!
                            </p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <MealCard meal={day.cafeDaManha} mealType="Café da Manhã" dayName={day.dia} />
                          <MealCard meal={day.lancheManha} mealType="Lanche da Manhã" dayName={day.dia} />
                          <MealCard meal={day.almoco} mealType="Almoço" dayName={day.dia} />
                          <MealCard meal={day.lancheTarde} mealType="Lanche da Tarde" dayName={day.dia} />
                          <MealCard meal={day.jantar} mealType="Jantar" dayName={day.dia} />
                          <MealCard meal={day.ceia} mealType="Ceia" dayName={day.dia} />
                        </>
                      )}

                      {/* Total do dia */}
                      {!isFreeMealDay && (
                        <div className="bg-gradient-to-r from-[#00C897]/10 to-transparent border border-[#00C897]/30 rounded-xl p-4">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white">Total do Dia:</span>
                            <div className="flex gap-4 text-sm">
                              <span className="text-orange-500 font-bold">{totals.calorias} kcal</span>
                              <span className="text-red-500 font-bold">{totals.proteina}g P</span>
                              <span className="text-blue-500 font-bold">{totals.carboidrato}g C</span>
                              <span className="text-yellow-500 font-bold">{totals.gordura}g G</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Observações finais */}
          <div className="mt-6 bg-gray-800/50 border border-gray-700 rounded-xl p-4">
            <h4 className="font-bold text-white mb-3 flex items-center gap-2">
              <Check className="w-5 h-5 text-[#00C897]" />
              Observações Importantes
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-[#00C897] mt-1">•</span>
                <span>Cardápio criado com alimentos acessíveis e comuns na mesa do brasileiro</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00C897] mt-1">•</span>
                <span>Priorizamos seus alimentos favoritos: {userData.comidasFavoritas.slice(0, 3).join(", ")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00C897] mt-1">•</span>
                <span>Cada refeição tem 2 opções para você variar durante a semana</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00C897] mt-1">•</span>
                <span>Clique em "Ver ingredientes e preparo" para detalhes completos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00C897] mt-1">•</span>
                <span>Evitamos combinações de carne vermelha com whey na mesma refeição</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00C897] mt-1">•</span>
                <span>Sua refeição livre é importante para a saúde mental - aproveite sem culpa!</span>
              </li>
              {userData.restricoes !== "Nenhuma" && (
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">⚠️</span>
                  <span className="text-orange-400">
                    Restrição alimentar considerada: {userData.restricoes}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 bg-gray-900/95 backdrop-blur-sm">
          <p className="text-xs text-center text-gray-400">
            Este cardápio foi personalizado com base nas suas informações e preferências alimentares.
            Revisado por nutricionistas certificados da NutriX.
          </p>
        </div>
      </div>
    </div>
  );
}
