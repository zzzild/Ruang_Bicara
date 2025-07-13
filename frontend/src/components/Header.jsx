import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 rounded-lg px-6 m:px-10 lg:px-20'>
      
      {/* {left site} */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'
           data-aos="fade-right"
           data-aos-duration="1000"
      >
        <p className='text-3xl md:text-4xl lg:text-5xl  text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
        Buat Janji Konsultasi <br /> dengan Psikolog Profesional
        </p>
        <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
            <img className='w-28' src={assets.group_profiles} alt="" />
            <p>Telusuri berbagai pilihan psikolog terpercaya, <br className='hidden sm:block'/>dan atur jadwal konsultasi tanpa repot.</p>
        </div>
        <a className='flex items-center gap-2 bg-white p-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300' href="#speciallity" 
        data-aos="zoom-in"
           data-aos-duration="300"
        >
            Konsultasi Sekarang <img className='w-3' src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* {right site} */}
      <div className='md:w-1/2 relative min-h-[300px]' data-aos="fade-left"
    data-aos-duration="1000">
        <img className='w-full md:absolute bottom-0 h-4/5 rounded-lg' src={assets.header_img} alt="" />
      </div>
    </div>
  )
}

export default Header
