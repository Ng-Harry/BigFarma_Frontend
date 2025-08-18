import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
import { ArrowDown } from "lucide-react";
import bgFront from "../../assets/images/bigfarma-brandimage.png";
import bgBack from "../../assets/images/bg-image-back.png";

const Hero = () => {
  return (
    <section
      id="home"
      className="w-full lg:h-screen flex flex-col lg:flex-row  lg:items-center  px-4 sm:px-8  relative overflow-hidden"
    >
      {/* Tagline Section */}
      <div className="w-full flex flex-col lg:mr-10">
        <div className="flex flex-col gap-3 m-4">
          <span className="w-22 h-8 bg-[var(--color-primary-transparent)] text-[var(--color-primary)] text-base p-3.5 font-bold leading-[0.34]">
            We Are
          </span>
          <div className="font-extrabold text-2xl sm:text-3xl md:text-5xl text-[var(--color-primary)] leading-snug break-word">
            Empowering Farmers <br />
            Connecting Markets <br />
            Growing Agriculture
          </div>
          <span className="italic text-base sm:text-lg text-[var(--color-primary)]">
            Transforming Africa&apos;s agro business
          </span>
          <NavLink
            to="sign-up"
            className="bg-[var(--color-primary)] text-white w-40 h-12 sm:w-60 sm:h-14 flex justify-center items-center rounded-lg text-sm sm:text-xl font-bold shadow hover:bg-[var(--color-primary-dark)] transition-colors"
          >
            Create an account
          </NavLink>
        </div>
      </div>

      {/*  Image Section */}
      <div className="w-full max-w-xl flex items-center justify-center relative mt-4 lg:mt-20 flex-col">
        <div className="relative flex items-center justify-center w-[19rem] h-[22rem] sm:w-[25rem] sm:h-[31.5rem] md:w-[31rem] md:h-[38rem] lg:w-[42rem] lg:h-[49rem] pb-10  mt-4">
          <img
            src={bgBack}
            alt="backImage"
            className="w-[15rem] h-[20rem] sm:w-[20rem] sm:h-[25rem] md:w-[25rem] md:h-[38rem] lg:w-[32rem] lg:h-[49rem] object-contain drop-shadow-lg z-10"
          />
          <img
            src={bgFront}
            alt="frontImage"
            className="absolute -translate-x-1/2 -translate-y-[42%] left-[51%] top-[42%] sm:top-[47%] w-[19rem] h-[20rem] sm:w-[22rem] sm:h-[28.5rem] md:w-[38rem] md:h-[44rem] object-contain drop-shadow-xl z-50"
          />
        </div>
      </div>

      {/* Arrow Down */}
      <Link
        to="About-us"
        className="w-10 h-10 border-1 border-[var(--color-secondary)] bg-[var(--color-secondary-transparent)] flex items-center justify-center rounded-full sm:w-13 sm:h-13 lg:w-16 lg:h-16 mt-2 lg:mt-7 ml-0 mr-auto shadow-md lg:absolute top-[85%] left-15"
      >
        <ArrowDown className="text-[var(--color-secondary-dark)]" />
      </Link>
    </section>
  );
};

export default Hero;
