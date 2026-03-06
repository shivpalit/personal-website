import type { Route } from "./+types/about";
import MaxWidthWrapper from "~/components/max-width-wrapper";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About — Shiv Palit" },
    { name: "description", content: "A little about me." },
  ];
}

export default function About() {
  return (
    <MaxWidthWrapper className="py-10 md:py-20">
      <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-16">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-6">Hi 👋 I'm Shiv Palit</h1>
          <p className="text-muted-foreground mb-4">
            I'm a data scientist with a product mindset, passionate about building scalable AI/ML solutions that unlock insights and drive impact. Currently at Warner Bros. Discovery, I lead the development of data platforms that power customer experience analytics across global streaming brands. I enjoy working at the intersection of data engineering, modeling, and product strategy - translating messy real-world problems into clean, efficient systems.
          </p>
          <p className="text-muted-foreground mb-4">
            My primary toolkit includes Python, Docker, and AWS. I'm especially comfortable working with LLMs, clustering & classification algorithms, and streamlining complex pipelines. I love designing intuitive tools that make data accessible to everyone, from analysts to executives.
          </p>
          <p className="text-muted-foreground">
            Curious by nature and collaborative by default, I thrive in fast-paced environments where I can work cross-functionally, mentor others, and continuously learn. Whether it's scaling up a data platform or experimenting with a new model architecture, I'm always looking for ways to make data more actionable and impactful.
          </p>
        </div>
        <div className="shrink-0">
          <img
            src="/images/profilepic.jpeg"
            alt="Shiv Palit"
            className="rounded-2xl w-56 md:w-64 object-cover"
          />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
