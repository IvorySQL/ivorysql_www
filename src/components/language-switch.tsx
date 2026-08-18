"use client";

import { Globe } from "lucide-react";
import { useLocale } from "next-intl";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/navigation";

const languages = [
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
];

export const LanguageSwitch = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Select value={locale} onValueChange={handleChange}>
      <SelectTrigger className="text-muted-foreground hover:text-foreground h-8 gap-1.5 border bg-transparent px-2 py-0 text-sm shadow-none transition-colors [&_svg:not([class*='size-'])]:size-3.5">
        <Globe className="size-3.5" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end" className="min-w-[120px]">
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
