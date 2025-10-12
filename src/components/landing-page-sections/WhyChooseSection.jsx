import flowerIcon from "../../assets/icons/flower.svg";
import cartIcon from "../../assets/icons/cart.svg";
import mobileIcon from "../../assets/icons/mobile.svg";
import { Link } from "react-router-dom";

function FeatureCard({
	title,
	description,
	image,
	bgColor,
	textColor = "text-white",
	descriptionColor = "text-green-100",
}) {
	const getBgColorStyle = (colorName) => {
		const colorMap = {
			"bg-primary": "#016130",
			"bg-primary-light": "#01AE56",
		};

		return colorMap[colorName] || "";
	};

	return (
		<div
			className={`${textColor} border-0 h-[240px] md:h-[400px] shadow-sm`}
			style={{ backgroundColor: getBgColorStyle(bgColor) }}>
			<div className="p-5 md:p-8 h-full flex flex-col mt-4 md:mt-12">
				<div className="items-center justify-center mb-6">
					<img src={image} alt={title} className="w-12 h-12" />
				</div>
				<h3 className="text-lg md:text-3xl font-semibold mb-2">{title}</h3>
				<p className={`text-sm md:text-lg ${descriptionColor} leading-relaxed`}>
					{description}
				</p>
			</div>
		</div>
	);
}

const featureItems = [
	{
		title: "Made for Farmers",
		image: flowerIcon,
		description:
			"Farm and do what you do best, BigFarma will take care of the rest: sales, payments and the distribution of fresh produces",
		bgColor: "bg-primary",
		descriptionColor: "text-white",
	},
	{
		title: "Great for Buyers",
		image: cartIcon,
		description:
			"We save you money, time and streamline the procurement of fresh produce",
		bgColor: "bg-primary-light",
		descriptionColor: "text-white",
	},
	{
		title: "Modular Platform",
		image: mobileIcon,
		description: "Expandable for finance, logistics, and investment.",
		bgColor: "bg-primary",
		descriptionColor: "text-white",
	},
];

export default function WhyChooseSection() {
	return (
		<section className="py-4 mt-8 md:py-16 px-4 md:px-8 lg:px-16 bg-white">
			<div className="max-w-7xl mx-auto">
				<h2 className="text-[28px] md:text-5xl font-semibold text-center mb-5 lg:mb-8">
					Why Choose BigFarma
				</h2>

				<div className="grid lg:grid-cols-3 gap-6 mb-4 md:mb-8">
					{featureItems.map((item, index) => (
						<FeatureCard
							key={index}
							title={item.title}
							description={item.description}
							image={item.image}
							bgColor={item.bgColor}
							descriptionColor={item.descriptionColor}
						/>
					))}
				</div>

				<div className="text-center">
					<Link to="/role">
						<button className="bg-[#016130] hover:bg-primary-dark text-white px-4 py-3 text-lg rounded-lg inline-flex items-center justify-center cursor-pointer">
							Create an account
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
}
