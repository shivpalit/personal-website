import MaxWidthWrapper from "~/components/max-width-wrapper";
import { Badge } from "~/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { PROJECTS } from "~/lib/config";
import { Link } from "react-router";
import { ExternalLink, Github } from "lucide-react";

export default function FeaturedProjects() {
  return (
    <MaxWidthWrapper className="py-10 md:py-20">
      <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {PROJECTS.filter((p) => p.featured).map((project) => (
          <Card className="h-full group flex flex-col" key={project.title}>
            <CardHeader className="pb-3 flex-1">
              <CardTitle>
                <div className="flex gap-2 items-center justify-between">
                  <span>{project.title}</span>
                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-wrap gap-2 pt-0">
              {project.tags.map((tag) => (
                <Badge variant="secondary" key={tag}>
                  {tag}
                </Badge>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center">
        <Button variant="outline" className="mt-6" asChild>
          <Link to="/projects">View all projects</Link>
        </Button>
      </div>
    </MaxWidthWrapper>
  );
}
