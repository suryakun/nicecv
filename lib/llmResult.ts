export type LLMResult = {
  id?: string;
  name: string;
  phone: string;
  email: string;
  experience: {
    id: string | undefined;
    company: string;
    workTime: string;
    title: string;
    jobDetail: string;
  }[];
  skill: {
    id: string | undefined;
    skillName: string;
    yearOfExperience: number;
  }[];
  links: string[];
  course: {
    id: string | undefined;
    name: string;
    time: string;
    description: string;
  }[];
  award: {
    id: string;
    name: string;
    time: string;
    description: string;
  }[];
  language: {
    id: string;
    name: string;
    level: string;
  }[];
  hobbies: string[];
  reference: {
    id: string;
    name: string;
    position: string;
    compstring: string;
    phone: string;
    email: string;
  }[];
  certification: {
    id: string;
    name: string;
    time: string;
    description: string;
  }[];
  publication: {
    name: string;
    time: string;
    description: string;
  }[];
  education: {
    id: string | undefined;
    name: string;
    time: string;
    description: string;
  }[];
  summary: string;
  title: string;
  address: string;
  aiRecommendation: string;
};
