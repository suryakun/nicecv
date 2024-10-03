import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Button } from './ui/button';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  TrashIcon,
  PlusIcon,
} from '@heroicons/react/20/solid';
import { Separator } from '@radix-ui/react-separator';
import {
  FieldValues,
  Control,
  useFieldArray,
  Path,
  ArrayPath,
  FieldArray,
} from 'react-hook-form';
import { CustomFormField } from './custom-form-field';
import { CustomFormTextarea } from './custom-form-textarea';

type Props<T extends FieldValues> = {
  control: Control<T>;
};

export function CertificationInput<T extends FieldValues>(props: Props<T>) {
  const { fields, remove, swap, append } = useFieldArray({
    control: props.control,
    name: 'certification' as ArrayPath<T>,
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
              <h2 className="font-semibold text-primary float-right text-right pr-2">
                Certification #{index + 1}
              </h2>
            </div>
            <CustomFormField
              control={props.control}
              name={`certification[${index}].name` as Path<T>}
              label="Name"
            />
            <CustomFormField
              control={props.control}
              name={`certification[${index}].time` as Path<T>}
              label="Certification time"
            />
            <CustomFormTextarea
              control={props.control}
              name={`certification[${index}].description` as Path<T>}
              label="Description"
            />
            <Separator />
          </div>
        ))}
      </ScrollArea>
      <Button
        className="float-right my-4 gap-2"
        onClick={() =>
          append({
            id: '',
            name: '',
            time: '',
            description: '',
          } as FieldArray<T, ArrayPath<T>>)
        }
      >
        <PlusIcon className="h-5 w-5" /> Add Certification
      </Button>
    </div>
  );
}
