import React from 'react'
import phoneIcon from "../assets/icons/phone.svg";
import '../App.css'
// import facebookIcon from "../assets/icons/facebook.svg";
// import LinkedInIcon from "../assets/icons/linkedin.svg";
// import instagramIcon from "../assets/icons/instagram.svg";
// import mailIcon from "../assets/icons/mail.svg";

const ContactUs = () => {
  return <section>
    <div className='bg-[var(--color-primary)] py-4 px-2'>
      <h2>Contact Us</h2>

      <div>
        <div>
          <img src={phoneIcon} alt="phone-icon" className='pad p-3 bg-var[--color-neutral-light]' />
          <p className='text-[var(--color-neutral-light)]'>+234-904 312 0419</p>
        </div>
      </div>
    </div>

  </section>
}

export default ContactUs