import { useState, useRef, useEffect } from "react";
import openIcon from "../../assets/icons/open.svg";
import closeIcon from "../../assets/icons/close.svg";

const faqs = [
	{
		question: "What can I do with BigFarma?",
		answer:
			"You can sell or buy farm produce, invest in farm projects, access helpful tools, and manage deliveries all in one place.",
	},
	{
		question: "Are the people on BigFarma verified?",
		answer:
			"Yes. Every user is verified so you can feel safe whether you're selling, buying, or investing.",
	},
	{
		question: "Is it safe to make payments on BigFarma?",
		answer:
			"Yes. Payments are secure, and every transaction is tracked with clear receipts and updates.",
	},
	{
		question: "What kind of support does BigFarma offer?",
		answer:
			"You can sell or buy farm produce, invest in farm projects, access helpful tools, and manage deliveries all in one place.",
	},
	{
		question: "Can I use BigFarma without a smartphone?",
		answer:
			"Yes. You can use BigFarma through the web app, USSD, or even WhatsApp if you prefer.",
	},
	{
		question: "How does investment on BigFarma work?",
		answer:
			"You choose a verified farm project, invest, track its progress, and receive returns based on the plan you select.",
	},
];

function AccordionItem({ question, answer }) {
	const [isOpen, setIsOpen] = useState(false);
	const contentRef = useRef(null);
	const [maxHeight, setMaxHeight] = useState("0px");

	const toggleAccordion = () => {
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		if (contentRef.current) {
			setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
		}
	}, [isOpen]);

	return (
		<div className="w-[90] cursor-pointer md:w-full border border-[#016130]  overflow-hidden">
			<div
				onClick={toggleAccordion}
				className={`w-full text-left px-4 py-3 font-semibold flex justify-between items-center ${
					isOpen ? "bg-[#016130] text-white" : ""
				}`}>
				<p className="text-[14px] md:text-[16px]">{question}</p>
				<img
					src={
						isOpen
							? closeIcon
							: openIcon
					}
					alt="icon"
				/>
			</div>

			<div
				ref={contentRef}
				className="transition-all duration-500 ease-in-out overflow-hidden"
				style={{ maxHeight }}>
				<div
					className={`p-4 text-[12px] text-white md:text-[14px] ${
						isOpen ? "bg-[#016130]" : ""
					}`}>
					{answer}
				</div>
			</div>
		</div>
	);
}

export default function Accordion() {
	return (
		<div>
			<header>
				<h2 className="text-center text-2xl sm:text-3xl md:text-[3rem] font-semibold mt-10 sm:mt-24 mx-auto">
					Frequently asked questions
				</h2>
			</header>
			<div className="w-[90%] md:w-[70%] mx-auto space-y-4 pt-8">
				{faqs.map((data, i) => (
					<AccordionItem
						key={i}
						question={data.question}
						answer={data.answer}
					/>
				))}
			</div>
		</div>
	);
}
