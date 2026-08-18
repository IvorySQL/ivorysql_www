import Link from "next/link";

import { Button } from "@/components/ui/button";

export const CTA = () => {
  return (
    <section className="py-16 lg:py-20">
      <div className="container">
        <div className="bg-primary mx-auto max-w-4xl rounded-3xl px-6 py-12 text-center text-primary-foreground md:px-12 md:py-16">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            Start building with IvorySQL
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-snug text-primary-foreground/80 text-balance">
            Open source, Oracle compatible, and built for reliability. Get
            started today or explore the full documentation.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              asChild
            >
              <Link href="https://docs.ivorysql.org/">Get Started</Link>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30"
              asChild
            >
              <Link href="https://docs.ivorysql.org/">View Documentation</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
