import type { Route } from "./+types/resume";
import MaxWidthWrapper from "~/components/max-width-wrapper";
import { Badge } from "~/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume — Shiv Palit" },
    { name: "description", content: "Work experience, education, and certifications." },
  ];
}

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
      "Data Science",
      "Data Structures",
      "Econometrics",
      "Financial Economics",
      "Programming & Problem Solving",
    ],
  },
];

const CERTIFICATIONS = [
  { name: "Apache Airflow Fundamentals", issuer: "Astronomer", issued: "Nov 2022" },
  { name: "LookML Developer", issuer: "Looker", issued: "Nov 2022" },
  { name: "SnowPro Core", issuer: "Snowflake", issued: "Apr 2022" },
];

export default function Resume() {
  return (
    <MaxWidthWrapper className="py-10 md:py-20">
      <h1 className="text-4xl font-bold mb-8">Resume</h1>

      {/* Education */}
      <h2 className="text-2xl font-bold mb-4">Education</h2>
      <div className="flex flex-col gap-4 mb-12">
        {EDUCATION.map((edu) => (
          <Card key={edu.school}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                <div>
                  <CardTitle className="text-base">{edu.degree}</CardTitle>
                  <CardDescription className="font-medium text-foreground/80">
                    {edu.school}
                  </CardDescription>
                </div>
                <span className="text-sm text-muted-foreground shrink-0">{edu.years}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {edu.courses.map((c) => (
                  <Badge variant="secondary" key={c} className="font-mono text-xs">
                    {c}
                  </Badge>
                ))}
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Certifications */}
      <h2 className="text-2xl font-bold mb-4">Certifications</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {CERTIFICATIONS.map((cert) => (
          <Card key={cert.name}>
            <CardHeader>
              <CardTitle className="text-sm">{cert.name}</CardTitle>
              <CardDescription>
                {cert.issuer} · {cert.issued}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
