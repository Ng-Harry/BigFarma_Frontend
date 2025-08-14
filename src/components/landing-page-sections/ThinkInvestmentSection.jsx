import bgImage from "../../assets/svgs/InvestmentBg.svg";

export default function ThinkInvestment() {
	return (
		<>
			<section className="py-8 px-4 md:px-8 lg:px-16">
				<div className="relative max-w-7xl mx-auto">
					<img
						src={bgImage}
						alt="background image"
						className="max-w-7xl mx-auto w-full h-[150px] md:h-auto object-cover"
					/>
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full text-[var(--color-neutral-light)]">
						<h2 className="text-[16px] md:text-[42px] font-bold">
							Think Investment, Think BigFarma
						</h2>
						<div className="pt-2 md:pt-8">
							<p className="text-[10px] md:text-[14px]">
								Grow Your money while supporting real farmers.
							</p>
							<p className="text-[10px] md:text-[14px] w-[250px] sm:w-auto mx-auto">
								Choose verified farm projects, track your returns, and invest
								with confidence
							</p>
						</div>
						<div className="pt-2 md:pt-8 flex justify-center">
							<button
								className="btn-start-invsting bg-[var(--color-neutral-light)] text-[var(--color-primary)] font-bold
                            text-[10px] md:text-[16px] rounded-md px-[20px] py-2 md:px-[50px] md:py-4 flex items-center gap-[10px] cursor-pointer hover:bg-[var(--color-primary-dark)] transition-colors">
								Start investing
							</button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
