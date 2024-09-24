import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Button } from './ui/button';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  TrashIcon,
} from '@heroicons/react/20/solid';
import { Separator } from '@radix-ui/react-separator';
import {
  ArrayPath,
  Control,
  FieldArray,
  FieldValues,
  Path,
  useFieldArray,
  UseFormRegister,
} from 'react-hook-form';
import { CustomFormField } from './custom-form-field';
import { CustomFormTextarea } from './custom-form-textarea';
import { PlusIcon } from '@heroicons/react/20/solid';

type Props<T extends FieldValues> = {
  control: Control<T>;
  register: UseFormRegister<T>;
};

export function ExperienceInput<T extends FieldValues>(props: Props<T>) {
  const formName = 'experience' as ArrayPath<T>;
  const { fields, swap, append, remove } = useFieldArray({
    control: props.control,
    name: formName,
  });

  return (
    <div className="">
      <ScrollArea className="h-fit flex flex-col gap-6">
        {fields.map((exp, index) => (
          <div key={exp.id} className="flex flex-col gap-4 mb-4">
            <div className="grid grid-cols-2 bg-secondary rounded-sm items-center">
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 bg-transparent"
                >
                  <TrashIcon className="h-5 w-5 text-gray-500" />
                </Button>
                <Button
                  type="button"
                  onClick={() => swap(index, index - 1)}
                  disabled={index === 0}
                  className="bg-transparent"
                >
                  <ArrowUpIcon className="h-5 w-5 text-gray-500" />
                </Button>
                <Button
                  type="button"
                  onClick={() => swap(index, index + 1)}
                  disabled={index === fields.length - 1}
                  className="bg-transparent"
                >
                  <ArrowDownIcon className="h-5 w-5 text-gray-500" />
                </Button>
              </div>
              <h2 className="font-semibold float-right text-right pr-2">
                Experience #{index + 1}
              </h2>
            </div>
            <CustomFormField
              control={props.control}
              name={`experience[${index}].company` as Path<T>}
              label="Company"
              placeholder="Type here..."
            />
            <CustomFormField
              control={props.control}
              name={`experience[${index}].workTime` as Path<T>}
              label="Work time"
              placeholder="Type here..."
            />
            <CustomFormField
              control={props.control}
              name={`experience[${index}].title` as Path<T>}
              label="Title"
              placeholder="Type here..."
            />
            <CustomFormTextarea
              control={props.control}
              name={`experience[${index}].jobDetail` as Path<T>}
              placeholder="Job detail"
            />
            <Separator />
          </div>
        ))}
      </ScrollArea>
      <Button
        className="float-right my-4"
        onClick={() =>
          append({
            company: '',
            workTime: '',
            title: '',
            jobDetail: '',
          } as FieldArray<T, ArrayPath<T>>)
        }
      >
        <PlusIcon className="h-5 w-5 text-white" /> Add Experience
      </Button>
    </div>
  );
}
