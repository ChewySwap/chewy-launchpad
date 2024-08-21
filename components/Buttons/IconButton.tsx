import { Button } from "@nextui-org/react";
import { ButtonOverride } from "./ButtonOverride";
import { cn } from "@/util/cn";
import { InlineIcon } from "@iconify/react/dist/iconify.js";
import { projTheme } from "@/constants/project-specific/theme";

interface IconButtonProps {
  icon: string;
  hover?: string;
  active?: string;
  cursor?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function IconButton({
  icon,
  className,
  hover,
  active,
  cursor,
  onClick,
  disabled=false,
}: IconButtonProps) {
  return (
    <Button size="sm" isIconOnly variant="light" radius="full" className="inline-flex h-[15px] w-[15px] m-0 p-0 pb-[1px] place-self-center" disabled={disabled} onPress={onClick} startContent={<InlineIcon
      icon={icon}
      className={cn(`text-lg hover:${hover || projTheme.iconButton?.defaultHover} active:${active || projTheme.iconButton?.defaultActive} hover:${cursor || projTheme.iconButton?.defaultCursor || "cursor-pointer"}`, className)}
    />} />
  );
}
