import { z } from 'zod'
import { useFormik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { LLMResult } from '@/lib/llmResult';

type ResumeFormProps = {
  resume: LLMResult | null,
  onSubmit: (values: LLMResult) => void
}

export const useResumeForm = (props: ResumeFormProps) => {
  const scheme = z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string(),
    address: z.string(),
    title: z.string(),
    summary: z.string(),
    links: z.array(z.string()),
    hobbies: z.array(z.string()),
    experience: z.array(z.object({
      company: z.string(),
      workTime: z.string(),
      title: z.string(),
      jobDetail: z.string().nullable().optional()
    })),
    skill: z.array(z.object({
      skillName: z.string(),
      yearOfExperience: z.number().optional(),
    })),
    course: z.array(z.object({
      name: z.string(),
      time: z.string().optional(),
      description: z.string().optional(),
    })),
    award: z.array(z.object({
      name: z.string(),
      time: z.string().optional(),
      description: z.string().optional(),
    })),
    language: z.array(z.object({
      name: z.string(),
      level: z.string()
    })),
    reference: z.array(z.object({
      name: z.string(),
      position: z.string(),
      company: z.string(),
      phone: z.string(),
      email: z.string()
    })),
    certification: z.array(z.object({
      name: z.string(),
      time: z.string().optional(),
      description: z.string().optional(),
    })),
    publication: z.array(z.object({
      name: z.string(),
      time: z.string().optional(),
      description: z.string()
    })),
    education: z.array(z.object({
      name: z.string(),
      time: z.string().optional(),
      description: z.string().optional(),
    }))
  })

  const form = useFormik({
    validationSchema: toFormikValidationSchema(scheme),
    initialValues: props.resume || {
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
    onSubmit: props.onSubmit,
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  })

  return form;
}