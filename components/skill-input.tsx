import { useResumeForm } from "@/hooks/form/use-resume-form"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { FieldArray } from "formik"
import { Button } from "./ui/button"
import { Input } from "./ui/input";
import { Separator } from "@radix-ui/react-separator";
import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";

type Props = {
  form: ReturnType<typeof useResumeForm>
}

export const SkillInput = (props: Props) => {
  return (
    <FieldArray name="skill"
      render={arrayHelpers => (
        <div className="">
          <ScrollArea className="h-fit flex flex-col gap-6">
            {props.form.values.skill.map((exp, index) => (
              <div key={index} className="flex flex-col gap-4 mb-4">
                <div key={index} className="grid grid-rows-2 gap-4">
                  <div className="flex bg-accent rounded-sm items-center justify-between">
                    <Button type="button" onClick={() => arrayHelpers.remove(index)} className="text-red-500 bg-transparent">
                      <TrashIcon className="h-5 w-5 text-gray-500" />
                    </Button>
                    <h2 className="font-semibold text-primary float-right pr-2 text-right col-span-2">Skill #{index + 1}</h2>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Input type="text" className="flex-grow" placeholder="Skill name" name={`skill[${index}].skillName`} onChange={props.form.handleChange} value={exp.skillName} />
                    <span className="flex-grow text-nowrap">Year of experience</span>
                    <Input type="number" className="flex-grow-0 basis-24" placeholder="Year of experience" name={`skill[${index}].yearOfExperience`} onChange={props.form.handleChange} value={exp.yearOfExperience} />
                  </div>
                </div>
                <Separator />
              </div>
            ))}
          </ScrollArea>
          <Button className="float-right my-4 bg-accent gap-2 text-primary" onClick={() => arrayHelpers.push({ id: '', skillName: '', yearOfExperience: 0 })}>
            <PlusIcon className="h-5 w-5 text-gray-500" /> Add Skill
          </Button>
        </div>
      )}
    />
  )

}