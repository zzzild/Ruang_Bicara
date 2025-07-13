import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

function Banner() {

    const navigate = useNavigate();

  return (
    <div
  className='flex bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-16 md:mx-10'
  data-aos="fade-up"
  data-aos-duration="1000"
>
  {/* Kiri */}
  <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5' data-aos="fade-right" data-aos-delay="200">
    <div className='text-xl text-white sm:text-2xl md:text-3xl lg:text-5xl font-semibold'>
      <p>Buat Janji Konsultasi</p>
      <p className='mt-4'>Dengan Psikolog Terbaik</p>
    </div>
    <button
      onClick={() => {
        navigate('/login');
        scrollTo(0, 0);
      }}
      className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all duration-300'
    >
      Buat Akun
    </button>
  </div>

  {/* Kanan */}
  <div
    className='hidden md:block md:w-1/2 lg:w-[370px] relative'
    data-aos="fade-left"
    data-aos-delay="400"
  >
    <img
      className='w-full absolute bottom-0 right-0 max-w-md'
      src={assets.appointment_img}
      alt=""
    />
  </div>
</div>

  )
}

export default Banner
