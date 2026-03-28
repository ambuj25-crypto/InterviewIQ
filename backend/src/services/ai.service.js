
// const { GoogleGenAI } = require("@google/genai")
// const { z } = require("zod")
// const { zodToJsonSchema } = require("zod-to-json-schema")
// const puppeteer = require("puppeteer")
// require("dotenv").config();

// const ai = new GoogleGenAI({
//     apiKey: process.env.GOOGLE_GENAI_API_KEY
// })


// const interviewReportSchema = z.object({
//     matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
//     technicalQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
//     behavioralQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
//     skillGaps: z.array(z.object({
//         skill: z.string().describe("The skill which the candidate is lacking"),
//         severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
//     })).describe("List of skill gaps in the candidate's profile along with their severity"),
//     preparationPlan: z.array(z.object({
//         day: z.number().describe("The day number in the preparation plan, starting from 1"),
//         focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
//         tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
//     })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
//     title: z.string().describe("The title of the job for which the interview report is generated"),
// })

// // async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


// //     const prompt = `Generate an interview report for a candidate with the following details:
// //                         Resume: ${resume}
// //                         Self Description: ${selfDescription}
// //                         Job Description: ${jobDescription}
// // `                       

// //     const response = await ai.models.generateContent({
// //         model: "gemini-2.5-flash-lite",
// //         contents: prompt,
// //         config: {
// //             responseMimeType: "application/json",
// //             responseSchema: zodToJsonSchema(interviewReportSchema),
// //         }
// //     })

// //     //return JSON.parse(response.text)

// //     const raw = response.text;

// //         console.log("AI RAW RESPONSE:", raw); // 🔥 debug

// //     let parsed;

// //     try {
// //         parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
// //     } catch (err) {
// //         console.log("❌ JSON PARSE ERROR:", raw);
// //                 throw new Error("AI returned invalid JSON");
// //     }

// //     return parsed;

    




// // }

// async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

//     const prompt = `Generate an interview report for a candidate with the following details:
//     Resume: ${resume}
//     Self Description: ${selfDescription}
//     Job Description: ${jobDescription}

//     Return ONLY valid JSON.
//     `

//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash-lite",
//         contents: prompt,
//         config: {
//             responseMimeType: "application/json",
//             responseSchema: zodToJsonSchema(interviewReportSchema),
//         }
//     });

//     const raw = typeof response.text === "function"
//         ? response.text()
//         : response.text;

//     console.log("🔥 AI RAW:", raw);

//     let parsed;

//     try {
//         parsed = JSON.parse(raw);
//     } catch (err) {
//         console.log("❌ JSON ERROR:", raw);
//         throw new Error("Invalid AI JSON response");
//     }

//     return parsed;
// }



// async function generatePdfFromHtml(htmlContent) {
//     const browser = await puppeteer.launch()
//     const page = await browser.newPage();
//     await page.setContent(htmlContent, { waitUntil: "networkidle0" })

//     const pdfBuffer = await page.pdf({
//         format: "A4", margin: {
//             top: "20mm",
//             bottom: "20mm",
//             left: "15mm",
//             right: "15mm"
//         }
//     })

//     await browser.close()

//     return pdfBuffer
// }

// async function generateResumePdf({ resume, selfDescription, jobDescription }) {

//     const resumePdfSchema = z.object({
//         html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
//     })

//     const prompt = `Generate resume for a candidate with the following details:
//                         Resume: ${resume}
//                         Self Description: ${selfDescription}
//                         Job Description: ${jobDescription}

//                         the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
//                         The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
//                         The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
//                         you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
//                         The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
//                         The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
//                     `

//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash-lite",
//         contents: prompt,
//         config: {
//             responseMimeType: "application/json",
//             responseSchema: zodToJsonSchema(resumePdfSchema),
//         }
//     })


//     const jsonContent = JSON.parse(response.text)

//     const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

//     return pdfBuffer

// }

// module.exports = { generateInterviewReport, generateResumePdf }


const { GoogleGenAI } = require("@google/genai");
const puppeteer = require("puppeteer");
require("dotenv").config();

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

// 🔥 HELPER: Clean + Safe JSON Parse
function safeJsonParse(text) {
    try {
        // remove unwanted text before/after JSON
        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        return JSON.parse(cleaned);
    } catch (err) {
        console.log("❌ JSON PARSE FAILED:", text);
        throw new Error("Invalid AI JSON response");
    }
}

