import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import {toast} from 'react-toastify'

const PsikologList = () => {

  const { psikolog, aToken, getAllPsikolog, changeAvailability, deletePsikolog} = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllPsikolog()
    }
  }, [aToken])

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm('Yakin ingin menghapus psikolog ini?')
      if (!confirmed) return

      await deletePsikolog(id)
      toast.success('Psikolog berhasil dihapus')
      getAllPsikolog() // Refresh list setelah hapus
    } catch (error) {
      console.error(error)
      toast.error('Gagal menghapus psikolog')
    }
  }


  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>Semua Psikolog</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          psikolog.map((item, index) => (
            <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
              <img className='bg-indigo-50 group-hover:bg-blue-400 transition-all duration-500' src={item.image} alt="" />
              <div className='p-4 '>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input onChange={()=> changeAvailability(item.psikologId)} type="checkbox" checked={item.available}  />
                  <p>Tersedia</p>
                </div>
                 <button
                onClick={() => handleDelete(item.psikologId)}
                className='mt-3 text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded w-full'
              >
                Hapus
              </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default PsikologList
