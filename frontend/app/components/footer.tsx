import { Link } from "react-router";
import { FOOTER_PAGES, SOCIALS, OTHERS } from "~/lib/config";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-background mx-auto w-full max-w-screen-xl px-6 md:px-20">
      <div className="border-t w-full py-6">
        <div className="grid grid-cols-3">
          <div className="flex flex-col gap-4 items-center">
            {FOOTER_PAGES.map((page) => (
              <Link
                key={page.href}
                to={page.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {page.title}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-4 items-center">
            {SOCIALS.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {social.title}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-4 items-center">
            {OTHERS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
        <p className="pt-8 text-sm text-muted-foreground text-center">© {year} · Shiv Palit</p>
      </div>
    </footer>
  );
}
