import React from "react";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
import { ArrowDown } from "lucide-react"; //react icon
// Image Import
import bgBack from "../assets/images/bg-image-back.png";
import bgFront from "../assets/images/bigfarma-brandimage.png";
// component import
import AboutUsSection from "./landing-page-sections/AboutUsSection";
import HowItWorksSection from "./landing-page-sections/HowItWorksSection";
import WhyChooseSection from "./landing-page-sections/WhyChooseSection";
import ThinkInvestment from "./landing-page-sections/ThinkInvestmentSection";
import FAQs from "./FAQs";
import Testimonials from "./Testimonials";
import ContactUs from "./ContactUs";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <section
        id="home"
        className="w-full lg:h-screen flex flex-col items-center justify-center  lg:flex-row px-4 sm:px-8 md:px-16 gap-8 relative overflow-hidden"
      >
        <div className=" w-full  flex flex-col justify-center  gap-6 sm:mb-10 ">
          {/* Brand TagLine */}
          <div className="flex flex-col gap-3 m-4 ">
            <span className="w-22 h-8 bg-[var(--color-primary-transparent)] text-[var(--color-primary)] text-base p-3.5 font-bold leading-[0.34]">
              We Are
            </span>
            <div className="font-extrabold text-2xl sm:text-3xl md:text-5xl text-[var(--color-primary)] leading-snug break-word">
              Empowering Farmers <br />
              Connecting Markets <br />
              Growing Agriculture
            </div>
            <span className="italic text-base sm:text-lg text-[var(--color-primary)] ">
              Transforming Africa’s agro business
            </span>
            <NavLink
              to="sign-up"
              className="bg-[var(--color-primary)] text-white w-40 h-12 sm:w-60 sm:h-14 flex justify-center items-center rounded-lg text-sm sm:text-xl font-bold shadow hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              Create an account
            </NavLink>
            {/* Arrow Down: only show under tagline on desktop */}
            <Link
              to="about-us"
              className="w-10 h-10 border-1 border-[var(--color-secondary)] bg-[var(--color-secondary-transparent)] lg:flex items-center justify-center hidden rounded-full sm:w-16 sm:h-16 mt-15 shadow-md"
            >
              <ArrowDown className="text-[var(--color-secondary-dark)]" />
            </Link>
          </div>
        </div>

        {/* Brand  Image */}
        <div className="w-full max-w-xl flex items-center justify-center relative mt-4 lg:mb-20 flex-col">
          <div className="relative flex items-center justify-center w-[19rem] h-[22rem] sm:w-[25rem] sm:h-[31.5rem] md:w-[31rem] md:h-[38rem] lg:w-[35rem] lg:h-[44rem] pb-18">
            <img
              src={bgBack}
              alt="backImage"
              className="w-[15rem] h-[20rem] sm:w-[20rem] sm:h-[25rem] md:w-[25rem] md:h-[38rem] lg:w-[31rem] lg:h-[35rem] object-contain mx-auto drop-shadow-lg z-10"
            />
            <img
              src={bgFront}
              alt="frontImage"
              className="absolute -translate-x-1/2 -translate-y-[45%] left-[51%] top-[42%] sm:top-[47%] w-[19rem] h-[20rem] sm:w-[22rem] sm:h-[28.5rem] md:w-[38rem] md:h-[44rem] lg:w-[38rem] lg:h-[40rem] object-contain drop-shadow-xl z-50"
            />
          </div>
          {/* Arrow Down: only show below images on mobile/tablet */}
          <Link
            to="about-us"
            className="w-10 h-10 border-1 border-[var(--color-secondary)] bg-[var(--color-secondary-transparent)] flex items-center justify-center rounded-full sm:w-12 sm:h-12 mt-2 shadow-md lg:hidden ml-0 mr-auto "
          >
            <ArrowDown className="text-[var(--color-secondary-dark)]" />
          </Link>
        </div>
      </section>

      <div className="bg-white">
        <section id="about-us">
          <AboutUsSection /> {/* AboutUsSection */}
        </section>

        <section>
          <HowItWorksSection /> {/* howItWorksSection */}
        </section>

        <section>
          <WhyChooseSection /> {/* WhyChooseSection */}
        </section>

        <section>
          <ThinkInvestment /> {/* ThinkInvestment */}
        </section>

        <section id="faqs">
          <FAQs /> {/* FAQs */}
        </section>

        <section id="testimonials">
          <Testimonials />
        </section>
        <section>
          <ContactUs />
        </section>

        <section>
          <Footer /> {/* Footer */}
        </section>
      </div>
    </>
  );
};

export default Home;
