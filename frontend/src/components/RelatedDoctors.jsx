import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({speciality ,docId}) => {

    const {doctors} = useContext(AppContext)
    const navigate = useNavigate()

    const [relDoc, setRelDocs] = useState([])

    useEffect(()=> {
        if(doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc)=> doc.speciality === speciality && doc._id !== docId)
            setRelDocs(doctorsData)
        }
    },[doctors, speciality, docId])

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10' >
      <h1 className='text-3xl font-medium'>Psikolog dengan Keahlian yang Sesuai</h1>
      <p className='sm:w-1/3 text-center text-sm'>Jelajahi pilihan psikolog lainnya yang ahli di bidang sesuai dengan kebutuhan Anda.</p>
      <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0' style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        {relDoc.slice(0,5).map((item, index)=>(
            <div onClick={()=>{navigate(`/appointment/${item.psikologId}`); scrollTo(0,0)}} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img className='bg-blue-50' src={item.image} alt="" />
                <div className='p-4'>
                    <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                    <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
                </span>
                        <p>Tersedia</p>
                    </div>
                    <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                    <p className='text-gray-600 text-sm'>{item.speciality}</p>
                </div>
            </div>
        ))}
      </div>
      <button onClick={()=>{ navigate('/doctors'); scrollTo(0,0) }} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>selengkapnya</button>
    </div>
  )
}

export default RelatedDoctors
