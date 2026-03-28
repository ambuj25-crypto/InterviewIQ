// import React, { useState, useRef } from 'react'
// import "../style/home.scss"
// import { useInterview } from '../hooks/useInterview.js'
// import { useNavigate } from 'react-router'

// const Home = () => {

//     const { loading, generateReport, reports, report } = useInterview()
//     const [ jobDescription, setJobDescription ] = useState("")
//     const [ selfDescription, setSelfDescription ] = useState("")
//     const resumeInputRef = useRef()

//     const navigate = useNavigate()

//     const handleMoreQuestions = async () => {
//       const resumeFile = resumeInputRef.current.files[0]
//       if (!resumeFile) {
//         alert('Please upload a resume first.')
//         return
//       }
//       await generateReport({
//         jobDescription,
//         selfDescription,
//         resumeFile,
//         previousQuestions: report?.technicalQuestions?.map(q => q.question) || []
//       })
//     }

//     const handleGenerateReport = async () => {
//         const resumeFile = resumeInputRef.current.files[ 0 ]
//         const data = await generateReport({ jobDescription, selfDescription, resumeFile })
//         navigate(`/interview/${data._id}`)
//     }

//     if (loading) {
//         return (
//             <main className='loading-screen'>
//                 <h1>Loading your interview plan...</h1>
//             </main>
//         )
//     }

//     return (
//         <div className='home-page'>

//             {/* Page Header */}
//             <header className='page-header'>
//                 <h1>Create Your Custom <span className='highlight'>Interview Plan</span></h1>
//                 <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
//             </header>

//             {/* Main Card */}
//             <div className='interview-card'>
//                 <div className='interview-card__body'>

//                     {/* Left Panel - Job Description */}
//                     <div className='panel panel--left'>
                        
//                         <div className='panel__header'>
//                             <span className='panel__icon'>
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
//                             </span>
//                             <h2>Target Job Description</h2>
//                             <span className='badge badge--required'>Required</span>
//                         </div>
//                         <textarea 
//                             onChange={(e) => { setJobDescription(e.target.value) }}
//                             className='panel__textarea'
//                             placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
//                             maxLength={5000}
//                         />
//                         <div className='char-counter'>0 / 5000 chars</div>
//                     </div>

//                     {/* Vertical Divider */}
//                     <div className='panel-divider' />

//                     {/* Right Panel - Profile */}
//                     <div className='panel panel--right'>
//                         <div className='panel__header'>
//                             <span className='panel__icon'>
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
//                             </span>
//                             <h2>Your Profile</h2>
//                         </div>

//                         {/* Upload Resume */}
//                         <div className='upload-section'>
//                             <label className='section-label'>
//                                 Upload Resume
//                                 <span className='badge badge--best'>Best Results</span>
//                             </label>
//                             <label className='dropzone' htmlFor='resume'>
//                                 <span className='dropzone__icon'>
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
//                                 </span>
//                                 <p className='dropzone__title'>Click to upload or drag &amp; drop</p>
//                                 <p className='dropzone__subtitle'>PDF or DOCX (Max 5MB)</p>
//                                 <input ref={resumeInputRef} hidden type='file' id='resume' name='resume' accept='.pdf,.docx' />
//                             </label>
//                         </div>

//                         {/* OR Divider */}
//                         <div className='or-divider'><span>OR</span></div>

//                         {/* Quick Self-Description */}
//                         <div className='self-description'>
//                             <label className='section-label' htmlFor='selfDescription'>Quick Self-Description</label>
//                             <textarea
//                                 onChange={(e) => { setSelfDescription(e.target.value) }}
//                                 id='selfDescription'
//                                 name='selfDescription'
//                                 className='panel__textarea panel__textarea--short'
//                                 placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
//                             />
//                         </div>

