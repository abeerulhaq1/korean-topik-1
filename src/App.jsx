
import { useMemo, useState } from 'react'

const roadmap = [
  {
    week: 'Week 1',
    title: 'Hangul and Core Survival Words',
    tasks: ['Master consonants and vowels', 'Practice pronunciation daily', 'Memorize 120 basic nouns and verbs'],
  },
  {
    week: 'Week 2',
    title: 'Grammar Foundations',
    tasks: ['Particles: 은/는, 이/가, 을/를', 'Present and past tense basics', 'Sentence order and polite endings'],
  },
  {
    week: 'Week 3',
    title: 'Listening and Reading Speed',
    tasks: ['Train with short dialogues', 'Scan reading questions first', 'Build daily dictation routine'],
  },
  {
    week: 'Week 4',
    title: 'Mock Test and Weakness Repair',
    tasks: ['Take 2 full timed mocks', 'Analyze incorrect answers', 'Revise weak grammar and vocabulary sets'],
  },
]

const vocabularySets = [
  {
    category: 'Daily Life',
    words: ['학교 (school)', '친구 (friend)', '음식 (food)', '시장 (market)', '버스 (bus)'],
  },
  {
    category: 'Time and Date',
    words: ['오늘 (today)', '내일 (tomorrow)', '어제 (yesterday)', '아침 (morning)', '저녁 (evening)'],
  },
  {
    category: 'Verbs',
    words: ['가다 (to go)', '오다 (to come)', '먹다 (to eat)', '보다 (to see)', '공부하다 (to study)'],
  },
]

const grammarPoints = [
  'N은/는: topic marker',
  'N이/가: subject marker',
  'N을/를: object marker',
  'V-고 싶어요: want to do',
  'A/V-아요/어요: present polite',
  'A/V-았어요/었어요: past polite',
]

const plannerTemplate = [
  'Review 30 vocabulary words',
  'Complete 2 grammar drills',
  'Listen to one TOPIK audio set',
  'Solve one reading passage',
  'Write 5 simple Korean sentences',
]

const mockQuestions = [
  {
    question: 'What is the correct particle in: 저는 사과___ 먹어요.',
    options: ['이', '를', '은', '에'],
    answer: '를',
  },
  {
    question: 'Choose the correct meaning of 학교.',
    options: ['Market', 'School', 'Hospital', 'Station'],
    answer: 'School',
  },
  {
    question: 'Past tense of 가다 (to go) is:',
    options: ['가요', '갔어요', '갈 거예요', '가고'],
    answer: '갔어요',
  },
  {
    question: 'Best translation of “I want to study” is:',
    options: ['공부해요', '공부했어요', '공부하고 싶어요', '공부합니다'],
    answer: '공부하고 싶어요',
  },
  {
    question: 'Which one is a time word?',
    options: ['친구', '음식', '내일', '버스'],
    answer: '내일',
  },
]

