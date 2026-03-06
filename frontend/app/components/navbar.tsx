import { Link, useLocation } from "react-router";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import { Menu, Square } from "lucide-react";
import { ModeToggle } from "~/components/mode-toggle";
import { NAVIGATION } from "~/lib/config";
import { cn } from "~/lib/utils";
import { ContactForm } from "~/components/contact-form";

export default function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 bg-background mx-auto w-full max-w-screen-xl px-6 md:px-20 z-50">
      <nav className="hidden flex-col md:flex md:flex-row md:items-center md:justify-between w-full h-full border-b">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Square className="size-5 fill-foreground" />
          <p>shivpalit</p>
        </Link>
        <div className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:justify-between md:gap-5 md:text-sm lg:gap-6">
          {NAVIGATION.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "hover:text-foreground transition-colors",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
          <ContactForm>
            <p role="button" className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              Contact
            </p>
          </ContactForm>
          <ModeToggle />
        </div>
      </nav>

      <Sheet>
        <div className="w-full flex md:hidden justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold w-fit">
            <Square className="size-5 fill-foreground" />
            <p>shivpalit</p>
          </Link>
          <div className="flex items-center gap-1">
            <ModeToggle />
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
          </div>
        </div>
        <SheetContent side="right">
          <nav className="grid gap-6 text-lg font-medium mt-8">
            {NAVIGATION.map((item) => (
              <SheetClose asChild key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "hover:text-foreground transition-colors",
                    pathname === item.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.title}
                </Link>
              </SheetClose>
            ))}
            <ContactForm>
              <p role="button" className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                Contact
              </p>
            </ContactForm>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
