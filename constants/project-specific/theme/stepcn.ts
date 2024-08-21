import { cn } from "@/util/cn";

export const stepperClasses = cn(
    // light
    "[--step-color:hsl(var(--nextui-secondary-400))]",
    "[--active-color:hsl(var(--nextui-secondary-400))]",
    "[--inactive-border-color:hsl(var(--nextui-secondary-200))]",
    "[--inactive-bar-color:hsl(var(--nextui-secondary-200))]",
    "[--inactive-color:hsl(var(--nextui-secondary-300))]",
    // dark
    "dark:[--step-color:rgba(255,255,255,0.1)]",
    "dark:[--active-color:hsl(var(--nextui-foreground-600))]",
    "dark:[--active-border-color:rgba(255,255,255,0.5)]",
    "dark:[--inactive-border-color:rgba(255,255,255,0.1)]",
    "dark:[--inactive-bar-color:rgba(255,255,255,0.1)]",
    "dark:[--inactive-color:rgba(255,255,255,0.2)]",
  );