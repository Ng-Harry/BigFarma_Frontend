import React from 'react'
import AboutUsSection from './landing-page-sections/AboutUsSection'
import HowItWorksSection from './landing-page-sections/HowItWorksSection'
import WhyChooseSection from './landing-page-sections/WhyChooseSection'
import ThinkInvestment from './landing-page-sections/ThinkInvestmentSection'
import FAQs from './FAQs'

const Home = () => {
  return (
		<div>
			<div className="h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat">
				<div className="max-w-4xl text-center px-4">
					<h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
						Hero Section
					</h1>
				</div>
			</div>

			<div className="bg-white">
				<AboutUsSection />
				<HowItWorksSection />
				<WhyChooseSection />
				<ThinkInvestment />
				<FAQs />
			</div>
		</div>
	);
}

export default Home