import { Card, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { BriefcaseIcon } from "lucide-react";

export default function ExperienceCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
          <BriefcaseIcon size={18} />
          <p>Currently</p>
        </div>
        <CardTitle className="text-base">Warner Bros. Discovery</CardTitle>
        <CardDescription>Sr. PM, CX Data &amp; AI</CardDescription>
      </CardHeader>
    </Card>
  );
}
