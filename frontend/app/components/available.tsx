import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import { ContactForm } from "~/components/contact-form";

export default function Available() {
  return (
    <Card className="h-full flex flex-col justify-center">
      <ContactForm>
        <CardHeader className="cursor-pointer">
          <div className="flex justify-center mb-2">
            <span className="relative flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-4 w-4 rounded-full bg-green-400" />
            </span>
          </div>
          <CardTitle className="text-center">Open to Opportunities</CardTitle>
        </CardHeader>
      </ContactForm>
    </Card>
  );
}
