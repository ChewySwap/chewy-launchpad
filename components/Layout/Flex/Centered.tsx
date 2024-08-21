import { cn } from "@/util/cn";


export default function Centered({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex justify-center", className)}>{children}</div>
  );
}