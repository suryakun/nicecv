import { useResumeForm } from "@/hooks/form/use-resume-form"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { FieldArray } from "formik"
import { Button } from "./ui/button"
import { ArrowUpIcon, ArrowDownIcon, TrashIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Separator } from "@radix-ui/react-separator";

type Props = {
  form: ReturnType<typeof useResumeForm>
}

export const PublicationInput = (props: Props) => {
  return (
    <FieldArray name="publication"
      render={arrayHelpers => (
        <div className="">
          <ScrollArea className="h-fit flex flex-col gap-6">
            {props.form.values.publication.map((exp, index) => (
              <div key={index} className="flex flex-col gap-4 mb-4">
                <div className="grid grid-cols-2 bg-accent rounded-sm items-center">
                  <div className="flex gap-2">
                    <Button type="button" onClick={() => arrayHelpers.remove(index)} className="text-red-500 bg-transparent">
                      <TrashIcon className="h-5 w-5 text-gray-500" />
                    </Button>
                    <Button type="button" onClick={() => arrayHelpers.swap(index, index - 1)} disabled={index === 0} className="bg-transparent">
                      <ArrowUpIcon className="h-5 w-5 text-gray-500" />
                    </Button>
                    <Button type="button" onClick={() => arrayHelpers.swap(index, index + 1)} disabled={index === props.form.values.publication.length - 1} className="bg-transparent">
                      <ArrowDownIcon className="h-5 w-5 text-gray-500" />
                    </Button>
                  </div>
                  <h2 className="font-semibold text-primary float-right text-right pr-2">Publication #{index + 1}</h2>
                </div>
                <Input type="text" placeholder="Name" name={`publication[${index}].name`} onChange={props.form.handleChange} value={exp.name} />
                <Input type="text" placeholder="Publication time" name={`publication[${index}].time`} onChange={props.form.handleChange} value={exp.time} />
                <Textarea placeholder="Description" name={`publication${index}].description`} onChange={props.form.handleChange} value={exp.description} />
                <Separator />
              </div>
            ))}
          </ScrollArea>
          <Button className="float-right my-4 gap-2 text-primary bg-accent" onClick={() => arrayHelpers.push({ id: "", name: "", time: "", description: "", jobDetail: "" })}>
            <PlusIcon className="h-5 w-5"/> Add Publication
          </Button>
        </div>
      )}
    />
  )

}