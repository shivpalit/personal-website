import MaxWidthWrapper from "~/components/max-width-wrapper";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

const WORK = [
  {
    company: "Warner Bros. Discovery",
    title: "Sr. Product Manager",
    years: "June 2023 – Present",
    description:
      "Led the CX Data & AI team delivering scalable data products that unified customer insights across support, social, and app ecosystems. Launched WBD's first AI knowledge assistant for CX Advocates, saving $2M annually, and owned an LLM classification system delivering $1.5M in operational savings.",
  },
  {
    company: "Obi9 Technologies",
    title: "Founding Data Engineer",
    years: "Nov 2024 – Oct 2025",
    description:
      "Built the core data engineering infrastructure for an early-stage AI-insights platform analyzing biotech financial documents for institutional clients. Designed a graph-based extraction engine and AWS cloud infrastructure with Dagster-orchestrated pipelines, while shaping the investor narrative and 12-month product roadmap.",
  },
  {
    company: "Das42 Consulting",
    title: "Analytics Consultant",
    years: "Oct 2021 – June 2023",
    description:
      "Led full-stack BI and data infrastructure implementation for a B2C client using Looker, GCP, and Airflow, enabling a 285% increase in annual subscription revenue to $100M+. Built churn and LTV prediction models and drove $1M+ in revenue for Das42 by securing three contract extensions.",
  },
  {
    company: "Pura Vida Investments",
    title: "Data Science Engineer",
    years: "Apr 2020 – Oct 2021",
    description:
      "Built automated data pipelines aggregating 25+ alternative sources and NLP pipelines processing 100K+ daily posts for sentiment modeling. Designed quantitative clustering systems using PCA, DTW, and KMeans to identify correlated asset groups and surface early indicators of portfolio company performance.",
  },
];

export default function Experience() {
  return (
    <MaxWidthWrapper className="mb-16">
      <h2 className="text-2xl font-bold mb-4">Experience</h2>
      <div className="flex flex-col gap-4">
        {WORK.map((job) => (
          <Card key={job.company}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                <div>
                  <CardTitle className="text-base">{job.title}</CardTitle>
                  <CardDescription className="font-medium text-foreground/80">
                    {job.company}
                  </CardDescription>
                </div>
                <span className="text-sm text-muted-foreground shrink-0">{job.years}</span>
              </div>
              <CardDescription className="mt-2">{job.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
