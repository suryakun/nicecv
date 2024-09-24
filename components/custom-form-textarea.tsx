import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from './ui/form';
import { Control, FieldValues, Path } from 'react-hook-form';
import { Textarea } from './ui/textarea';
import { cn } from '@/lib/utils';

type FormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  label?: string;
  description?: string;
};

export function CustomFormTextarea<T extends FieldValues>(
  props: FormFieldProps<T>,
) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field, fieldState }) => (
        <FormItem>
          {props.label && (
            <FormLabel className="text-sm">{props.label}</FormLabel>
          )}
          <FormControl>
            <Textarea
              placeholder={props.placeholder || ''}
              {...field}
              className={cn(
                fieldState.error ? 'border-error' : 'focus-visible:ring-2',
                ' focus-visible:ring-0 focus-visible:ring-offset-0! placeholder:font-italic',
              )}
            />
          </FormControl>
          {props.description && (
            <FormDescription>{props.description}</FormDescription>
          )}
          {fieldState.isDirty && fieldState.error && (
            <FormMessage className="text-xs text-error text-right">
              {fieldState.error?.message}
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  );
}
