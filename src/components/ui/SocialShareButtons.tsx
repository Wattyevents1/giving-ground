import { Facebook, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialShareButtonsProps {
  url: string;
  title: string;
  className?: string;
}

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SocialShareButtons = ({ url, title, className = "" }: SocialShareButtonsProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <Facebook className="w-4 h-4" />,
      className: "bg-[#1877F2] hover:bg-[#1877F2]/90 text-white",
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <XIcon className="w-4 h-4" />,
      className: "bg-foreground hover:bg-foreground/90 text-background",
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: <MessageCircle className="w-4 h-4" />,
      className: "bg-[#25D366] hover:bg-[#25D366]/90 text-white",
    },
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {links.map((link) => (
        <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
          <Button size="sm" className={`gap-1.5 ${link.className}`}>
            {link.icon}
            <span className="text-xs">{link.label}</span>
          </Button>
        </a>
      ))}
    </div>
  );
};

export default SocialShareButtons;
