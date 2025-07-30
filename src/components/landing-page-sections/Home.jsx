// component import
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
      <div className="w-full h-screen bg-[var(--color-neutral-light)] lg:bg-[url('./assets/images/Background-Image.png')] bg-cover bg-center md:bg-no-repeat">
        <NavBar />
        <Hero />
      </div>

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
        <FAQsSection /> {/* FAQs */}
      </section>

      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="contact-us">
        <ContactUs />
      </section>

      <section>
        <Footer /> {/* Footer */}
      </section>
    </>
  );
};

export default Home;
