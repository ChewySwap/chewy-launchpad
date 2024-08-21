"use client";
import { Avatar, Chip } from "@nextui-org/react";
import { cn } from "@/util/cn";
import { projTheme } from "@/constants/project-specific/theme";

interface FarmChipProps {
  name: string;
  className?: string;
  logo?: string;
  size?: "sm" | "md" | "lg" | undefined;
  color?:
    | "primary"
    | "default"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
  variant?:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "dot"
    | undefined;
  onClick?: () => void;
}

export default function FarmChip({
  name,
  className,
  logo,
  size,
  color,
  variant,
  onClick,
  ...props
}: FarmChipProps) {
  if (typeof logo === "undefined" || null) {
    return (
      <Chip
        variant={variant || projTheme.chip?.defaultVariant || "solid"}
        color={color || "default"}
        size={size || projTheme.chip?.defaultSize || "md"}
        className={cn("", className)}
        onClick={onClick}
        {...props}
      >
        {name}
      </Chip>
    );
  }
  return (
    <Chip
      variant={variant || projTheme.chip?.defaultVariant || "solid"}
      color={color || "default"}
      size={size || projTheme.chip?.defaultSize || "md"}
      avatar={<Avatar name={name} src={logo} />}
      className={cn("", className)}
      onClick={onClick}
      {...props}
    >
      {name}
    </Chip>
  );
}
