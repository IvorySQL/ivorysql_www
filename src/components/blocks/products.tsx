import {
  Cloud,
  Code2,
  Database,
  Globe2,
} from "lucide-react";


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const products = [
  {
    title: "Oracle Compatible",
    description: "Deep compatibility with Oracle PL/SQL syntax, packages, and data types",
    icon: Code2,
    points: ["PL/iSQL support", "Package structures", "One-click compatible_mode"],
  },
  {
    title: "PostgreSQL Kernel",
    description: "Built on PostgreSQL with full SQL compliance, reliability, and power",
    icon: Database,
    points: ["Complete SQL support", "High availability", "Rock-solid reliability"],
  },
  {
    title: "Ecosystem Tools",
    description: "55+ tools covering connectivity, monitoring, migration, and operations",
    icon: Globe2,
    points: ["Connection pooling", "HA & backup", "Migration & integration"],
  },
  {
    title: "Cloud Native",
    description: "Containerized deployment with one-click delivery via Docker Compose, Helm, and Operator",
    icon: Cloud,
    points: ["Docker & Kubernetes", "Helm & Operator", "IvorySQL Cloud"],
  },
];

export const Products = () => {
  return (
    <section className="pb-10 lg:pb-14">
      <div className="container">
        {/* Section header */}
        <div className="text-center mx-auto mt-8 max-w-4xl lg:mt-16">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            Core Capabilities
          </h2>
          <p className="text-muted-foreground mt-4 leading-snug">
            Oracle compatibility, enterprise-grade reliability, cloud-native deployment,
            and a rich ecosystem — all in one database.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:mt-12">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <Card key={product.title} className="rounded-2xl border-0 bg-muted/30 shadow-none transition-all hover:-translate-y-0.5 hover:bg-muted/50 hover:shadow-lg">
                <CardHeader className="pb-3">
                  <div className="bg-primary/10 mb-4 flex size-14 items-center justify-center rounded-xl">
                    <Icon className="text-primary size-7" />
                  </div>
                  <CardTitle className="text-xl">{product.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {product.description}
                  </CardDescription>
                  <ul className="text-muted-foreground mt-4 space-y-1.5 text-sm">
                    {product.points.map((point) => (
                      <li key={point} className="flex items-center gap-2">
                        <span className="text-primary">·</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
