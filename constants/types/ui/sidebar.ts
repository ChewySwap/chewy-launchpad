import { ListboxProps, ListboxSectionProps } from "@nextui-org/react";
import React, {ReactNode} from 'react';


export enum SidebarItemType {
    Nest = "nest",
  }
export type SidebarItem = {
    key: string;
    title: string;
    icon?: string;
    href?: string;
    type?: SidebarItemType.Nest;
    startContent?: ReactNode;
    endContent?: ReactNode;
    items?: SidebarItem[];
    className?: string;
  };

  export type SidebarProps = Omit<ListboxProps<SidebarItem>, "children"> & {
    items: SidebarItem[];
    isCompact?: boolean;
    hideEndContent?: boolean;
    iconClassName?: string;
    sectionClasses?: ListboxSectionProps["classNames"];
    classNames?: ListboxProps["classNames"];
    defaultSelectedKey: string;
    onSelect?: (key: string) => void;
  };