//                         {/* Info Box */}
//                         <div className='info-box'>
//                             <span className='info-box__icon'>
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" /></svg>
//                             </span>
//                             <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Card Footer */}
//                 <div className='interview-card__footer'>
//                     <span className='footer-info'>AI-Powered Strategy Generation &bull; Approx 30s</span>
//                     <button
//                         onClick={handleGenerateReport}
//                         className='generate-btn'>
//                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
//                         Generate My Interview Strategy
//                     </button>
//                     {/* <button
//                         onClick={handleMoreQuestions}
//                         disabled={!report || report.technicalQuestions?.length === 0}
//                         className='generate-btn'>
//                         ➕ Generate More Questions
//                     </button> */}
//                 </div>
//             </div>

//             {/* Recent Reports List */}
//             {reports.length > 0 && (
//                 <section className='recent-reports'>
//                     <h2>My Recent Interview Plans</h2>
//                     <ul className='reports-list'>
//                         {reports.map(report => (
//                            <li
//                                  key={report?._id}
//                                 className="report-item"
//                                  onClick={() => {
//                                   if (!report?._id) {
//                                     console.log("Invalid report:", report);
//                                     return;
//                                   }
//                                   navigate(`/interview/${report._id}`);
//                                  }}
//                                 >                               
//                                 <h3>{report.title || 'Untitled Position'}</h3>
//                                 <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
//                                 <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>Match Score: {report.matchScore}%</p>
//                             </li>
//                         ))}
//                     </ul>
//                 </section>
//             )}

            
//             {/* <footer className='page-footer'>
//                 <a href='#'>Privacy Policy</a>
//                 <a href='#'>Terms of Service</a>
//                 <a href='#'>Help Center</a>
//             </footer> */}
//         </div>
//     )
// }

// export default Home


import React, { useState, useRef } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'

