'use client';

import { useState, useEffect } from 'react';

// 45개 전체 질문 데이터베이스
const questionDB = [
  // --- 난이도 하 (Low : 1~15번) ---
  { id: 1, level: '하', q: "What is your favorite coffee or tea order when you visit a cafe?", vocab: "order (주문), signature (대표 메뉴), iced (차가운)", ans: "My favorite order is an iced Americano because it helps me stay awake.", trans: "카페에 가면 가장 즐겨 주문하는 커피나 음료 메뉴는 무엇인가요?" },
  { id: 2, level: '하', q: "Do you prefer watching movies in a cinema or streaming at home?", vocab: "cinema (영화관), streaming service (스트리밍 서비스), atmosphere (분위기)", ans: "I prefer streaming at home because I can pause the movie whenever I want.", trans: "영화관에서 영화를 보는 것과 집에서 스트리밍으로 보는 것 중 어느 쪽을 더 선호하시나요?" },
  { id: 3, level: '하', q: "How many hours of sleep do you usually get on weekdays?", vocab: "weekday (평일), sleep schedule (수면 일정), feel refreshed (개운함을 느끼다)", ans: "I usually sleep about 6 hours on weekdays, which is a bit short for me.", trans: "평일에 보통 몇 시간 정도 수면을 취하시나요?" },
  { id: 4, level: '하', q: "What is your favorite season for fashion and dressing up?", vocab: "dressing up (옷을 잘 차려입기), layer (겹쳐 입다), autumn (가을)", ans: "I love autumn fashion because I can layer coats and jackets stylishly.", trans: "패션과 옷 차려입기에 가장 좋아하는 계절은 언제인가요?" },
  { id: 5, level: '하', q: "Do you prefer public transportation or walking when commuting to school or work?", vocab: "public transportation (대중교통), commute (통학/통근하다), walk (걸어가다)", ans: "I prefer walking if the distance is short, but I usually take the subway.", trans: "학교나 직장에 갈 때 대중교통 이용과 걸어가는 것 중 어느 쪽을 더 선호하시나요?" },
  { id: 6, level: '하', q: "What is your go-to meal to cook when you are alone at home?", vocab: "go-to meal (자주 해 먹는 요리), recipe (레시피), simple (간단한)", ans: "My go-to meal is kimchi fried rice because it is quick and easy to make.", trans: "집에 혼자 있을 때 가장 자주 해 먹는 요리는 무엇인가요?" },
  { id: 7, level: '하', q: "How do you usually listen to music (wireless earphones, speakers, or live concerts)?", vocab: "wireless earphones (무선 이어폰), background music (배경 음악), live (라이브의)", ans: "I usually use wireless earphones whenever I commute or walk outside.", trans: "음악을 들을 때 주로 어떤 방식을 사용하시나요 (무선 이어폰, 스피커, 라이브 공연 등)?" },
  { id: 8, level: '하', q: "What is the most recent mobile or video game you have played?", vocab: "recent (최근의), mobile game (모바일 게임), kill time (시간을 때우다)", ans: "I recently played a mobile casual game to kill time while waiting for the bus.", trans: "가장 최근에 해본 모바일이나 비디오 게임은 무엇인가요?" },
  { id: 9, level: '하', q: "Do you enjoy rainy days, or do you prefer clear sunny weather?", vocab: "rainy (비 오는), cozy (포근한), sunny (화창한)", ans: "I prefer clear sunny weather because rainy days make my shoes wet.", trans: "비 오는 날을 좋아하시나요, 아니면 화창한 날씨를 더 선호하시나요?" },
  { id: 10, level: '하', q: "What is your favorite type of bakery item or bread?", vocab: "bakery (베이커리), fresh (신선한), croissant (크루아상)", ans: "My favorite bakery item is a fresh croissant with a warm cup of coffee.", trans: "가장 좋아하는 빵이나 베이커리 종류는 무엇인가요?" },
  { id: 11, level: '하', q: "How do you keep track of your daily schedule (paper planner vs. phone calendar app)?", vocab: "keep track of (~을 기록하다/관리하다), schedule (일정), Sync (동기화하다)", ans: "I use a phone calendar app because it syncs automatically and sends reminders.", trans: "일일 일정을 관리할 때 어떤 방법을 사용하시나요 (종이 다이어리 vs 스마트폰 캘린더 앱)?" },
  { id: 12, level: '하', q: "Where do you prefer to sit in a university classroom (front row vs. back row)?", vocab: "front row (맨 앞줄), back row (맨 뒷줄), focus (집중하다)", ans: "I prefer sitting in the middle or back row to avoid feeling pressured by the professor.", trans: "대학교 강의실에서 어느 자리에 앉는 것을 더 선호하시나요 (앞줄 vs 뒷줄)?" },
  { id: 13, level: '하', q: "Do you enjoy attending live sports games or music festivals?", vocab: "attend (참석하다), live energy (현장 열기), festival (축제)", ans: "I love music festivals because the live energy and music make me feel excited.", trans: "현장 스포츠 경기 관람이나 음악 페스티벌에 가는 것을 즐기시나요?" },
  { id: 14, level: '하', q: "What is your favorite late-night snack when studying late?", vocab: "late-night snack (야식), stay up (밤을 새우다), instant ramen (라면)", ans: "My favorite late-night snack is instant ramen, even though it causes swelling the next day.", trans: "늦은 시간까지 공부할 때 가장 좋아하는 야식은 무엇인가요?" },
  { id: 15, level: '하', q: "Do you prefer shopping for clothes online or visiting physical stores?", vocab: "try on (입어보다), fit (핏, 사이즈), convenient (편리한)", ans: "I prefer physical stores because I want to try on the clothes to check the fit.", trans: "옷을 쇼핑할 때 온라인 쇼핑과 오프라인 매장 방문 중 어느 쪽을 더 선호하시나요?" },

  // --- 난이도 중 (Medium : 16~30번) ---
  { id: 16, level: '중', q: "What do you think is the most effective way to improve English speaking fluency outside class?", vocab: "fluency (유창함), consistent (꾸준한), practical practice (실전 연습)", ans: "I think joining a regular conversation study group is the best way to practice practical speaking.", trans: "수업 외 시간에 영어 말하기 유창성을 향상시키는 가장 효과적인 방법은 무엇이라고 생각하나요?" },
  { id: 17, level: '중', q: "Studying in a quiet library vs. Working in a lively open lounge space. Which suits you better?", vocab: "lively (활기찬), open space (개방형 공간), atmosphere (분위기)", ans: "An open lounge space suits me better because a too-quiet library makes me sleepy.", trans: "조용한 도서관에서 공부하기 vs 활기찬 개방형 라운지 공간에서 작업하기. 어느 쪽이 더 잘 맞으시나요?" },
  { id: 18, level: '중', q: "How do you handle team members who do not contribute actively to group projects?", vocab: "contribute (기여하다), team project (팀 프로젝트), assign tasks (역할을 분담하다)", ans: "I try to talk to them directly and assign specific, small tasks so they can participate easily.", trans: "팀 프로젝트에서 적극적으로 참여하지 않는 팀원을 만났을 때 어떻게 대처하시나요?" },
  { id: 19, level: '중', q: "What is your opinion on short-form content (Reels, Shorts) affecting our attention spans?", vocab: "attention span (주의 집중 시간), addicting (중독성 있는), consumption (소비)", ans: "It is very addicting and definitely reduces our ability to focus on long books or lectures.", trans: "숏폼 콘텐츠(릴스, 쇼츠 등)가 우리의 집중력에 미치는 영향에 대해 어떻게 생각하시나요?" },
  { id: 20, level: '중', q: "If you had a $1,000 budget to organize a student community event, what would you plan?", vocab: "budget (예산), community event (커뮤니티 행사), networking (네트워킹)", ans: "I would rent a nice lounge, order catering food, and host a casual networking party with games.", trans: "학생 커뮤니티 행사를 기획할 $1,000의 예산이 있다면 어떤 행사를 기획하고 싶나요?" },
  { id: 21, level: '중', q: "How do you prepare yourself before an important job interview or presentation?", vocab: "interview (면접), script (대본), mock practice (모의 연습)", ans: "I write down key bullet points and practice speaking out loud in front of a mirror.", trans: "중요한 면접이나 발표를 앞두고 보통 어떻게 준비하시나요?" },
  { id: 22, level: '중', q: "Do you think digital collaboration tools (Slack, Notion) strengthen or weaken real human connection?", vocab: "collaboration tools (협업 도구), efficiency (효율성), face-to-face (대면의)", ans: "They greatly increase work efficiency, but they cannot replace face-to-face trust building.", trans: "협업 도구(슬랙, 노션 등)가 사람 간의 실질적인 유대감을 강화한다고 보나요, 아니면 약화시킨다고 보나요?" },
  { id: 23, level: '중', q: "What is one good habit you successfully formed, or a bad habit you broke recently?", vocab: "form a habit (습관을 형성하다), break a habit (습관을 깨다), routine (루틴)", ans: "I successfully built a habit of drinking a full glass of water right after waking up.", trans: "최근에 성공적으로 만든 좋은 습관이나 없앤 나쁜 습관이 있다면 무엇인가요?" },
  { id: 24, level: '중', q: "How do you decide whether to buy something when you see an appealing targeted ad on social media?", vocab: "targeted ad (타겟 광고), impulse buy (충동구매), review (후기)", ans: "I add it to my cart first and wait a few days to see if I really need it to avoid impulse buying.", trans: "소셜 미디어에서 매력적인 타겟 광고를 보았을 때 구매 여부를 어떻게 결정하시나요?" },
  { id: 25, level: '중', q: "Do you think current university courses adequately prepare students for real-world job markets?", vocab: "adequately (적절히), real-world (실제의), practical experience (실무 경험)", ans: "Not entirely. Many courses are too theoretical, so students need internships and external projects.", trans: "현재의 대학 과정이 학생들에게 실제 취업 시장에 필요한 준비를 충분히 시켜준다고 생각하시나요?" },
  { id: 26, level: '중', q: "What element matters most to you for a great customer experience when visiting a new venue or cafe?", vocab: "customer experience (고객 경험), service quality (서비스 품질), interior design (인테리어 디자인)", ans: "For me, polite service and a clean atmosphere are much more important than just pretty interior.", trans: "새로운 장소나 카페를 방문할 때 최고의 고객 경험을 결정짓는 가장 중요한 요소는 무엇인가요?" },
  { id: 27, level: '중', q: "How do you usually stay updated on new industry trends or global news?", vocab: "newsletter (뉴스레터), industry trend (산업 트렌드), subscribe (구독하다)", ans: "I subscribe to several tech newsletters and read brief news summaries every morning.", trans: "새로운 산업 트렌드나 글로벌 뉴스를 소식을 접하기 위해 주로 어떤 방법을 사용하시나요?" },
  { id: 28, level: '중', q: "If you could travel back 3 years in time, what piece of advice would you give your younger self?", vocab: "travel back (되돌아가다), younger self (과거의 나), hesitation (망설임)", ans: "I would tell myself not to hesitate so much and just start trying new projects earlier.", trans: "3년 전으로 돌아갈 수 있다면, 과거의 자신에게 어떤 조언을 해주고 싶나요?" },
  { id: 29, level: '중', q: "What is the most critical skill needed to lead and manage a student club or project successfully?", vocab: "leadership (리더십), conflict resolution (갈등 해결), motivation (동기 부여)", ans: "Active listening and conflict resolution are the most critical skills to keep the team united.", trans: "학생 동아리나 프로젝트를 성공적으로 이끌기 위해 가장 필수적인 역량은 무엇인가요?" },
  { id: 30, level: '중', q: "Would you prefer working for a company with strict structural guidelines or high creative autonomy?", vocab: "guidelines (지침), creative autonomy (창의적 자율성), responsibility (책임감)", ans: "I prefer high creative autonomy because I perform better when I have ownership over my work.", trans: "엄격한 구조적 지침이 있는 회사와 높은 창의적 자율성을 부여하는 회사 중 어느 쪽을 선호하시나요?" },

  // --- 난이도 상 (High : 31~40번) ---
  { id: 31, level: '상', q: "How should modern businesses balance short-term profitability with long-term brand values?", vocab: "profitability (수익성), brand equity (브랜드 가치), sustainable (지속 가능한)", ans: "Businesses must invest in sustainable brand values, even if it reduces immediate short-term profits.", trans: "현대 기업들은 단기적 수익성과 장기적인 브랜드 가치 사이에서 어떻게 균형을 맞춰야 할까요?" },
  { id: 32, level: '상', q: "With AI automating code generation and writing, what human capabilities will become most valuable?", vocab: "automation (자동화), critical thinking (비판적 사고), domain expertise (도메인 전문성)", ans: "Critical thinking, framing the right problems, and human empathy will become the most valuable traits.", trans: "AI가 코딩과 글쓰기를 자동화함에 따라, 향후 어떤 인간의 역량이 가장 가치 있게 될까요?" },
  { id: 33, level: '상', q: "Do you think personalized recommendation algorithms create filter bubbles that polarize society?", vocab: "algorithm (알고리즘), filter bubble (필터 버블), polarize (양극화하다)", ans: "Yes, algorithms repeatedly show content we like, making it harder to understand opposing perspectives.", trans: "개인화 추천 알고리즘이 필터 버블을 형성하여 사회를 양극화한다고 생각하시나요?" },
  { id: 34, level: '상', q: "Is it better for an early-stage startup to focus on rapid user acquisition or early profitability?", vocab: "early-stage startup (초기 스타트업), user acquisition (유저 확보), cash flow (현금 흐름)", ans: "Focusing on early profitability is safer now, as securing external investment has become harder.", trans: "초기 스타트업은 빠른 유저 확보와 빠른 수익성 확보 중 어느 쪽에 더 집중해야 할까요?" },
  { id: 35, level: '상', q: "How will autonomous technology transform urban transportation and real estate development in the future?", vocab: "autonomous (자율 주행의), urban planning (도시 계획), real estate (부동산)", ans: "Autonomous cars will reduce parking needs, allowing cities to convert parking lots into green parks.", trans: "자율주행 기술이 향후 도시 교통과 부동산 개발을 어떻게 변화시킬 것이라고 보시나요?" },
  { id: 36, level: '상', q: "What ethical considerations should be prioritized when consumer behavioral data is collected for marketing?", vocab: "ethical consideration (윤리적 고려사항), behavioral data (행동 데이터), explicit consent (명시적 동의)", ans: "Companies must ensure explicit consent and explain transparently how user data is utilized.", trans: "마케팅 목적으로 소비자 행동 데이터를 수집할 때 어떤 윤리적 고려가 우선되어야 할까요?" },
  { id: 37, level: '상', q: "Do you agree that the traditional 5-day work week is becoming obsolete in modern knowledge industries?", vocab: "traditional (전통적인), obsolete (구식의/시대에 뒤떨어진), flexibility (유연성)", ans: "Yes, productivity is not proportional to hours spent at a desk; flexibility brings better results.", trans: "전통적인 주 5일 근무제가 현대 지식 산업군에서 시대에 뒤떨어져 가고 있다는 의견에 동의하시나요?" },
  { id: 38, level: '상', q: "How can an organization foster a genuine culture of innovation rather than just slogan-level talks?", vocab: "foster (조성하다), genuine culture (진정한 문화), psychological safety (심리적 안전감)", ans: "They must build psychological safety where employees are rewarded for taking smart risks, even if they fail.", trans: "조직이 단순히 슬로건에 그치지 않고 진정한 혁신 문화를 조성하려면 어떻게 해야 할까요?" },
  { id: 39, level: '상', q: "What are the long-term economic implications of a declining birth rate on local businesses and universities?", vocab: "implication (영향/파급효과), declining birth rate (저출생), local economy (지역 경제)", ans: "It will lead to a shortage of young workforce and force many regional universities and businesses to restructure.", trans: "저출생 현상이 지역 비즈니스와 대학교에 미칠 장기적인 경제적 파급 효과는 무엇일까요?" },
  { id: 40, level: '상', q: "Should social media platforms be held legally responsible for AI-generated misinformation shared on their networks?", vocab: "legally responsible (법적 책임이 있는), misinformation (허위 정보), moderation (모더레이션/관리)", ans: "They should be held accountable to a degree, as their algorithms amplify the spread of unverified content.", trans: "소셜 미디어 플랫폼이 자사 네트워크에서 공유되는 AI 생성 허위 정보에 대해 법적 책임을져야 할까요?" }
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