// 🔥 MAIN FUNCTION
async function generateInterviewReport({ resume, selfDescription, jobDescription, previousQuestions = [] }) {
    try {
       const prompt = `
You are an expert interviewer and career coach for ALL professions.

================ CORE TASK ================
Generate a highly personalized interview preparation report.

================ STRICT RULES ================
- Return ONLY valid JSON
- Do NOT repeat previous questions
- EVERYTHING must be tailored to the job role

================ ROLE DETECTION (VERY IMPORTANT) ================
First, identify the domain from the job description:
Examples:
- Software → coding, system design, APIs
- Mechanical → core concepts, practical applications
- Banking/Finance → financial knowledge, case studies
- Marketing → strategy, campaigns, analytics
- HR → people management, scenarios

Then:
👉 Generate questions ONLY relevant to that domain  
👉 DO NOT generate irrelevant (e.g. coding for banking)

================ QUESTION LOGIC ================
- Technical roles → technical + problem-solving
- Non-technical roles → domain + situational
- ALL roles → behavioral questions

================ PREVIOUS QUESTIONS ================
${previousQuestions.map(q => `"${q}"`).join('\n') || 'None'}

================ OUTPUT FORMAT ================
{
  "matchScore": number (0-100),

  "technicalQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],

  "behavioralQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],

  "skillGaps": [
    {
      "skill": "",
      "severity": "low" | "medium" | "high"
    }
  ],

  "preparationPlan": [
    {
      "day": number,
      "focus": "",
      "reason": "",
      "tasks": []
    }
  ],

  "title": "job title"
}

================ ROADMAP RULES ================
- MUST be domain-specific
- MUST be based on skill gaps
- MUST include:
  ✔ focus (what to study)
  ✔ reason (why important)
  ✔ tasks (clear action steps)

Examples:
- Software → DSA, system design
- Banking → financial ratios, case studies
- Mechanical → thermodynamics, CAD tools

- Keep plan realistic (3–7 days)
- Avoid generic advice

================ DATA ================
Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: prompt
        });

        // 🔥 SAFE TEXT EXTRACTION
        const raw =
            typeof response.text === "function"
                ? response.text()
                : response.text;

       // console.log("🔥 RAW AI RESPONSE:\n", raw);

        const parsed = safeJsonParse(raw);

        // 🔥 FALLBACKS (VERY IMPORTANT)
        return {
            matchScore: parsed.matchScore || 65,
            technicalQuestions: parsed.technicalQuestions || [],
            behavioralQuestions: parsed.behavioralQuestions || [],
            skillGaps: parsed.skillGaps || [],
            preparationPlan: parsed.preparationPlan || [],
            title: parsed.title || "Software Developer"
        };

    } catch (err) {
        console.log("❌ AI ERROR:", err.message);

        // 🔥 FAIL-SAFE RESPONSE (NEVER EMPTY UI AGAIN)
        return {
            matchScore: 60,
            technicalQuestions: [
                {
                    question: "Explain your project.",
                    intention: "Check practical knowledge",
                    answer: "Explain clearly with tech stack and logic and try to make it short and accurate"
                }
            ],
            behavioralQuestions: [
                {
                    question: "Tell me about yourself",
                    intention: "Evaluate communication",
                    answer: "Summarize skills and experience and try to make it short and accurate"
                }
            ],
            skillGaps: [
                { skill: "System Design", severity: "medium" }
            ],
            preparationPlan: [
                {
                    day: 1,
                    focus: "DSA Basics",
                    tasks: ["Solve 5 problems", "Revise arrays"]
                }
            ],
            title: "Software Developer"
        };
    }
}

// 🔥 PDF GENERATION (KEEP AS IS, JUST SAFE)
async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
        format: "A4",
        margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    });

    await browser.close();
    return pdfBuffer;
}

// 🔥 RESUME PDF GENERATOR (FIXED)
async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    try {
       const prompt = `
You are a professional resume writer and ATS optimization expert.

Your task is to generate a clean, highly professional, ATS-friendly resume in HTML format.

STRICT RULES (VERY IMPORTANT):
- Resume MUST fit within ONE PAGE only,if its going beyond one page then decrease the size of font and make it fit for 1 page
- Content should be concise, not lengthy
- Avoid unnecessary words or long paragraphs
- Use bullet points wherever possible
- Keep summary short (2-3 lines max)
- Keep each section compact and structured
- Do NOT repeat information
- Use simple, ATS-friendly formatting (no fancy graphics)
- Use standard headings: Education,  Skills, Experience , Projects (if applicable),Summary
- Use clean fonts and proper spacing
- Ensure it looks like a real human-written resume
- Try to make it 90%+ ats score

CONTENT RULES:
- Tailor resume based on job description
- Highlight only relevant skills and experience
- If experience is low → focus on skills, education, and potential
- Use strong action words (e.g., Developed, Designed, Analyzed)
- Avoid "I", "my", "me"

OUTPUT FORMAT:
Return ONLY JSON:
{
  "html": "<html>...</html>"
}

DATA:

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: prompt
        });

        const raw =
            typeof response.text === "function"
                ? response.text()
                : response.text;

        const parsed = safeJsonParse(raw);

        return await generatePdfFromHtml(parsed.html);

    } catch (err) {
        console.log("❌ PDF ERROR:", err.message);
        throw err;
    }
}

module.exports = { generateInterviewReport, generateResumePdf };