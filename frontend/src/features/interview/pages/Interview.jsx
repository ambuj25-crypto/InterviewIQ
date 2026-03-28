// import React, { useState, useEffect } from 'react'
// import '../style/interview.scss'
// import { useInterview } from '../hooks/useInterview.js'
// import { useNavigate, useParams } from 'react-router'



// const NAV_ITEMS = [
//     { id: 'technical', label: 'Domain Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
//     { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
//     { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
// ]

// // ── Sub-components ────────────────────────────────────────────────────────────
// const QuestionCard = ({ item, index }) => {
//     const [ open, setOpen ] = useState(false)
//     return (
//         <div className='q-card'>
//             <div className='q-card__header' onClick={() => setOpen(o => !o)}>
//                 <span className='q-card__index'>Q{index + 1}</span>
//                 <p className='q-card__question'>{item.question}</p>
//                 <span className={`q-card__chevron ${open ? 'q-card__chevron--open' : ''}`}>
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
//                 </span>
//             </div>
//             {open && (
//                 <div className='q-card__body'>
//                     <div className='q-card__section'>
//                         <span className='q-card__tag q-card__tag--intention'>Intention</span>
//                         <p>{item.intention}</p>
//                     </div>
//                     <div className='q-card__section'>
//                         <span className='q-card__tag q-card__tag--answer'>Model Answer</span>
//                         <p>{item.answer}</p>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }


// const RoadMapDay = ({ day }) => (
//     <div className='roadmap-day'>
//         <div className='roadmap-day__header'>
//             <span className='roadmap-day__badge'>Day {day.day}</span>
//             <h3 className='roadmap-day__focus'>{day.focus}</h3>
//         </div>
//         <ul className='roadmap-day__tasks'>
//             {day.tasks.map((task, i) => (
//                 <li key={i}>
//                     <span className='roadmap-day__bullet' />
//                     {task}
//                 </li>
//             ))}
//         </ul>
//     </div>
// )

// // ── Main Component ────────────────────────────────────────────────────────────
// const Interview = () => {

//     const [activeTab, setActiveTab] = useState("dashboard");


// useEffect(() => {
//   if (activeTab === "practice") {
//     setActiveNav("technical");
//   }

//   if (activeTab === "skills") {
//     setActiveNav("roadmap");
//   }

//   if (activeTab === "dashboard") {
//     setActiveNav("technical");
//   }
// }, [activeTab]);
//     const [ activeNav, setActiveNav ] = useState('technical')
//     const { report, getReportById, loading, getResumePdf, generateReport } = useInterview()
//     const { interviewId } = useParams()

//     const handleMoreTechnical = async () => {
//       const previousQuestions = report?.technicalQuestions?.map(q => q.question) || [];

//       await generateReport({
//         jobDescription: report.jobDescription,
//         selfDescription: report.selfDescription,
//         previousQuestions,
//         type: "technical"
//       });
//     };

//     const handleMoreBehavioral = async () => {
//       const previousQuestions = report?.behavioralQuestions?.map(q => q.question) || [];

//       await generateReport({
//         jobDescription: report.jobDescription,
//         selfDescription: report.selfDescription,
//         previousQuestions,
//         type: "behavioral"
//       });
//     };

//     useEffect(() => {
//         if (interviewId) {
//             getReportById(interviewId)
//         }
//     }, [ interviewId ])



//     if (loading || !report) {
//         return (
//             <main className='loading-screen'>
//                 <h1>Loading your interview plan...</h1>
//             </main>
//         )
//     }

//     const scoreColor =
//         report.matchScore >= 80 ? 'score--high' :
//             report.matchScore >= 60 ? 'score--mid' : 'score--low'


//     return (
//         <div className='interview-page'>
//             <div className='interview-layout'>

//                 {/* ── Left Nav ── */}
//                 {activeTab === "dashboard" && (
//                 <nav className='interview-nav'>
//                     <div className="nav-content">
//                         <p className='interview-nav__label'>Sections</p>
//                         {NAV_ITEMS.map(item => (
//                             <button
//                                 key={item.id}
//                                 className={`interview-nav__item ${activeNav === item.id ? 'interview-nav__item--active' : ''}`}
//                                 onClick={() => setActiveNav(item.id)}
//                             >
//                                 <span className='interview-nav__icon'>{item.icon}</span>
//                                 {item.label}
//                             </button>
//                         ))}
//                     </div>
//                     <button
//                         onClick={() => { getResumePdf(interviewId) }}
//                         className='button primary-button' >
//                         <svg height={"0.8rem"} style={{ marginRight: "0.8rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821765 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
//                         Download Resume
//                     </button>
//                 </nav>)}

