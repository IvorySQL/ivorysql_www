import React from "react";

import { cn } from "@/lib/utils";

type BackgroundProps = {
  children: React.ReactNode;
  className?: string;
};

export const Background = ({
  children,
  className,
}: BackgroundProps) => {
  return (
    <div
      className={cn(
        "relative bg-background",
        className,
      )}
    >
      {children}
    </div>
  );
};
