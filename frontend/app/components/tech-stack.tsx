import { Card, CardHeader } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { FileCode } from "lucide-react";
import { TECH_STACK } from "~/lib/config";

const colors = [
  "bg-red-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-indigo-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-orange-400",
  "bg-cyan-400",
  "bg-rose-400",
  "bg-fuchsia-400",
  "bg-violet-400",
  "bg-emerald-400",
  "bg-teal-400",
];

export default function TechStack() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2 text-sm">
          <FileCode size={18} />
          <p>Tech Stack</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {TECH_STACK.map((tech, i) => (
            <a href={tech.href} key={tech.title} target="_blank" rel="noopener noreferrer">
              <Badge variant="secondary">
                <div className={`${colors[i % colors.length]} w-2 h-2 mr-2 rounded-full`} />
                <span className="font-mono">{tech.title}</span>
              </Badge>
            </a>
          ))}
        </div>
      </CardHeader>
    </Card>
  );
}
