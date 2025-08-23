import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import { useState } from "react";
import brandLogo from "../../assets/images/brand-logo.png";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
// import "../../assets/styles/NavBar.css";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleHamburgerMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="w-full h-23 flex items-center justify-between px-4 md:px-12">
      {/* Brand Logo */}
      <img
        src={brandLogo}
        alt="brand logo"
        className="h-8 w-auto object-contain"
      />

      {/* DesktopMenu */}
      <nav className=" hidden md:flex gap-8 items-center navlink text-base leading-none font-medium">
        {["Home", "About-us", "FAQs", "Testimonials", "Contact-us"].map(
          (menu) => (
            <Link
              key={menu}
              to={menu}
              smooth={true}
              duration={500}
              className="cursor-pointer capitalize"
              onClick={() => setIsOpen(false)}
            >
              {menu.replace("-", " ")}
            </Link>
          )
        )}
      </nav>

      {/*Desktop Sign In/Sign Up */}
      <div className="hidden md:flex items-center gap-3">
        <NavLink
          to="/sign-in"
          className="border-1 border-[var(--color-primary)] text-[var(--color-primary)] px-6 py-4 rounded-lg text-base leading-none hover:bg-[var(--color-primary)] hover:text-white transition-colors "
        >
          Sign In
        </NavLink>
        <NavLink
          to="/role"
          className="bg-[var(--color-primary)] text-[var(--color-neutral-light)] w-[105px] h-[50px] px-5 py-4 rounded-lg text-base leading-none"
        >
          Sign Up
        </NavLink>
      </div>

      {/* Mobile View */}

      {/* Hamburger & Exit Icon for Mobile */}
      <div className="md:hidden flex items-center gap-4">
        <NavLink
          to="/sign-in"
          className="border-1 border-[var(--color-primary)] text-[var(--color-primary)] px-6 py-4 rounded-lg text-base leading-none hover:bg-[var(--color-primary)] hover:text-white transition-colors "
        >
          Sign In
        </NavLink>

        {/* Hamburger & Exit Icon for Mobile */}
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.button
              key="close"
              onClick={toggleHamburgerMenu}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HiX className="w-8 h-8" />
            </motion.button>
          ) : (
            <motion.button
              key="open"
              onClick={toggleHamburgerMenu}
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HiMenu className="w-8 h-8" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden w-[90vw] h-auto flex flex-col items-center gap-4 py-6 navlink absolute top-20 bg-[var(--color-neutral-light)] z-50 shadow-md"
          >
            {["Home", "About-us", "FAQs", "Testimonials", "Contact-us"].map(
              (menu) => (
                <Link
                  to={menu}
                  smooth={true}
                  duration={500}
                  className="cursor-pointer capitalize"
                  onClick={() => setIsOpen(false)}
                >
                  {menu.replace("-", " ")}
                </Link>
              )
            )}
            <NavLink
              to="/role"
              className="border-1 bg-[var(--color-primary)] px-5 py-4 rounded-lg text-base leading-none "
              style={{ color: "var(--color-neutral-light)" }}
            >
              Sign Up
            </NavLink>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;
