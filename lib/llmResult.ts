export type LLMResult = {
  name: string,
  phone: string,
  experiences: {
    company: string,
    time: string,
    title: string,
    jobDescription: string
  }[],
  skills: string[],
  links: string[],
  courses: {
    name: string,
    time: string,
    description: string
  }[],
  awards: {
    name: string,
    time: string,
    description: string
  }[],
  languages: {
    name: string,
    level: string
  }[],
  hobbies: string[],
  references: {
    name: string,
    position: string,
    company: string,
    phone: string,
    email: string
  }[],
  certifications: {
    name: string,
    time: string,
    description: string
  }[],
  publications: {
    name: string,
    time: string,
    description: string
  }[],
  educations: {
    name: string,
    time: string,
    description: string
  }[],
  aboutTheApplicant: string,
  title: string,
  address: string,
  ai_recommendation: string
}