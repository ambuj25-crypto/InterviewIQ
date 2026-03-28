import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf } from "../services/interview.api"
import { useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context"
import { useParams } from "react-router"


export const useInterview = () => {

    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

const generateReport = async ({ jobDescription, selfDescription, resumeFile, previousQuestions = [],domain , type = "all" }) => {
    setLoading(true)
    let response = null

    try {
        response = await generateInterviewReport({
            jobDescription,
            selfDescription,
            resumeFile,
            domain,
            previousQuestions,
            type
        })

        if (previousQuestions.length > 0) {
            setReport(prev => {
                if (!prev) return response.interviewReport;

                return {
                    ...prev,
                    technicalQuestions:
                        type === "technical"
                            ? [...prev.technicalQuestions, ...response.interviewReport.technicalQuestions]
                            : prev.technicalQuestions,

                    behavioralQuestions:
                        type === "behavioral"
                            ? [...prev.behavioralQuestions, ...response.interviewReport.behavioralQuestions]
                            : prev.behavioralQuestions
                };
            });
        } else {
            setReport(response.interviewReport);
        }

    } catch (error) {
        console.log(error)
    } finally {
        setLoading(false)
    }

    return response?.interviewReport
}

    const getReportById = async (interviewId) => {
        setLoading(true)
        let response = null
        try {
            response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        return response.interviewReport
    }

    const getReports = async () => {
        setLoading(true)
        let response = null
        try {
            response = await getAllInterviewReports()
            setReports(response.interviewReports)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

        return response.interviewReports
    }

    const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        let response = null
        try {
            response = await generateResumePdf({ interviewReportId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
    }, [ interviewId ])

    return { loading, report, reports, generateReport, getReportById, getReports, getResumePdf }

}