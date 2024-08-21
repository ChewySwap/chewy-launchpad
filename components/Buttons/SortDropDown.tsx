import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { sortNftAtom, SortType } from "@/config/atoms";
import { InlineIcon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/util/cn";
import { hasMargin } from "@/util/style/conditions";

// Sort DropDown Component used to select Sort By Ascending, Descending and Rarity
// Uses NextUI Dropdown Component and has an onSortChanged event handler prop to handle the selection
// SortDropDownProps interface is used to define the props for the SortDropDown component
// The sort target is a key used to identify the part of the application that the sort is being applied to
// The sort value is the current value of the sort (Ascending, Descending, Rarity)
// The onSortChanged event handler is called when the user selects a new sort value
// a Jotai atom with storage is used to save the current sort value for the targeted section key
// when the SortDropDown component is rendered it will display the current sort value for the target key which is stored in the atom
// if there is no sort value stored in the atom for the target key it will default to Ascending

interface SortDropDownProps {
  sortTarget: string;
  sortValue?: string;
  onSortChanged?: (sortTarget: string, sortValue: string) => void;

  className?: string;
}

// SortDropDown Component
export default function SortDropDown({
  sortTarget,
  sortValue,
  onSortChanged,
  className,
}: SortDropDownProps) {
  const [sortAtom, setSortAtom] = useAtom(sortNftAtom);

  function sortChangeHandler(target: string, sortValue: SortType) {
    setSortAtom((prevConfig) => ({
      ...prevConfig,
      [target]: sortValue,
    }));
    console.log(sortAtom);
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <InlineIcon
          icon={"flowbite:sort-horizontal-outline"}
          className={cn(className, `relative justify-end hover:text-sky-400 active:text-sky-400 ${className && hasMargin(className) ? null : "m-2"} w-5 h-5`)}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Sort By"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={[`${sortTarget}_${sortAtom[sortTarget]}`]}
      >
        <DropdownSection>
          <DropdownItem
            key={`${sortTarget}_Ascending`}
            startContent={<InlineIcon
              icon={"fluent:data-bar-vertical-ascending-16-filled"}
              className="relative justify-end"
            />}
            onClick={() => sortChangeHandler(sortTarget, "Ascending")}
          >
            Ascending
          </DropdownItem>
          <DropdownItem
            key={`${sortTarget}_Descending`}
            startContent={<InlineIcon
              icon={"fluent:data-bar-vertical-ascending-16-filled"}
              className="relative justify-end scale-x-[-1]"
            />}
            onClick={() => sortChangeHandler(sortTarget, "Descending")}
          >
            Descending
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
