import { Github, LinkIcon, Linkedin, Mail } from "lucide-react";
import { Card, CardHeader } from "~/components/ui/card";

export default function Connect() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2 text-sm">
          <LinkIcon size={18} />
          <p>Connect with me</p>
        </div>
        <div className="flex flex-col gap-2 *:text-muted-foreground *:flex *:items-center *:hover:text-foreground *:transition-colors">
          <a href="mailto:shivpalit@gmail.com">
            <Mail size={18} className="mr-3" />
            shivpalit@gmail.com
          </a>
          <a href="https://github.com/shivpalit" target="_blank" rel="noopener noreferrer">
            <Github size={18} className="mr-3" />
            github.com/shivpalit
          </a>
          <a
            href="https://www.linkedin.com/in/shivpalit/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={18} className="mr-3" />
            linkedin.com/in/shivpalit
          </a>
        </div>
      </CardHeader>
    </Card>
  );
}
