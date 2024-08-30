import { useResumeForm } from "@/hooks/form/use-resume-form"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { FieldArray } from "formik"
import { Button } from "./ui/button"
import { ArrowUpIcon, ArrowDownIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Separator } from "@radix-ui/react-separator";

type Props = {
  form: ReturnType<typeof useResumeForm>
}

export const ExperienceInput = (props: Props) => {
  return (
    <FieldArray name="experience"
      render={arrayHelpers => (
        <div className="">
          <ScrollArea className="h-fit flex flex-col gap-6">
            {props.form.values.experience.map((exp, index) => (
              <div key={index} className="flex flex-col gap-4 mb-4">
                <div className="grid grid-cols-2 bg-accent rounded-sm items-center">
                  <div className="flex gap-2">
                    <Button type="button" onClick={() => arrayHelpers.remove(index)} className="text-red-500 bg-transparent">
                      <TrashIcon className="h-5 w-5 text-gray-500" />
                    </Button>
                    <Button type="button" onClick={() => arrayHelpers.swap(index, index - 1)} disabled={index === 0} className="bg-transparent">
                      <ArrowUpIcon className="h-5 w-5 text-gray-500" />
                    </Button>
                    <Button type="button" onClick={() => arrayHelpers.swap(index, index + 1)} disabled={index === props.form.values.experience.length - 1} className="bg-transparent">
                      <ArrowDownIcon className="h-5 w-5 text-gray-500" />
                    </Button>
                  </div>
                  <h2 className="font-semibold text-primary float-right text-right pr-2">Experience #{index + 1}</h2>
                </div>
                <Input type="text" placeholder="Company" name={`experience[${index}].company`} onChange={props.form.handleChange} value={exp.company} />
                <Input type="text" placeholder="Work time" name={`experience[${index}].workTime`} onChange={props.form.handleChange} value={exp.workTime} />
                <Input type="text" placeholder="Title" name={`experience[${index}].title`} onChange={props.form.handleChange} value={exp.title} />
                <Textarea placeholder="Job detail" name={`experience[${index}].jobDetail`} onChange={props.form.handleChange} value={exp.jobDetail || ''} />
                <Separator />
              </div>
            ))}
          </ScrollArea>
          <Button className="float-right my-4" onClick={() => arrayHelpers.push({ id: "", company: "", workTime: "", title: "", jobDetail: "" })}>Add Experience</Button>
        </div>
      )}
    />
  )

}