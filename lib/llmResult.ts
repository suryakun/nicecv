export type LLMResult = {
  id?: string;
  name: string;
  phone: string;
  email: string;
  experience: {
    id?: string;
    company: string;
    workTime?: string;
    title: string;
    jobDetail?: string;
  }[];
  skill: {
    id?: string;
    skillName: string;
    yearOfExperience?: number;
  }[];
  links?: string[];
  course: {
    id?: string;
    name: string;
    time: string;
    description?: string;
  }[];
  award: {
    id?: string;
    name: string;
    time: string;
    description?: string;
  }[];
  language: {
    id?: string;
    name: string;
    level?: string;
  }[];
  hobbies: string[];
  reference: {
    id?: string;
    name: string;
    position: string;
    company: string;
    phone?: string;
    email?: string;
  }[];
  certification: {
    id?: string;
    name: string;
    time: string;
    description?: string;
  }[];
  publication: {
    name: string;
    time: string;
    description: string;
  }[];
  education: {
    id?: string;
    name: string;
    time: string;
    description?: string;
  }[];
  summary: string;
  title: string;
  address: string;
  aiRecommendation?: string;
};
