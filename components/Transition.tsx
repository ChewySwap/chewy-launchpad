"use client";

import { AnimatePresence, motion } from "framer-motion";


export default function Transition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.2 }}
      >
        {children}
      </motion.div>
      </AnimatePresence>
    </>
  );
}
