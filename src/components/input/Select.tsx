import { SelectOptionsType } from "@/lib/types";
import React from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";

type SelectProps = {
  options: SelectOptionsType[];
  defaultValue: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isDisabled?: boolean;
};

export const Select = ({
  options,
  defaultValue,
  onChange,
  isDisabled = false,
}: SelectProps) => {
  return (
    <div className="flex relative w-48  flex-row ">
      <select
        disabled={isDisabled}
        onChange={onChange}
        defaultValue={defaultValue}
        className=" appearance-none h-8 w-full bg-system-purple10 border-system-purple20 border px-4 py-1 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline text-gray-300"
        aria-label="Select an option"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
      <IoIosArrowDropdownCircle />
      
      </div>
    </div>
  );
};