
interface InputTheme {
    defaultVariant?: "bordered" | "flat" | "faded" | "underlined" | undefined;
    defaultSize?: "sm" | "md" | "lg" | undefined;
}

interface IconButtonTheme {
defaultHover?: string;
defaultActive?: string;
defaultCursor?: string;
}
interface ChipTheme {
    defaultVariant?:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "dot"
    | undefined;
    defaultSize?: "sm" | "md" | "lg" | undefined;
}

interface ProjTheme {
    input: InputTheme;
    chip: ChipTheme;
    iconButton?: IconButtonTheme;
}
export const projTheme: ProjTheme = {
    input: {
        defaultVariant: "bordered",
    },
    chip: {
        defaultVariant: "faded",
        defaultSize: "md",
    },
    iconButton: {
        defaultHover: "hover:text-blue-500",
        defaultActive: "active:text-blue-300",
        defaultCursor: "hover:cursor-pointer",
    }
}
