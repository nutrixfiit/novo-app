import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { image, userDescription } = await request.json();

    // Validar se tem imagem ou descrição
    if (!image && !userDescription) {
      return NextResponse.json(
        { error: 'É necessário fornecer uma imagem ou descrição do alimento' },
        { status: 400 }
      );
    }

    // Preparar prompt para a IA
    let prompt = '';
    
    if (userDescription) {
      prompt = `Analise o seguinte alimento e forneça informações nutricionais detalhadas:

"${userDescription}"

Forneça a resposta em formato JSON com os seguintes campos:
{
  "foodName": "Nome do alimento identificado",
  "confidence": número de 0-100 indicando confiança na identificação,
  "calories": calorias totais (número),
  "protein": proteína em gramas (número),
  "carbs": carboidratos em gramas (número),
  "fat": gordura em gramas (número),
  "fiber": fibras em gramas (número),
  "sodium": sódio em miligramas (número),
  "servingSize": "descrição da porção estimada",
  "detailedDescription": "descrição detalhada dos ingredientes identificados"
}

Seja preciso e baseie-se em dados nutricionais reais. Se a quantidade não foi especificada, assuma uma porção padrão.`;
    } else {
      prompt = `Analise esta imagem de alimento e forneça informações nutricionais detalhadas.

Identifique:
1. Todos os alimentos visíveis no prato
2. Estimativa de quantidade/porção de cada item
3. Valores nutricionais totais da refeição

Forneça a resposta em formato JSON com os seguintes campos:
{
  "foodName": "Nome descritivo da refeição completa",
  "confidence": número de 0-100 indicando confiança na identificação,
  "calories": calorias totais estimadas (número),
  "protein": proteína total em gramas (número),
  "carbs": carboidratos totais em gramas (número),
  "fat": gordura total em gramas (número),
  "fiber": fibras totais em gramas (número),
  "sodium": sódio total em miligramas (número),
  "servingSize": "descrição da porção estimada",
  "detailedDescription": "descrição detalhada de todos os ingredientes identificados"
}

Seja preciso e baseie-se em dados nutricionais reais de tabelas TACO/USDA.`;
    }

    // Chamar OpenAI Vision API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: image 
              ? [
                  { type: 'text', text: prompt },
                  { type: 'image_url', image_url: { url: image } }
                ]
              : prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.3,
      }),
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json();
      console.error('Erro OpenAI:', errorData);
      throw new Error('Erro ao processar com OpenAI');
    }

    const openaiData = await openaiResponse.json();
    const aiResponse = openaiData.choices[0].message.content;

    // Extrair JSON da resposta
    let nutritionData;
    try {
      // Tentar extrair JSON da resposta (pode vir com markdown)
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        nutritionData = JSON.parse(jsonMatch[0]);
      } else {
        nutritionData = JSON.parse(aiResponse);
      }
    } catch (parseError) {
      console.error('Erro ao parsear resposta da IA:', aiResponse);
      throw new Error('Erro ao processar resposta da IA');
    }

    // Validar e garantir que todos os campos numéricos são números
    const validatedData = {
      foodName: nutritionData.foodName || 'Alimento não identificado',
      confidence: Math.min(100, Math.max(0, Number(nutritionData.confidence) || 75)),
      calories: Math.round(Number(nutritionData.calories) || 0),
      protein: Math.round(Number(nutritionData.protein) || 0),
      carbs: Math.round(Number(nutritionData.carbs) || 0),
      fat: Math.round(Number(nutritionData.fat) || 0),
      fiber: Math.round(Number(nutritionData.fiber) || 0),
      sodium: Math.round(Number(nutritionData.sodium) || 0),
      servingSize: nutritionData.servingSize || 'Porção estimada',
      detailedDescription: nutritionData.detailedDescription || ''
    };

    return NextResponse.json(validatedData);

  } catch (error) {
    console.error('Erro na análise de alimento:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao analisar alimento. Tente novamente ou descreva manualmente.',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}
