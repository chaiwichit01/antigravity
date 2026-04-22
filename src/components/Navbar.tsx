import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Double7 Seven" className="h-9 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground font-medium transition-colors text-sm"
          >
            หน้าหลัก
          </Link>
          <Link
            to="/jobs"
            className="text-muted-foreground hover:text-foreground font-medium transition-colors text-sm"
          >
            ตำแหน่งงาน
          </Link>
          <Link to="/apply">
            <Button className="gradient-primary text-primary-foreground shadow-brand hover:opacity-90 font-semibold text-sm px-5 rounded-xl">
              สมัครงาน
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-3">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="text-foreground font-medium py-2"
          >
            หน้าหลัก
          </Link>
          <Link
            to="/jobs"
            onClick={() => setOpen(false)}
            className="text-foreground font-medium py-2"
          >
            ตำแหน่งงาน
          </Link>
          <Link to="/apply" onClick={() => setOpen(false)}>
            <Button className="gradient-primary text-primary-foreground w-full font-semibold rounded-xl">
              สมัครงาน
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
