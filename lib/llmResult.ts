export type LLMResult = {
  id?: string,
  name: string,
  phone: string,
  email: string,
  experience: {
    id: string | undefined,
    company: string,
    workTime: string,
    title: string,
    jobDetail: string
  }[],
  skill: {
    id: string | undefined,
    skillName: string,
    yearOfExperience: number
  }[],
  links: string[],
  course: {
    id: string | undefined,
    name: string,
    time: string,
    description: string
  }[],
  award: {
    id: any
    name: string,
    time: string,
    description: string
  }[],
  language: {
    id: any
    name: string,
    level: string
  }[],
  hobbies: string[],
  reference: {
    id: any
    name: string,
    position: string,
    company: string,
    phone: string,
    email: string
  }[],
  certification: {
    id: any
    name: string,
    time: string,
    description: string
  }[],
  publication: {
    name: string,
    time: string,
    description: string
  }[],
  education: {
    id: string | undefined,
    name: string,
    time: string,
    description: string
  }[],
  summary: string,
  title: string,
  address: string,
  aiRecommendation: string
}