import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const FloatingDonateButton = () => {
  return (
    <Link
      to="/donate"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-5 py-3 rounded-full shadow-elevated transition-all hover:scale-105 animate-pulse-warm"
      aria-label="Donate Now"
    >
      <Heart className="w-5 h-5 fill-current" />
      <span className="hidden sm:inline">Donate</span>
    </Link>
  );
};

export default FloatingDonateButton;
