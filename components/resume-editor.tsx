"use client"

import { useResumeForm } from "@/hooks/form/use-resume-form"
import { LLMResult } from "@/lib/llmResult"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardFooter } from "./ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { FormikProvider } from "formik";
import { Button } from "./ui/button";
import { TemplateDTO } from "@/lib/dto/template.dto";
import { Previewer } from "@/components/previewer"
import { updateResume } from "@/lib/actions/resume-action";
import { generatePDF } from "@/lib/actions/pdf-action";
import { ExperienceInput } from "./experience-input";
import { SkillInput } from "./skill-input";
import { EducationInput } from "./education-input";
import { CourseInput } from "./course-input";
import { AwardInput } from "./award-input";
import { PublicationInput } from "./publication-input";
import { useEffect, useState } from "react";

type Props = {
  template: TemplateDTO,
  resume: LLMResult | null,
}

export const Editor = (props: Props) => {
  const [openState, setOpenState] = useState('personal')
  const form = useResumeForm({
    resume: props.resume,
    onSubmit: async (values: LLMResult) => {
      console.log(form.errors)
      values.award = values.award.filter(award => award.name !== "")
      values.course = values.course.filter(course => course.name !== "")
      values.education = values.education.filter(education => education.name !== "")
      values.experience = values.experience.filter(experience => experience.company !== "")
      values.publication = values.publication.filter(publication => publication.name !== "")
      values.skill = values.skill.filter(skill => skill.skillName !== "")
      await updateResume(values, props.template.id?.toString())
      await generatePDF(props.template.id, values?.id || '')
    }
  })

  useEffect(() => {
    console.log(form.errors)
    if (form.errors) {
      const keys = Object.keys(form.errors)
      const panels = ['personal', 'summary', 'experience', 'skill', 'education', 'course', 'award', 'publication']
      if (panels.includes(keys[0])) {
        setOpenState(keys[0])
      } else {
        setOpenState('personal')
      }
    }
  }, [form.errors])

  return (
    <FormikProvider value={form}>
      <div className="flex gap-4 h-full">
        <form onSubmit={form.handleSubmit} className="w-full flex gap-4">
          <Card className="w-full max-w-[45vw] h-[calc(100vh-140px)] overflow-y-scroll custom-scrollbar">
            <CardHeader>Create resume data here</CardHeader>
            <CardContent>
              <Accordion type="single" collapsible defaultValue={openState}>
                <AccordionItem value="personal">
                  <AccordionTrigger>Personal Information</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 pl-4">
                    <Input type="text" placeholder="Job title" name="title" onChange={form.handleChange} value={form.values.title} />
                    <Input type="text" placeholder="Name" name="name" onChange={form.handleChange} value={form.values.name} />
                    <Input type="text" placeholder="Phone" name="phone" onChange={form.handleChange} value={form.values.phone} />
                    <Input type="text" placeholder="Email" name="email" onChange={form.handleChange} value={form.values.email} />
                    <Input type="text" placeholder="Address" name="address" onChange={form.handleChange} value={form.values.address} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="summary">
                  <AccordionTrigger>Summary</AccordionTrigger>
                  <AccordionContent className="pl-4">
                    <Textarea placeholder="Type your summary here" name="summary" onChange={form.handleChange} value={form.values.summary} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="experience">
                  <AccordionTrigger>Experience</AccordionTrigger>
                  <AccordionContent className="pl-4">
                    <ExperienceInput form={form} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="skill">
                  <AccordionTrigger>Skills</AccordionTrigger>
                  <AccordionContent className="pl-4">
                    <SkillInput form={form} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="education">
                  <AccordionTrigger>Educations</AccordionTrigger>
                  <AccordionContent className="pl-4">
                    <EducationInput form={form} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="course">
                  <AccordionTrigger>Courses</AccordionTrigger>
                  <AccordionContent className="pl-4">
                    <CourseInput form={form} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="award">
                  <AccordionTrigger>Award</AccordionTrigger>
                  <AccordionContent className="pl-4">
                    <AwardInput form={form} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="publication">
                  <AccordionTrigger>Publication</AccordionTrigger>
                  <AccordionContent className="pl-4">
                    <PublicationInput form={form} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="button" onClick={form.submitForm}>Save and Preview</Button>
            </CardFooter>
          </Card>
          <div className="flex flex-grow justify-center items-start h-[calc(100vh-140px)] overflow-y-scroll custom-scrollbar">
            <Previewer template={props.template.fileName} data={form.values} />
          </div>
        </form>
      </div>
    </FormikProvider>
  )
}