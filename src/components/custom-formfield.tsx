import { Control, FieldValues, FieldPath } from "react-hook-form";
import { ReactNode, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ISelect {
  label: string;
  value: string | number;
}

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  "data-testid"?: string;
  disabled?: boolean;
  placeholder?: string;
  options?: ISelect[];
  description?: string;
  helper?: ReactNode;
  type?: React.HTMLInputTypeAttribute;
  secureTextEntry?: boolean;
}

export function CustomFormInput<T extends FieldValues>(props: Props<T>) {
  const {
    name,
    label,
    placeholder,
    description,
    control,
    type,
    secureTextEntry,
    helper,
  } = props;
  const [secureEntry, setSecureEntry] = useState(true);
  const iconClassName =
    "w-5 absolute right-0 top-0 m-2.5 h-4 w-4 text-muted-foreground user-select-none cursor-pointer";

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center mb-3">
            <FormLabel className="text-muted-foreground uppercase">
              {label}
            </FormLabel>
            {helper}
          </div>
          <div className="relative w-full">
            <FormControl>
              <Input
                data-testid={props["data-testid"]}
                placeholder={placeholder}
                type={secureTextEntry && secureEntry ? "password" : type}
                {...field}
              />
            </FormControl>
            {secureTextEntry ? (
              secureEntry ? (
                <Eye
                  onClick={() => setSecureEntry(!secureEntry)}
                  className={iconClassName}
                />
              ) : (
                <EyeOff
                  onClick={() => setSecureEntry(!secureEntry)}
                  className={iconClassName}
                />
              )
            ) : null}
          </div>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function CustomFormSelect<T extends FieldValues>(props: Props<T>) {
  const { name, label, placeholder, description, control, options, disabled } =
    props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-muted-foreground uppercase">
            {label}
          </FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger
                data-testid={props["data-testid"]}
                className="w-full"
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{label}</SelectLabel>
                {options?.map((option) => (
                  <SelectItem
                    data-testid={`option-${option.value}`}
                    value={option.value.toString()}
                    key={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
