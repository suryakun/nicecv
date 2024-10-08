import 'dotenv/config';
import 'pdf-parse';
import { z } from 'zod';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { createRetrievalChain } from 'langchain/chains/retrieval';
import {
  BasePromptTemplate,
  ChatPromptTemplate,
} from '@langchain/core/prompts';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { get_encoding } from 'tiktoken';
import { LLMResult } from './llmResult';
import { redirect } from 'next/navigation';

export default async function FileProcess(
  filePath: string,
): Promise<LLMResult> {
  // Use GeminiPro
  const llm = new ChatGoogleGenerativeAI({
    model: 'gemini-pro',
    maxOutputTokens: 2048,
  });
  const encoding = get_encoding('cl100k_base');

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const loader = new PDFLoader(filePath);
  const docs = await loader.load();

  // Validate token count for each document
  const validateTokenCount = (text: string): string => {
    const tokens = encoding.encode(text);
    const tokenCount = tokens.length;

    if (tokenCount > 1500) {
      redirect('/builder/select?error=token-count');
    }

    return text;
  };

  const validatedDocs = docs.map((doc) => ({
    ...doc,
    pageContent: validateTokenCount(doc.pageContent),
  }));

  const splits = await textSplitter.splitDocuments(validatedDocs);

  const vectorStore = await MemoryVectorStore.fromDocuments(
    splits,
    new GoogleGenerativeAIEmbeddings(),
  );

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
    18. **Summary**: Summary of the candidate.
    19. **AI Recommendation**: Recommend how to enhance the CV both in terms of content and structure.
    20. **Email**: Email of the applicant.

    The text from the PDF file will look like this:

    ---
    Name: John Doe
    Experience: 5 years in software development.
    Address: 1234 Elm Street, Springfield, IL
    Phone: (123) 456-7890
    Skills: Javascript - 4 years experience, React - 3 years experience, Node.js - 2 years experience
    Links: www.johndoe.com
    email: john@doe.com

    Summary: Experienced software developer with a passion for building innovative web applications.

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

    AI Recommendation: The candidate should consider adding more details about their recent projects and achievements to showcase their skills and experience effectively.

    Extract the information and return it in JSON format.
  `;

  const schema = z.object({
    summary: z
      .string()
      .describe('what is the summary of the candidate?')
      .optional()
      .nullable()
      .transform((val) => val ?? ''),
    title: z
      .string()
      .describe('title of applicant')
      .optional()
      .nullable()
      .transform((val) => val ?? ''),
    name: z
      .string()
      .describe('name of applicant')
      .optional()
      .nullable()
      .transform((val) => val ?? ''),
    email: z
      .string()
      .describe('email of applicant')
      .optional()
      .nullable()
      .transform((val) => val ?? ''),
    phone: z
      .string()
      .describe('what is the phone number of the applicant?')
      .optional()
      .nullable()
      .transform((val) => val ?? ''),
    address: z
      .string()
      .describe('where is the applicant address?')
      .optional()
      .nullable()
      .transform((val) => val ?? ''),
    experience: z
      .array(
        z.object({
          company: z
            .string()
            .describe('what is company name?')
            .optional()
            .nullable()
            .transform((val) => val ?? ''),
          workTime: z
            .string()
            .describe('work time year start and year end')
            .optional()
            .nullable()
            .transform((val) => val ?? ''),
          title: z
            .string()
            .describe('applicant job title')
            .optional()
            .nullable()
            .transform((val) => val ?? ''),
          jobDetail: z
            .string()
            .describe(
              "what did the applicant do and what the job about, don't summarize the text",
            )
            .optional()
            .nullable()
            .or(z.literal('')),
        }),
      )
      .describe('Detail of applicant experiences')
      .transform((arr) => arr ?? []),
    skill: z
      .array(
        z.object({
          skillName: z
            .string()
            .describe('skill title or skill name')
            .optional()
            .nullable()
            .transform((val) => val ?? ''),
          yearOfExperience: z
            .number()
            .describe('year of experience just put zero if no data')
            .optional()
            .nullable()
            .transform((val) => val ?? 0),
        }),
      )
      .describe('Detail of applicant skills')
      .transform((arr) => arr ?? []),
    links: z
      .array(z.string())
      .describe('applicant links')
      .optional()
      .nullable(),
    course: z
      .array(
        z.object({
          name: z
            .string()
            .describe('course name')
            .optional()
            .nullable()
            .transform((val) => val ?? ''),
          time: z
            .string()
            .describe('course time year start and year end')
            .optional()
            .nullable()
            .transform((val) => val ?? ''),
          description: z
            .string()
            .describe('course description')
            .optional()
            .nullable()
            .transform((val) => val ?? ''),
        }),
      )
      .describe('Detail of applicant courses')
      .transform((arr) => arr ?? []),
    award: z
      .array(
        z.object({
          name: z
            .string()
            .describe('award name')
            .optional()
            .nullable()
            .transform((val) => val ?? ''),
          time: z
            .string()
            .describe('award time year')
            .optional()
            .nullable()
            .transform((val) => val ?? ''),
          description: z
            .string()
            .describe('award description')
            .optional()
            .nullable()
            .transform((val) => val ?? ''),
        }),
      )
      .describe('Detail of applicant awards')
      .transform((arr) => arr ?? []),
    language: z
      .array(
        z.object({
          name: z
            .string()
            .describe('language name')
            .optional()
            .nullable()
            .transform((val) => val ?? ''),
          level: z
            .string()
            .describe('language level')
            .optional()
            .nullable()
            .transform((val) => val ?? ''),
        }),
      )
      .describe('Detail of applicant languages')
      .transform((arr) => arr ?? []),
    hobbies: z
      .array(z.string())
      .describe('applicant hobbies')
      .optional()
      .nullable(),
    reference: z
      .array(
        z.object({
          name: z
            .string()
            .describe('reference name')
            .optional()
            .nullable()
            .transform((val) => val ?? ''),
          position: z
            .string()
            .describe('reference position')
            .optional()
            .nullable()
            .transform((val) => val ?? ''),
          company: z
            .string()
            .describe('reference company')
            .optional()
            .nullable()
            .transform((val) => val ?? ''),
          phone: z
            .string()
            .describe('reference phone')
            .optional()
            .nullable()
            .transform((val) => val ?? ''),
          email: z
            .string()
            .describe('reference email')
            .optional()
            .nullable()
            .transform((val) => val ?? ''),
        }),
      )
      .describe('Detail of applicant references')
      .transform((arr) => arr ?? []),
    certification: z
      .array(
        z.object({
          name: z
            .string()
            .describe('certification name')
            .optional()
            .nullable()
            .transform((val) => val ?? ''),
          time: z
            .string()
            .describe('certification time year')
            .optional()
            .nullable()
            .transform((val) => val ?? ''),
          description: z
            .string()
            .describe('certification description')
            .optional()
            .nullable()
            .transform((val) => val ?? ''),
        }),
      )
      .describe('Detail of applicant certifications')
      .transform((arr) => arr ?? []),
    publication: z
      .array(
        z.object({
          name: z
            .string()
            .describe('publication name')
            .optional()
            .nullable()
            .transform((val) => val ?? ''),
          time: z
            .string()
            .describe('publication time year')
            .optional()
            .nullable()
            .transform((val) => val ?? ''),
          description: z
            .string()
            .describe('publication description')
            .optional()
            .nullable()
            .transform((val) => val ?? ''),
        }),
      )
      .describe('Detail of applicant publications')
      .transform((arr) => arr ?? []),
    education: z
      .array(
        z.object({
          name: z
            .string()
            .describe('education name')
            .optional()
            .nullable()
            .transform((val) => val ?? ''),
          time: z
            .string()
            .describe('education time year start and year end')
            .optional()
            .nullable()
            .transform((val) => val ?? ''),
          description: z
            .string()
            .describe('education description')
            .optional()
            .nullable()
            .transform((val) => val ?? ''),
        }),
      )
      .describe('Detail of applicant educations')
      .transform((arr) => arr ?? []),
    aiRecommendation: z
      .string()
      .describe(
        'if the context of this document is resume or CV, Provide recommendation to enhance the CV interm of text or typing',
      )
      .optional()
      .nullable(),
  });

  const parser = StructuredOutputParser.fromZodSchema(schema);

  const prompt: BasePromptTemplate = ChatPromptTemplate.fromMessages([
    ['system', systemTemplate],
    ['human', '{input} {context} {format_instructions}'],
  ]) as BasePromptTemplate;

  const questionAnswerChain = await createStuffDocumentsChain({
    llm,
    prompt,
    outputParser: parser,
  });

  const ragChain = await createRetrievalChain({
    retriever,
    combineDocsChain: questionAnswerChain,
  });

  const results = await ragChain.invoke({
    input: "get the data in detail and don't summarize the text",
    format_instructions: parser.getFormatInstructions(),
  });

  return results.answer as LLMResult;
}
