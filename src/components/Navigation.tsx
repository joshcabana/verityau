import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-[0_8px_32px_rgba(122,92,255,0.1)]"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(122,92,255,0.4)]">
              <Heart className="h-6 w-6 text-white fill-white" />
            </div>
            <span className="font-bold text-xl text-foreground">Verity</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-sm font-medium text-secondary-text hover:text-foreground transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-sm font-medium text-secondary-text hover:text-foreground transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("safety")}
              className="text-sm font-medium text-secondary-text hover:text-foreground transition-colors"
            >
              Safety
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-sm font-medium text-secondary-text hover:text-foreground transition-colors"
            >
              FAQ
            </button>
          </div>

          {/* Desktop CTA Button */}
          <Button asChild size="default" className="hidden md:inline-flex rounded-xl shadow-[0_0_20px_rgba(122,92,255,0.3)]">
            <Link to="/auth">Get Started</Link>
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="block w-full text-left py-3 px-4 text-base font-medium text-foreground hover:bg-primary/10 rounded-lg transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="block w-full text-left py-3 px-4 text-base font-medium text-foreground hover:bg-primary/10 rounded-lg transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("safety")}
                className="block w-full text-left py-3 px-4 text-base font-medium text-foreground hover:bg-primary/10 rounded-lg transition-colors"
              >
                Safety
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="block w-full text-left py-3 px-4 text-base font-medium text-foreground hover:bg-primary/10 rounded-lg transition-colors"
              >
                FAQ
              </button>
              <Button asChild size="lg" className="w-full rounded-xl mt-4">
                <Link to="/auth">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