//                 <div className='interview-divider' />

//                 {/* ── Center Content ── */}
                
//                 <main className='interview-content'>
//                     {activeNav === 'technical' && (
//                         <section>
//                             <div className='content-header'>
//                                 <h2>Domain Questions</h2>
//                                 <span className='content-header__count'>{report.technicalQuestions.length} questions</span>
//                             </div>
//                             <div className='q-list'>
//                                 {report.technicalQuestions.map((q, i) => (
//                                     <QuestionCard key={i} item={q} index={i} />
//                                 ))}
//                             </div>
//                             <button 
//                               className="more-questions-btn"
//                               onClick={handleMoreTechnical}
//                               disabled={(report?.technicalQuestions?.length || 0) >= 30}
//                             >
//                               Generate More Domain Questions
//                             </button>
//                             <p style={{ marginTop: "8px", fontSize: "12px", opacity: 0.7 }}>
//                               Max 30 questions allowed
//                             </p>
//                         </section>
//                     )}

//                     {activeNav === 'behavioral' && (
//                         <section>
//                             <div className='content-header'>
//                                 <h2>Behavioral Questions</h2>
//                                 <span className='content-header__count'>{report.behavioralQuestions.length} questions</span>
//                             </div>
//                             <div className='q-list'>
//                                 {report.behavioralQuestions.map((q, i) => (
//                                     <QuestionCard key={i} item={q} index={i} />
//                                 ))}
//                             </div>
//                             <button 
//                               className="more-questions-btn"
//                               onClick={handleMoreBehavioral}
//                               disabled={(report?.behavioralQuestions?.length || 0) >= 30}
//                             >
//                               Generate More Behavioral Questions
//                             </button>
//                             <p style={{ marginTop: "8px", fontSize: "12px", opacity: 0.7 }}>
//                               Max 30 questions allowed
//                             </p>
//                         </section>
//                     )}

//                     {activeNav === 'roadmap' && (
//                         <section>
//                             <div className='content-header'>
//                                 <h2>Preparation Road Map</h2>
//                                 <span className='content-header__count'>{report.preparationPlan.length}-day plan</span>
//                             </div>
//                             <div className='roadmap-list'>
//                                 {report.preparationPlan.map((day) => (
//                                     <RoadMapDay key={day.day} day={day} />
//                                 ))}
//                             </div>
//                         </section>
//                     )}
//                 </main>

//                 <div className='interview-divider' />

//                 {/* ── Right Sidebar ── */}
//                 <aside className='interview-sidebar'>

//                     {/* Match Score */}
//                     <div className='match-score'>
//                         <p className='match-score__label'>Match Score</p>
//                         <div className={`match-score__ring ${scoreColor}`}>
//                             <span className='match-score__value'>{report.matchScore}</span>
//                             <span className='match-score__pct'>%</span>
//                         </div>
//                         <p className='match-score__sub'>Strong match for this role</p>
//                     </div>

//                     <div className='sidebar-divider' />

//                     {/* Skill Gaps */}
//                     <div className='skill-gaps'>
//                         <p className='skill-gaps__label'>Skill Gaps</p>
//                         <div className='skill-gaps__list'>
//                             {report.skillGaps.map((gap, i) => (
//                                 <span key={i} className={`skill-tag skill-tag--${gap.severity}`}>
//                                     {gap.skill}
//                                 </span>
//                             ))}
//                         </div>
//                     </div>

//                 </aside>

//                 <div className="bottom-nav">
//                     <button 
//                         className={activeTab === "dashboard" ? "active" : ""}
//                         onClick={() => setActiveTab("dashboard")}
//                     >
//                         Dashboard
//                     </button>

//                     <button 
//                         className={activeTab === "practice" ? "active" : ""}
//                         onClick={() => setActiveTab("practice")}
//                     >
//                         Practice
//                     </button>

