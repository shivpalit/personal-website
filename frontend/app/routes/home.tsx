import type { Route } from "./+types/home";
import Hero from "~/components/hero";
import FeaturedProjects from "~/components/featured-projects";
import AboutMe from "~/components/about-me";
import Experience from "~/components/experience";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Shiv Palit" },
    {
      name: "description",
      content: "Data scientist and AI/ML engineer building scalable data platforms.",
    },
  ];
}

export default function Home() {
  return (
    <>
      <Hero />
      {/* <FeaturedProjects /> */}
      <Experience />
      <AboutMe />
    </>
  );
}
