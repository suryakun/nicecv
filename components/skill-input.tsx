import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Button } from './ui/button';
import { Separator } from '@radix-ui/react-separator';
import { PlusIcon, TrashIcon } from '@heroicons/react/20/solid';
import {
  FieldArray,
  Control,
  FieldValues,
  useFieldArray,
  ArrayPath,
  Path,
} from 'react-hook-form';
import { CustomFormField } from './custom-form-field';

type Props<T extends FieldValues> = {
  control: Control<T>;
};

export function SkillInput<T extends FieldValues>(props: Props<T>) {
  const formName = 'skill' as ArrayPath<T>;
  const { fields, append, remove } = useFieldArray({
    control: props.control,
    name: formName,
  });
  return (
    <div className="">
      <ScrollArea className="h-fit flex flex-col gap-8">
        {fields.map((exp, index) => (
          <div key={exp.id} className="flex flex-col">
            <div key={index} className="grid grid-rows-1 gap-2">
              <div className="flex bg-secondary rounded-sm h-fit items-center justify-between">
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 bg-transparent"
                >
                  <TrashIcon className="h-5 w-5 text-gray-500" />
                </Button>
                <h2 className="font-semibold float-right pr-2 text-right col-span-2">
                  Skill #{index + 1}
                </h2>
              </div>
              <div className="flex gap-4 items-center">
                <CustomFormField
                  control={props.control}
                  name={`skill[${index}].skillName` as Path<T>}
                  placeholder="Skill name"
                  label="Skill name"
                />
                <CustomFormField
                  control={props.control}
                  name={`skill[${index}].yearOfExperience` as Path<T>}
                  placeholder="Year of experience"
                  label="Year of experience"
                />
              </div>
            </div>
            <Separator />
          </div>
        ))}
      </ScrollArea>
      <Button
        className="float-right my-4 gap-2"
        onClick={() =>
          append({
            id: '',
            skillName: '',
            yearOfExperience: 0,
          } as FieldArray<T, ArrayPath<T>>)
        }
      >
        <PlusIcon className="h-5 w-5 text-white" /> Add Skill
      </Button>
    </div>
  );
}
