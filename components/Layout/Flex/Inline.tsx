import { cn } from "@/util/cn";

export default function Inline({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("inline-flex", className)}>{children}</div>;
}
