import 'dotenv/config'
import 'pdf-parse'
import { z } from 'zod'
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { createRetrievalChain } from 'langchain/chains/retrieval';
import { BasePromptTemplate, ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StructuredOutputParser } from 'langchain/output_parsers';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import path from 'path';
import { LLMResult } from './llmResult';

export default async function FileProcess(filePath: string) : Promise<LLMResult> {

  // Use GeminiPro
  const llm = new ChatGoogleGenerativeAI({
      model: 'gemini-pro',
      maxOutputTokens: 2048,
  })

  const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
  })

  const loader = new PDFLoader(filePath)
  const docs = await loader.load()

  const splits = await textSplitter.splitDocuments(docs)

  const vectorStore = await MemoryVectorStore.fromDocuments(
      splits,
      new GoogleGenerativeAIEmbeddings()
  )

  const retriever = vectorStore.asRetriever();

  const systemTemplate = `
    You are an expert in extracting structured data from unstructured text. You will be provided with the text content of a PDF file, and your task is to extract the following information:

    1. **Name**: The full name of the individual.
    2. **Experience**: A brief summary of the individual's professional experience.
    3. **Address**: The physical address of the individual.
    4. **Phone**: The phone number of the individual.
    5. **Skills**: A list of the individual's skills.
    6. **Links**: Any relevant links or URLs provided.
    7. **Experiences**: A list of the individual's professional experiences, including the company name, time period, job title, and job details.
    8. **Courses**: A list of courses or certifications the individual has completed, including the course name, time period, and description.
    9. **Awards**: A list of awards or achievements the individual has received, including the award name, time period, and description.
    10. **Languages**: A list of languages the individual speaks, including the language name and proficiency level.
    11. **Hobbies**: A list of the individual's hobbies or interests.
    12. **References**: A list of references, including the reference name, position, company, phone number, and email address.
    13. **Certifications**: A list of certifications the individual has obtained, including the certification name, time period, and description.
    14. **Publications**: A list of publications the individual has authored or contributed to, including the publication name, time period, and description.
    15. **Educations**: A list of educational qualifications the individual has, including the education name, time period, and description.
    16. **About the Applicant**: A brief summary of the individual's background and qualifications.
    17. **Title**: The title or position of the individual.

    The text from the PDF file will look like this and don't summarize the text:

    ---
    Name: John Doe
    Experience: 5 years in software development.
    Address: 1234 Elm Street, Springfield, IL
    Phone: (123) 456-7890
    Skills: JavaScript, Python, React, Node.js
    Links: www.johndoe.com
    Experiences:
    - Company: ABC Inc.
      Time: 2015-2017
      Title: Software Engineer
      Job Detail: Developed web applications using React and Node.js.
    - Company: XYZ Corp.
      Time: 2017-2020
      Title: Senior Software Engineer
      Job Detail: Led a team of developers in building a new product.

    Courses:
    - Name: Web Development Bootcamp
      Time: 2016
      Description: Intensive course covering front-end and back-end development.
    
    Awards:
    - Name: Employee of the Year
      Time: 2018
      Description: Recognized for outstanding performance and dedication.
    
    Languages:
    - Name: English
      Level: Fluent

    Hobbies: Reading, hiking, cooking

    References:
    - Name: Jane Smith
      Position: Manager
      Company: ABC Inc.
      Phone: (234) 567-8901
      Email:

    Certifications:
    - Name: AWS Certified Developer
      Time: 2019
      Description: Certification in cloud computing.

    Publications:
    - Name: "Web Development Trends"
      Time: 2020
      Description: Article published in a tech magazine.
    
    Educations:
    - Name: Bachelor's Degree in Computer Science
      Time: 2015
      Description: Major in computer science.
    
    About the Applicant: Experienced software developer with a passion for building innovative web applications.
    Title: Senior Software Engineer
    ---

    Extract the information and return it in JSON format.
  `;
  const schema = z.object({
    aboutTheApplicant: z.string().describe('about the applicant').optional().nullable().transform(val => val ?? ''),
    title: z.string().describe('title of applicant').optional().nullable().transform(val => val ?? ''),
    name: z.string().describe('name of applicant').optional().nullable().transform(val => val ?? ''),
    phone: z.string().describe('phone number of applicant').optional().nullable().transform(val => val ?? ''),
    address: z.string().describe('address of applicant').optional().nullable().transform(val => val ?? ''),
    experiences: z.array(z.object({
        company: z.string().describe('company name').optional().nullable().transform(val => val ?? ''),
        time: z.string().describe('work time year start and year end').optional().nullable().transform(val => val ?? ''),
        title: z.string().describe('applicant job title').optional().nullable().transform(val => val ?? ''),
        jobDetail: z.string().describe('what did the applicant do and what the job about, don\'t summarize the text').optional().nullable().or(z.literal(''))
    })).describe('Detail of applicant experiences').transform(arr => arr ?? []),
    skills: z.array(z.string()).describe('applicant skills').optional().nullable().transform(val => val ?? []),
    links: z.array(z.string()).describe('applicant links').optional().nullable().transform(val => val ?? []),
    courses: z.array(z.object({
        name: z.string().describe('course name').optional().nullable().transform(val => val ?? ''),
        time: z.string().describe('course time year start and year end').optional().nullable().transform(val => val ?? ''),
        description: z.string().describe('course description').optional().nullable().transform(val => val ?? ''),
    })).describe('Detail of applicant courses').transform(arr => arr ?? []),
    awards: z.array(z.object({
        name: z.string().describe('award name').optional().nullable().transform(val => val ?? ''),
        time: z.string().describe('award time year').optional().nullable().transform(val => val ?? ''),
        description: z.string().describe('award description').optional().nullable().transform(val => val ?? ''),
    })).describe('Detail of applicant awards').transform(arr => arr ?? []),
    languages: z.array(z.object({
        name: z.string().describe('language name').optional().nullable().transform(val => val ?? ''),
        level: z.string().describe('language level').optional().nullable().transform(val => val ?? ''),
    })).describe('Detail of applicant languages').transform(arr => arr ?? []),
    hobbies: z.array(z.string()).describe('applicant hobbies').optional().nullable().transform(val => val ?? []),
    references: z.array(z.object({
        name: z.string().describe('reference name').optional().nullable().transform(val => val ?? ''),
        position: z.string().describe('reference position').optional().nullable().transform(val => val ?? ''),
        company: z.string().describe('reference company').optional().nullable().transform(val => val ?? ''),
        phone: z.string().describe('reference phone').optional().nullable().transform(val => val ?? ''),
        email: z.string().describe('reference email').optional().nullable().transform(val => val ?? ''),
    })).describe('Detail of applicant references').transform(arr => arr ?? []),
    certifications: z.array(z.object({
        name: z.string().describe('certification name').optional().nullable().transform(val => val ?? ''),
        time: z.string().describe('certification time year').optional().nullable().transform(val => val ?? ''),
        description: z.string().describe('certification description').optional().nullable().transform(val => val ?? ''),
    })).describe('Detail of applicant certifications').transform(arr => arr ?? []),
    publications: z.array(z.object({
        name: z.string().describe('publication name').optional().nullable().transform(val => val ?? ''),
        time: z.string().describe('publication time year').optional().nullable().transform(val => val ?? ''),
        description: z.string().describe('publication description').optional().nullable().transform(val => val ?? ''),
    })).describe('Detail of applicant publications').transform(arr => arr ?? []),
    educations: z.array(z.object({
        name: z.string().describe('education name').optional().nullable().transform(val => val ?? ''),
        time: z.string().describe('education time year start and year end').optional().nullable().transform(val => val ?? ''),
        description: z.string().describe('education description').optional().nullable().transform(val => val ?? ''),
    })).describe('Detail of applicant educations').transform(arr => arr ?? []),
    ai_recommendation: z.string().optional().nullable().transform(val => val ?? '')
  })

  const parser = StructuredOutputParser.fromZodSchema(schema)

  const prompt: BasePromptTemplate = ChatPromptTemplate.fromMessages([
      ['system', systemTemplate],
      ['human', '{input} {context} {format_instructions}']
  ]) as BasePromptTemplate;

  //@ts-ignore @ts-expect-error
  const questionAnswerChain = await createStuffDocumentsChain({ llm, prompt, outputParser: parser })

  const ragChain = await createRetrievalChain({
      retriever,
      combineDocsChain: questionAnswerChain,
  })

  const results = await ragChain.invoke({
      input: 'get the data in detail and don\'t summarize the text',
      format_instructions: parser.getFormatInstructions()
  })

  return results.answer as LLMResult;
}