//                     <button 
//                         className={activeTab === "skills" ? "active" : ""}
//                         onClick={() => setActiveTab("skills")}
//                     >
//                         Score & Skills
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Interview
import React, { useState, useEffect } from 'react'
import '../style/interview.scss'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, useParams } from 'react-router'

const NAV_ITEMS = [
    { id: 'technical', label: 'Domain Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className='q-card'>
            <div className='q-card__header' onClick={() => setOpen(o => !o)}>
                <span className='q-card__index'>Q{index + 1}</span>
                <p className='q-card__question'>{item.question}</p>
                <span className={`q-card__chevron ${open ? 'q-card__chevron--open' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {open && (
                <div className='q-card__body'>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--intention'>Intention</span>
                        <p>{item.intention}</p>
                    </div>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--answer'>Model Answer</span>
                        <p>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className='roadmap-day'>
        <div className='roadmap-day__header'>
            <span className='roadmap-day__badge'>Day {day.day}</span>
            <h3 className='roadmap-day__focus'>{day.focus}</h3>
        </div>
        <ul className='roadmap-day__tasks'>
            {day.tasks.map((task, i) => (
                <li key={i}>
                    <span className='roadmap-day__bullet' />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

// ── Mobile Dashboard Screen ───────────────────────────────────────────────────
const MobileDashboard = ({ report, scoreColor, onNavigate, onDownload }) => {
    const dashItems = [
        {
            id: 'technical',
            label: 'Domain Questions',
            sub: 'Deep dive into technical stacks',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                </svg>
            ),
            iconBg: '#1a2d3a',
            iconColor: '#3de8a0',
        },
        {
            id: 'behavioral',
            label: 'Behavioral Questions',
            sub: 'Soft skills and scenario analysis',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
            ),
            iconBg: '#1a2d2a',
            iconColor: '#3de8a0',
        },
        {
            id: 'roadmap',
            label: 'Roadmap',
            sub: 'Your personalized career path',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 7l9-4 9 4v10l-9 4-9-4V7z" />
                </svg>
            ),
            iconBg: '#2d1a33',
            iconColor: '#e879f9',
        },
    ]

    const circumference = 2 * Math.PI * 40
    const offset = circumference - (report.matchScore / 100) * circumference

    return (
        <div className='mobile-dashboard'>
            {/* Header */}
            <div className='mobile-header'>
                <div className='mobile-header__brand'>
                    <div className='mobile-header__avatar'>
                         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                    </div>
                    <span className='mobile-header__title'>InterviewIQ</span>
                </div>
                {/* <button className='mobile-header__btn' onClick={onDownload}>Download Resume</button> */}
            </div>

            {/* Hero */}
            <div className='mobile-dashboard__hero'>
                <p className='mobile-dashboard__system'>Overview</p>
                <h1 className='mobile-dashboard__heading'>Interview Readiness</h1>
            </div>

            {/* Score Card */}
            <div className='mobile-score-card'>
                <div className='mobile-score-card__left'>
                    <p className='mobile-score-card__label'>INTERVIEW MATCH SCORE</p>
                    <div className='mobile-score-card__value'>
                        <span className='mobile-score-card__num'>{report.matchScore}</span>
                        <span className='mobile-score-card__pct'>%</span>
                    </div>
                </div>
                <div className='mobile-score-card__ring'>
                    <svg width="100" height="100" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#1e2535" strokeWidth="8" />
                        <circle
                            cx="50" cy="50" r="40"
                            fill="none"
                            stroke={report.matchScore >= 80 ? '#3de8a0' : report.matchScore >= 60 ? '#f5a623' : '#ff4d4d'}
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            transform="rotate(-90 50 50)"
                        />
                    </svg>
                </div>
            </div>

            {/* Nav Cards */}
            <div className='mobile-nav-cards'>
                {dashItems.map(item => (
                    <button
                        key={item.id}
                        className='mobile-nav-card'
                        onClick={() => onNavigate(item.id)}
                    >
                        <div className='mobile-nav-card__icon' style={{ background: item.iconBg, color: item.iconColor }}>
                            {item.icon}
                        </div>
                        <div className='mobile-nav-card__text'>
                            <p className='mobile-nav-card__title'>{item.label}</p>
                            <p className='mobile-nav-card__sub'>{item.sub}</p>
                        </div>
                        <svg className='mobile-nav-card__arrow' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                    </button>
                ))}
            </div>

            {/* Download Resume */}
            <button className='mobile-download-btn' onClick={onDownload}>
                Download Resume
            </button>
            <p className='mobile-dashboard__updated'>Download AI-Optimized Resume</p>
        </div>
    )
}

// ── Mobile Practice Screen ────────────────────────────────────────────────────
const MobilePractice = ({ report, activeNav, setActiveNav, onMoreTechnical, onMoreBehavioral, onDownload }) => {
    const filterTabs = ['All Questions', 'Technical', 'Behavioral', 'Roadmap']

    // Sync filterTab with activeNav when navigating from dashboard cards
    const initialFilter = activeNav === 'behavioral' ? 'Behavioral' : activeNav === 'roadmap' ? 'Roadmap' : activeNav === 'technical' ? 'Technical' : 'All Questions'
    const [filterTab, setFilterTab] = useState(initialFilter)

    // Keep filterTab in sync if activeNav changes (e.g. from dashboard navigation)
    useEffect(() => {
        if (activeNav === 'behavioral') setFilterTab('Behavioral')
        else if (activeNav === 'technical') setFilterTab('Technical')
        else if (activeNav === 'roadmap') setFilterTab('Roadmap')
    }, [activeNav])

    // Fix: derive questions from filterTab, not activeNav
    const questions =
        filterTab === 'All Questions'
            ? [...(report.technicalQuestions || []), ...(report.behavioralQuestions || [])]
            : filterTab === 'Behavioral'
                ? report.behavioralQuestions
                : report.technicalQuestions

    const handleFilterTab = (tab) => {
        setFilterTab(tab)
        if (tab === 'Technical') setActiveNav('technical')
        else if (tab === 'Behavioral') setActiveNav('behavioral')
        else if (tab === 'Roadmap') setActiveNav('roadmap')
        else setActiveNav('technical')
    }

    return (
        <div className='mobile-practice'>
            {/* Header */}
            <div className='mobile-header'>
                <div className='mobile-header__brand'>
                    <div className='mobile-header__avatar'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                    </div>
                    <span className='mobile-header__title'>InterviewIQ</span>
                </div>
                {/* <button className='mobile-header__btn' onClick={onDownload}>DOWNLOAD RESUME</button> */}
            </div>

            {/* Hero */}
            <div className='mobile-practice__hero'>
                <p className='mobile-practice__label'>Practice Arena</p>
                <h1 className='mobile-practice__heading'>Question Bank</h1>
                <p className='mobile-practice__sub'>Practice role-specific questions tailored to your profile.</p>
            </div>

            {/* Filter Tabs */}
            <div className='mobile-filter-tabs'>
                {filterTabs.map(tab => (
                    <button
                        key={tab}
                        className={`mobile-filter-tab ${filterTab === tab ? 'mobile-filter-tab--active' : ''}`}
                        onClick={() => handleFilterTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Questions — hidden when Roadmap tab is active */}
            {filterTab !== 'Roadmap' && (
                <div className='mobile-q-list'>
                    {questions.map((q, i) => (
                        <MobilePracticeCard key={i} item={q} index={i} />
                    ))}
                </div>
            )}

            {/* Roadmap — shown only when Roadmap tab is active */}
            {filterTab === 'Roadmap' && (
                <div className='roadmap-list' style={{ margin: '0 1.25rem' }}>
                    {report.preparationPlan.map((day) => (
                        <RoadMapDay key={day.day} day={day} />
                    ))}
                </div>
            )}

            {/* More Questions Btn — hidden on Roadmap tab */}
            {filterTab !== 'Roadmap' && (
            <button
                className="more-questions-btn"
                onClick={activeNav === 'behavioral' ? onMoreBehavioral : onMoreTechnical}
                disabled={(activeNav === 'behavioral'
                    ? report?.behavioralQuestions?.length
                    : report?.technicalQuestions?.length) >= 30}
            >
                Generate More Questions
            </button>
            )}

            {/* AI Insight Card */}
            <div className='mobile-insight-card'>
                <p className='mobile-insight-card__label'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
                    AI PRACTICE INSIGHT
                </p>
                <h3 className='mobile-insight-card__heading'>You're solving questions faster than average.</h3>
                <p className='mobile-insight-card__body'>Focus on areas with skill gaps for maximum improvement before your interview.</p>
            </div>
        </div>
    )
}

const MobilePracticeCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className={`mobile-q-card ${open ? 'mobile-q-card--open' : ''}`}>
            <div className='mobile-q-card__header' onClick={() => setOpen(o => !o)}>
                <div className='mobile-q-card__meta'>
                    <span className='mobile-q-card__tag'>DOMAIN</span>
                    <span className='mobile-q-card__level'>MID-LEVEL</span>
                </div>
                <p className='mobile-q-card__question'>{item.question}</p>
                {open && (
                    <div className='mobile-q-card__body'>
                        <p className='mobile-q-card__keypoints'><span>Key Points:</span> {item.intention}</p>
                        <p className='mobile-q-card__answer'>{item.answer}</p>
                        <button className='mobile-q-card__practice-btn'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 8 12 12 14 14" /></svg>
                            PRACTICE THIS ANSWER
                        </button>
                    </div>
                )}
            </div>
            <button className='mobile-q-card__chevron' onClick={() => setOpen(o => !o)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points={open ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} /></svg>
            </button>
        </div>
    )
}

// ── Mobile Score & Skills Screen ──────────────────────────────────────────────
const MobileScoreSkills = ({ report, scoreColor, onDownload }) => {
    const circumference = 2 * Math.PI * 54
    const offset = circumference - (report.matchScore / 100) * circumference

    const strokeColor = report.matchScore >= 80 ? '#3de8a0' : report.matchScore >= 60 ? '#f5a623' : '#ff4d4d'

    // Map skill gaps to detailed cards for display
    const highGaps = report.skillGaps.filter(g => g.severity === 'high')
    const medGaps = report.skillGaps.filter(g => g.severity === 'medium')
    const lowGaps = report.skillGaps.filter(g => g.severity === 'low')

    return (
        <div className='mobile-score-skills'>
            {/* Header */}
            <div className='mobile-header'>
                <div className='mobile-header__brand'>
                    <div className='mobile-header__avatar'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                    </div>
                    <span className='mobile-header__title'>InterviewIQ</span>
                </div>
                {/* <button className='mobile-header__btn' onClick={onDownload}>Download Resume</button> */}
            </div>

            {/* Hero */}
            <div className='mobile-ss__hero'>
                <p className='mobile-ss__label'>AI-Powered Insights</p>
                <h1 className='mobile-ss__heading'>Interview Readiness</h1>
            </div>

            {/* Big Score Ring */}
            <div className='mobile-ss__ring-wrap'>
                <svg width="140" height="140" viewBox="0 0 140 140">
                    <circle cx="70" cy="70" r="54" fill="none" stroke="#1e2535" strokeWidth="10" />
                    <circle
                        cx="70" cy="70" r="54"
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        transform="rotate(-90 70 70)"
                    />
                </svg>
                <div className='mobile-ss__ring-inner'>
                    <span className='mobile-ss__ring-val'>{report.matchScore}%</span>
                    <span className='mobile-ss__ring-sub'>MATCH SCORE</span>
                </div>
            </div>

            {/* Confidence / Next Step */}
            <div className='mobile-ss__meta-row'>
                <div className='mobile-ss__meta-card'>
                    <p className='mobile-ss__meta-label'>CONFIDENCE LEVEL</p>
                    <p className='mobile-ss__meta-val'>
                        {report.matchScore >= 80 ? 'High' : report.matchScore >= 60 ? 'Medium' : 'Low'}
                    </p>
                </div>
                <div className='mobile-ss__meta-card'>
                    <p className='mobile-ss__meta-label'>RECOMMENDED FOCUS</p>
                    <p className='mobile-ss__meta-val'>Behavioral questions</p>
                </div>
            </div>

            {/* Skill Gaps */}
            <div className='mobile-ss__gaps-header'>
                <h2 className='mobile-ss__gaps-title'>Identified Skill Gaps</h2>
                <span className='mobile-ss__gaps-count'>{report.skillGaps.length} AREAS TO IMPROVE</span>
            </div>

            {/* Critical Gap Cards */}
            {highGaps.map((gap, i) => (
                <div key={i} className='mobile-gap-card mobile-gap-card--critical'>
                    <div className='mobile-gap-card__header'>
                        <span className='mobile-gap-card__severity'>CRITICAL GAP</span>
                        <span className='mobile-gap-card__icon'>!</span>
                    </div>
                    <h3 className='mobile-gap-card__title'>{gap.skill}</h3>
                    <p className='mobile-gap-card__desc'>Lack of hands-on experience may impact your ability to solve real-world problems during interviews.</p>
                    <div className='mobile-gap-card__tags'>
                        <span className='mobile-gap-tag'>High Impact</span>
                        <span className='mobile-gap-tag'>High Impact</span>
                         <span className='mobile-gap-tag'> Interview Critical</span>
                    </div>
                </div>
            ))}

            {/* Medium Gap Cards */}
            {medGaps.map((gap, i) => (
                <div key={i} className='mobile-gap-card mobile-gap-card--moderate'>
                    <div className='mobile-gap-card__header'>
                        <span className='mobile-gap-card__severity'>MODERATE GAP</span>
                        <span className='mobile-gap-card__icon'>⚡</span>
                    </div>
                    <h3 className='mobile-gap-card__title'>{gap.skill}</h3>
                    <p className='mobile-gap-card__desc'>Moderate proficiency gap that could be strengthened with focused practice.</p>
                    <div className='mobile-gap-card__tags'>
                        <span className='mobile-gap-tag'>Review Questions</span>
                        <span className='mobile-gap-tag'>Start Practice</span>
                    </div>
                </div>
            ))}

            {/* Low Gap Grid */}
            {lowGaps.length > 0 && (
                <div className='mobile-gap-grid'>
                    {lowGaps.map((gap, i) => (
                        <div key={i} className='mobile-gap-mini'>
                            <div className='mobile-gap-mini__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                            </div>
                            <p className='mobile-gap-mini__title'>{gap.skill}</p>
                            <span className='mobile-gap-mini__badge'>REVIEW REQ</span>
                        </div>
                    ))}
                </div>
            )}

            {/* AI Recommendation */}
            <div className='mobile-ss__recommendation'>
                <div className='mobile-ss__rec-header'>
                    <span className='mobile-ss__rec-icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
                    </span>
                    <h3 className='mobile-ss__rec-title'>AI Recommendation</h3>
                </div>
                <p className='mobile-ss__rec-body'>
                    "You are performing well overall. Focus on your weakest skill gaps and practice structured answers to improve interview performance."
                </p>
            </div>

            {/* Download */}
            <button className='mobile-download-btn' onClick={onDownload}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                Download Resume
            </button>
            <p className='mobile-ss__share'>Download Optimized Resume</p>
        </div>
    )
}

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [activeTab, setActiveTab] = useState("dashboard")
    const [activeNav, setActiveNav] = useState('technical')
    const { report, getReportById, loading, getResumePdf, generateReport } = useInterview()
    const { interviewId } = useParams()

    useEffect(() => {
        if (activeTab === "skills") setActiveNav("roadmap")
    }, [activeTab])

    const handleMoreTechnical = async () => {
        const previousQuestions = report?.technicalQuestions?.map(q => q.question) || []
        await generateReport({
            jobDescription: report.jobDescription,
            selfDescription: report.selfDescription,
            previousQuestions,
            type: "technical"
        })
    }

    const handleMoreBehavioral = async () => {
        const previousQuestions = report?.behavioralQuestions?.map(q => q.question) || []
        await generateReport({
            jobDescription: report.jobDescription,
            selfDescription: report.selfDescription,
            previousQuestions,
            type: "behavioral"
        })
    }

    useEffect(() => {
        if (interviewId) getReportById(interviewId)
    }, [interviewId])

    if (loading || !report) {
        return (
            <main className='loading-screen'>
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }

    const scoreColor =
        report.matchScore >= 80 ? 'score--high' :
            report.matchScore >= 60 ? 'score--mid' : 'score--low'

    const handleDashboardNavigate = (sectionId) => {
        setActiveNav(sectionId)
        setActiveTab("practice")
    }

    const handleDownload = () => getResumePdf(interviewId)

    return (
        <div className='interview-page'>
            <div className='interview-layout'>

                {/* ── Desktop: Left Nav ── */}
                {activeTab === "dashboard" && (
                    <nav className='interview-nav'>
                        <div className="nav-content">
                            <p className='interview-nav__label'>Sections</p>
                            {NAV_ITEMS.map(item => (
                                <button
                                    key={item.id}
                                    className={`interview-nav__item ${activeNav === item.id ? 'interview-nav__item--active' : ''}`}
                                    onClick={() => setActiveNav(item.id)}
                                >
                                    <span className='interview-nav__icon'>{item.icon}</span>
                                    {item.label}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={handleDownload}
                            className='button primary-button'>
                            <svg height={"0.8rem"} style={{ marginRight: "0.8rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821765 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z" /></svg>
                            Download Resume
                        </button>
                    </nav>
                )}

                <div className='interview-divider' />

                {/* ── Desktop: Center Content ── */}
                <main className='interview-content'>
                    {activeNav === 'technical' && (
                        <section>
                            <div className='content-header'>
                                <h2>Domain Questions</h2>
                                <span className='content-header__count'>{report.technicalQuestions.length} questions</span>
                            </div>
                            <div className='q-list'>
                                {report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                            <button
                                className="more-questions-btn"
                                onClick={handleMoreTechnical}
                                disabled={(report?.technicalQuestions?.length || 0) >= 30}
                            >
                                Generate More Domain Questions
                            </button>
                            <p style={{ marginTop: "8px", fontSize: "12px", opacity: 0.7 }}>Max 30 questions allowed</p>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section>
                            <div className='content-header'>
                                <h2>Behavioral Questions</h2>
                                <span className='content-header__count'>{report.behavioralQuestions.length} questions</span>
                            </div>
                            <div className='q-list'>
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                            <button
                                className="more-questions-btn"
                                onClick={handleMoreBehavioral}
                                disabled={(report?.behavioralQuestions?.length || 0) >= 30}
                            >
                                Generate More Behavioral Questions
                            </button>
                            <p style={{ marginTop: "8px", fontSize: "12px", opacity: 0.7 }}>Max 30 questions allowed</p>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <div className='content-header'>
                                <h2>Preparation Road Map</h2>
                                <span className='content-header__count'>{report.preparationPlan.length}-day plan</span>
                            </div>
                            <div className='roadmap-list'>
                                {report.preparationPlan.map((day) => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                <div className='interview-divider' />

                {/* ── Desktop: Right Sidebar ── */}
                <aside className='interview-sidebar'>
                    <div className='match-score'>
                        <p className='match-score__label'>Match Score</p>
                        <div className={`match-score__ring ${scoreColor}`}>
                            <span className='match-score__value'>{report.matchScore}</span>
                            <span className='match-score__pct'>%</span>
                        </div>
                        <p className='match-score__sub'>Strong match for this role</p>
                    </div>
                    <div className='sidebar-divider' />
                    <div className='skill-gaps'>
                        <p className='skill-gaps__label'>Skill Gaps</p>
                        <div className='skill-gaps__list'>
                            {report.skillGaps.map((gap, i) => (
                                <span key={i} className={`skill-tag skill-tag--${gap.severity}`}>
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* ── Mobile Views (hidden on desktop) ── */}
                <div className='mobile-view'>
                    {activeTab === 'dashboard' && (
                        <MobileDashboard
                            report={report}
                            scoreColor={scoreColor}
                            onNavigate={handleDashboardNavigate}
                            onDownload={handleDownload}
                        />
                    )}
                    {activeTab === 'practice' && (
                        <MobilePractice
                            report={report}
                            activeNav={activeNav}
                            setActiveNav={setActiveNav}
                            onMoreTechnical={handleMoreTechnical}
                            onMoreBehavioral={handleMoreBehavioral}
                            onDownload={handleDownload}
                        />
                    )}
                    {activeTab === 'skills' && (
                        <MobileScoreSkills
                            report={report}
                            scoreColor={scoreColor}
                            onDownload={handleDownload}
                        />
                    )}
                </div>

                {/* ── Bottom Navigation ── */}
                <div className="bottom-nav">
                    <button
                        className={activeTab === "dashboard" ? "active" : ""}
                        onClick={() => setActiveTab("dashboard")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
                        DASHBOARD
                    </button>
                    <button
                        className={activeTab === "practice" ? "active" : ""}
                        onClick={() => { if (activeTab !== "practice") setActiveNav("technical"); setActiveTab("practice"); }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                        PRACTICE
                    </button>
                    <button
                        className={activeTab === "skills" ? "active" : ""}
                        onClick={() => setActiveTab("skills")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
                        SCORE &amp; SKILLS
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Interview