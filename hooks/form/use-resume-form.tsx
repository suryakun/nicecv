import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LLMResult } from '@/lib/llmResult';

type ResumeFormProps = {
  resume: LLMResult | null;
};

export const useResumeForm = (props: ResumeFormProps) => {
  // Define schemas for nested objects
  const ExperienceSchema = z.object({
    id: z.string().optional(),
    company: z.string().min(1, 'Company is required'),
    title: z.string().min(1, 'Title is required'),
    workTime: z.string().optional(),
    jobDetail: z.string().optional(),
  });

  const LanguageSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Language name is required'),
    level: z.string().optional(),
  });

  const ReferenceSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Reference name is required'),
    position: z.string().min(1, 'Reference position is required'),
    company: z.string().min(1, 'Reference company is required'),
    phone: z.string().optional(),
    email: z.string().optional(),
  });

  const CertificationSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Certification name is required'),
    time: z.string().optional(),
    description: z.string().optional(),
  });

  const PublicationSchema = z.object({
    name: z.string().min(1, 'Publication name is required'),
    time: z.string().min(1, 'Publication year is required'),
    description: z.string().min(1, 'Publication description is required'),
  });

  const EducationSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Education name is required'),
    time: z.string().min(1, 'Education year is required'),
    description: z.string().optional(),
  });

  const SkillSchema = z.object({
    id: z.string().optional(),
    skillName: z.string().min(1, 'Skill name is required'),
    yearOfExperience: z.number().optional(),
  });

  const CourseSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Course name is required'),
    time: z.string().min(1, 'Course year is required'),
    description: z.string().optional(),
  });

  const AwardSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Award name is required'),
    time: z.string().min(1, 'Award year is required'),
    description: z.string().optional(),
  });

  // Define the main schema
  const LLMResultSchema = z.object({
    experience: z.array(ExperienceSchema),
    language: z.array(LanguageSchema),
    hobbies: z.array(z.string().min(1, 'Hobby is required')),
    reference: z.array(ReferenceSchema),
    certification: z.array(CertificationSchema),
    publication: z.array(PublicationSchema),
    education: z.array(EducationSchema),
    skill: z.array(SkillSchema),
    course: z.array(CourseSchema),
    award: z.array(AwardSchema),
    summary: z.string(),
    title: z.string().min(1, 'Title is required'),
    address: z.string().min(1, 'Address is required'),
    // aiRecommendation: z.string().optional(),
    name: z.string().min(1, 'Name is required'),
    phone: z
      .string()
      .min(1, 'Phone is required')
      .regex(/^\+?[0-9]*$/, 'Phone number must be numeric'),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    id: z.string().optional(),
  });

  const form = useForm<z.infer<typeof LLMResultSchema>>({
    resolver: zodResolver(LLMResultSchema),
    defaultValues: props.resume || {
      id: undefined,
      name: '',
      phone: '',
      email: '',
      address: '',
      title: '',
      summary: '',
      links: [],
      hobbies: [],
      experience: [],
      skill: [],
      course: [],
      award: [],
      language: [],
      reference: [],
      certification: [],
      publication: [],
      education: [],
      aiRecommendation: '',
    },
  });

  return form;
};
