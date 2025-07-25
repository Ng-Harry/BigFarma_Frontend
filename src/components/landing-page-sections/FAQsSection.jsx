import { useState } from "react";

const faqs = [
    {
        title: "What can I do with BigFarma?",
        text: "You can sell or buy farm produce, invest in farm projects, access helpful tools, and manage deliveries all in one place.",
    },
    {
        title: "Are the people on BigFarma verified?",
        text: "Yes. Every user is verified so you can feel safe whether you're selling, buying, or investing.",
    },
    {
        title: "Is it safe to make payments on BigFarma?",
        text: "Yes. Payments are secure, and every transaction is tracked with clear receipts and updates.",
    },
    {
        title: "What kind of support does BigFarma offer?",
        text: "You can sell or buy farm produce, invest in farm projects, access helpful tools, and manage deliveries all in one place.",
    },
    {
        title: "Can I use BigFarma without a smartphone?",
        text: "Yes. You can use BigFarma through the web app, USSD, or even WhatsApp if you prefer.",
    },
    {
        title: "How does investment on BigFarma work?",
        text: "You choose a verified farm project, invest, track its progress, and receive returns based on the plan you select.",
    },
];

const data = faqs;

export default function Accordion() {
    const [curOpen, setCurOpen] = useState(null);

    return (
        <div>
            <header>
                <h2 className="text-center text-2xl sm:text-3xl md:text-[3rem] font-semibold mt-10 sm:mt-24 mx-auto">
                    Frequently asked questions
                </h2>
            </header>
            <div className="w-[90%] sm:w-[80%] md:w-[70%] flex flex-col gap-6 my-8 sm:my-[30px] mx-auto">
                {data.map((el, i) => (
                    <AccordionItem
                        num={i}
                        curOpen={curOpen}
                        onOpen={setCurOpen}
                        title={el.title}
                        key={el.title}
                        data={data}>
                        {el.text}
                    </AccordionItem>
                ))}
            </div>
        </div>
    );
}

function AccordionItem({ num, title, onOpen, curOpen, children }) {
    const isOpen = num === curOpen;

    function handleToggle() {
        onOpen(isOpen ? null : num);
    }

    return (
        <div
            className={`p-4 sm:p-5 sm:pr-12 cursor-pointer border border-[#016130] grid grid-cols-[auto_1fr_auto] gap-y-6 sm:gap-y-8 items-center ${
                isOpen ? "bg-[#016130] text-white" : ""
            }`}
            onClick={handleToggle}>
            <p className=""></p>
            <p className="text-[12.8px] sm:text-xl md:text-[24px] font-medium">
                {title}
            </p>
            {
                <img
                    className="text-[12.8px] sm:text-xl md:text-[24px] font-medium"
                    src={
                        isOpen
                            ? "/src/assets/icons/close.svg"
                            : "/src/assets/icons/open.svg"
                    }
                    alt="icon"
                />
            }
            {isOpen && (
                <div className="col-start-2 col-end-[-1] pb-4 leading-relaxed">
                    {children}
                </div>
            )}
        </div>
    );
}
