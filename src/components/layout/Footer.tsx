import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <span className="font-serif text-xl font-bold">Hope Foundation</span>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Making a difference together. We empower communities through sustainable development, education, and compassionate action.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors" aria-label="Social link">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "About Us", path: "/about" },
                { label: "Our Projects", path: "/projects" },
                { label: "Donate", path: "/donate" },
                { label: "Volunteer", path: "/volunteer" },
                { label: "Blog", path: "/blog" },
                { label: "Careers", path: "/careers" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Get Involved</h3>
            <ul className="space-y-2">
              {[
                { label: "Donate Funds", path: "/donate" },
                { label: "Donate Items", path: "/donate-items" },
                { label: "Become a Member", path: "/membership" },
                { label: "Urgent Appeals", path: "/urgent-appeals" },
                { label: "Privacy Policy", path: "/privacy" },
                { label: "Terms of Use", path: "/terms" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary-foreground/60" />
                <span className="text-sm text-primary-foreground/70">123 Hope Street, Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0 text-primary-foreground/60" />
                <span className="text-sm text-primary-foreground/70">+254 700 123 456</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0 text-primary-foreground/60" />
                <span className="text-sm text-primary-foreground/70">info@hopefoundation.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Hope Foundation. All rights reserved.
          </p>
          <p className="text-sm text-primary-foreground/60">
            Made with <Heart className="w-3 h-3 inline fill-current text-charity-orange" /> for a better world
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
