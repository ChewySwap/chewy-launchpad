import { cn } from "@/util/cn";


export default function CenterItems({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center", className)}>{children}</div>
  );
}