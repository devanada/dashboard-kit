import { useCallback, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { ReactNode } from "react";
import { debounce } from "lodash";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import { ITask } from "@/utils/types/overview";
import { getTasks } from "@/utils/apis/tasks";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
}

const SearchBox = (props: Props) => {
  const { t } = useTranslation();
  const { children } = props;
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const getSuggestions = useCallback(async function (query: string) {
    if (!query) {
      return;
    }

    const result = await getTasks(query);
    setTasks(result.data);
  }, []);

  const getSuggestionsDebounce = useMemo(
    () => debounce(getSuggestions, 1000),
    [getSuggestions]
  );

  function onInputChange(newValue: string) {
    getSuggestionsDebounce(newValue);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-[150px] md:w-[200px] lg:w-[300px] p-0">
        <Command>
          <CommandInput
            placeholder={t("Search Placeholder")}
            onValueChange={onInputChange}
          />
          <CommandEmpty>{t("Search Not Found")}</CommandEmpty>
          <CommandGroup>
            {tasks.map((task) => (
              <CommandItem
                key={task.name}
                value={task.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setTasks([]);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === task.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {task.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchBox;
