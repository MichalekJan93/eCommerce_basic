import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";
import Typography from "../basic/typography/Typography";
import { URL_ENDPOINTS } from "@/app/Router";

const getFooterLinks = () => ({
  company: [
    { label: "About Us", href: URL_ENDPOINTS.INFO },
    { label: "Careers", href: URL_ENDPOINTS.INFO },
    { label: "Contact", href: URL_ENDPOINTS.INFO },
  ],
  support: [
    { label: "FAQ", href: URL_ENDPOINTS.INFO },
    { label: "Shipping", href: URL_ENDPOINTS.INFO },
    { label: "Returns", href: URL_ENDPOINTS.INFO },
  ],
  legal: [
    { label: "Privacy Policy", href: URL_ENDPOINTS.INFO },
    { label: "Terms of Service", href: URL_ENDPOINTS.INFO },
    { label: "Cookies", href: URL_ENDPOINTS.INFO },
  ],
});

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/MichalekJan93",
    icon: Github,
  },
  {
    label: "X",
    href: "https://x.com/MichalekJan93",
    icon: Twitter,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/janmichalekcoding/",
    icon: Linkedin,
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const FOOTER_LINKS = getFooterLinks();

  return (
    <footer className="py-8 sm:py-12">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 justify-items-center text-center sm:text-left">
        <div>
          <Typography
            type="small"
            className="text-primary-foreground font-semibold mb-4 block"
          >
            Company
          </Typography>
          <ul className="space-y-2">
            {FOOTER_LINKS.company.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Typography type="small">{link.label}</Typography>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Typography
            type="small"
            className="text-primary-foreground font-semibold mb-4 block"
          >
            Support
          </Typography>
          <ul className="space-y-2">
            {FOOTER_LINKS.support.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Typography type="small">{link.label}</Typography>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Typography
            type="small"
            className="text-primary-foreground font-semibold mb-4 block"
          >
            Legal
          </Typography>
          <ul className="space-y-2">
            {FOOTER_LINKS.legal.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Typography type="small">{link.label}</Typography>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Typography
            type="small"
            className="text-primary-foreground font-semibold mb-4 block"
          >
            Follow Us
          </Typography>
          <div className="flex gap-3">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-primary-foreground/20 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link
          to={URL_ENDPOINTS.HOME}
          className="text-primary-foreground font-bold text-lg"
        >
          Shop<span className="text-primary-foreground/70">Hub</span>
        </Link>
        <Typography type="small" className="text-primary-foreground/70">
          © {currentYear} ShopHub. All rights reserved.
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
