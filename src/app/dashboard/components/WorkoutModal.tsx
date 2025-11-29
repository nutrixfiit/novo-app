"use client";

import { useState } from "react";
import { X, ChevronDown, ChevronUp, Dumbbell, Flame, Clock, Target, TrendingUp, Play, CheckCircle2, Heart, Activity } from "lucide-react";

interface WorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: any;
  dayName: string;
}

interface Exercise {
  nome: string;
  series: string;
  repeticoes: string;
  descanso: string;
  calorias: number;
  beneficios: string[];
  observacoes: string;
}

interface ExerciseOption {
  opcao1: Exercise;
  opcao2: Exercise;
}

interface WorkoutDay {
  dia: string;
  grupo: string;
  aquecimento: {
    atividade: string;
    duracao: string;
    calorias: number;
  };
  exercicios: ExerciseOption[];
  cardio: {
    atividade: string;
    duracao: string;
    intensidade: string;
    calorias: number;
    beneficios: string[];
  };
  alongamento: {
    duracao: string;
    foco: string[];
  };
  tempoTotal: string;
  caloriasTotal: number;
}

export default function WorkoutModal({ isOpen, onClose, userData, dayName }: WorkoutModalProps) {
  const [selectedExercises, setSelectedExercises] = useState<{[key: number]: 1 | 2}>({});
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    aquecimento: true,
    exercicios: true,
    cardio: true,
    alongamento: false
  });

  if (!isOpen) return null;

  const toggleExercise = (index: number) => {
    setSelectedExercises(prev => ({
      ...prev,
      [index]: prev[index] === 1 ? 2 : 1
    }));
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Gerar treino personalizado baseado no dia e nível do usuário
  const generateWorkout = (): WorkoutDay => {
    const nivel = userData.nivelTreino;
    const isIniciante = nivel === "Iniciante";
    const isIntermediario = nivel === "Intermediário";
    const isAvancado = nivel === "Avançado";

    // Treinos por dia da semana
    const workouts: {[key: string]: WorkoutDay} = {
      "Segunda": {
        dia: "Segunda-feira",
        grupo: "Peito e Tríceps",
        aquecimento: {
          atividade: "Polichinelos + Rotação de braços",
          duracao: "5 minutos",
          calorias: 25
        },
        exercicios: [
          {
            opcao1: {
              nome: "Supino reto com barra",
              series: isIniciante ? "3" : isIntermediario ? "4" : "5",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "10-12" : "8-10",
              descanso: isIniciante ? "90s" : isIntermediario ? "75s" : "60s",
              calorias: 45,
              beneficios: [
                "Desenvolve a parte central do peitoral",
                "Fortalece tríceps e ombros",
                "Melhora força geral do tronco superior"
              ],
              observacoes: "Mantenha os pés firmes no chão e desça a barra até tocar o peito"
            },
            opcao2: {
              nome: "Supino com halteres",
              series: isIniciante ? "3" : isIntermediario ? "4" : "5",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "10-12" : "8-10",
              descanso: isIniciante ? "90s" : isIntermediario ? "75s" : "60s",
              calorias: 42,
              beneficios: [
                "Maior amplitude de movimento",
                "Trabalha estabilização muscular",
                "Reduz desequilíbrios entre os lados"
              ],
              observacoes: "Desça os halteres até a linha do peito, mantendo controle total"
            }
          },
          {
            opcao1: {
              nome: "Supino inclinado com barra",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "10-12" : "8-10",
              descanso: isIniciante ? "90s" : isIntermediario ? "75s" : "60s",
              calorias: 40,
              beneficios: [
                "Foca na parte superior do peitoral",
                "Define a região clavicular",
                "Fortalece ombros anteriores"
              ],
              observacoes: "Banco inclinado entre 30-45 graus para melhor ativação"
            },
            opcao2: {
              nome: "Crucifixo inclinado com halteres",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "12-15" : "10-12",
              descanso: isIniciante ? "75s" : isIntermediario ? "60s" : "60s",
              calorias: 38,
              beneficios: [
                "Isolamento do peitoral superior",
                "Alongamento profundo do músculo",
                "Melhora definição muscular"
              ],
              observacoes: "Mantenha leve flexão nos cotovelos durante todo movimento"
            }
          },
          {
            opcao1: {
              nome: "Crossover no cabo",
              series: isIniciante ? "3" : isIntermediario ? "3" : "4",
              repeticoes: isIniciante ? "15" : isIntermediario ? "12-15" : "12-15",
              descanso: isIniciante ? "60s" : isIntermediario ? "60s" : "45s",
              calorias: 35,
              beneficios: [
                "Tensão constante no peitoral",
                "Trabalha parte interna do peito",
                "Excelente para definição"
              ],
              observacoes: "Cruze as mãos na frente do corpo para máxima contração"
            },
            opcao2: {
              nome: "Flexão de braço com variações",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "10-12" : isIntermediario ? "15-20" : "20-25",
              descanso: isIniciante ? "60s" : isIntermediario ? "60s" : "45s",
              calorias: 32,
              beneficios: [
                "Exercício funcional completo",
                "Trabalha core e estabilização",
                "Pode ser feito em qualquer lugar"
              ],
              observacoes: "Varie entre pegada aberta, fechada e diamante"
            }
          },
          {
            opcao1: {
              nome: "Tríceps testa com barra W",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "10-12" : "10-12",
              descanso: isIniciante ? "75s" : isIntermediario ? "60s" : "60s",
              calorias: 30,
              beneficios: [
                "Isolamento completo do tríceps",
                "Trabalha todas as três cabeças",
                "Aumenta volume do braço"
              ],
              observacoes: "Mantenha cotovelos fixos e desça a barra até próximo da testa"
            },
            opcao2: {
              nome: "Tríceps corda no cabo",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "12-15" : "12-15",
              descanso: isIniciante ? "60s" : isIntermediario ? "60s" : "45s",
              calorias: 28,
              beneficios: [
                "Tensão constante no músculo",
                "Trabalha cabeça lateral do tríceps",
                "Ótimo para definição"
              ],
              observacoes: "Abra a corda no final do movimento para máxima contração"
            }
          },
          {
            opcao1: {
              nome: "Mergulho no banco (Dips)",
              series: isIniciante ? "3" : isIntermediario ? "3" : "4",
              repeticoes: isIniciante ? "10-12" : isIntermediario ? "12-15" : "15-20",
              descanso: isIniciante ? "75s" : isIntermediario ? "60s" : "60s",
              calorias: 35,
              beneficios: [
                "Exercício composto para tríceps",
                "Trabalha também peito inferior",
                "Desenvolve força funcional"
              ],
              observacoes: "Desça até formar 90 graus nos cotovelos"
            },
            opcao2: {
              nome: "Tríceps francês com halter",
              series: isIniciante ? "3" : isIntermediario ? "3" : "4",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "12-15" : "10-12",
              descanso: isIniciante ? "60s" : isIntermediario ? "60s" : "60s",
              calorias: 30,
              beneficios: [
                "Alongamento profundo do tríceps",
                "Trabalha cabeça longa",
                "Melhora flexibilidade do cotovelo"
              ],
              observacoes: "Mantenha cotovelos apontando para cima durante todo movimento"
            }
          }
        ],
        cardio: {
          atividade: "Esteira ou Bicicleta",
          duracao: isIniciante ? "15 minutos" : isIntermediario ? "20 minutos" : "25 minutos",
          intensidade: isIniciante ? "Moderada (60-70% FCM)" : isIntermediario ? "Moderada-Alta (70-80% FCM)" : "Alta (75-85% FCM)",
          calorias: isIniciante ? 120 : isIntermediario ? 180 : 220,
          beneficios: [
            "Queima calorias adicionais",
            "Melhora condicionamento cardiovascular",
            "Acelera recuperação muscular",
            "Aumenta resistência aeróbica"
          ]
        },
        alongamento: {
          duracao: "5-7 minutos",
          foco: [
            "Peitorais (braços cruzados atrás)",
            "Tríceps (braço acima da cabeça)",
            "Ombros (rotação e elevação)",
            "Coluna (torção suave)"
          ]
        },
        tempoTotal: isIniciante ? "55-60 minutos" : isIntermediario ? "65-70 minutos" : "75-80 minutos",
        caloriasTotal: isIniciante ? 360 : isIntermediario ? 480 : 580
      },
      "Terça": {
        dia: "Terça-feira",
        grupo: "Costas e Bíceps",
        aquecimento: {
          atividade: "Remada leve + Rotação de ombros",
          duracao: "5 minutos",
          calorias: 25
        },
        exercicios: [
          {
            opcao1: {
              nome: "Barra fixa (ou puxada frontal)",
              series: isIniciante ? "3" : isIntermediario ? "4" : "5",
              repeticoes: isIniciante ? "8-10" : isIntermediario ? "10-12" : "12-15",
              descanso: isIniciante ? "90s" : isIntermediario ? "75s" : "60s",
              calorias: 50,
              beneficios: [
                "Desenvolve largura das costas",
                "Fortalece latíssimo do dorso",
                "Melhora postura geral",
                "Trabalha força de pegada"
              ],
              observacoes: "Se não conseguir fazer barra, use puxada frontal com peso adequado"
            },
            opcao2: {
              nome: "Puxada frontal pegada aberta",
              series: isIniciante ? "3" : isIntermediario ? "4" : "5",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "10-12" : "10-12",
              descanso: isIniciante ? "90s" : isIntermediario ? "75s" : "60s",
              calorias: 45,
              beneficios: [
                "Isolamento do latíssimo",
                "Controle total do movimento",
                "Ideal para iniciantes",
                "Desenvolve largura das costas"
              ],
              observacoes: "Puxe até a barra tocar o peito superior, não atrás da cabeça"
            }
          },
          {
            opcao1: {
              nome: "Remada curvada com barra",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "10-12" : "8-10",
              descanso: isIniciante ? "90s" : isIntermediario ? "75s" : "60s",
              calorias: 48,
              beneficios: [
                "Desenvolve espessura das costas",
                "Fortalece trapézio médio",
                "Trabalha lombar isometricamente",
                "Melhora força de puxão"
              ],
              observacoes: "Mantenha coluna neutra e puxe a barra até o abdômen"
            },
            opcao2: {
              nome: "Remada com halteres unilateral",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "10-12" : "10-12",
              descanso: isIniciante ? "75s" : isIntermediario ? "60s" : "60s",
              calorias: 42,
              beneficios: [
                "Corrige desequilíbrios musculares",
                "Maior amplitude de movimento",
                "Trabalha estabilização do core",
                "Foco em cada lado separadamente"
              ],
              observacoes: "Apoie um joelho no banco e puxe o halter até a cintura"
            }
          },
          {
            opcao1: {
              nome: "Remada baixa no cabo",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "12-15" : "10-12",
              descanso: isIniciante ? "75s" : isIntermediario ? "60s" : "60s",
              calorias: 40,
              beneficios: [
                "Tensão constante nas costas",
                "Trabalha trapézio e romboides",
                "Melhora postura",
                "Fortalece região média das costas"
              ],
              observacoes: "Puxe até o abdômen mantendo cotovelos próximos ao corpo"
            },
            opcao2: {
              nome: "Pulldown com pegada neutra",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "12-15" : "12-15",
              descanso: isIniciante ? "60s" : isIntermediario ? "60s" : "45s",
              calorias: 38,
              beneficios: [
                "Trabalha latíssimo com menos stress nos ombros",
                "Ótimo para definição",
                "Pegada confortável",
                "Ativa bíceps secundariamente"
              ],
              observacoes: "Use pegada paralela e puxe até o peito"
            }
          },
          {
            opcao1: {
              nome: "Rosca direta com barra",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "10-12" : "10-12",
              descanso: isIniciante ? "75s" : isIntermediario ? "60s" : "60s",
              calorias: 32,
              beneficios: [
                "Desenvolve volume do bíceps",
                "Trabalha ambas as cabeças",
                "Aumenta força de flexão",
                "Exercício clássico para braços"
              ],
              observacoes: "Mantenha cotovelos fixos e não balance o corpo"
            },
            opcao2: {
              nome: "Rosca alternada com halteres",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "10-12" : "10-12",
              descanso: isIniciante ? "60s" : isIntermediario ? "60s" : "60s",
              calorias: 30,
              beneficios: [
                "Foco individual em cada braço",
                "Permite supinação completa",
                "Corrige assimetrias",
                "Maior controle do movimento"
              ],
              observacoes: "Gire o punho durante a subida (supinação)"
            }
          },
          {
            opcao1: {
              nome: "Rosca martelo",
              series: isIniciante ? "3" : isIntermediario ? "3" : "4",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "12-15" : "12-15",
              descanso: isIniciante ? "60s" : isIntermediario ? "60s" : "45s",
              calorias: 28,
              beneficios: [
                "Trabalha braquial e braquiorradial",
                "Aumenta espessura do braço",
                "Fortalece antebraços",
                "Menos stress nas articulações"
              ],
              observacoes: "Mantenha pegada neutra (palmas frente a frente) durante todo movimento"
            },
            opcao2: {
              nome: "Rosca concentrada",
              series: isIniciante ? "3" : isIntermediario ? "3" : "4",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "12-15" : "12-15",
              descanso: isIniciante ? "60s" : isIntermediario ? "60s" : "45s",
              calorias: 26,
              beneficios: [
                "Isolamento máximo do bíceps",
                "Pico de contração intenso",
                "Trabalha principalmente cabeça curta",
                "Excelente para definição"
              ],
              observacoes: "Apoie cotovelo na parte interna da coxa e foque na contração"
            }
          }
        ],
        cardio: {
          atividade: "Elíptico ou Remo",
          duracao: isIniciante ? "15 minutos" : isIntermediario ? "20 minutos" : "25 minutos",
          intensidade: isIniciante ? "Moderada (60-70% FCM)" : isIntermediario ? "Moderada-Alta (70-80% FCM)" : "Alta (75-85% FCM)",
          calorias: isIniciante ? 130 : isIntermediario ? 190 : 230,
          beneficios: [
            "Complementa trabalho de costas",
            "Queima gordura localizada",
            "Melhora capacidade aeróbica",
            "Acelera recuperação pós-treino"
          ]
        },
        alongamento: {
          duracao: "5-7 minutos",
          foco: [
            "Latíssimo (braços estendidos acima)",
            "Bíceps (braço estendido para trás)",
            "Trapézio (inclinação lateral do pescoço)",
            "Lombar (flexão e extensão suave)"
          ]
        },
        tempoTotal: isIniciante ? "55-60 minutos" : isIntermediario ? "65-70 minutos" : "75-80 minutos",
        caloriasTotal: isIniciante ? 380 : isIntermediario ? 500 : 600
      },
      "Quarta": {
        dia: "Quarta-feira",
        grupo: "Pernas Completo",
        aquecimento: {
          atividade: "Bicicleta leve + Agachamento sem peso",
          duracao: "7 minutos",
          calorias: 35
        },
        exercicios: [
          {
            opcao1: {
              nome: "Agachamento livre com barra",
              series: isIniciante ? "3" : isIntermediario ? "4" : "5",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "10-12" : "8-10",
              descanso: isIniciante ? "120s" : isIntermediario ? "90s" : "90s",
              calorias: 60,
              beneficios: [
                "Rei dos exercícios para pernas",
                "Trabalha quadríceps, glúteos e posterior",
                "Libera hormônios anabólicos",
                "Fortalece core e lombar",
                "Melhora mobilidade de quadril"
              ],
              observacoes: "Desça até coxas paralelas ao chão, mantenha coluna neutra"
            },
            opcao2: {
              nome: "Leg Press 45 graus",
              series: isIniciante ? "3" : isIntermediario ? "4" : "5",
              repeticoes: isIniciante ? "15-20" : isIntermediario ? "12-15" : "10-12",
              descanso: isIniciante ? "90s" : isIntermediario ? "75s" : "60s",
              calorias: 55,
              beneficios: [
                "Menos stress na lombar",
                "Permite usar mais carga",
                "Trabalha quadríceps intensamente",
                "Ideal para hipertrofia",
                "Mais seguro para iniciantes"
              ],
              observacoes: "Desça até 90 graus nos joelhos, não tire lombar do encosto"
            }
          },
          {
            opcao1: {
              nome: "Cadeira extensora",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "15-20" : isIntermediario ? "12-15" : "12-15",
              descanso: isIniciante ? "60s" : isIntermediario ? "60s" : "45s",
              calorias: 35,
              beneficios: [
                "Isolamento total do quadríceps",
                "Define a região frontal da coxa",
                "Fortalece joelhos",
                "Trabalha vasto medial (gota)"
              ],
              observacoes: "Estenda completamente as pernas e contraia no topo"
            },
            opcao2: {
              nome: "Afundo com halteres",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "12-15 cada" : isIntermediario ? "10-12 cada" : "10-12 cada",
              descanso: isIniciante ? "75s" : isIntermediario ? "60s" : "60s",
              calorias: 45,
              beneficios: [
                "Trabalha equilíbrio e coordenação",
                "Ativa glúteos intensamente",
                "Corrige assimetrias",
                "Exercício funcional"
              ],
              observacoes: "Joelho da frente não deve ultrapassar a ponta do pé"
            }
          },
          {
            opcao1: {
              nome: "Mesa flexora (posterior de coxa)",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "15-20" : isIntermediario ? "12-15" : "12-15",
              descanso: isIniciante ? "60s" : isIntermediario ? "60s" : "45s",
              calorias: 32,
              beneficios: [
                "Isolamento dos isquiotibiais",
                "Previne lesões no joelho",
                "Equilibra força entre anterior e posterior",
                "Define parte de trás da coxa"
              ],
              observacoes: "Flexione até 90 graus e contraia no topo do movimento"
            },
            opcao2: {
              nome: "Stiff com barra",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "10-12" : "10-12",
              descanso: isIniciante ? "75s" : isIntermediario ? "60s" : "60s",
              calorias: 40,
              beneficios: [
                "Trabalha posterior de coxa e glúteos",
                "Fortalece lombar",
                "Melhora flexibilidade posterior",
                "Exercício composto eficiente"
              ],
              observacoes: "Mantenha joelhos levemente flexionados e coluna reta"
            }
          },
          {
            opcao1: {
              nome: "Cadeira abdutora",
              series: isIniciante ? "3" : isIntermediario ? "3" : "4",
              repeticoes: isIniciante ? "15-20" : isIntermediario ? "15-20" : "15-20",
              descanso: isIniciante ? "60s" : isIntermediario ? "45s" : "45s",
              calorias: 25,
              beneficios: [
                "Trabalha glúteo médio",
                "Estabiliza quadril",
                "Previne lesões",
                "Melhora estética lateral do quadril"
              ],
              observacoes: "Abra as pernas contra resistência e contraia glúteos"
            },
            opcao2: {
              nome: "Elevação pélvica (Hip Thrust)",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "15-20" : isIntermediario ? "12-15" : "12-15",
              descanso: isIniciante ? "60s" : isIntermediario ? "60s" : "60s",
              calorias: 38,
              beneficios: [
                "Máxima ativação dos glúteos",
                "Melhora força de extensão do quadril",
                "Define e levanta glúteos",
                "Fortalece lombar"
              ],
              observacoes: "Apoie parte superior das costas no banco e eleve quadril"
            }
          },
          {
            opcao1: {
              nome: "Panturrilha em pé no Smith",
              series: isIniciante ? "4" : isIntermediario ? "4" : "5",
              repeticoes: isIniciante ? "15-20" : isIntermediario ? "15-20" : "20-25",
              descanso: isIniciante ? "45s" : isIntermediario ? "45s" : "30s",
              calorias: 20,
              beneficios: [
                "Desenvolve gastrocnêmio",
                "Define panturrilhas",
                "Melhora impulsão",
                "Fortalece tornozelos"
              ],
              observacoes: "Suba na ponta dos pés o máximo possível e desça alongando"
            },
            opcao2: {
              nome: "Panturrilha sentado",
              series: isIniciante ? "4" : isIntermediario ? "4" : "5",
              repeticoes: isIniciante ? "15-20" : isIntermediario ? "20-25" : "20-25",
              descanso: isIniciante ? "45s" : isIntermediario ? "45s" : "30s",
              calorias: 18,
              beneficios: [
                "Trabalha sóleo (músculo profundo)",
                "Complementa panturrilha em pé",
                "Aumenta volume total da panturrilha",
                "Menos stress nos joelhos"
              ],
              observacoes: "Mantenha joelhos fixos e foque na amplitude completa"
            }
          }
        ],
        cardio: {
          atividade: "Caminhada inclinada ou Bicicleta",
          duracao: isIniciante ? "10 minutos" : isIntermediario ? "15 minutos" : "20 minutos",
          intensidade: isIniciante ? "Leve (50-60% FCM)" : isIntermediario ? "Moderada (60-70% FCM)" : "Moderada (65-75% FCM)",
          calorias: isIniciante ? 80 : isIntermediario ? 130 : 170,
          beneficios: [
            "Recuperação ativa das pernas",
            "Reduz ácido lático",
            "Melhora circulação",
            "Queima calorias sem sobrecarregar"
          ]
        },
        alongamento: {
          duracao: "7-10 minutos",
          foco: [
            "Quadríceps (puxar pé para trás)",
            "Posterior de coxa (flexão para frente)",
            "Glúteos (perna cruzada no peito)",
            "Panturrilhas (pé na parede)",
            "Adutores (abertura lateral)"
          ]
        },
        tempoTotal: isIniciante ? "60-65 minutos" : isIntermediario ? "70-75 minutos" : "80-85 minutos",
        caloriasTotal: isIniciante ? 420 : isIntermediario ? 550 : 680
      },
      "Quinta": {
        dia: "Quinta-feira",
        grupo: "Ombros e Abdômen",
        aquecimento: {
          atividade: "Rotação de ombros + Elevações laterais sem peso",
          duracao: "5 minutos",
          calorias: 20
        },
        exercicios: [
          {
            opcao1: {
              nome: "Desenvolvimento com barra",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "10-12" : "8-10",
              descanso: isIniciante ? "90s" : isIntermediario ? "75s" : "60s",
              calorias: 42,
              beneficios: [
                "Desenvolve ombros completos",
                "Trabalha deltoides anterior e médio",
                "Fortalece trapézio superior",
                "Melhora força de empurrar"
              ],
              observacoes: "Suba a barra da linha do queixo até extensão completa dos braços"
            },
            opcao2: {
              nome: "Desenvolvimento com halteres",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "10-12" : "10-12",
              descanso: isIniciante ? "75s" : isIntermediario ? "60s" : "60s",
              calorias: 40,
              beneficios: [
                "Maior amplitude de movimento",
                "Trabalha estabilização",
                "Corrige desequilíbrios",
                "Menos stress na lombar"
              ],
              observacoes: "Desça até halteres na linha das orelhas"
            }
          },
          {
            opcao1: {
              nome: "Elevação lateral com halteres",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "12-15" : "12-15",
              descanso: isIniciante ? "60s" : isIntermediario ? "60s" : "45s",
              calorias: 30,
              beneficios: [
                "Isolamento do deltoide médio",
                "Cria largura dos ombros",
                "Define região lateral",
                "Melhora estética em V"
              ],
              observacoes: "Eleve até a linha dos ombros, cotovelos levemente flexionados"
            },
            opcao2: {
              nome: "Elevação lateral no cabo",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "15-20" : "15-20",
              descanso: isIniciante ? "60s" : isIntermediario ? "45s" : "45s",
              calorias: 28,
              beneficios: [
                "Tensão constante no músculo",
                "Ótimo para definição",
                "Permite drop sets",
                "Menos balanço do corpo"
              ],
              observacoes: "Puxe o cabo lateralmente mantendo controle total"
            }
          },
          {
            opcao1: {
              nome: "Elevação frontal com barra",
              series: isIniciante ? "3" : isIntermediario ? "3" : "4",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "12-15" : "12-15",
              descanso: isIniciante ? "60s" : isIntermediario ? "60s" : "45s",
              calorias: 28,
              beneficios: [
                "Trabalha deltoide anterior",
                "Define parte frontal do ombro",
                "Melhora força de empurrar",
                "Complementa desenvolvimento"
              ],
              observacoes: "Eleve a barra até a linha dos olhos sem balançar o corpo"
            },
            opcao2: {
              nome: "Crucifixo inverso (deltoide posterior)",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "15-20" : isIntermediario ? "12-15" : "12-15",
              descanso: isIniciante ? "60s" : isIntermediario ? "60s" : "45s",
              calorias: 26,
              beneficios: [
                "Trabalha deltoide posterior",
                "Equilibra desenvolvimento dos ombros",
                "Melhora postura",
                "Previne lesões"
              ],
              observacoes: "Incline tronco e abra os braços lateralmente"
            }
          },
          {
            opcao1: {
              nome: "Encolhimento com barra (trapézio)",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "15-20" : isIntermediario ? "12-15" : "12-15",
              descanso: isIniciante ? "60s" : isIntermediario ? "60s" : "45s",
              calorias: 25,
              beneficios: [
                "Desenvolve trapézio superior",
                "Cria volume no pescoço/ombro",
                "Fortalece região cervical",
                "Melhora pegada"
              ],
              observacoes: "Eleve os ombros em direção às orelhas, sem dobrar cotovelos"
            },
            opcao2: {
              nome: "Remada alta com barra",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "12-15" : "12-15",
              descanso: isIniciante ? "60s" : isIntermediario ? "60s" : "45s",
              calorias: 30,
              beneficios: [
                "Trabalha trapézio e deltoides",
                "Exercício composto eficiente",
                "Define região superior",
                "Melhora força de puxar"
              ],
              observacoes: "Puxe a barra até a linha do queixo, cotovelos acima das mãos"
            }
          },
          {
            opcao1: {
              nome: "Abdominal supra (crunch)",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "15-20" : isIntermediario ? "20-25" : "25-30",
              descanso: isIniciante ? "45s" : isIntermediario ? "30s" : "30s",
              calorias: 20,
              beneficios: [
                "Trabalha reto abdominal superior",
                "Define abdômen",
                "Fortalece core",
                "Melhora estabilização"
              ],
              observacoes: "Contraia abdômen elevando apenas tronco superior"
            },
            opcao2: {
              nome: "Abdominal infra (elevação de pernas)",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "15-20" : "20-25",
              descanso: isIniciante ? "45s" : isIntermediario ? "30s" : "30s",
              calorias: 22,
              beneficios: [
                "Trabalha reto abdominal inferior",
                "Define parte baixa do abdômen",
                "Fortalece iliopsoas",
                "Melhora controle pélvico"
              ],
              observacoes: "Eleve pernas mantendo lombar no chão"
            }
          },
          {
            opcao1: {
              nome: "Prancha isométrica",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "30-45s" : isIntermediario ? "45-60s" : "60-90s",
              descanso: isIniciante ? "60s" : isIntermediario ? "45s" : "45s",
              calorias: 15,
              beneficios: [
                "Fortalece core completo",
                "Trabalho isométrico intenso",
                "Melhora postura",
                "Previne dores lombares"
              ],
              observacoes: "Mantenha corpo reto dos ombros aos pés, sem deixar quadril cair"
            },
            opcao2: {
              nome: "Abdominal bicicleta",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "20-30" : isIntermediario ? "30-40" : "40-50",
              descanso: isIniciante ? "45s" : isIntermediario ? "30s" : "30s",
              calorias: 25,
              beneficios: [
                "Trabalha oblíquos intensamente",
                "Define cintura",
                "Exercício dinâmico completo",
                "Queima muitas calorias"
              ],
              observacoes: "Alterne cotovelo com joelho oposto em movimento de pedalar"
            }
          }
        ],
        cardio: {
          atividade: "HIIT (Tiro intervalado)",
          duracao: isIniciante ? "10 minutos" : isIntermediario ? "15 minutos" : "20 minutos",
          intensidade: isIniciante ? "30s rápido / 60s leve" : isIntermediario ? "30s rápido / 45s leve" : "40s rápido / 30s leve",
          calorias: isIniciante ? 100 : isIntermediario ? 160 : 220,
          beneficios: [
            "Máxima queima de gordura",
            "Acelera metabolismo por horas",
            "Melhora capacidade anaeróbica",
            "Economiza tempo de treino"
          ]
        },
        alongamento: {
          duracao: "5-7 minutos",
          foco: [
            "Deltoides (braço cruzado no peito)",
            "Trapézio (inclinação lateral)",
            "Rotadores do ombro",
            "Abdômen (cobra yoga)",
            "Lombar (joelhos no peito)"
          ]
        },
        tempoTotal: isIniciante ? "50-55 minutos" : isIntermediario ? "60-65 minutos" : "70-75 minutos",
        caloriasTotal: isIniciante ? 320 : isIntermediario ? 430 : 550
      },
      "Sexta": {
        dia: "Sexta-feira",
        grupo: "Treino Full Body",
        aquecimento: {
          atividade: "Mobilidade articular completa",
          duracao: "7 minutos",
          calorias: 30
        },
        exercicios: [
          {
            opcao1: {
              nome: "Agachamento com barra",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "10-12" : "10-12",
              descanso: isIniciante ? "90s" : isIntermediario ? "75s" : "60s",
              calorias: 55,
              beneficios: [
                "Trabalha corpo inteiro",
                "Libera hormônios anabólicos",
                "Queima muitas calorias",
                "Fortalece pernas e core"
              ],
              observacoes: "Movimento fundamental para full body"
            },
            opcao2: {
              nome: "Leg Press",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "15-20" : isIntermediario ? "12-15" : "12-15",
              descanso: isIniciante ? "75s" : isIntermediario ? "60s" : "60s",
              calorias: 50,
              beneficios: [
                "Trabalha pernas com segurança",
                "Permite carga alta",
                "Menos fadiga sistêmica",
                "Ótimo para volume"
              ],
              observacoes: "Alternativa segura ao agachamento livre"
            }
          },
          {
            opcao1: {
              nome: "Supino reto",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "10-12" : "10-12",
              descanso: isIniciante ? "75s" : isIntermediario ? "60s" : "60s",
              calorias: 40,
              beneficios: [
                "Desenvolve peito e tríceps",
                "Exercício composto essencial",
                "Aumenta força de empurrar",
                "Trabalha ombros secundariamente"
              ],
              observacoes: "Fundamental para parte superior do corpo"
            },
            opcao2: {
              nome: "Flexão de braço com variações",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "10-15" : isIntermediario ? "15-20" : "20-25",
              descanso: isIniciante ? "60s" : isIntermediario ? "60s" : "45s",
              calorias: 35,
              beneficios: [
                "Exercício funcional completo",
                "Trabalha core e estabilização",
                "Pode fazer em qualquer lugar",
                "Várias variações possíveis"
              ],
              observacoes: "Alternativa sem equipamento"
            }
          },
          {
            opcao1: {
              nome: "Barra fixa ou Puxada",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "8-12" : isIntermediario ? "10-12" : "12-15",
              descanso: isIniciante ? "90s" : isIntermediario ? "75s" : "60s",
              calorias: 45,
              beneficios: [
                "Desenvolve costas completas",
                "Trabalha bíceps intensamente",
                "Melhora postura",
                "Exercício funcional"
              ],
              observacoes: "Essencial para desenvolvimento das costas"
            },
            opcao2: {
              nome: "Remada curvada",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "10-12" : "10-12",
              descanso: isIniciante ? "75s" : isIntermediario ? "60s" : "60s",
              calorias: 42,
              beneficios: [
                "Trabalha espessura das costas",
                "Fortalece lombar",
                "Melhora força de puxão",
                "Desenvolve trapézio"
              ],
              observacoes: "Alternativa para desenvolvimento das costas"
            }
          },
          {
            opcao1: {
              nome: "Desenvolvimento de ombros",
              series: isIniciante ? "3" : isIntermediario ? "3" : "4",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "10-12" : "10-12",
              descanso: isIniciante ? "75s" : isIntermediario ? "60s" : "60s",
              calorias: 35,
              beneficios: [
                "Desenvolve ombros completos",
                "Trabalha trapézio superior",
                "Melhora estética",
                "Fortalece região cervical"
              ],
              observacoes: "Importante para simetria do corpo"
            },
            opcao2: {
              nome: "Elevação lateral + Frontal",
              series: isIniciante ? "3" : isIntermediario ? "3" : "4",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "12-15" : "12-15",
              descanso: isIniciante ? "60s" : isIntermediario ? "60s" : "45s",
              calorias: 30,
              beneficios: [
                "Trabalha deltoides médio e anterior",
                "Define ombros",
                "Cria largura",
                "Isolamento eficiente"
              ],
              observacoes: "Combine os dois movimentos em superserie"
            }
          },
          {
            opcao1: {
              nome: "Stiff (posterior de coxa)",
              series: isIniciante ? "3" : isIntermediario ? "3" : "4",
              repeticoes: isIniciante ? "12-15" : isIntermediario ? "12-15" : "12-15",
              descanso: isIniciante ? "60s" : isIntermediario ? "60s" : "60s",
              calorias: 38,
              beneficios: [
                "Trabalha posterior completo",
                "Fortalece lombar",
                "Melhora flexibilidade",
                "Previne lesões"
              ],
              observacoes: "Importante para equilíbrio muscular"
            },
            opcao2: {
              nome: "Mesa flexora",
              series: isIniciante ? "3" : isIntermediario ? "3" : "4",
              repeticoes: isIniciante ? "15-20" : isIntermediario ? "12-15" : "12-15",
              descanso: isIniciante ? "60s" : isIntermediario ? "60s" : "45s",
              calorias: 30,
              beneficios: [
                "Isolamento dos isquiotibiais",
                "Previne lesões no joelho",
                "Define posterior da coxa",
                "Complementa treino de pernas"
              ],
              observacoes: "Alternativa de isolamento"
            }
          },
          {
            opcao1: {
              nome: "Abdominal completo (supra + infra)",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "15-20" : isIntermediario ? "20-25" : "25-30",
              descanso: isIniciante ? "45s" : isIntermediario ? "30s" : "30s",
              calorias: 25,
              beneficios: [
                "Trabalha abdômen completo",
                "Define região central",
                "Fortalece core",
                "Melhora estabilização"
              ],
              observacoes: "Finalize o treino com abdômen"
            },
            opcao2: {
              nome: "Prancha + Abdominal bicicleta",
              series: isIniciante ? "3" : isIntermediario ? "4" : "4",
              repeticoes: isIniciante ? "30s + 20 rep" : isIntermediario ? "45s + 30 rep" : "60s + 40 rep",
              descanso: isIniciante ? "60s" : isIntermediario ? "45s" : "45s",
              calorias: 28,
              beneficios: [
                "Trabalho isométrico + dinâmico",
                "Core completo",
                "Define cintura",
                "Queima calorias"
              ],
              observacoes: "Combine os dois exercícios sem descanso"
            }
          }
        ],
        cardio: {
          atividade: "Circuito metabólico (burpees, mountain climbers, jumping jacks)",
          duracao: isIniciante ? "10 minutos" : isIntermediario ? "15 minutos" : "20 minutos",
          intensidade: isIniciante ? "3 rounds de 40s trabalho / 20s descanso" : isIntermediario ? "4 rounds de 45s trabalho / 15s descanso" : "5 rounds de 50s trabalho / 10s descanso",
          calorias: isIniciante ? 120 : isIntermediario ? 180 : 250,
          beneficios: [
            "Queima máxima de calorias",
            "Trabalha corpo inteiro",
            "Melhora condicionamento geral",
            "Acelera metabolismo",
            "Finalização intensa do treino"
          ]
        },
        alongamento: {
          duracao: "7-10 minutos",
          foco: [
            "Corpo inteiro (todos os grupos trabalhados)",
            "Quadríceps e posterior",
            "Peitorais e costas",
            "Ombros e braços",
            "Core e lombar"
          ]
        },
        tempoTotal: isIniciante ? "60-65 minutos" : isIntermediario ? "70-75 minutos" : "80-85 minutos",
        caloriasTotal: isIniciante ? 450 : isIntermediario ? 580 : 720
      }
    };

    // Retornar treino baseado no dia
    const dayMap: {[key: string]: string} = {
      "Segunda": "Segunda",
      "Terça": "Terça",
      "Quarta": "Quarta",
      "Quinta": "Quinta",
      "Sexta": "Sexta"
    };

    return workouts[dayMap[dayName]] || workouts["Segunda"];
  };

  const workout = generateWorkout();

  const ExerciseCard = ({ exercise, index }: { exercise: ExerciseOption; index: number }) => {
    const selectedOption = selectedExercises[index] || 1;
    const currentExercise = selectedOption === 1 ? exercise.opcao1 : exercise.opcao2;

    return (
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:border-[#00C897]/50 transition-all">
        {/* Opções */}
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => toggleExercise(index)}
            className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              selectedOption === 1
                ? "bg-[#00C897] text-black"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Opção 1
          </button>
          <button
            onClick={() => toggleExercise(index)}
            className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              selectedOption === 2
                ? "bg-[#00C897] text-black"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Opção 2
          </button>
        </div>

        {/* Nome do exercício */}
        <h5 className="font-bold text-white mb-3">{currentExercise.nome}</h5>

        {/* Informações do treino */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-gray-900/50 rounded-lg p-2">
            <p className="text-xs text-gray-400">Séries</p>
            <p className="font-bold text-[#00C897]">{currentExercise.series}</p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-2">
            <p className="text-xs text-gray-400">Repetições</p>
            <p className="font-bold text-[#00C897]">{currentExercise.repeticoes}</p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-2">
            <p className="text-xs text-gray-400">Descanso</p>
            <p className="font-bold text-blue-500">{currentExercise.descanso}</p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-2">
            <p className="text-xs text-gray-400">Calorias</p>
            <div className="flex items-center gap-1">
              <Flame className="w-3 h-3 text-orange-500" />
              <p className="font-bold text-orange-500">{currentExercise.calorias}</p>
            </div>
          </div>
        </div>

        {/* Benefícios */}
        <div className="bg-gradient-to-r from-[#00C897]/10 to-transparent border border-[#00C897]/30 rounded-lg p-3 mb-2">
          <p className="text-xs font-bold text-[#00C897] mb-2 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Benefícios:
          </p>
          <ul className="space-y-1">
            {currentExercise.beneficios.map((beneficio, idx) => (
              <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                <span className="text-[#00C897] mt-0.5">•</span>
                <span>{beneficio}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Observações */}
        <div className="bg-gray-900/50 rounded-lg p-2">
          <p className="text-xs text-gray-400 italic">💡 {currentExercise.observacoes}</p>
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
            <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
              <Dumbbell className="w-7 h-7 text-[#00C897]" />
              {workout.dia} - {workout.grupo}
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {workout.tempoTotal}
              </span>
              <span className="flex items-center gap-1">
                <Flame className="w-4 h-4 text-orange-500" />
                {workout.caloriasTotal} kcal
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-[#00C897]" />
                Nível: {userData.nivelTreino}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Conteúdo com scroll */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Aquecimento */}
            <div className="border border-gray-800 rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleSection('aquecimento')}
                className="w-full p-4 flex items-center justify-between bg-gray-800/50 hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-orange-500" />
                  <h3 className="font-bold text-white">Aquecimento</h3>
                  <span className="text-xs text-gray-400">({workout.aquecimento.duracao})</span>
                </div>
                {expandedSections.aquecimento ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {expandedSections.aquecimento && (
                <div className="p-4 bg-gray-900/30">
                  <p className="text-gray-300 mb-2">{workout.aquecimento.atividade}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span>{workout.aquecimento.calorias} kcal</span>
                  </div>
                </div>
              )}
            </div>

            {/* Exercícios */}
            <div className="border border-gray-800 rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleSection('exercicios')}
                className="w-full p-4 flex items-center justify-between bg-gray-800/50 hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Dumbbell className="w-5 h-5 text-[#00C897]" />
                  <h3 className="font-bold text-white">Exercícios Principais</h3>
                  <span className="text-xs text-gray-400">({workout.exercicios.length} exercícios)</span>
                </div>
                {expandedSections.exercicios ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {expandedSections.exercicios && (
                <div className="p-4 bg-gray-900/30 space-y-4">
                  {workout.exercicios.map((exercise, index) => (
                    <ExerciseCard key={index} exercise={exercise} index={index} />
                  ))}
                </div>
              )}
            </div>

            {/* Cardio */}
            <div className="border border-gray-800 rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleSection('cardio')}
                className="w-full p-4 flex items-center justify-between bg-gray-800/50 hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-red-500" />
                  <h3 className="font-bold text-white">Cardio</h3>
                  <span className="text-xs text-gray-400">({workout.cardio.duracao})</span>
                </div>
                {expandedSections.cardio ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {expandedSections.cardio && (
                <div className="p-4 bg-gray-900/30">
                  <div className="bg-gray-800/50 rounded-xl p-4 mb-3">
                    <h4 className="font-bold text-white mb-2">{workout.cardio.atividade}</h4>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <p className="text-xs text-gray-400">Duração</p>
                        <p className="font-bold text-[#00C897]">{workout.cardio.duracao}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Calorias</p>
                        <div className="flex items-center gap-1">
                          <Flame className="w-4 h-4 text-orange-500" />
                          <p className="font-bold text-orange-500">{workout.cardio.calorias}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-2 mb-3">
                      <p className="text-xs text-gray-400">Intensidade</p>
                      <p className="text-sm text-white">{workout.cardio.intensidade}</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/30 rounded-lg p-3">
                    <p className="text-xs font-bold text-red-400 mb-2">Benefícios do Cardio:</p>
                    <ul className="space-y-1">
                      {workout.cardio.beneficios.map((beneficio, idx) => (
                        <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                          <span className="text-red-400 mt-0.5">•</span>
                          <span>{beneficio}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Alongamento */}
            <div className="border border-gray-800 rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleSection('alongamento')}
                className="w-full p-4 flex items-center justify-between bg-gray-800/50 hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <h3 className="font-bold text-white">Alongamento Final</h3>
                  <span className="text-xs text-gray-400">({workout.alongamento.duracao})</span>
                </div>
                {expandedSections.alongamento ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {expandedSections.alongamento && (
                <div className="p-4 bg-gray-900/30">
                  <p className="text-sm text-gray-300 mb-3">Foque nos seguintes grupos musculares:</p>
                  <ul className="space-y-2">
                    {workout.alongamento.foco.map((area, idx) => (
                      <li key={idx} className="text-sm text-gray-300 flex items-start gap-2 bg-gray-800/50 rounded-lg p-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Resumo Final */}
            <div className="bg-gradient-to-r from-[#00C897]/10 to-transparent border border-[#00C897]/30 rounded-xl p-4">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#00C897]" />
                Resumo do Treino
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                  <Clock className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-400">Tempo Total</p>
                  <p className="font-bold text-white">{workout.tempoTotal}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                  <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-400">Calorias</p>
                  <p className="font-bold text-orange-500">{workout.caloriasTotal}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                  <Dumbbell className="w-5 h-5 text-[#00C897] mx-auto mb-1" />
                  <p className="text-xs text-gray-400">Exercícios</p>
                  <p className="font-bold text-[#00C897]">{workout.exercicios.length}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                  <Target className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-400">Grupo</p>
                  <p className="font-bold text-white text-xs">{workout.grupo}</p>
                </div>
              </div>
            </div>

            {/* Dicas */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <Play className="w-5 h-5 text-[#00C897]" />
                Dicas Importantes
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#00C897] mt-1">•</span>
                  <span>Cada exercício tem 2 opções - escolha a que preferir ou alterne entre elas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00C897] mt-1">•</span>
                  <span>Mantenha boa forma em todos os exercícios - qualidade sobre quantidade</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00C897] mt-1">•</span>
                  <span>Hidrate-se durante todo o treino</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00C897] mt-1">•</span>
                  <span>Respeite os tempos de descanso para melhor recuperação</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00C897] mt-1">•</span>
                  <span>Não pule o aquecimento e alongamento - são essenciais para prevenir lesões</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 bg-gray-900/95 backdrop-blur-sm">
          <p className="text-xs text-center text-gray-400">
            Treino personalizado para {userData.nome} • Nível: {userData.nivelTreino} • Revisado por educadores físicos certificados da NutriX
          </p>
        </div>
      </div>
    </div>
  );
}
