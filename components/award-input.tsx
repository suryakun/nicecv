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
  ArrayPath,
  Control,
  FieldValues,
  Path,
  useFieldArray,
  FieldArray,
} from 'react-hook-form';
import { CustomFormField } from './custom-form-field';
import { CustomFormTextarea } from './custom-form-textarea';

type Props<T extends FieldValues> = {
  control: Control<T>;
};

export function AwardInput<T extends FieldValues>(props: Props<T>) {
  const formName = 'award' as ArrayPath<T>;
  const { fields, remove, swap, append } = useFieldArray({
    control: props.control,
    name: formName,
  });

  return (
    <div className="">
      <ScrollArea className="h-fit flex flex-col gap-6">
        {fields.map((exp, index) => (
          <div key={index} className="flex flex-col gap-4 mb-4">
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
                Award #{index + 1}
              </h2>
            </div>
            <CustomFormField
              control={props.control}
              name={`award[${index}].name` as Path<T>}
              label="Name"
            />
            <CustomFormField
              control={props.control}
              name={`award[${index}].time` as Path<T>}
              label="Award year"
            />
            <CustomFormTextarea
              label="Description"
              name={`award${index}].description` as Path<T>}
              control={props.control}
            />
            <Separator />
          </div>
        ))}
      </ScrollArea>
      <Button
        className="float-right my-4 gap-2"
        onClick={() =>
          append({ id: '', name: '', time: 0, description: '' } as FieldArray<
            T,
            ArrayPath<T>
          >)
        }
      >
        <PlusIcon className="h-5 w-5" /> Add Award
      </Button>
    </div>
  );
}
