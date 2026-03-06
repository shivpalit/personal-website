import MaxWidthWrapper from "~/components/max-width-wrapper";
import { ContactForm } from "~/components/contact-form";
import { Github, Linkedin } from "lucide-react";

export default function Hero() {
  return (
    <MaxWidthWrapper className="mb-16 mt-16 sm:mt-32 flex flex-col items-center justify-center text-center">
      <ContactForm>
        <div className="inline-flex items-center rounded-lg border px-3 py-1 text-sm font-medium mb-4 cursor-pointer hover:bg-accent transition-colors">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          <span className="sm:hidden">Open to opportunities</span>
          <span className="hidden sm:inline font-mono">Open to opportunities</span>
        </div>
      </ContactForm>

      <h1 className="max-w-4xl text-4xl font-extrabold md:text-5xl lg:text-6xl">
        Hi, I&apos;m a{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-700 to-pink-600">
          Data Scientist
        </span>{" "}
        building AI-powered data platforms.
      </h1>

      <p className="mt-5 max-w-prose text-muted-foreground sm:text-lg">
        Based in New York. I work at the intersection of data engineering, machine learning, and
        product strategy — turning messy real-world problems into clean, scalable systems.
      </p>

      <div className="mt-8 flex gap-4">
        <a
          href="https://github.com/shivpalit"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-foreground text-background px-4 py-2 rounded-full flex items-center justify-center gap-1.5"
        >
          <Github className="size-5" />
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/shivpalit/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0077b5] text-white px-4 py-2 rounded-full flex items-center justify-center gap-1.5"
        >
          <Linkedin className="size-5" />
          LinkedIn
        </a>
      </div>
    </MaxWidthWrapper>
  );
}
