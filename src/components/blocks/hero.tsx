import Image from "next/image";

import { ArrowUpRight, Database, Shield, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export const Hero = () => {
  const t = useTranslations("Hero");
  const tc = useTranslations("Common");

  return (
    <section className="py-8 lg:py-12 lg:pt-20">
      <div className="container flex flex-col items-center gap-6 md:gap-10 lg:flex-row lg:gap-16">
        {/* Left side - Main content */}
        <div className="flex-1">
          <h1 className="text-foreground max-w-160 text-5xl tracking-tight md:text-6xl lg:text-7xl">
            IvorySQL
          </h1>

          <p className="text-primary mt-2 text-xl font-medium">
            {t("tagline")}
          </p>

          <p className="text-muted-foreground mt-3 max-w-xl text-base leading-snug">
            {t("description")}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 lg:flex-nowrap">
            <Button size="lg" asChild>
              <Link
                href="https://docs.ivorysql.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {tc("getStarted")}
              </Link>
            </Button>
            <Button variant="secondary" size="lg" className="gap-2" asChild>
              <a
                href="https://trial.ivorysql.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {tc("onlineTrial")}
                <ArrowUpRight className="stroke-2" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="gap-2" asChild>
              <a
                href="https://pgnexus.ai/sandboxes"
                target="_blank"
                rel="noopener noreferrer"
              >
                {tc("sandboxes")}
                <ArrowUpRight className="stroke-2" />
              </a>
            </Button>
          </div>
        </div>

        {/* Right side - Mascot Image */}
        <div className="relative flex flex-1 items-center justify-center max-lg:pt-10 lg:pl-10">
          {/* Glow aura behind the elephant */}
          <div className="bg-primary/20 absolute size-64 animate-pulse rounded-full blur-3xl" />
          <div className="bg-primary/10 absolute size-48 animate-pulse rounded-full blur-2xl [animation-delay:1s]" />

          {/* Floating particles */}
          <div className="pointer-events-none absolute inset-0">
            <div className="text-primary/40 absolute top-1/4 left-1/4 animate-bounce [animation-duration:3s]">
              <Database className="size-4" />
            </div>
            <div className="text-primary/30 absolute top-1/3 right-1/4 animate-bounce [animation-delay:1s] [animation-duration:4s]">
              <Shield className="size-4" />
            </div>
            <div className="text-primary/25 absolute bottom-1/3 left-1/3 animate-bounce [animation-delay:0.5s] [animation-duration:3.5s]">
              <Sparkles className="size-3" />
            </div>
            <div className="text-primary/35 absolute top-1/2 right-1/3 animate-bounce [animation-delay:2s] [animation-duration:5s]">
              <Sparkles className="size-3" />
            </div>
          </div>

          {/* Mascot with floating animation */}
          <div className="relative aspect-square w-full max-w-md animate-[float_6s_ease-in-out_infinite]">
            <Image
              src="/hero-elephant.svg"
              alt="IvorySQL mascot"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
