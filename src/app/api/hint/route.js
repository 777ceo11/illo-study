import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { currentQuestion, userKorean } = await request.json();

    if (!currentQuestion || !userKorean) {
      return NextResponse.json({ error: 'Missing currentQuestion or userKorean' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not configured' }, { status: 500 });
    }

    const prompt = `You are an expert English tutor helping a student prepare for OPIc or general English conversation.
The user is answering the following English question:
Question: "${currentQuestion}"

The user wants to express the following Korean sentence in English:
Korean sentence: "${userKorean}"

Provide hints and a model answer. You must respond with a JSON object that strictly adheres to the following format:
{
  "pattern": "주어와 동사 위주의 뼈대 문장 (영어 빈칸은 괄호 안에 숫자를 넣어 표시할 것. 예: I just stayed ( 1 ) and ( 2 ).)",
  "vocabHints": ["빈칸 번호로 시작하고 단어의 맨 앞글자와 맨 뒷글자만 공개하고 중간 글자는 언더바로 대체한 힌트 배열 (예: '1. 집에서: h _ _ e (집 안에 머물다)', '2. 쉬다: r _ _ t (휴식을 취하다)')"],
  "modelAnswer": "사용자가 말하고자 한 한국어의 완벽하고 자연스러운 영어 모범 답안. 단, vocabHints에 나온 단어들(또는 변형된 어형)은 반드시 앞뒤에 '**'를 붙여 강조 표시할 것. (예: I just stayed **home** and **rested**.)",
  "cheatKey": "모범 답안에 사용된 OPIc 고득점용 치트키 단어/표현에 대한 설명 (예: 'hang out: 친한 사람과 시간을 보내다. play 대신 쓰세요!')"
}

Make sure the response is a valid JSON object. Do not include markdown formatting like \`\`\`json in your response, just return the raw JSON object.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: `Gemini API error: ${errorText}` }, { status: response.status });
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return NextResponse.json({ error: 'Empty response from Gemini API' }, { status: 500 });
    }

    const jsonResult = JSON.parse(rawText.trim());
    return NextResponse.json(jsonResult);
  } catch (error) {
    console.error('Error in hint API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
