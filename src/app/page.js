'use client';

import { useState, useEffect } from 'react';

// 33개 전체 질문 데이터베이스
const questionDB = [
  { id: 1, level: '하', q: "What is your favorite restaurant or cafe around Songdo, and why do you like it?", vocab: "favorite (가장 좋아하는), recommend (추천하다), atmosphere (분위기)", ans: "My favorite cafe is Forest Outings because it has a beautiful green interior and great coffee.", trans: "송도 주변에서 가장 좋아하는 식당이나 카페는 어디이며, 왜 그곳을 좋아하시나요?" },
  { id: 2, level: '하', q: "Are you a morning person or a night owl? How does it affect your daily life?", vocab: "night owl (올빼미족), affect (영향을 미치다), productive (생산적인)", ans: "I am a night owl. I usually feel more productive and focused late at night.", trans: "당신은 아침형 인간인가요, 아니면 올빼미족인가요? 그것이 일상생활에 어떤 영향을 미치나요?" },
  { id: 3, level: '하', q: "What is the first thing you usually do when you wake up in the morning?", vocab: "stretch (스트레칭하다), habit (습관), hydrated (수분이 공급된)", ans: "The first thing I do is drink a glass of water to stay hydrated and wake my body up.", trans: "아침에 일어났을 때 가장 먼저 하는 일은 무엇인가요?" },
  { id: 4, level: '하', q: "If you can eat only one food for the rest of your life, what would it be?", vocab: "for the rest of one's life (평생 동안), nutrient (영양소), get tired of (~에 질리다)", ans: "I would choose bibimbap because it has various ingredients, so I won't get tired of it easily.", trans: "만약 평생 동안 한 가지 음식만 먹어야 한다면, 그것은 무엇이고 그 이유는 무엇인가요?" },
  { id: 5, level: '하', q: "Do you prefer texting or calling when you communicate with your friends?", vocab: "prefer (선호하다), text (문자 보내다), convenient (편리한)", ans: "I prefer texting because it allows me to think about my reply and reply whenever I am free.", trans: "친구들과 소통할 때 문자(카톡)와 전화 중 어느 것을 더 선호하시나요?" },
  { id: 6, level: '하', q: "What did you do last weekend to relax or have fun?", vocab: "relax (휴식하다), binge-watch (정주행하다), recharge (재충전하다)", ans: "Last weekend, I stayed home and binge-watched a Netflix series to recharge my energy.", trans: "지난 주말에 휴식을 취하거나 즐거운 시간을 보내기 위해 무엇을 하셨나요?" },
  { id: 7, level: '하', q: "Do you prefer summer or winter? Tell me the reason.", vocab: "intolerable (견딜 수 없는), humidity (습도), cozy (포근한)", ans: "I prefer winter because I can wear cozy sweaters and the summer heat is intolerable for me.", trans: "여름과 겨울 중 어느 계절을 더 선호하시나요? 이유를 말씀해 주세요." },
  { id: 8, level: '하', q: "What is your favorite movie, drama, or YouTube channel these days?", vocab: "content (콘텐츠), entertaining (재미있는), subscribe (구독하다)", ans: "These days, I watch a lot of tech YouTube channels because they provide entertaining and informative content.", trans: "요즘 가장 좋아하는 영화, 드라마, 혹은 유튜브 채널은 무엇인가요?" },
  { id: 9, level: '하', q: "What is your favorite season and what activities do you like to do during that season?", vocab: "breeze (선선한 바람), outdoor activities (야외 활동), picnic (소풍)", ans: "My favorite season is autumn. I love going on a picnic to a park when the breeze is cool.", trans: "가장 좋아하는 계절은 언제이며, 그 계절에 어떤 활동을 하는 것을 좋아하시나요?" },
  { id: 10, level: '하', q: "Do you prefer traveling to a crowded city or a quiet nature spot? Why?", vocab: "crowded (붐비는), peaceful (평화로운), escape (탈출하다, 벗어나다)", ans: "I prefer quiet nature spots to escape from daily stress and enjoy peaceful environments.", trans: "붐비는 도시로 여행하는 것과 조용한 자연 속으로 여행하는 것 중 어느 쪽을 더 선호하시나요?" },
  { id: 11, level: '하', q: "What is your favorite hobby, and how long have you been doing it?", vocab: "hobby (취미), relieve stress (스트레스를 풀다), consistent (꾸준한)", ans: "My favorite hobby is running. I have been doing it for a year, and it helps me relieve stress.", trans: "가장 좋아하는 취미는 무엇이며, 얼마나 오랫동안 해오셨나요?" },
  { id: 12, level: '하', q: "If you could meet any famous person in the world, who would it be and why?", vocab: "famous (유명한), inspiration (영감), role model (롤모델)", ans: "I would like to meet Elon Musk because he gives me great inspiration regarding future technology.", trans: "만약 세상에서 누구든 유명한 사람을 만날 수 있다면, 누구를 왜 만나고 싶으신가요?" },
  { id: 13, level: '하', q: "What kind of music do you usually listen to when you want to boost your mood?", vocab: "boost (북돋우다, 높이다), upbeat (활기찬), energetic (에너지 넘치는)", ans: "I listen to upbeat pop music when I need to boost my mood and feel energetic.", trans: "기분을 좋게 만들고 싶을 때 보통 어떤 종류의 음악을 들으시나요?" },
  { id: 14, level: '하', q: "Are you a cat person or a dog person? Tell me why?", vocab: "independent (독립적인), affectionate (다정한), companion (동반자, 반려동물)", ans: "I am a dog person because dogs are very affectionate and always welcome me when I come home.", trans: "당신은 고양이 파인가요, 강아지 파인가요? 이유를 말해 주세요." },
  { id: 15, level: '하', q: "What is the best book you have ever read, or a book you want to recommend?", vocab: "recommend (추천하다), perspective (관점), life-changing (인생을 바꾼)", ans: "I recommend 'Atomic Habits' because it changed my perspective on how small habits build success.", trans: "당신이 읽은 책 중 가장 좋았던 책이거나 다른 사람에게 추천하고 싶은 책은 무엇인가요?" },
  
  { id: 16, level: '중', q: "If you were to start your own business or startup, what kind of product or service would you create?", vocab: "startup (스타트업), entrepreneur (기업가), solve a problem (문제를 해결하다)", ans: "I would create an app that uses AI to analyze used cars, helping people buy cars safely.", trans: "만약 당신이 직접 사업이나 스타트업을 시작한다면, 어떤 종류의 제품이나 서비스를 만들고 싶나요?" },
  { id: 17, level: '중', q: "What do you think about using AI tools like ChatGPT for university assignments or coding?", vocab: "assignment (과제), efficiency (효율성), cheating (부정행위)", ans: "I think it increases efficiency for brainstorming, but relying on it completely is a problem.", trans: "대학 과제나 코딩에 ChatGPT와 같은 AI 도구를 사용하는 것에 대해 어떻게 생각하시나요?" },
  { id: 18, level: '중', q: "If you were buying your first car after graduation, would you prefer a brand new car or a used car? Why?", vocab: "graduation (졸업), brand new (신상의, 새 것), secondhand (중고의)", ans: "I prefer a used car for my first vehicle because it is more cost-effective and less stressful if I get a scratch.", trans: "졸업 후 첫 차를 구매한다면, 새 차와 중고차 중 어느 쪽을 선호하시겠습니까? 이유는 무엇인가요?" },
  { id: 19, level: '중', q: "What is the most important factor when choosing a job? (e.g., Salary, Work-life balance, Company culture)", vocab: "factor (요소), salary (급여), work-life balance (워라밸)", ans: "Work-life balance is the most important factor because personal time helps me perform better at work.", trans: "직장을 선택할 때 가장 중요한 요소는 무엇인가요? (예: 연봉, 워라밸, 사내 문화)" },
  { id: 20, level: '중', q: "Tell me about the most memorable or challenging class you have taken in university so far.", vocab: "memorable (기억에 남는), challenging (도전적인, 어려운), assignment (과제)", ans: "The text mining class using R was the most challenging because I had no prior coding experience.", trans: "지금까지 대학에서 들었던 수업 중 가장 기억에 남거나 힘들었던 수업에 대해 말씀해 주세요." },
  { id: 21, level: '중', q: "If you had an extra 5 hours every day, how would you spend that time?", vocab: "extra (여분의), investment (투자), self-development (자기계발)", ans: "I would spend that extra time on self-development, such as practicing English conversation or app development.", trans: "만약 매일 5시간의 여유 시간이 추가로 주어진다면, 그 시간을 어떻게 보내시겠습니까?" },
  { id: 22, level: '중', q: "How do you usually handle stress or a bad mood when things don't go well?", vocab: "handle (다루다, 대처하다), vent (감정을 터뜨리다, 풀다), clear one's mind (마음을 정리하다)", ans: "I usually go for a heavy workout at the gym. Sweating helps me clear my mind and reduce stress.", trans: "일이 잘 풀리지 않을 때 스트레스나 나쁜 기분을 보통 어떻게 해소하시나요?" },
  { id: 23, level: '중', q: "Do you think university grades (GPA) are really important for your future career?", vocab: "grade (성적), GPA (학점), capability (능력)", ans: "I think GPA shows sincerity, but practical skills and project experiences are more important for a career.", trans: "대학 성적(학점)이 미래의 커리어에 정말 중요하다고 생각하시나요?" },
  { id: 24, level: '중', q: "What is one new skill or hobby you really want to learn this year?", vocab: "prompt engineering (프롬프트 엔지니어링), artificial intelligence (인공지능), expertise (전문 지식)", ans: "I want to learn prompt engineering to use AI image generation models more effectively.", trans: "올해 꼭 배우고 싶은 새로운 기술이나 취미는 무엇인가요?" },
  { id: 25, level: '중', q: "If you could travel anywhere in the world right now, where would it be and who would you go with?", vocab: "destination (목적지), budget (예산), make memories (추억을 쌓다)", ans: "I would travel to Europe with my girlfriend to see historical architecture and make unforgettable memories.", trans: "만약 지금 당장 세계 어디든 여행할 수 있다면, 어디로 누구와 함께 가고 싶으신가요?" },
  { id: 26, level: '중', q: "If you could live in another country for one year, where would you go and what would you do there?", vocab: "cultural immersion (문화적 몰입, 체험), networking (네트워킹), local (현지의)", ans: "I would live in the US to experience the local startup culture and improve my English conversation skills.", trans: "만약 다른 나라에서 1년 동안 살 수 있다면, 어디로 가서 무엇을 하고 싶으신가요?" },
  { id: 27, level: '중', q: "What is your biggest goal or dream for the next three to five years?", vocab: "long-term goal (장기 목표), financial independence (경제적 독립), launch (출시하다, 시작하다)", ans: "My goal is to launch a successful web service and achieve financial independence before turning 30.", trans: "향후 3~5년 내에 이루고 싶은 가장 큰 목표나 꿈은 무엇인가요?" },
  { id: 28, level: '중', q: "Do you prefer working individually or in a team for university projects? Why?", vocab: "individually (개인적으로), teamwork (팀워크), collaboration (협업)", ans: "I prefer working in a team because collaboration allows us to combine diverse ideas and create better results.", trans: "대학 프로젝트를 할 때 개인으로 작업하는 것과 팀으로 작업하는 것 중 어느 쪽을 선호하시나요? 이유는 무엇인가요?" },
  { id: 29, level: '중', q: "What is the most valuable lesson you have learned from a part-time job or club activity?", vocab: "valuable (가치 있는), communication skills (소통 능력), responsibility (책임감)", ans: "I learned that active communication skills are crucial to prevent misunderstandings within a group.", trans: "아르바이트나 동아리 활동을 통해 배운 가장 가치 있는 교훈은 무엇인가요?" },
  { id: 30, level: '중', q: "How do you manage your time when you have a busy schedule with classes and exams?", vocab: "prioritize (우선순위를 정하다), deadline (마감 기한), task (작업, 일)", ans: "I prioritize tasks based on their deadlines and importance, and use a digital planner to track them.", trans: "수업과 시험으로 바쁜 일정이 있을 때 시간 관리를 어떻게 하시나요?" },
  
  { id: 31, level: '상', q: "Many companies nowadays emphasize ESG (Environmental, Social, Governance) management. Do you think this is a real effort to make the world better, or just a clever marketing strategy?", vocab: "emphasize (강조하다), corporate responsibility (기업의 사회적 책임), marketing strategy (마케팅 전략)", ans: "While some companies use it as greenwashing marketing, it is a necessary direction for sustainable corporate growth.", trans: "요즘 많은 기업들이 ESG 경영을 강조합니다. 이것이 세상을 더 낫게 만들려는 진정한 노력이라고 생각하나요, 아니면 교묘한 마케팅 전략이라고 생각하나요?" },
  { id: 32, level: '상', q: "With the rapid development of technology, some people worry that AI will replace many human jobs. How do you think our generation should prepare for this change?", vocab: "replace (대체하다), adapt (적응하다), soft skills (소프트 스킬, 대인 관계 능력)", ans: "We need to learn how to collaborate with AI tools while developing soft skills like leadership and empathy.", trans: "기술의 급격한 발전으로 인해 AI가 많은 인간의 일자리를 대체할 것이라고 우려하는 사람들이 있습니다. 우리 세대는 이러한 변화에 어떻게 대비해야 한다고 생각하나요?" },
  { id: 33, level: '상', q: "Many global companies are now ending 'Work from Home (Remote work)' and asking employees to return to the office. Which work style do you think is better for productivity and why?", vocab: "productivity (생산성), remote work (재택근무), face-to-face interaction (대면 상호작용)", ans: "I think a hybrid model is best because it balances individual productivity at home with face-to-face collaboration.", trans: "최근 많은 글로벌 기업들이 재택근무를 종료하고 직원들에게 사무실 복귀를 요구하고 있습니다. 어떤 근무 형태가 생산성에 더 좋다고 생각하며, 그 이유는 무엇인가요?" }
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
            className="flex-grow px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 placeholder-gray-400 text-gray-800"
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
      <header className="bg-blue-600 text-white p-4 shadow-md z-30 flex-shrink-0 w-full">
        <div className="max-w-2xl mx-auto w-full flex justify-between items-center">
          <div className="cursor-pointer" onClick={goHome}>
            <h1 className="text-xl font-bold tracking-wider">ILLO STUDY</h1>
            <p className="text-blue-100 text-xs mt-1">Speed Networking</p>
          </div>
          {currentView !== 'home' && (
            <button onClick={goHome} className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-1 transition">
              🏠 Home
            </button>
          )}
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