'use client';

import { useState, useEffect } from 'react';

// 45개 전체 질문 데이터베이스
const questionDB = [
  // --- 난이도 하 (Low) ---
  { id: 1, level: '하', q: "What is your favorite convenience store food or snack when you are hungry on campus?", vocab: "convenience store (편의점), snack (간식), on campus (캠퍼스에서)", ans: "I usually grab a triangular kimbap and a cup noodle because it is quick and cheap.", trans: "캠퍼스에서 배가 고플 때 가장 좋아하는 편의점 음식이나 간식은 무엇인가요?" },
  { id: 2, level: '하', q: "Do you like mint chocolate? Why or why not?", vocab: "mint chocolate (민트초코), refreshing (상쾌한), toothpaste (치약)", ans: "I love mint chocolate because the refreshing taste relieves my stress.", trans: "민트초코를 좋아하시나요? 그 이유는 무엇인가요?" },
  { id: 3, level: '하', q: "Do you prefer studying at home or at a cafe near campus, like in Songdo?", vocab: "concentrate (집중하다), white noise (백색소음), distraction (방해요소)", ans: "I prefer studying at a cafe because the white noise helps me concentrate better.", trans: "집에서 공부하는 것과 송도 같은 캠퍼스 근처 카페에서 공부하는 것 중 어느 쪽을 선호하시나요?" },
  { id: 4, level: '하', q: "What is your go-to outfit when you go to university?", vocab: "go-to outfit (즐겨 입는 옷), comfortable (편안한), hoodie (후드티)", ans: "My go-to outfit is just a comfortable hoodie and sweatpants. I hate wearing tight clothes.", trans: "대학에 갈 때 가장 즐겨 입는 옷차림은 무엇인가요?" },
  { id: 5, level: '하', q: "Are you a planner (J) or a spontaneous person (P) when you travel?", vocab: "planner (계획적인 사람), spontaneous (즉흥적인), itinerary (여행 일정)", ans: "I am definitely a spontaneous person. I just book a ticket and figure things out later.", trans: "여행할 때 당신은 계획적인 사람(J)인가요, 아니면 즉흥적인 사람(P)인가요?" },
  { id: 6, level: '하', q: "What is one app on your smartphone that you cannot live without?", vocab: "cannot live without (없이는 살 수 없는), rely on (의존하다), navigation (내비게이션)", ans: "I cannot live without KakaoMap because I have a terrible sense of direction.", trans: "스마트폰에서 당신이 없이는 살 수 없는 앱 하나는 무엇인가요?" },
  { id: 7, level: '하', q: "Do you like taking photos of yourself, or do you prefer taking pictures of scenery?", vocab: "scenery (풍경), awkward (어색한), capture (포착하다)", ans: "I prefer taking pictures of scenery because I feel awkward when posing for the camera.", trans: "자신의 사진을 찍는 것을 좋아하나요, 아니면 풍경 사진 찍는 것을 더 선호하나요?" },
  { id: 8, level: '하', q: "What is your favorite way to spend a Friday night after a long week?", vocab: "exhausted (기진맥진한), chill (느긋하게 쉬다), gather (모이다)", ans: "I love gathering with my friends and grabbing some beers to chill.", trans: "긴 한 주를 보낸 후 금요일 밤을 보내는 가장 좋아하는 방법은 무엇인가요?" },
  { id: 9, level: '하', q: "Do you prefer sweet snacks like cake, or savory snacks like potato chips?", vocab: "savory (짭짤한), dessert (디저트), crave (갈망하다)", ans: "I prefer savory snacks like potato chips. Sweet things make me thirsty.", trans: "케이크 같은 단 간식과 감자칩 같은 짭짤한 간식 중 어느 것을 더 선호하시나요?" },
  { id: 10, level: '하', q: "Do you prefer working out alone at the gym, or playing team sports?", vocab: "work out (운동하다), team sports (팀 스포츠), pace (페이스, 속도)", ans: "I prefer working out alone at the gym because I can control my own pace.", trans: "헬스장에서 혼자 운동하는 것과 팀 스포츠를 하는 것 중 어느 쪽을 선호하시나요?" },
  { id: 11, level: '하', q: "Delivery food vs. Cooking at home. Which one do you prefer and why?", vocab: "delivery food (배달 음식), convenient (편리한), clean up (치우다)", ans: "I prefer delivery food because I don't want to clean up the kitchen after cooking.", trans: "배달 음식 대 집에서 요리하기. 어느 것을 더 선호하며 그 이유는 무엇인가요?" },
  { id: 12, level: '하', q: "What is your favorite place to hang out with your friends near your university?", vocab: "hang out (어울려 놀다), affordable (가격이 알맞은), lively (활기찬)", ans: "I like going to a local pub near the university because it has a lively atmosphere and affordable drinks.", trans: "대학 근처에서 친구들과 어울려 놀기 가장 좋아하는 장소는 어디인가요?" },
  { id: 13, level: '하', q: "Do you have a favorite quote, motto, or a life rule?", vocab: "quote (명언), motto (좌우명), give up (포기하다)", ans: "My motto is 'Just do it.' It helps me start things without worrying too much.", trans: "가장 좋아하는 명언, 좌우명 혹은 삶의 규칙이 있나요?" },
  { id: 14, level: '하', q: "Describe your perfect day off with no plans or obligations.", vocab: "day off (쉬는 날), obligation (의무), sleep in (늦잠 자다)", ans: "My perfect day off is sleeping in until noon, ordering pizza, and playing video games all day.", trans: "계획이나 의무가 없는 완벽한 쉬는 날을 묘사해 주세요." },
  { id: 15, level: '하', q: "What kind of part-time job would you never want to do?", vocab: "part-time job (아르바이트), physical labor (육체 노동), demanding (힘든, 요구가 많은)", ans: "I would never want to do a serving job at a busy restaurant because dealing with angry customers is too stressful.", trans: "절대 하고 싶지 않은 종류의 아르바이트는 무엇인가요?" },

  // --- 난이도 중 (Medium) ---
  { id: 16, level: '중', q: "What do you think makes a good English study group or community?", vocab: "community (커뮤니티), participation (참여), supportive (도움을 주는)", ans: "I think a supportive atmosphere where people are not afraid to make mistakes is the most important.", trans: "좋은 영어 스터디 그룹이나 커뮤니티를 만드는 요소는 무엇이라고 생각하나요?" },
  { id: 17, level: '중', q: "Building a startup with a risky idea vs. Joining a large corporation for stability. Which path do you prefer?", vocab: "stability (안정성), risky (위험한), challenge (도전)", ans: "I prefer building a startup because I want to challenge myself and create my own service.", trans: "위험을 감수하고 스타트업 창업하기 vs 안정적인 대기업 입사하기. 어느 진로를 선호하시나요?" },
  { id: 18, level: '중', q: "If you could create any app or website using AI, what kind of service would it be?", vocab: "recommendation (추천), automate (자동화하다), user-friendly (사용자 친화적인)", ans: "I would create an app that recommends daily outfits based on the real-time weather.", trans: "AI를 활용해 앱이나 웹사이트를 만들 수 있다면, 어떤 종류의 서비스를 만들고 싶나요?" },
  { id: 19, level: '중', q: "What is your opinion on university students investing in stocks or cryptocurrency?", vocab: "invest (투자하다), cryptocurrency (암호화폐), financial literacy (금융 지식)", ans: "I think it is a good way to learn about the economy and build financial literacy early.", trans: "대학생들이 주식이나 암호화폐에 투자하는 것에 대해 어떻게 생각하시나요?" },
  { id: 20, level: '중', q: "How do you feel about personality tests like MBTI? Do you think they accurately represent a person?", vocab: "personality test (성격 테스트), accurate (정확한), categorize (분류하다)", ans: "They are fun for breaking the ice, but we shouldn't categorize people completely based on them.", trans: "MBTI 같은 성격 테스트에 대해 어떻게 생각하나요? 사람을 정확히 나타낸다고 보나요?" },
  { id: 21, level: '중', q: "What is the most important trait of a good leader or project manager in a team?", vocab: "trait (특성), empathy (공감), clear communication (명확한 소통)", ans: "Clear communication is the most important trait to ensure everyone is on the same page.", trans: "팀에서 좋은 리더나 프로젝트 매니저가 가져야 할 가장 중요한 특성은 무엇인가요?" },
  { id: 22, level: '중', q: "How do you balance your personal relationships (like dating) with your busy university schedule?", vocab: "balance (균형을 맞추다), schedule (일정), prioritize (우선순위를 매기다)", ans: "I try to prioritize my time and use digital planners to make sure I don't neglect either of them.", trans: "바쁜 대학 일정과 개인적인 관계(연애 등) 사이의 균형을 어떻게 맞추시나요?" },
  { id: 23, level: '중', q: "Should university classes focus more on practical skills for jobs or theoretical academic knowledge?", vocab: "practical skills (실용적인 기술), theoretical (이론적인), job market (취업 시장)", ans: "I believe universities should focus on practical skills because the job market requires hands-on experience.", trans: "대학 수업은 취업을 위한 실무 기술에 더 중점을 두어야 할까요, 아니면 이론적 학문 지식에 두어야 할까요?" },
  { id: 24, level: '중', q: "What is your opinion on the used car market? Do you think it is trustworthy for young buyers?", vocab: "trustworthy (신뢰할 수 있는), inspection (검사), transparent (투명한)", ans: "It can be risky for beginners, so we need more transparent platforms that provide automated inspection reports.", trans: "중고차 시장에 대한 당신의 의견은 무엇인가요? 젊은 구매자들이 신뢰할 수 있다고 생각하나요?" },
  { id: 25, level: '중', q: "Do you think social media (Instagram, YouTube) has a positive or negative impact on our generation?", vocab: "impact (영향), comparison (비교), connection (연결)", ans: "It has a negative impact because it makes people constantly compare their lives to others.", trans: "소셜 미디어(인스타그램, 유튜브 등)가 우리 세대에 긍정적인 영향을 미친다고 생각하나요, 부정적인 영향을 미친다고 생각하나요?" },
  { id: 26, level: '중', q: "How do you usually overcome a creative block or a lack of motivation when working on a project?", vocab: "creative block (창작의 벽), overcome (극복하다), step back (한 걸음 물러서다)", ans: "I step back from the project, take a walk outside, and listen to some music to refresh my brain.", trans: "프로젝트를 할 때 창의력이 막히거나 동기가 부족할 때 보통 어떻게 극복하시나요?" },
  { id: 27, level: '중', q: "Would you rather have a high-paying job that you hate, or a low-paying job that you love?", vocab: "high-paying (고수익의), passion (열정), endure (견디다)", ans: "I would choose a high-paying job. I can endure the stress and use the money for my hobbies.", trans: "싫어하지만 급여가 높은 직장과, 급여는 낮지만 사랑하는 직장 중 어느 쪽을 택하겠습니까?" },
  { id: 28, level: '중', q: "What is the biggest difference between a freshman and a senior in university?", vocab: "freshman (신입생), senior (4학년), anxiety (불안감)", ans: "Freshmen have a lot of freedom and excitement, while seniors have a lot of anxiety about getting a job.", trans: "대학교 1학년(신입생)과 4학년(졸업반)의 가장 큰 차이점은 무엇이라고 생각하나요?" },
  { id: 29, level: '중', q: "Have you ever tried coding, analyzing data, or making a website? How was the experience?", vocab: "analyze (분석하다), logical (논리적인), sense of achievement (성취감)", ans: "Yes, I tried making a simple website. Finding errors was frustrating, but fixing them gave me a huge sense of achievement.", trans: "코딩, 데이터 분석, 또는 웹사이트 만들기를 시도해 본 적이 있나요? 경험이 어땠나요?" },
  { id: 30, level: '중', q: "How important is Corporate Social Responsibility (CSR) to you when you choose to buy a product?", vocab: "Corporate Social Responsibility (기업의 사회적 책임), ethical (윤리적인), boycott (불매 운동하다)", ans: "It is very important. I try not to buy products from companies that treat their workers badly or harm the environment.", trans: "제품을 구매할 때 기업의 사회적 책임(CSR)이 당신에게 얼마나 중요한가요?" },

  // --- 난이도 상 (High) ---
  { id: 31, level: '상', q: "Can AI-generated images or music be considered real 'art'? Why or why not?", vocab: "AI-generated (AI가 생성한), authentic (진정성 있는), prompt (프롬프트, 명령어)", ans: "I think it is a new form of art. The human's prompt and intention are still the core of the creation.", trans: "AI가 생성한 이미지나 음악을 진짜 '예술'로 볼 수 있을까요? 그 이유는 무엇인가요?" },
  { id: 32, level: '상', q: "With the rise of subscription models (Netflix, software), we own fewer things. What are the pros and cons of this 'subscription economy'?", vocab: "subscription economy (구독 경제), ownership (소유권), flexible (유연한)", ans: "The pro is flexibility and lower initial costs, but the con is that you never actually own the product.", trans: "구독 모델의 증가로 우리는 물건을 덜 소유하게 되었습니다. 이러한 '구독 경제'의 장단점은 무엇인가요?" },
  { id: 33, level: '상', q: "Do you believe that companies 'Creating Shared Value (CSV)' is truly possible without sacrificing their profit?", vocab: "Creating Shared Value (공유가치창출), sacrifice (희생하다), sustainable (지속 가능한)", ans: "Yes, if a company solves social problems through its core business, it can create a sustainable profit model.", trans: "기업이 이윤을 희생하지 않고 '공유 가치 창출(CSV)'을 하는 것이 진정으로 가능하다고 믿나요?" },
  { id: 34, level: '상', q: "What impact do you think mandatory military service has on a young person's career or mindset?", vocab: "mandatory (의무적인), mindset (사고방식), interrupt (중단시키다)", ans: "It interrupts their academic career, but it also teaches patience and how to work in a strict hierarchy.", trans: "의무적인 군 복무가 청년의 커리어나 사고방식에 어떤 영향을 미친다고 생각하나요?" },
  { id: 35, level: '상', q: "The gig economy (freelancing, platform labor) is growing rapidly. Is this a step forward for freedom or a step backward for job security?", vocab: "gig economy (긱 경제, 임시직 경제), job security (직업 안정성), freelance (프리랜서로 일하다)", ans: "It is a double-edged sword. It offers great freedom, but lacks basic labor protections and job security.", trans: "플랫폼 노동 등 긱 경제가 급성장하고 있습니다. 이것은 자유를 위한 진일보인가요, 아니면 직업 안정성을 해치는 퇴보인가요?" },
  { id: 36, level: '상', q: "How will the definition of 'education' change in the era of advanced Large Language Models (LLMs)?", vocab: "definition (정의), memorize (암기하다), critical thinking (비판적 사고)", ans: "Education will shift from memorizing facts to learning how to ask the right questions and verify AI's answers.", trans: "고도화된 대형 언어 모델(LLMs) 시대에 '교육'의 정의는 어떻게 바뀔까요?" },
  { id: 37, level: '상', q: "As automated AI systems replace human inspections (e.g., in car sales or factories), who should be responsible if a fatal mistake occurs?", vocab: "inspection (검사, 점검), responsible (책임이 있는), fatal (치명적인)", ans: "The company that developed and deployed the AI should bear the primary responsibility for the system's failure.", trans: "AI 자동화 시스템이 인간의 점검(예: 중고차 검수나 공장)을 대체할 때, 치명적인 실수가 발생하면 누구에게 책임이 있을까요?" },
  { id: 38, level: '상', q: "What do you think is the most effective way to solve the housing or real estate problem for the younger generation?", vocab: "real estate (부동산), policy (정책), affordable (감당할 수 있는 가격의)", ans: "The government should supply more affordable public housing specifically designed for single young adults.", trans: "청년층의 주거 및 부동산 문제를 해결하는 가장 효과적인 방법은 무엇이라고 생각하나요?" },
  { id: 39, level: '상', q: "Do you think technical chart analysis for stocks and crypto is a reliable science, or just human psychology?", vocab: "technical analysis (기술적 분석), reliable (신뢰할 수 있는), psychology (심리)", ans: "I think it reflects human psychology. Patterns appear because many investors react to the same fears and greed.", trans: "주식이나 암호화폐에 대한 기술적 차트 분석이 신뢰할 수 있는 과학이라고 보나요, 아니면 단순한 인간 심리라고 보나요?" },
  { id: 40, level: '상', q: "Should the government strictly regulate the development of AI to prevent potential ethical issues?", vocab: "regulate (규제하다), ethical (윤리적인), innovation (혁신)", ans: "Regulation is necessary for safety, but it shouldn't be so strict that it kills technological innovation.", trans: "잠재적인 윤리 문제를 막기 위해 정부가 AI 개발을 엄격하게 규제해야 할까요?" },
  { id: 41, level: '상', q: "What role does 'data privacy' play when we use highly personalized apps or financial analysis tools?", vocab: "data privacy (데이터 프라이버시), sensitive (민감한), trade-off (타협, 거래)", ans: "It's a trade-off. We give up some privacy for convenience, but companies must be transparent about how they use our data.", trans: "우리가 고도로 개인화된 앱이나 금융 분석 도구를 사용할 때 '데이터 프라이버시'는 어떤 역할을 하나요?" },
  { id: 42, level: '상', q: "Is a traditional university degree still a guarantee of success in the modern tech-driven world?", vocab: "guarantee (보장하다), traditional (전통적인), portfolio (포트폴리오)", ans: "No, a degree is no longer a guarantee. Practical portfolios and adaptability are much more valued now.", trans: "현대 기술 중심의 세계에서 전통적인 대학 학위가 여전히 성공을 보장한다고 생각하나요?" },
  { id: 43, level: '상', q: "How should a business balance rapid technological innovation with corporate ethical considerations?", vocab: "balance (균형을 맞추다), consideration (고려 사항), guideline (지침)", ans: "Businesses should establish an internal ethics committee to review new technologies before they are launched.", trans: "기업은 급격한 기술 혁신과 윤리적 고려 사항 사이의 균형을 어떻게 맞춰야 할까요?" },
  { id: 44, level: '상', q: "Do you think globalization is currently reversing (deglobalization), and how will it affect international business?", vocab: "globalization (세계화), reverse (뒤집다, 반전되다), supply chain (공급망)", ans: "Yes, many countries are prioritizing their own industries. This will force companies to rebuild local supply chains.", trans: "현재 세계화가 역행(탈세계화)하고 있다고 생각하나요? 이것이 국제 비즈니스에 어떤 영향을 미칠까요?" },
  { id: 45, level: '상', q: "Do you think humanity will eventually lose its unique creativity to artificial intelligence?", vocab: "humanity (인류), unique (고유한), collaborate (협력하다)", ans: "No, AI is just a tool. True creativity comes from human experiences and emotions, which AI cannot feel.", trans: "인류가 결국 인공지능에게 고유한 창의성을 빼앗길 것이라고 생각하나요?" }
];

