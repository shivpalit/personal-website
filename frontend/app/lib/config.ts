type Project = {
  title: string;
  description: string;
  href: string;
  github?: string;
  tags: string[];
  featured?: boolean;
};

export const NAVIGATION = [
  { title: "Home", href: "/" },
  { title: "Projects", href: "/projects" },
  { title: "About", href: "/about" },
  { title: "Resume", href: "/resume" },
];

export const PROJECTS: Project[] = [
  {
    title: "Personal Website",
    description:
      "My personal portfolio site built with React Router v7 and Flask, featuring an AI assistant powered by GPT-4.",
    href: "https://github.com/shivpalit/personal-website",
    github: "https://github.com/shivpalit/personal-website",
    tags: ["React Router", "Python", "Flask", "OpenAI", "Docker"],
    featured: true,
  },
  {
    title: "CX Data Platform",
    description:
      "Data platform powering customer experience analytics across global streaming brands at Warner Bros. Discovery. Processes 10K+ daily customer contacts with LLM-based classifiers.",
    href: "https://github.com/shivpalit",
    tags: ["Python", "Airflow", "Databricks", "LangChain", "Looker"],
    featured: true,
  },
  {
    title: "Sentiment & Clustering Toolkit",
    description:
      "Proprietary NLP tools for sentiment analysis and topic clustering on customer support data, identifying patterns to drive operational improvements.",
    href: "https://github.com/shivpalit",
    tags: ["Python", "scikit-learn", "NLP", "Snowflake", "AWS"],
    featured: false,
  },
  {
    title: "Alternative Data Pipeline",
    description:
      "Data pipelines and analytics dashboards processing 100K+ daily data points from 25+ alternative sources for investment analysis.",
    href: "https://github.com/shivpalit",
    tags: ["Python", "PostgreSQL", "Docker", "Bloomberg API"],
    featured: false,
  },
];

export const TECH_STACK = [
  { title: "Python", href: "https://python.org" },
  { title: "SQL", href: "https://en.wikipedia.org/wiki/SQL" },
  { title: "AWS", href: "https://aws.amazon.com" },
  { title: "Docker", href: "https://docker.com" },
  { title: "Airflow", href: "https://airflow.apache.org" },
  { title: "Databricks", href: "https://databricks.com" },
  { title: "Snowflake", href: "https://snowflake.com" },
  { title: "Looker", href: "https://looker.com" },
  { title: "scikit-learn", href: "https://scikit-learn.org" },
  { title: "LangChain", href: "https://langchain.com" },
  { title: "OpenAI", href: "https://openai.com" },
  { title: "React", href: "https://reactjs.org" },
  { title: "TypeScript", href: "https://typescriptlang.org" },
  { title: "Git", href: "https://git-scm.com" },
];

export const FOOTER_PAGES = [
  { title: "Home", href: "/" },
  { title: "Projects", href: "/projects" },
  { title: "About", href: "/about" },
  { title: "Resume", href: "/resume" },
];

export const SOCIALS = [
  { title: "GitHub", href: "https://github.com/shivpalit" },
  { title: "LinkedIn", href: "https://www.linkedin.com/in/shivpalit/" },
];

export const OTHERS = [
  { title: "Email", href: "mailto:shivpalit@gmail.com" },
  { title: "Resume", href: "/documents/ShivPalitResume.pdf" },
];
