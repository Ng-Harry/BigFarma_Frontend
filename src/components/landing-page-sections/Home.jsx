import {
  AboutUsSection,
  HowItWorksSection,
  WhyChooseSection,
  ThinkInvestment,
  NavBar,
  Hero,
  FAQsSection,
  Testimonials,
  ContactUs,
  Footer,
} from "./index";

const Home = () => {
  return (
    <>
      <section className="w-full h-full bg-white  px-4 sm:px-8 lg:bg-[url('./assets/images/Background-Image.png')] lg:mx-auto lg:bg-cover lg:bg-center">
        <div className="lg:max-w-[1440px] mx-auto">
          <NavBar />
          <Hero />
        </div>
      </section>

      <section id="About-us">
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

      <section id="FAQs">
        <FAQsSection /> {/* FAQs */}
      </section>

      <section id="Testimonials">
        <Testimonials />
      </section>
      <section id="Contact-us">
        <ContactUs />
      </section>

      <section>
        <Footer /> {/* Footer */}
      </section>
    </>
  );
};

export default Home;
