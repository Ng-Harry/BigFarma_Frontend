import React, { useRef, useState } from 'react'
import { reviewers } from '../../lib/reviewers'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'

const Testimonials = () => {
  const swiperRef = useRef(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const handleSwiper = (swiper) => {
    swiperRef.current = swiper
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
    swiper.on('slideChange', () => {
      setIsBeginning(swiper.isBeginning)
      setIsEnd(swiper.isEnd)
    })
  }

  return (
    <section className="relative px-4 sm:px-8">
      <h2 className="text-center text-2xl sm:text-3xl md:text-[3rem] font-semibold mt-10 sm:mt-24 mx-auto">
        Testimonials
      </h2>

      <div className="relative overflow-hidden py-5 max-w-screen-xl mx-auto">
        {/* Faded edges for desktop only */}
        <div className="hidden lg:block absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="hidden lg:block absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Navigation Arrows (desktop only) */}
        <div className="hidden lg:flex justify-between items-center absolute top-1/2 left-0 right-0 z-20 px-4 pointer-events-none">
          {!isBeginning && (
            <button className="swiper-button-prev pointer-events-auto text-3xl text-gray-500 hover:text-black transition">
              ‹
            </button>
          )}
          {!isEnd && (
            <button className="swiper-button-next pointer-events-auto text-3xl text-gray-500 hover:text-black transition">
              ›
            </button>
          )}
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          onSwiper={handleSwiper}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          spaceBetween={12}
          slidesPerView={1}
          grabCursor={true}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
        >
          {reviewers.map((reviewer) => (
            <SwiperSlide key={reviewer.id}>
              <div className="w-full h-full mx-auto flex flex-col gap-5 justify-start items-center pt-4 pb-7 bg-white rounded-xl px-4">
                <img
                  src={reviewer.profileImage}
                  alt={`review - ${reviewer.name}`}
                  className="rounded-full shadow-2xl w-24 h-24 object-cover"
                />
                <p className="max-w-[280px] text-[var(--color-neutral-dark)] italic text-center opacity-50">
                  {reviewer.review}
                </p>
                <div className="font-bold flex flex-col items-center justify-center">
                  <p className="text-lg">{reviewer.name}</p>
                  <p className="text-sm text-[var(--color-neutral-dark)] opacity-50">
                    {reviewer.additionalDetails}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Testimonials






// import React from 'react'
// import { reviewers } from '../reviewers'
// import '../app.css'

// const Testimonials = () => {
//   return (
//     <section>
//       <h2 className='font-semibold text-2xl text-center'>Testimonials</h2>

//       <div className='flex flex-col justify-center items-center py-5 gap-5 lg:flex-row'>
//         {reviewers.map(reviewer => {
//           return (
//             <div key={reviewer.id} className='flex flex-col gap-5 justify-start items-center pt-4 pb-7'>
//               <img src={reviewer.profileImage} alt={`review - ${reviewer.name}`} className='rounded-full shadow-2xl' />
//               <p className='max-w-[280px] text-[var(--color-neutral-dark)] italic text-center opacity-50'>{reviewer.review}</p>

//               <div className='font-bold flex flex-col items-center justify-center'>
//                 <p className='text-lg'>{reviewer.name}</p>
//                 <p className='text-sm text-var[--color-neutral-dark] opacity-50'>{reviewer.additionalDetails}</p>
//               </div>
//             </div>
//           )
//         })}
//       </div>
//     </section>
//   )
// }

// export default Testimonials