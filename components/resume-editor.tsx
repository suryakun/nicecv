'use client';

import { useResumeForm } from '@/hooks/form/use-resume-form';
import { LLMResult } from '@/lib/llmResult';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { TemplateDTO } from '@/lib/dto/template.dto';
import { Previewer } from '@/components/previewer';
import { updateResume } from '@/lib/actions/resume-action';
import { generatePDF } from '@/lib/actions/pdf-action';
import { ExperienceInput } from './experience-input';
import { SkillInput } from './skill-input';
import { EducationInput } from './education-input';
import { CourseInput } from './course-input';
import { AwardInput } from './award-input';
import { PublicationInput } from './publication-input';
import { useState } from 'react';
import { Form } from './ui/form';
import { CustomFormField } from './custom-form-field';
import { CustomFormTextarea } from './custom-form-textarea';
import { FieldErrors, FieldValues } from 'react-hook-form';

type Props = {
  template: TemplateDTO;
  resume: LLMResult | null;
};

export const Editor = (props: Props) => {
  const [openState, setOpenState] = useState('personal');
  const form = useResumeForm({ resume: props.resume });

  const onSubmit = async (data: LLMResult) => {
    await updateResume(data, props.template.id.toString());
    await generatePDF(props.template.id, props.resume?.id?.toString() || '');
  };

  const onError = (errors: FieldErrors<FieldValues>) => {
    const keys = Object.keys(errors);
    setOpenState(keys[0]);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="flex flex-col"
      >
        <div className="flex gap-4 h-full">
          <div className="w-full justify-between flex">
            <Card className="w-full max-w-[50%] h-[calc(100vh-210px)] overflow-y-scroll custom-scrollbar">
              <CardHeader>Create resume data here</CardHeader>
              <CardContent>
                <Accordion
                  type="single"
                  collapsible
                  defaultValue={'personal'}
                  value={openState}
                  onValueChange={setOpenState}
                >
                  <AccordionItem value="personal">
                    <AccordionTrigger className="font-md bg-primary text-white p-2">
                      1. Personal Information
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-2 py-4 px-4">
                      <CustomFormField
                        control={form.control}
                        name="title"
                        label="Title"
                        placeholder="Type here..."
                      />
                      <CustomFormField
                        control={form.control}
                        name="name"
                        label="Name"
                        placeholder="Type here..."
                      />
                      <CustomFormField
                        control={form.control}
                        name="phone"
                        label="Phone"
                        placeholder="Type here..."
                      />
                      <CustomFormField
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="Type here..."
                      />
                      <CustomFormField
                        control={form.control}
                        name="address"
                        label="Address"
                        placeholder="Type here..."
                      />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="summary">
                    <AccordionTrigger className="font-md bg-primary text-white p-2">
                      2. Summary
                    </AccordionTrigger>
                    <AccordionContent className="p-4">
                      <CustomFormTextarea
                        control={form.control}
                        placeholder="Type your summary here"
                        name="summary"
                      />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="experience">
                    <AccordionTrigger className="font-md bg-primary text-white p-2">
                      3. Experience
                    </AccordionTrigger>
                    <AccordionContent className="p-4">
                      <ExperienceInput
                        control={form.control}
                        register={form.register}
                      />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="skill">
                    <AccordionTrigger className="font-md bg-primary text-white p-2">
                      4. Skills
                    </AccordionTrigger>
                    <AccordionContent className="p-4">
                      <SkillInput control={form.control} />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="education">
                    <AccordionTrigger className="font-md bg-primary text-white p-2">
                      5. Educations
                    </AccordionTrigger>
                    <AccordionContent className="p-4">
                      <EducationInput control={form.control} />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="course">
                    <AccordionTrigger className="font-md bg-primary text-white p-2">
                      6. Courses
                    </AccordionTrigger>
                    <AccordionContent className="p-4">
                      <CourseInput control={form.control} />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="award">
                    <AccordionTrigger className="font-md bg-primary text-white p-2">
                      7. Award
                    </AccordionTrigger>
                    <AccordionContent className="p-4">
                      <AwardInput control={form.control} />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="publication">
                    <AccordionTrigger className="font-md bg-primary text-white p-2">
                      8. Publication
                    </AccordionTrigger>
                    <AccordionContent className="p-4">
                      <PublicationInput control={form.control} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            <div className="flex flex-grow justify-center items-start h-[calc(100vh-210px)] overflow-y-scroll custom-scrollbar bg-slate-300">
              <Previewer
                template={props.template.fileName}
                data={form.watch()}
              />
            </div>
          </div>
        </div>
        <section className="flex justify-end pt-4">
          <Button type="submit">Save and Preview</Button>
        </section>
      </form>
    </Form>
  );
};
