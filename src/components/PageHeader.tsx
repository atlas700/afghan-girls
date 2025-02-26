import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function PageHeader({
  children,
  className,
  title,
}: {
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("flex justify-between items-center mb-8 gap-4", className)}
    >
      <h1 className="font-semibold text-2xl">{title}</h1>
      {children && <div>{children}</div>}
    </div>
  );
}