function App() {
  const [activeWeek, setActiveWeek] = useState(roadmap[0].week)
  const [plannerChecks, setPlannerChecks] = useState(
    plannerTemplate.reduce((acc, task) => ({ ...acc, [task]: false }), {}),
  )
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const selectedRoadmap = useMemo(
    () => roadmap.find((item) => item.week === activeWeek) ?? roadmap[0],
    [activeWeek],
  )

  const plannerProgress = useMemo(() => {
    const completed = Object.values(plannerChecks).filter(Boolean).length
    return Math.round((completed / plannerTemplate.length) * 100)
  }, [plannerChecks])

  const score = useMemo(() => {
    return mockQuestions.reduce((total, item, index) => {
      return answers[index] === item.answer ? total + 1 : total
    }, 0)
  }, [answers])

  const togglePlannerTask = (task) => {
    setPlannerChecks((prev) => ({ ...prev, [task]: !prev[task] }))
  }

  const chooseAnswer = (questionIndex, option) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: option }))
  }

  const submitMockTest = () => setSubmitted(true)

  const resetMockTest = () => {
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fef3c7_0%,#fff7ed_35%,#fde68a_100%)] text-stone-800">
      <header className="mx-auto max-w-6xl px-6 pb-10 pt-12">
        <div className="rounded-3xl border border-amber-200/70 bg-white/85 p-8 shadow-[0_20px_80px_-30px_rgba(146,64,14,0.55)] backdrop-blur">
          <p className="mb-3 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-amber-800">
            TOPIK I PREP SYSTEM
          </p>
          <h1 className="font-display text-4xl leading-tight text-stone-900 sm:text-5xl">
            Korean TOPIK 1 Test Preparation
          </h1>
          <p className="mt-4 max-w-3xl text-base text-stone-700 sm:text-lg">
            A step-by-step plan covering vocabulary, grammar, listening, reading, and timed practice.
            Follow the 4-week roadmap, track your daily work, and test yourself with a mini mock exam.
          </p>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <StatCard label="Total Study Weeks" value="4" />
            <StatCard label="Core Vocabulary Target" value="600+" />
            <StatCard label="Daily Recommended Time" value="60-90 min" />
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-6 pb-20">
        <section className="rounded-3xl border border-amber-200 bg-white/85 p-7 shadow-sm">
          <h2 className="font-display text-2xl text-stone-900">Step 1: Follow the 4-Week Roadmap</h2>
          <p className="mt-2 text-stone-700">Select a week to focus your study goals and daily tasks.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {roadmap.map((item) => (
              <button
                key={item.week}
                type="button"
                onClick={() => setActiveWeek(item.week)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeWeek === item.week
                    ? 'bg-stone-900 text-amber-100'
                    : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                }`}
              >
                {item.week}
              </button>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-amber-50 p-5">
            <h3 className="font-semibold text-lg text-stone-900">{selectedRoadmap.title}</h3>
            <ul className="mt-3 space-y-2 text-stone-700">
              {selectedRoadmap.tasks.map((task) => (
                <li key={task} className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-amber-600" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-amber-200 bg-white/85 p-7 shadow-sm">
            <h2 className="font-display text-2xl text-stone-900">Step 2: Vocabulary Builder</h2>
            <p className="mt-2 text-stone-700">Study by category and revise each set repeatedly.</p>
            <div className="mt-5 space-y-4">
              {vocabularySets.map((set) => (
                <div key={set.category} className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <h3 className="font-semibold text-stone-900">{set.category}</h3>
                  <p className="mt-2 text-sm text-stone-700">{set.words.join(' • ')}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-amber-200 bg-white/85 p-7 shadow-sm">
            <h2 className="font-display text-2xl text-stone-900">Step 3: Grammar Essentials</h2>
            <p className="mt-2 text-stone-700">Memorize high-frequency patterns first.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {grammarPoints.map((point) => (
                <div key={point} className="rounded-xl bg-amber-100/70 px-4 py-3 text-sm font-medium text-amber-900">
                  {point}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-3xl border border-amber-200 bg-white/85 p-7 shadow-sm">
          <h2 className="font-display text-2xl text-stone-900">Step 4: Daily Study Planner</h2>
          <p className="mt-2 text-stone-700">Complete each task every day and keep your momentum high.</p>
          <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-amber-100">
            <div
              className="h-full rounded-full bg-linear-to-r from-amber-500 to-orange-500 transition-all"
              style={{ width: `${plannerProgress}%` }}
            />
          </div>
          <p className="mt-2 text-sm font-medium text-stone-700">Progress: {plannerProgress}%</p>

          <div className="mt-5 grid gap-3">
            {plannerTemplate.map((task) => (
              <label
                key={task}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3"
              >
                <input
                  type="checkbox"
                  checked={plannerChecks[task]}
                  onChange={() => togglePlannerTask(task)}
                  className="h-4 w-4 rounded border-amber-500 text-amber-700 focus:ring-amber-500"
                />
                <span className={`text-sm ${plannerChecks[task] ? 'line-through text-stone-500' : 'text-stone-800'}`}>
                  {task}
                </span>
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-amber-200 bg-white/85 p-7 shadow-sm">
          <h2 className="font-display text-2xl text-stone-900">Step 5: Mini Mock Test</h2>
          <p className="mt-2 text-stone-700">Pick one answer for each question, then submit to see your score.</p>

          <div className="mt-6 space-y-5">
            {mockQuestions.map((q, index) => (
              <article key={q.question} className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <h3 className="font-semibold text-stone-900">
                  Q{index + 1}. {q.question}
                </h3>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {q.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => chooseAnswer(index, option)}
                      className={`rounded-lg border px-3 py-2 text-left text-sm font-medium transition ${
                        answers[index] === option
                          ? 'border-stone-900 bg-stone-900 text-amber-100'
                          : 'border-amber-300 bg-white text-stone-800 hover:bg-amber-100'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={submitMockTest}
              className="rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-semibold text-amber-100 hover:bg-black"
            >
              Submit Test
            </button>
            <button
              type="button"
              onClick={resetMockTest}
              className="rounded-xl border border-amber-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-800 hover:bg-amber-100"
            >
              Reset
            </button>
          </div>

          {submitted && (
            <div className="mt-5 rounded-2xl bg-emerald-100 px-4 py-3 text-emerald-900">
              <p className="font-semibold">
                Your score: {score}/{mockQuestions.length}
              </p>
              <p className="text-sm">
                {score >= 4
                  ? 'Strong progress. Keep practicing listening speed and tricky particles.'
                  : 'Good start. Focus on grammar particles and basic verb forms this week.'}
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

function StatCard({ label, value }) {
  return (
    <article className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4">
      <p className="text-xs uppercase tracking-widest text-stone-600">{label}</p>
      <p className="mt-1 text-xl font-bold text-stone-900">{value}</p>
    </article>
  )
}

export default App
