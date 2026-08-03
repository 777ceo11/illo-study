import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { currentQuestion, userKorean } = await request.json();

    if (!currentQuestion || !userKorean) {
      return NextResponse.json({ error: 'Missing currentQuestion or userKorean' }, { status: 400 });
    }

    const apiKey = process.env.INU_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'INU_API_KEY is not configured' }, { status: 500 });
    }

    const response = await fetch(
      'https://factchat-cloud.mindlogic.ai/v1/gateway/chat/completions/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          messages: [
            {
              role: 'system',
              content: "당신은 영어 스피킹 스터디의 S.O.S 헬퍼입니다. 사용자가 한국어를 입력하면 반드시 다음 JSON 구조로만 답변하세요: { 'pattern': '뼈대 문장(빈칸 포함)', 'vocabHints': ['단어 힌트 배열'], 'modelAnswer': '모범 답안', 'cheatKey': 'OPIc 고득점 표현 설명' }",
            },
            {
              role: 'user',
              content: `현재 대화 주제: ${currentQuestion}\n말하고 싶은 한국어: ${userKorean}`,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: `Mindlogic API error: ${errorText}` }, { status: response.status });
    }

    const data = await response.json();
    const rawText = data.choices?.[0]?.message?.content;
    console.log('RAW_TEXT:', rawText);

    if (!rawText) {
      return NextResponse.json({ error: 'Empty response from Mindlogic API' }, { status: 500 });
    }

    let jsonText = rawText.trim();
    const match = jsonText.match(/\{[\s\S]*\}/);
    if (match) {
      jsonText = match[0];
    } else {
      return NextResponse.json({ error: 'No JSON object found in response' }, { status: 500 });
    }

    const jsonResult = JSON.parse(jsonText);
    return NextResponse.json(jsonResult);
  } catch (error) {
    console.error('Error in hint API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
