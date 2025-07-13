import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='speciallity' data-aos="fade-up"
  data-aos-duration="1000">
        <h1 className='text-3xl font-medium'>Temukan Berdasarkan Spesialisasi</h1>
        <p className='sm:w-1/3 text-center text-sm'>Jelajahi daftar psikolog terpercaya kami dan atur jadwal konsultasi dengan mudah tanpa kendala.</p>
        <div className='flex sm:justify-center gap-8 pt-5 w-full overflow-scroll'>
          {specialityData.map((item, index)=> (
            <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-800' data-aos="fade-up"
        data-aos-delay={100 * (index + 1)} key={index} to={`/doctors/${item.speciality}`}>
              <img className='w-16 sm:w-24 mb-2' src={item.image} alt="" />
              <p>{item.speciality}</p>
            </Link>
          ))}
        </div>
    </div>
  )
}

export default SpecialityMenu
