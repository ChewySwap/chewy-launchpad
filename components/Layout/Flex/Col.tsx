import { cn } from "@/util/cn";


export default function Col({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col", className)}>{children}</div>
  );
}