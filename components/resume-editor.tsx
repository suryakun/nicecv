"use client"

import { useResumeForm } from "@/hooks/form/use-resume-form"
import { LLMResult } from "@/lib/llmResult"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardFooter} from "./ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { FieldArray, Form, FormikProvider } from "formik";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { TemplateDTO } from "@/lib/dto/template.dto";
import { Previewer } from "@/components/previewer"

type Props = {
  template: TemplateDTO,
  resume: LLMResult,
}

export const Editor = (props: Props) => {
  console.log(props.resume);
  const form = useResumeForm({
    resume: props.resume,
    onSubmit: (values: LLMResult) => {
      console.log(values)
    }
  })
  return (
    <FormikProvider value={form}>
      <div className="flex gap-4 h-full">
        <form onSubmit={form.handleSubmit} className="w-full flex gap-4">
          <Card className="w-full max-w-[600px] h-fit">
            <CardHeader>Create resume data here</CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Personal Information</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    <Input type="text" placeholder="Job title" name="title" onChange={form.handleChange} value={form.values.title} />
                    <Input type="text" placeholder="Name" name="name" onChange={form.handleChange} value={form.values.name} />
                    <Input type="text" placeholder="Phone" name="phone" onChange={form.handleChange} value={form.values.phone} />
                    <Input type="text" placeholder="Email" name="email" onChange={form.handleChange} value={form.values.email} />
                    <Input type="text" placeholder="Address" name="address" onChange={form.handleChange} value={form.values.address} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Summary</AccordionTrigger>
                  <AccordionContent>
                    <Textarea placeholder="Type your summary here" name="summary" onChange={form.handleChange} value={form.values.summary} />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Experience</AccordionTrigger>
                  <AccordionContent>
                    <FieldArray name="experience" 
                      render={arrayHelpers => (
                        <div className="">
                          <ScrollArea className="h-fit flex flex-col gap-6">
                            {form.values.experience.map((exp, index) => (
                              <div key={index} className="flex flex-col gap-4 mb-4">
                                <h2 className="font-semibold text-primary float-right text-right">Experience #{index+1}</h2>
                                <Input type="text" placeholder="Company" name={`experience[${index}].company`} onChange={form.handleChange} value={exp.company} />
                                <Input type="text" placeholder="Work time" name={`experience[${index}].workTime`} onChange={form.handleChange} value={exp.workTime} />
                                <Input type="text" placeholder="Title" name={`experience[${index}].title`} onChange={form.handleChange} value={exp.title} />
                                <Textarea placeholder="Job detail" name={`experience[${index}].jobDetail`} onChange={form.handleChange} value={exp.jobDetail} />
                                <Separator />
                              </div>
                            ))}
                          </ScrollArea>
                          <Button className="float-right my-4" onClick={() => arrayHelpers.push({ company: "", workTime: "", title: "", jobDetail: "" })}>Add Experience</Button>
                        </div>
                      )}
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Skills</AccordionTrigger>
                  <AccordionContent>
                    <FieldArray name="skill" 
                      render={arrayHelpers => (
                        <div className="">
                          <ScrollArea className="h-fit flex flex-col gap-6">
                            {form.values.skill.map((skill, index) => (
                              <div key={index} className="flex flex-col gap-4 mb-4">
                                <h2 className="font-semibold text-primary float-right text-right">Skill #{index+1}</h2>
                                <Input type="text" placeholder="Skill" name={`skill[${index}].skillName`} onChange={form.handleChange} value={skill.skillName} />
                                <Input type="number" placeholder="Year of experience" name={`skill[${index}].yearOfExperience`} onChange={form.handleChange} value={skill.yearOfExperience} />
                                <Separator />
                              </div>
                            ))}
                          </ScrollArea>
                          <Button className="float-right my-4" onClick={() => arrayHelpers.push({ skillName: "", yearOfExperience: undefined })}>Add Skill</Button>
                        </div>
                      )}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit">Save and download</Button>
            </CardFooter>
          </Card>
          <div className="flex flex-grow justify-center items-start h-auto">
            <div className="bg-white max-w-[600px] h-fit aspect-[2/3] w-full flex-shrink-1">
              <Previewer template={props.template.fileName} data={form.values} />
            </div>
          </div>
        </form>
      </div>
    </FormikProvider>
  )
}