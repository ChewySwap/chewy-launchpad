import { ToastTransition, Zoom } from "react-toastify";

export type ToastSettings = {
    transition: ToastTransition;
    timeout: number;
    theme: "light" | "dark" | "colored" | undefined;
};

export const toastSettings: ToastSettings = {
    transition: Zoom,
    timeout: 10000,
    theme: "dark",
};