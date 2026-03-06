import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import { ExternalLink, FileText } from "lucide-react";

export default function ResumeCard() {
  return (
    <Card className="h-full group">
      <a href="/documents/ShivPalitResume.pdf" target="_blank" rel="noopener noreferrer">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
              <FileText size={18} />
              <p>Resume</p>
            </div>
            <ExternalLink size={14} className="text-muted-foreground" />
          </div>
          <CardTitle className="text-base group-hover:text-foreground transition-colors">
            Download PDF
          </CardTitle>
        </CardHeader>
      </a>
    </Card>
  );
}
