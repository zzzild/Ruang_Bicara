import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl font-medium pt-10 text-gray-500'>
        <p>KONTAK <span className='text-blue-400 font-semibold'>KAMI</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />

        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>Hubungi Kami</p>
          <p className='text-gray-500'>Jl. Melati No. 213, <br /> Kebayoran Baru, Jakarta Selatan 12130, Indonesia</p>
          <p className='text-gray-500'>Tel: 083299424522<br /> Email: RuangBicara@gmail.com</p>
          <p className='font-semibold text-lg text-gray-600'>Karir Di Ruang Bicara</p>
          <p className='text-gray-500'>Pelajari lebih lanjut tentang tim kami dan peluang karier.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Lihat Lowongan</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
