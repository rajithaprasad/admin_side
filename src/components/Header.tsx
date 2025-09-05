import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import logo from "../assets/logo.png"; // Import the logo image

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Testimonials", href: "/testimonials" },

  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-card/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-card/80 backdrop-blur-sm border-transparent",
        "h-16 md:h-20"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center h-full">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 md:space-x-3 group">
            <img
              src={logo}
              alt="MoveExpress Logo"
              className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-105"
            />
            <span
              className="text-xl md:text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              MOVEXPRESS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                  location.pathname === item.href
                    ? "text-primary font-semibold bg-primary/10"
                    : "text-foreground/80 hover:text-primary hover:bg-accent/5"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed top-16 inset-x-0 bg-card z-50 shadow-lg transform transition-transform duration-300 ease-in-out md:hidden border-t border-border">
            <div className="flex flex-col p-4">
              <nav className="flex flex-col space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-md text-base font-medium transition-colors",
                      location.pathname === item.href
                        ? "text-primary bg-primary/10 font-semibold"
                        : "text-foreground/80 hover:text-primary hover:bg-accent/5"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
