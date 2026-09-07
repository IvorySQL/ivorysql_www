"use client";

import { useState } from "react";

import { Check, ClipboardCopy, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

const FEEDBACK_MS = 2000;

type CopyState = "idle" | "copied" | "error";

export function CopyButton({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const t = useTranslations("DownloadUI");
  const [state, setState] = useState<CopyState>("idle");

  const handleCopy = async () => {
    try {
      // `navigator.clipboard` is absent outside a secure context (plain HTTP
      // on a LAN address, for instance), so reaching for it can throw
      // synchronously — not just reject. The try/catch covers both, and the
      // error state means a failed copy is visible rather than silent.
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      setState("error");
    }
    setTimeout(() => setState("idle"), FEEDBACK_MS);
  };

  const label = state === "error" ? t("copyFailed") : t("copyChecksum");

  return (
    <button
      onClick={handleCopy}
      aria-label={label}
      title={label}
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded transition-colors",
        state === "copied" && "text-green-600 dark:text-green-500",
        state === "error" && "text-destructive",
        state === "idle" &&
          "text-muted-foreground/40 hover:text-muted-foreground",
        className,
      )}
    >
      {state === "copied" ? (
        <Check className="size-3.5" />
      ) : state === "error" ? (
        <X className="size-3.5" />
      ) : (
        <ClipboardCopy className="size-3.5" />
      )}
    </button>
  );
}
