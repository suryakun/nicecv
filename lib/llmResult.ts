export type LLMResult = {
  id?: string,
  name: string,
  phone: string,
  email: string,
  experience: {
    company: string,
    workTime: string,
    title: string,
    jobDetail: string
  }[],
  skill: {
    skillName: string,
    yearOfExperience: number
  }[],
  links: string[],
  course: {
    name: string,
    time: string,
    description: string
  }[],
  award: {
    name: string,
    time: string,
    description: string
  }[],
  language: {
    name: string,
    level: string
  }[],
  hobbies: string[],
  reference: {
    name: string,
    position: string,
    company: string,
    phone: string,
    email: string
  }[],
  certification: {
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
    name: string,
    time: string,
    description: string
  }[],
  summary: string,
  title: string,
  address: string,
  aiRecommendation: string
}