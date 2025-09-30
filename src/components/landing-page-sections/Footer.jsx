import React from 'react';
import brandLogo from '../../assets/images/brand-logo.png';
import faceBook from '../../assets/images/Facebook.svg';
import instagran from '../../assets/images/Instagram.svg';
import x from '../../assets/images/X.svg';
import linkedIn from '../../assets/images/LinkedIn.svg';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';

const Footer = () => {
  return (
    <footer className="w-full  bg-[var(--color-primary-dark)] text-white mt-20">
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start p-20 md:p-9 gap-6">
          <div className="max-w-[300px]">
            <img
              src={brandLogo}
              alt="Brand Logo"
              className="h-9 w-[150px] mb-8 object-contain"
            />

            <p className="mb-4 text-sm md:text-base">
              BigFarma is a digital platform that connects farmers and consumers
              in one simple app. Farmers sell produce, access finance, and get
              farming support, while consumers buy fresh farm products and
              invest directly in verified farm projects.
            </p>

            <div className="flex gap-2 w-10 h-10 md:w-12 md:h-12">
              <img src={linkedIn} alt="LinkedIn" />
              <img src={x} alt="X" />
              <img src={faceBook} alt="Facebook" />
              <img src={instagran} alt="Instagram" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-8">Company</h3>
            <nav className="flex flex-col gap-4 cursor-pointer">
              <Link
                to="home"
                smooth={true}
                duration={500}
                className="cursor-pointer"
              >
                Home
              </Link>
              <Link to="about-us" smooth={true} duration={500}>
                About Us
              </Link>
              <Link
                to="faqs"
                smooth={true}
                duration={500}
                className="cursor-pointer"
              >
                FAQs
              </Link>
              <Link
                to="testimonials"
                smooth={true}
                duration={500}
                className="cursor-pointer"
              >
                Testimonials
              </Link>
              <Link to="contact-us" smooth={true} duration={500}>
                Contact Us
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-8">Legal information</h3>
            <nav className="flex flex-col gap-4">
              <NavLink to="/privacy-policy">Privacy Policy</NavLink>
              <NavLink to="/terms-of-service">Terms and conditions</NavLink>
            </nav>
          </div>

          <div className="max-w-[300px]">
            <h3 className="text-lg font-semibold mb-8">Stay connected</h3>
            <p className="mb-4">
              Subscribe to get updates on new features, market opportunities,
              and platform offers.
            </p>
            <p>Email</p>
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 mb-2 bg-white rounded-lg placeholder-[#98A2B3]"
              />
              <button className="bg-white text-[var(--color-primary)] px-2 py-3 font-bold rounded-md mt-2 w-1/2">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
