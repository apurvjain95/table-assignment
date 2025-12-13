import SearchIcon from "@/assets/images/icons/SearchIcon";
import { debounced } from "@/utils/generic";
import { TextField } from "@radix-ui/themes";
import classNames from "classnames";
import { ComponentProps, useEffect, useMemo, useRef, useState } from "react";

const useSearch = (
  placeholder = "Search...",
  autoFocus = false,
  delay = 500
) => {
  const [search, setSearchVal] = useState("");
  const [focused, setFocused] = useState(autoFocus);
  const [selectionStart, setSelectionStart] = useState<number | null>(0);
  const textInputRef = useRef<HTMLInputElement>(null);
  const [nonDebouncedSearch, setNonDebouncedSearch] = useState(search);
  const debouncedSetSearch = useMemo(
    () => debounced(setSearchVal, delay),
    [delay]
  );

  const setAutoFocus = (autoFocus: boolean) => {
    setFocused(autoFocus);
  };

  const setSearchValue = (value: string) => {
    setSearchVal(value);
    setNonDebouncedSearch(value);
  };

  const SearchComponent = (
    props: Omit<ComponentProps<typeof TextField.Root>, "ref">
  ) => {
    const [inputVal, setInputVal] = useState(nonDebouncedSearch);

    const { className, ...restProps } = props;

    useEffect(() => {
      textInputRef.current?.setSelectionRange(
        Number(selectionStart),
        Number(selectionStart)
      );
    }, []);

    useEffect(() => {
      debouncedSetSearch(() => {
        return inputVal;
      });
    }, [inputVal]);

    return (
      <TextField.Root
        id="search"
        className={classNames(
          "outline-none border-none w-full pr-5",
          className
        )}
        size="3"
        variant="surface"
        placeholder={placeholder}
        onChange={(e) => {
          setInputVal(e.target.value);
          setNonDebouncedSearch(e.target.value);
          setSelectionStart(textInputRef.current?.selectionStart || 0);
        }}
        value={inputVal}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoFocus={focused}
        autoComplete="off"
        {...restProps}
        ref={textInputRef}
        onPaste={(e) => {
          e.preventDefault();
          const pasteText = e.clipboardData?.getData("text");
          const processedText = pasteText.replace(/[\r\n]+/g, ", ");
          const target = e.target as HTMLInputElement;
          const start = target.selectionStart || 0;
          const end = target.selectionEnd || 0;
          const newValue =
            inputVal.slice(0, start) + processedText + inputVal.slice(end);
          setInputVal(newValue);
          setNonDebouncedSearch(newValue);
          setSelectionStart(textInputRef.current?.selectionStart || 0);
          // We need to use setTimeout to ensure the selection is set after the value update
          setTimeout(() => {
            target.selectionStart = target.selectionEnd =
              start + processedText.length;
          }, 0);
        }}
      >
        <TextField.Slot className="pl-3 pr-2">
          <SearchIcon />
        </TextField.Slot>
      </TextField.Root>
    );
  };

  return {
    search,
    setSearchVal: setSearchValue,
    setAutoFocus,
    SearchComponent,
  };
};

export default useSearch;
