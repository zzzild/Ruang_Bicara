import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from "../../assets/assets";

const AllApointments = () => {

  const {aToken, appointments, getAllAppointments, cancelAppointment} = useContext(AdminContext)
  const {calculateAge, slotDateFormT, currency, formatRupiah} = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>Semua Jadwal</p>
      <div className='bg-white border border-white rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>

        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Client</p>
          <p>Usia</p>
          <p>Tanggal & Waktu</p>
          <p>Psikolog</p>
          <p className='min-w-[120px]'>Biaya</p>
          <p>Status</p>
        </div>

        {appointments.slice().reverse().map((item, index) => (
          <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 border-b px-6 hover:bg-gray-50' key={index}>
            <p className='max-sm:hidden'>{index+1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 h-8 rounded-full' src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormT(item.slotDate)}, {item.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full bg-gray-200' src={item.psikologData.image} alt="" /> <p>{item.psikologData.name}</p>
            </div>
            <p className='min-w-[120px]'>{formatRupiah(item.amount)}</p>
            {item.cancelled
            ? (<p className='text-red-400 text-xs font-medium'>Dibatalkan</p>)
            : item.isCompleted ? (<p className="text-green-500 text-xs font-medium">Selesai</p>)
            : (<p className="text-yellow-500 text-xs font-medium">Menunggu</p>)
            }
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllApointments
