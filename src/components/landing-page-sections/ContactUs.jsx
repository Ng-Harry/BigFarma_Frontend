import React from 'react'
import phoneIcon from "../../assets/icons/phone.svg";
import facebookIcon from "../../assets/icons/facebook.svg";
import LinkedInIcon from "../../assets/icons/linkedin.svg";
import instagramIcon from "../../assets/icons/instagram.svg";
import mailIcon from "../../assets/icons/mail.svg";
import faceBook from '../../assets/images/Facebook.svg';
import instagran from '../../assets/images/Instagram.svg';
import x from '../../assets/images/X.svg';
import { Link } from 'react-router-dom';


const ContactUs = () => {
  return (
		<section className="w-full bg-transparent py-5 flex items-center justify-center overflow-x-hidden">
			<div className=" relative lg:container lg:max-w-[1000px] lg:min-h-[750px] rounded-lg lg:shadow-lg lg:ml-14 lg:my-40 ">
				<div className="lg:absolute lg:-left-36">
					<div className="">
						<div className="space-y-1 lg:hidden ">
							<h2 className="text-center text-2xl md:text-[3rem] font-semibold mt-10 lg:mt-24 lg:text-3xl mx-auto">
								Contact Us
							</h2>
							<p className="text-center text-sm md:text-lg">
								We are here to you! How can we help you.
							</p>
						</div>

						<form
							action=""
							className="px-6 w-full space-y-5 pt-10 justify-center items-center lg:hidden">
							<div className="flex flex-col gap-8 mx-auto shadow-2xl bg-white  w-full border-t border-gray-200">
								<div className="px-4 flex flex-col gap-8 w-full ">
									<div className="flex flex-col gap-6 pt-7  md:w-xl md:px-5 md:mt-5 ">
										<div className="flex flex-col gap-2">
											<label htmlFor="fullName" className="font-bold text-md">
												Full Name
											</label>
											<input
												type="text"
												placeholder="Your name"
												className="py-3.5 px-4 h-[47px] rounded-lg bg-transparent border border-gray-300 placeholder:text-gray-400 focus:ring focus:ring-green-300 outline-none"
											/>
										</div>

										<div className="flex flex-col gap-2">
											<label htmlFor="fullName" className="font-bold text-md">
												Email Or Phone Number
											</label>
											<input
												type="text"
												placeholder="Enter your email or phone number"
												className="py-3.5 px-4 h-[47px] rounded-lg bg-transparent border border-gray-300 placeholder:text-gray-400 focus:ring focus:ring-green-300 outline-none"
											/>
										</div>

										<div className="flex flex-col gap-2">
											<textarea
												name="message"
												id=""
												placeholder="Type your message here..."
												className="py-3.5 px-4 h-[150px] rounded-lg bg-transparent border border-gray-300 placeholder:text-gray-400 focus:ring focus:ring-green-300 outline-none"></textarea>
										</div>
									</div>

									<button
										type="submit"
										className="w-fit rounded-lg text-md lg:text-2xl text-white bg-[var(--color-primary)] px-6 py-3 max-w-fit mx-auto cursor-pointer">
										Send
									</button>
								</div>

								<div className="bg-[var(--color-primary)] text-white py-8 w-full flex flex-col justify-center items-center">
									<div className="flex gap-4 items-center">
										<img
											src={phoneIcon}
											alt="phone-icon"
											className="p-2 rounded-full bg-white scale-75"
										/>
										<p className="text-md">
											<a href="tel:+2349043120419">+234 904 312 0419</a>
										</p>
									</div>
									<div className="flex gap-4 items-center">
										<img
											src={mailIcon}
											alt="mail-icon"
											className="w-10 h-10 rounded-full bg-white scale-75"
										/>
										<p>
											<a href="mailto:hello@bigfarm.com">hello@bigfarm.com</a>
										</p>
									</div>
									<div className="flex gap-4 scale-50">
										<Link to={"javascript:void(0)"}>
											<img src={faceBook} alt="facebook" />
										</Link>
										<Link to={"javascript:void(0)"}>
											<img src={x} alt="x" />
										</Link>
										<Link to={"javascript:void(0)"}>
											<img src={instagran} alt="instagram" />
										</Link>
									</div>
								</div>
							</div>
						</form>
					</div>
					{/* 
Desktop version */}
					<div className="flex items-start gap-20">
						<div className=" w-[400px] bg-[var(--color-primary)] pt-10 pb-30 px-10 hidden lg:block ">
							<h2 className="text-5xl font-semibold py-10 pr-5 text-white ">
								Contact Us
							</h2>

							<div className="flex flex-col gap-7 text-lg">
								<div className="flex gap-3 items-center">
									<div className="p-3 bg-white rounded-full">
										<img src={phoneIcon} alt="phone-icon" className="" />
									</div>
									<p className="text-[var(--color-neutral-light)]">
										+234-904 312 0419
									</p>
								</div>
								<div className="flex gap-3 items-center">
									<div className="p-3 bg-white rounded-full">
										<img src={mailIcon} alt="phone-icon" className="" />
									</div>
									<p className="text-[var(--color-neutral-light)]">
										hello@bigfarma.com
									</p>
								</div>
								<div className="flex gap-3 items-center">
									<div className="p-3 bg-white rounded-full">
										<img src={instagramIcon} alt="phone-icon" className="" />
									</div>
									<p className="text-[var(--color-neutral-light)]">
										bigfarma.ng
									</p>
								</div>
								<div className="flex gap-3 items-center">
									<div className="p-3 bg-white rounded-full">
										<img src={LinkedInIcon} alt="phone-icon" className="" />
									</div>
									<p className="text-[var(--color-neutral-light)]">bigfarma</p>
								</div>
								<div className="flex gap-3 items-center">
									<div className="p-3 bg-white rounded-full">
										<img src={facebookIcon} alt="phone-icon" className="" />
									</div>
									<p className="text-[var(--color-neutral-light)]">bigfarma</p>
								</div>
							</div>
						</div>

						{/* desktop form  */}
						<form
							action={""}
							className="hidden px-4 gap-8 lg:flex lg:flex-col pr-10 ">
							<div className="space-y-1">
								<h2 className="text-2xl md:text-[3rem] font-semibold mt-10 lg:mt-24 lg:text-4xl">
									Get in Touch
								</h2>
								<p className="text-md">
									We are here to you! How can we help you?
								</p>
							</div>
							<div className="flex flex-col gap-6 pt-4">
								<div className="flex flex-col gap-2">
									<label htmlFor="fullName" className="font-bold text-md">
										Full Name
									</label>
									<input
										type="text"
										placeholder="Your name"
										className="py-3.5 px-4 w-xl h-[47px] rounded-lg bg-transparent border border-gray-300 placeholder:text-gray-400 focus:ring focus:ring-green-300 outline-none"
									/>
								</div>

								<div className="flex flex-col gap-2">
									<label htmlFor="fullName" className="font-bold text-md">
										Email Or Phone Number
									</label>
									<input
										type="text"
										placeholder="Enter your email or phone number"
										className="py-3.5 px-4 w-xl h-[47px] rounded-lg bg-transparent border border-gray-300 placeholder:text-gray-400 focus:ring focus:ring-green-300 outline-none"
									/>
								</div>

								<div className="flex flex-col gap-2">
									<textarea
										name="message"
										id=""
										placeholder="Type your message here..."
										className="py-3.5 px-4 w-xl h-[120px] rounded-lg bg-transparent border border-gray-300 placeholder:text-gray-400 focus:ring focus:ring-green-300 outline-none"></textarea>
								</div>
							</div>

							<button
								type="submit"
								className="cursor-pointer w-fit rounded-lg text-md font-bold text-white bg-[var(--color-primary)] px-6 py-3">
								Send
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);

}

export default ContactUs