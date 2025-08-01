import aboutUsImage from "../../assets/svgs/about.svg";

export default function AboutUsSection() {
    return (
      <section className="py-4 md:py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <img 
              src={aboutUsImage}
              alt="Farmers with fresh produce"
              className="w-full h-auto order-2 lg:order-1"
            />
  
            <div className="space-y-6 order-1 lg:order-2">
              <h1 className="text-3xl md:text-5xl font-bold">About Us</h1>
              <div className="space-y-4 text-sm md:text-lg leading-relaxed">
                <p>
                  BigFarma is a digital platform that connects farmers and consumers in one simple app. Farmers sell
                  produce, access finance, and get farming support, while consumers buy fresh farm products and invest
                  directly in verified farm projects.
                </p>
  
                <p>
                  With our marketplace, investment hub, delivery network, and advisory tools, BigFarma makes farming
                  profitable and food more accessible across Nigeria.
                </p>
  
                <p>
                  Our vision is to be the leading platform that makes farming simple and food accessible across Nigeria.
                  We believe in creating a transparent, efficient agricultural value chain where farmers, consumers, and
                  investors all succeed together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
