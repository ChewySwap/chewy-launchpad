import { cn } from "@/util/cn";

export default function RowBetween({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-row justify-between", className)}>
      {children}
    </div>
  );
}
