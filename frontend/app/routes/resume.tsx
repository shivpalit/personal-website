import { useState } from "react";
import type { Route } from "./+types/resume";
import MaxWidthWrapper from "~/components/max-width-wrapper";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Download, ChevronDown, ChevronUp } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume — Shiv Palit" },
    { name: "description", content: "Work experience, education, and certifications." },
  ];
}

const EXPERIENCE = [
  {
    company: "Warner Bros. Discovery",
    title: "Sr. Product Manager, CX Data & AI",
    years: "June 2023 – Present",
    bullets: [
      "Led the CX Data & AI team delivering scalable data products that unified customer insights across support, social, and app ecosystems",
      "Launched WBD's first AI knowledge assistant for CX Advocates, reducing average handle time and saving $2M annually",
      "Owned an LLM-based ticket classification system delivering $1.5M in operational savings through automated routing and prioritization",
      "Partnered with engineering and data science to define roadmap, OKRs, and success metrics for AI-powered CX tooling",
      "Drove cross-functional alignment across Product, Engineering, Operations, and Legal to ship compliant AI features at scale",
    ],
  },
  {
    company: "Obi9 Technologies",
    title: "Founding Data Engineer",
    years: "Nov 2024 – Oct 2025",
    bullets: [
      "Built the core data engineering infrastructure for an early-stage AI-insights platform analyzing biotech financial documents for institutional clients",
      "Designed a graph-based extraction engine to surface relationships across SEC filings, patents, and clinical trial data",
      "Stood up AWS cloud infrastructure with Dagster-orchestrated pipelines for reliable, scalable document ingestion",
      "Shaped the investor narrative and contributed to the 12-month product roadmap as a founding team member",
    ],
  },
  {
    company: "Das42 Consulting",
    title: "Analytics Consultant",
    years: "Oct 2021 – June 2023",
    bullets: [
      "Led full-stack BI and data infrastructure implementation for a B2C client using Looker, GCP, and Airflow",
      "Enabled a 285% increase in annual subscription revenue, growing client from $35M to $100M+",
      "Built churn prediction and LTV models that informed retention strategy and personalization efforts",
      "Drove $1M+ in revenue for Das42 by successfully negotiating and securing three contract extensions",
      "Mentored junior consultants and contributed to internal tooling and delivery frameworks",
    ],
  },
  {
    company: "Pura Vida Investments",
    title: "Data Science Engineer",
    years: "Apr 2020 – Oct 2021",
    bullets: [
      "Built automated data pipelines aggregating 25+ alternative data sources including satellite, web scrape, and earnings call transcripts",
      "Developed NLP pipelines processing 100K+ daily social and news posts for real-time sentiment modeling",
      "Designed quantitative clustering systems using PCA, DTW, and KMeans to identify correlated asset groups",
      "Surfaced early indicators of portfolio company performance to support long/short equity decision-making",
    ],
  },
];

const EDUCATION = [
  {
    school: "Johns Hopkins University",
    degree: "M.S. in Data Science",
    years: "2022 – 2025",
    courses: [
      "Data Engineering",
      "Graph Theory",
      "Information Retrieval",
      "Machine Learning",
      "Optimization",
      "Statistical Models",
    ],
  },
  {
    school: "Davidson College",
    degree: "B.A. in Economics, Minor in Data Science",
    years: "2015 – 2019",
    courses: [
      "Econometrics",
      "Financial Economics",
      "Micro/Macro Theory",
      "Accounting",
      "Data Structures",
      "Data Science",
      // "Programming & Problem Solving",
    ],
  },
];

const SKILLS = [
  { category: "Languages", items: ["Python", "SQL", "TypeScript"] },
  { category: "Cloud & Infra", items: ["AWS", "GCP", "Docker", "Databricks"] },
  { category: "Data & Pipelines", items: ["Airflow", "Dagster", "Snowflake", "dbt"] },
  { category: "BI & Analytics", items: ["Looker", "Tableau"] },
  { category: "AI & ML", items: ["LangChain", "OpenAI", "scikit-learn", "NLP", "LLMs"] },
  { category: "Frontend", items: ["React", "Streamlit", "Reflex"] },
];

const CERTIFICATIONS = [
  { name: "Apache Airflow Fundamentals", issuer: "Astronomer", issued: "Nov 2022" },
  { name: "LookML Developer", issuer: "Looker", issued: "Nov 2022" },
  { name: "SnowPro Core", issuer: "Snowflake", issued: "Apr 2022" },
];

function ExperienceItem({ job }: { job: (typeof EXPERIENCE)[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group transition-colors hover:text-foreground"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 min-w-0">
          <span className="font-semibold text-base leading-tight">{job.title}</span>
          <span className="hidden sm:block text-muted-foreground">·</span>
          <span className="text-sm text-muted-foreground font-medium">{job.company}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0 pt-0.5">
          <span className="text-sm text-muted-foreground hidden sm:block">{job.years}</span>
          {open ? (
            <ChevronUp size={16} className="text-muted-foreground" />
          ) : (
            <ChevronDown size={16} className="text-muted-foreground" />
          )}
        </div>
      </button>
      {open && (
        <div className="pb-5 -mt-1">
          <p className="text-xs text-muted-foreground mb-3 sm:hidden">{job.years}</p>
          <ul className="space-y-2">
            {job.bullets.map((b, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/50 shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function Resume() {
  return (
    <MaxWidthWrapper className="py-10 md:py-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-bold">Resume</h1>
        <a href="/documents/ShivPalitResume.pdf" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm" className="gap-2">
            <Download size={14} />
            Download PDF
          </Button>
        </a>
      </div>

      {/* Experience */}
      <section className="mb-14">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Experience
        </h2>
        <div className="border-t border-border">
          {EXPERIENCE.map((job) => (
            <ExperienceItem key={job.company} job={job} />
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-14">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Education
        </h2>
        <div className="border-t border-border">
          {EDUCATION.map((edu) => (
            <div key={edu.school} className="border-b border-border last:border-0 py-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <span className="font-semibold text-base leading-tight">{edu.degree}</span>
                  <span className="hidden sm:block text-muted-foreground">·</span>
                  <span className="text-sm text-muted-foreground font-medium">{edu.school}</span>
                </div>
                <span className="text-sm text-muted-foreground shrink-0">{edu.years}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {edu.courses.map((c) => (
                  <Badge variant="secondary" key={c} className="font-mono text-xs">
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-14">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Skills
        </h2>
        <div className="border-t border-border">
          {SKILLS.map((group) => (
            <div key={group.category} className="border-b border-border last:border-0 py-4 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
              <span className="text-sm font-medium w-36 shrink-0 text-muted-foreground">{group.category}</span>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <Badge variant="secondary" key={item} className="font-mono text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Certifications
        </h2>
        <div className="border-t border-border">
          {CERTIFICATIONS.map((cert) => (
            <div key={cert.name} className="border-b border-border last:border-0 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <p className="font-medium text-sm">{cert.name}</p>
              <p className="text-sm text-muted-foreground">
                {cert.issuer} · {cert.issued}
              </p>
            </div>
          ))}
        </div>
      </section>
    </MaxWidthWrapper>
  );
}