const Home = () => {

    const { loading, generateReport, reports, report } = useInterview()
    const [ jobDescription, setJobDescription ] = useState("")
    const [ selfDescription, setSelfDescription ] = useState("")
    const [ fileName, setFileName ] = useState(null)
    const [ jobCharCount, setJobCharCount ] = useState(0)
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleMoreQuestions = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        if (!resumeFile) {
            alert('Please upload a resume first.')
            return
        }
        await generateReport({
            jobDescription,
            selfDescription,
            resumeFile,
            previousQuestions: report?.technicalQuestions?.map(q => q.question) || []
        })
    }

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        navigate(`/interview/${data._id}`)
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) setFileName(file.name)
    }

    const handleJobChange = (e) => {
        setJobDescription(e.target.value)
        setJobCharCount(e.target.value.length)
    }

    if (loading) {
        return (
            <main className='loading-screen'>
                <div className='loading-screen__inner'>
                    <div className='loading-screen__ring' />
                    <h1>Building your interview plan...</h1>
                    <p>AI analysis takes ~15 seconds</p>
                </div>
            </main>
        )
    }

    return (
        <div className='home-page'>

            {/* ── Top Nav ── */}
            <nav className='home-nav'>
                <div className='home-nav__brand'>
                    <div className='home-nav__logo'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                    </div>
                    <span className='home-nav__name'>InterviewIQ</span>
                </div>
                {/* <div className='home-nav__avatar'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                </div> */}
            </nav>

            {/* ── Hero ── */}
            <header className='page-header'>
                <p className='page-header__eyebrow'>Smarter Interview Preparation with AI</p>
                <h1>Create Your Custom <span className='highlight'>Interview Plan</span></h1>
                <p className='page-header__sub'>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
            </header>

            {/* ── Main Card ── */}
            <div className='interview-card'>

                {/* ── Desktop: Side by Side / Mobile: Stacked ── */}
                <div className='interview-card__body'>

                    {/* Left Panel - Job Description */}
                    <div className='panel panel--left'>
                        <div className='panel__header'>
                            <div className='panel__icon-wrap'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                            </div>
                            <div className='panel__title-group'>
                                <h2>Target Job Description</h2>
                                <span className='panel__step'>STEP 1: INPUT THE ROLE</span>
                            </div>
                            <span className='badge badge--required'>Required</span>
                        </div>

                        <div className='panel__textarea-wrap'>
                            <textarea
                                onChange={handleJobChange}
                                className='panel__textarea'
                                placeholder={`Paste the job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript...'`}
                                maxLength={5000}
                            />
                            <div className='panel__textarea-footer'>
                                <span className='char-counter'>{jobCharCount} / 5000</span>
                                <span className='ai-ready'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821765 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956Z"/></svg>
                                    AI READY
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className='panel-divider' />

                    {/* Right Panel - Profile */}
                    <div className='panel panel--right'>
                        <div className='panel__header'>
                            <div className='panel__icon-wrap panel__icon-wrap--green'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            </div>
                            <div className='panel__title-group'>
                                <h2>Your Profile</h2>
                                <span className='panel__step'>STEP 2: DEFINE YOUR EDGE</span>
                            </div>
                        </div>

                        {/* Upload Resume */}
                        <label className='dropzone' htmlFor='resume'>
                            <div className='dropzone__icon-wrap'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
                            </div>
                            {fileName ? (
                                <>
                                    <p className='dropzone__title dropzone__title--uploaded'>{fileName}</p>
                                    <p className='dropzone__subtitle'>✓ Resume uploaded</p>
                                </>
                            ) : (
                                <>
                                    <p className='dropzone__title'>Upload Resume</p>
                                    <p className='dropzone__subtitle'>PDF OR DOCX &bull; MAX 5MB</p>
                                </>
                            )}
                            <input
                                ref={resumeInputRef}
                                hidden
                                type='file'
                                id='resume'
                                name='resume'
                                accept='.pdf,.docx'
                                onChange={handleFileChange}
                            />
                        </label>

                        {/* Self Description */}
                        <div className='self-description'>
                            <label className='section-label' htmlFor='selfDescription'>SELF-DESCRIPTION &amp; GOALS</label>
                            <textarea
                                onChange={(e) => setSelfDescription(e.target.value)}
                                id='selfDescription'
                                name='selfDescription'
                                className='panel__textarea panel__textarea--short'
                                placeholder="E.g. Senior Backend Dev looking to move into Tech Lead roles with focus on AWS..."
                            />
                        </div>

                        {/* Info Box */}
                        <div className='info-box'>
                            <span className='info-box__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2"/><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2"/></svg>
                            </span>
                            <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required.</p>
                        </div>
                    </div>
                </div>

                {/* ── Card Footer ── */}
                <div className='interview-card__footer'>
                    <span className='footer-info'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        AI-Powered &bull; ~30 seconds
                    </span>
                    <button onClick={handleGenerateReport} className='generate-btn'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821765 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956Z"/></svg>
                        Generate My Interview Strategy
                    </button>
                </div>
            </div>

            {/* ── Mobile: sticky generate button ── */}
            <div className='mobile-generate-wrap'>
                <button onClick={handleGenerateReport} className='mobile-generate-btn'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821765 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956Z"/></svg>
                    Generate My Interview Strategy
                </button>
                <p className='mobile-generate-wrap__sub'>START PREPARATION &bull; ANALYSIS TAKES ~15 SECONDS</p>
            </div>

            {/* ── Recent Reports ── */}
            {reports.length > 0 && (
                <section className='recent-reports'>
                    <h2>My Recent Interview Plans</h2>
                    <ul className='reports-list'>
                        {reports.map(report => (
                            <li
                                key={report?._id}
                                className="report-item"
                                onClick={() => {
                                    if (!report?._id) return
                                    navigate(`/interview/${report._id}`)
                                }}
                            >
                                <div className='report-item__score-dot' style={{
                                    background: report.matchScore >= 80 ? '#3de8a0' : report.matchScore >= 60 ? '#f5a623' : '#ff4d4d'
                                }} />
                                <div className='report-item__body'>
                                    <h3>{report.title || 'Untitled Position'}</h3>
                                    <p className='report-meta'>{new Date(report.createdAt).toLocaleDateString()}</p>
                                </div>
                                <span className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>
                                    {report.matchScore}%
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    )
}

export default Home