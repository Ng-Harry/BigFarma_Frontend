import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import { useState } from "react";
import brandLogo from "../assets/images/brand-logo.png";
import "../assets/styles/NavBar.css";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimation, setIsAnimation] = useState(false);
  const [Exit, setExit] = useState(false);

  const toggleHamburgerMenu = () => {
    if (isOpen) {
      setExit(true);
      setTimeout(() => {
        setIsAnimation(false);
        setIsOpen(false);
        setExit(false);
      }, 300);
    } else {
      setIsOpen(true);
      setIsAnimation(true);
    }
    // setIsOpen(!isOpen);
  };

  return (
    <header className="w-full h-25 flex items-center justify-around relative">
      {/* Brand Logo */}
      <img
        src={brandLogo}
        alt="brand logo"
        className="h-9 w-[150px] object-contain"
      />

      {/* DesktopMenu */}
      <nav className=" hidden w-[31.3rem] h-9 md:flex gap-6 items-center justify-between navlink text-base font-medium leading-none">
        <Link to="home" smooth={true} duration={500}>
          Home
        </Link>
        <Link to="about-us" smooth={true} duration={500}>
          About Us
        </Link>
        <Link to="faqs" smooth={true} duration={500}>
          FAQs
        </Link>
        <Link to="testimonials" smooth={true} duration={500}>
          Testimonials
        </Link>
        <Link to="contact-us" smooth={true} duration={500}>
          Contact Us
        </Link>
      </nav>

      {/*Desktop Sign In/Sign Up */}
      <div className=" hidden w-[220px] h-9 items-center justify-between md:flex text-4xl">
        <NavLink
          to="/sign-in"
          className="border-1 border-[var(--color-primary)] text-[var(--color-primary)] w-[105px] h-[50px] px-6 py-4 rounded-lg text-base leading-none"
        >
          Sign In
        </NavLink>
        <NavLink
          to="sign-up"
          className="bg-[var(--color-primary)] text-[var(--color-neutral-light)] w-[105px] h-[50px] px-5 py-4 rounded-lg text-base leading-none"
        >
          Sign Up
        </NavLink>
      </div>

      {/* Mobile View */}

      <div className="md:hidden flex items-center gap-4">
        <Link
          to="#"
          className="border-1 border-[var(--color-primary)] text-[var(--color-primary)] w-[105px] h-[50px] px-6 py-4 rounded-lg text-base leading-none md:hidden"
        >
          Sign In
        </Link>
        {/* Hamburger & Exit Icon for Mobile */}
        {isOpen ? (
          <button onClick={toggleHamburgerMenu}>
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ) : (
          <button onClick={toggleHamburgerMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
      </div>
      {/* Mobile Menu */}
      {isAnimation && (
        <nav
          className={` md:hidden w-[550px] flex flex-col h-[300px] gap-5 py-4 items-center navlink absolute top-[5rem] bg-[var(--color-neutral-light)] z-50 shadow-md ${
            Exit ? "menu-animate-up" : "menu-animate-down"
          }`}
        >
          <Link to="home" smooth={true} duration={500}>
            Home
          </Link>
          <Link to="about-us" smooth={true} duration={500}>
            About Us
          </Link>
          <Link to="faqs" smooth={true} duration={500}>
            FAQs
          </Link>
          <Link to="testimonials" smooth={true} duration={500}>
            Testimonials
          </Link>
          <Link to="contact-us" smooth={true} duration={500}>
            Contact Us
          </Link>
          <Link
            to="/sign-up"
            className="border-1 bg-[var(--color-primary)]  w-[105px] h-[50px] px-5 py-4 rounded-lg text-base leading-none "
            style={{ color: "var(--color-neutral-light)" }}
          >
            Sign Up
          </Link>
        </nav>
      )}
    </header>
  );
};

export default NavBar;
