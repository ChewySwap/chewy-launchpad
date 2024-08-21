"use client";
import { customFont } from "@/constants/project-specific";
import { extendVariants, Button, cn } from "@nextui-org/react";

export const ButtonOverride = extendVariants(Button, {
  variants: {
    // <- modify/add variants
    color: {

    },
    size: {
      sm: cn("[text-shadow:_1px_1px_0_rgb(0_0_0_/_0.5)]", customFont.className),
      lg: cn("[text-shadow:_1px_1px_0_rgb(0_0_0_/_0.7)]", customFont.className),
      md: cn("[text-shadow:_1px_1px_0_rgb(0_0_0_/_0.7)]", customFont.className),
    },
  },
});