// 단일 카드 컴포넌트
const QuestionCard = ({ data, isAnswered, onToggle }) => {
  const [showKo, setShowKo] = useState(false);
  const [userKorean, setUserKorean] = useState('');
  const [loading, setLoading] = useState(false);
  const [hintData, setHintData] = useState(null);
  const [showFullAnswer, setShowFullAnswer] = useState(false);
  const [error, setError] = useState('');

  const handleRequestHelp = async (e) => {
    e.preventDefault();
    if (!userKorean.trim()) return;

    setLoading(true);
    setError('');
    setHintData(null);
    setShowFullAnswer(false);

    try {
      const response = await fetch('/api/hint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentQuestion: data.q,
          userKorean: userKorean,
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const resData = await response.json();
      if (resData.error) {
        throw new Error(resData.error);
      }

      setHintData(resData);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error occurred while loading hints.');
    } finally {
      setLoading(false);
    }
  };

  const renderBoldText = (text) => {
    if (!text) return '';
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-extrabold text-rose-600 underline">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border p-5 mb-4 transition-all duration-300 ${isAnswered ? 'border-blue-400 bg-blue-50/40' : 'border-gray-200'}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            data.level === '하' ? 'bg-green-100 text-green-700' :
            data.level === '중' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            난이도: {data.level}
          </span>
          <span className="text-gray-400 text-sm"># {data.id}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-gray-600 cursor-pointer" htmlFor={`check-${data.id}`}>
            {isAnswered ? '답변 완료' : '미완료'}
          </label>
          <input 
            type="checkbox" 
            id={`check-${data.id}`}
            className="w-5 h-5 cursor-pointer accent-blue-600"
            checked={isAnswered}
            onChange={() => onToggle(data.id)}
          />
        </div>
      </div>
      
      <p className="text-lg font-semibold text-gray-800 mb-4">{data.q}</p>
      
      <div className="bg-blue-50/80 rounded-lg p-3 mb-3 text-sm text-blue-900 border border-blue-100">
        <p className="font-bold mb-1">💡 Vocabulary</p>
        <p>{data.vocab}</p>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm text-gray-700 border border-gray-100">
        <p className="font-bold mb-1">🗣️ Sample Answer</p>
        <p>{data.ans}</p>
      </div>

      <button 
        onClick={() => setShowKo(!showKo)}
        className="w-full py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors mb-3"
      >
        {showKo ? '한국어 해설 닫기' : '한국어 해설 보기'}
      </button>
      
      {showKo && (
        <div className="p-3 bg-gray-800 text-white rounded-lg text-sm leading-relaxed mb-3">
          {data.trans}
        </div>
      )}

      {/* S.O.S English Helper */}
      <div className="border-t border-dashed border-gray-200 pt-4 mt-1">
        <div className="flex items-center gap-2 mb-2 text-rose-600 font-bold text-sm">
          <span>🚨</span> S.O.S English Helper
        </div>
        <form onSubmit={handleRequestHelp} className="flex gap-2">
          <input
            type="text"
            value={userKorean}
            onChange={(e) => setUserKorean(e.target.value)}
            placeholder="Need help? Just type the Korean sentence you want to say in English."
            className="flex-grow min-w-0 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 placeholder-gray-400 text-gray-800"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !userKorean.trim()}
            className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition disabled:opacity-50 flex-shrink-0"
          >
            {loading ? 'Hold on...' : 'S.O.S'}
          </button>
        </form>

        {loading && (
          <div className="mt-3 p-3 bg-rose-50 text-rose-700 rounded-lg text-sm flex items-center justify-center gap-2">
            <span className="animate-spin">🌀</span> Hold on... AI is preparing your hints!
          </div>
        )}

        {error && (
          <div className="mt-3 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
            ⚠️ {error}
          </div>
        )}

        {hintData && (
          <div className="mt-3 bg-rose-50/50 border border-rose-100 rounded-lg p-3 text-sm">
            <div className="mb-2">
              <span className="font-bold text-rose-900 block mb-1">🔍 Pattern Frame</span>
              <p className="bg-white px-2 py-1.5 rounded border border-rose-100 text-gray-850 font-mono">{hintData.pattern}</p>
            </div>
            
            {hintData.vocabHints && hintData.vocabHints.length > 0 && (
              <div className="mb-3">
                <span className="font-bold text-rose-900 block mb-1">💡 Word Hints</span>
                <ul className="list-disc pl-4 space-y-1 text-gray-700">
                  {hintData.vocabHints.map((hint, idx) => (
                    <li key={idx}>{hint}</li>
                  ))}
                </ul>
              </div>
            )}

            {!showFullAnswer ? (
              <button
                type="button"
                onClick={() => setShowFullAnswer(true)}
                className="w-full py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-semibold text-xs transition active:scale-95 shadow-sm"
              >
                🔥 Need MORE (모범 답안 & 치트키 확인하기)
              </button>
            ) : (
              <div className="mt-3 border-t border-rose-200/60 pt-3 space-y-3">
                <div>
                  <span className="font-bold text-rose-900 block mb-1">🎯 Model Answer</span>
                  <p className="bg-rose-100/50 p-2 rounded text-rose-900 font-semibold">{renderBoldText(hintData.modelAnswer)}</p>
                </div>
                {hintData.cheatKey && (
                  <div>
                    <span className="font-bold text-amber-700 block mb-1">🔑 OPIc Cheat Key</span>
                    <p className="bg-amber-50 border border-amber-100 p-2 rounded text-amber-900 text-xs">{hintData.cheatKey}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// 메인 앱 컴포넌트
export default function Home() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedLevel, setSelectedLevel] = useState('전체');
  const [randomQuestion, setRandomQuestion] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [answeredIds, setAnsweredIds] = useState([]);

  // 하이드레이션 오류 방지를 위한 useEffect 내 로컬스토리지 호출
  useEffect(() => {
    const saved = localStorage.getItem('study_progress');
    if (saved) setAnsweredIds(JSON.parse(saved));
  }, []);

  const toggleAnswer = (id) => {
    const updated = answeredIds.includes(id)
      ? answeredIds.filter(item => item !== id)
      : [...answeredIds, id];
    setAnsweredIds(updated);
    localStorage.setItem('study_progress', JSON.stringify(updated));
  };

  const pickRandom = (level) => {
    let filtered = questionDB;
    if (level !== '전체') {
      filtered = questionDB.filter(q => q.level === level);
    }
    
    // 답변 완료된 질문 제외 (모두 완료된 경우 전체 질문에서 선택)
    let candidates = filtered.filter(q => !answeredIds.includes(q.id));
    if (candidates.length === 0) {
      candidates = filtered;
    }
    
    setSelectedLevel(level);
    setCurrentView('random');
    setIsSpinning(true);

    let spinCount = 0;
    const maxSpins = 12;
    
    const spinInterval = setInterval(() => {
      const tempIndex = Math.floor(Math.random() * candidates.length);
      setRandomQuestion(candidates[tempIndex]);
      spinCount++;

      if (spinCount >= maxSpins) {
        clearInterval(spinInterval);
        const finalIndex = Math.floor(Math.random() * candidates.length);
        setRandomQuestion(candidates[finalIndex]);
        setIsSpinning(false);
      }
    }, 100); 
  };

  const viewList = (level) => {
    setSelectedLevel(level);
    setCurrentView('list');
  };

  const goHome = () => {
    setCurrentView('home');
    setRandomQuestion(null);
  };

  const getList = () => {
    if (selectedLevel === '전체') return questionDB;
    return questionDB.filter(q => q.level === selectedLevel);
  };

  const resetProgress = () => {
    if(window.confirm('모든 답변 기록을 초기화하시겠습니까?')) {
      setAnsweredIds([]);
      localStorage.setItem('study_progress', JSON.stringify([]));
    }
  };

  return (
    <div className="h-[100dvh] w-full flex flex-col bg-gray-50 overflow-hidden">
      
      {/* 상단 헤더 */}
      <header className="bg-blue-600 text-white py-1 px-4 shadow-md z-30 flex-shrink-0 w-full">
        <div className="max-w-2xl mx-auto w-full grid grid-cols-3 items-center">
          {/* 좌측: 타이틀 */}
          <div className="cursor-pointer justify-self-start" onClick={goHome}>
            <h1 className="text-lg font-bold tracking-wider leading-none">ILLO STUDY</h1>
            <p className="text-blue-100 text-[10px] mt-0.5">Speed Networking</p>
          </div>
          
          {/* 중앙: 이미지 */}
          <div className="justify-self-center flex items-center h-14">
            <img src="/logo.png" alt="Pepe Logo" className="h-16 w-auto object-contain cursor-pointer transition transform hover:scale-105 active:scale-95" onClick={goHome} />
          </div>

          {/* 우측: 홈 버튼 */}
          <div className="justify-self-end">
            {currentView !== 'home' && (
              <button onClick={goHome} className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1.5 rounded-lg font-semibold text-xs flex items-center gap-1 transition">
                🏠 Home
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 본문 영역 */}
      <main className="flex-1 p-4 sm:p-6 overflow-y-auto w-full">
        <div className="max-w-2xl mx-auto pb-12">
          
          {/* 메인 홈 화면 */}
          {currentView === 'home' && (
            <div className="flex flex-col space-y-6">
              
              {/* 대시보드 */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 text-center relative">
                <h3 className="text-gray-500 text-sm font-semibold mb-2">오늘의 답변 현황</h3>
                <div className="text-3xl font-bold text-blue-600">
                  {answeredIds.length} <span className="text-xl text-gray-400">/ {questionDB.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                  <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${(answeredIds.length / questionDB.length) * 100}%` }}></div>
                </div>
                <button onClick={resetProgress} className="text-xs text-gray-400 mt-3 underline hover:text-gray-600">
                  기록 초기화
                </button>
              </div>

              {/* 슬롯머신 */}
              <div>
                <div className="text-center mb-3">
                  <h2 className="text-xl font-bold text-gray-800">질문 슬롯머신 🎰</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button onClick={() => pickRandom('하')} className="py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold shadow-sm transition-transform active:scale-95">
                    난이도 하 (Low) 랜덤
                  </button>
                  <button onClick={() => pickRandom('중')} className="py-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-semibold shadow-sm transition-transform active:scale-95">
                    난이도 중 (Medium) 랜덤
                  </button>
                  <button onClick={() => pickRandom('상')} className="py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold shadow-sm transition-transform active:scale-95">
                    난이도 상 (High) 랜덤
                  </button>
                  <button onClick={() => pickRandom('전체')} className="py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-sm transition-transform active:scale-95">
                    전체 난이도 랜덤
                  </button>
                </div>
              </div>

              {/* 사용 설명서 */}
              <div className="bg-blue-50/60 p-5 rounded-xl border border-blue-100">
                <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <span>📖</span> 사용 설명서
                </h3>
                <ul className="text-sm text-gray-700 space-y-3 leading-relaxed">
                  <li>
                    <strong className="text-blue-800">1. 내가 뽑고 파트너가 질문하기:</strong><br/>
                    내가 랜덤 질문을 뽑은 후 파트너에게 "난이도X, Y번 질문 읽어줘!"라고 말하세요. 파트너는 하단 리스트에서 해당 질문을 찾아 나에게 읽어줍니다.
                  </li>
                  <li>
                    <strong className="text-blue-800">2. 대화 완료 체크 ✔️:</strong><br/>
                    선택한 질문에 대해 답변을 성공적으로 마쳤다면 카드 우측 상단의 체크박스를 눌러 완료 상태로 표시하세요. 상단 진행 바에 실시간으로 기록이 누적됩니다.
                  </li>
                  <li>
                    <strong className="text-blue-800">3. 전체 리스트 보기:</strong><br/>
                    하단 바를 통해 특정 난이도의 질문 전체를 하나의 메뉴판처럼 모아볼 수도 있습니다.
                  </li>
                  <li>
                    <strong className="text-blue-800">4. 학습 도구 활용:</strong><br/>
                    단어가 막힐 때는 <span className="font-semibold">💡 Vocabulary</span>를, 문장 구성이 막힐 때는 <span className="font-semibold">🗣️ Sample Answer</span>를 참고하세요. 질문 자체의 이해가 어려울 경우 한국어 해설 토글을 열면 됩니다.
                  </li>
                </ul>
              </div>

            </div>
          )}

          {/* 랜덤 화면 */}
          {currentView === 'random' && randomQuestion && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">
                  {isSpinning ? '🎰 질문 셔플 중...' : '🎯 매칭된 질문'}
                </h2>
                <button 
                  onClick={() => !isSpinning && pickRandom(selectedLevel)} 
                  disabled={isSpinning}
                  className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-lg font-medium hover:bg-blue-200 disabled:opacity-50"
                >
                  다시 돌리기 🔄
                </button>
              </div>

              {isSpinning ? (
                <div className="bg-white rounded-xl shadow-sm border border-blue-300 p-8 flex flex-col items-center justify-center min-h-[250px]">
                  <div className="text-5xl animate-bounce mb-6">🎰</div>
                  <p className="text-base text-gray-400 text-center opacity-60 filter blur-[0.5px]">
                    {randomQuestion.q}
                  </p>
                </div>
              ) : (
                <QuestionCard 
                  data={randomQuestion} 
                  isAnswered={answeredIds.includes(randomQuestion.id)}
                  onToggle={toggleAnswer}
                />
              )}
            </div>
          )}

          {/* 리스트 화면 */}
          {currentView === 'list' && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">{selectedLevel} 난이도 리스트</h2>
              {getList().map(q => (
                <QuestionCard 
                  key={q.id} 
                  data={q} 
                  isAnswered={answeredIds.includes(q.id)}
                  onToggle={toggleAnswer}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* 하단 네비게이션 */}
      <nav className="bg-white border-t border-gray-200 pt-3 px-3 pb-[calc(12px+env(safe-area-inset-bottom))] z-20 flex-shrink-0 w-full shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="max-w-2xl mx-auto grid grid-cols-4 gap-2">
          <button onClick={goHome} className={`py-2 rounded-lg text-sm font-semibold transition-colors flex justify-center items-center ${currentView === 'home' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            🏠 홈
          </button>
          <button onClick={() => viewList('하')} className={`py-2 rounded-lg text-sm font-semibold transition-colors border ${currentView === 'list' && selectedLevel === '하' ? 'bg-green-600 text-white border-green-600' : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'}`}>
            하 리스트
          </button>
          <button onClick={() => viewList('중')} className={`py-2 rounded-lg text-sm font-semibold transition-colors border ${currentView === 'list' && selectedLevel === '중' ? 'bg-yellow-500 text-white border-yellow-500' : 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100'}`}>
            중 리스트
          </button>
          <button onClick={() => viewList('상')} className={`py-2 rounded-lg text-sm font-semibold transition-colors border ${currentView === 'list' && selectedLevel === '상' ? 'bg-red-600 text-white border-red-600' : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'}`}>
            상 리스트
          </button>
        </div>
      </nav>
    </div>
  );
}