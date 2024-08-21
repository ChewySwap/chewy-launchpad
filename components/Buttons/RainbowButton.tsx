import { Button } from "@nextui-org/react";
import { ButtonOverride } from "./ButtonOverride";
import { cn } from "@/util/cn";

export default function RainbowButton(props: any) {
  return (
    <Button
      variant="solid"
      color="primary"
      className={cn("rainbow-wrapper align-middle justify-center", props.className)}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <div className="flex rainbow-content-lg align-middle justify-center h-full w-full">
        <span className="mt-[9px]">{props.children}</span>
      </div>
    </Button>
  );
}
