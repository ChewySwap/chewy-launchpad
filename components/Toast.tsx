"use client";
import { toastSettings } from "@/constants/project-specific/theme/toast";
import { ToastContainer } from "react-toastify";

export default function Toast() {
  return (
    <>
      <ToastContainer transition={toastSettings.transition} stacked theme={toastSettings.theme} autoClose={toastSettings.timeout} />
    </>
  );
}
