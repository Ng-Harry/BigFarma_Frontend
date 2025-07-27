
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
        className="w-full flex flex-col items-center justify-evenly sm:flex-row px-0  relative "
      >
        <div className="w-full max-w-[40rem] h-[20rem] sm:h-[35rem]">
          {/* Brand TagLine */}
          <div className="flex flex-col gap-3 m-4 ">
            <span className=" bg-[var(--color-primary-transparent)] w-[4.5rem] h-[2rem] text-[var(--color-primary)] text-base py-3.5 px-1.5 font-bold leading-[0.34]">
              We Are
            </span>
            <div
              className="font-extrabold text-[2rem] sm:text-[55px] text-[var(--color-primary)] leading-snug break-word
"
            >
              Empowering Farmers <br />
              Connecting Markets <br />
              Growing Agriculture
            </div>
            <span className="italic text-base sm:text-[18px] text-[var(--color-primary)] ">
              Transforming Africa’s agro business
            </span>
            <NavLink
              to="sign-up"
              className="bg-[var(--color-primary)] text-[var(--color-neutral-light)] w-[9rem] h-[2.5rem] sm:w-[18rem] sm:h-[4rem] flex justify-center items-center rounded-lg text-sm sm:text-2xl leading-none font-bold"
            >
              Create an account
            </NavLink>
          </div>

          {/* Arrow Down */}
          <Link
            to="about-us"
            className="w-[2.5rem] h-[2.5rem] border-1 border-[var(--color-secondary)] bg-[var(--color-secondary-transparent)] flex items-center justify-center rounded-full sm:w-[4rem] sm:h-[4rem] absolute sm:bottom-1/14 sm:left-1/15 bottom-2 left-2"
          >
            <ArrowDown className="text-[var(--color-secondary-dark)]" />
          </Link>
        </div>

        {/* Brand  Image */}
        <div className="w-full max-w-[40rem] h-[33rem] sm:h-[40.5rem] flex justify-center">
          <div className="w-full h-[23rem] sm:w-[35rem] sm:h-[37.5rem] pr-3 relative">
            <img
              src={bgBack}
              alt="backImage"
              className="w-[500px] h-[500px] object-contain mx-5 my-3"
            />
            <img
              src={bgFront}
              alt="frontImage"
              className="absolute left-1/2 transform -translate-x-1/2 top-1/18  sm:w-full sm:h-full object-cover"
            />
          </div>
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
          {/* <ContactUs /> */}
        </section>

        <section>
          <Footer /> {/* Footer */}
        </section>
      </div>
    </>


  );
};

export default Home;
