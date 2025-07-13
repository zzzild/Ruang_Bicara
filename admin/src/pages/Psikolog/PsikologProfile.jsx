import React, { useContext, useEffect, useState } from 'react'
import { PsikologContext } from '../../context/PsikologContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PsikologProfile = () => {

  const {pToken, profileData, setProfileData, getProfileData, backendUrl} = useContext(PsikologContext)
  const {currency, formatRupiah} = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {

      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available:profileData.available
      }

      const {data} = await axios.post(backendUrl + '/api/psikolog/update-profile', updateData, {headers:{pToken}})
      
      if (data.success) {
        toast.success("Profil berhasil diperbarui.");
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error("Gagal memperbarui profil: " + (data.message || "Silakan coba lagi."));
      }

    } catch (error) {
      toast.error("Terjadi kesalahan saat memperbarui profil.");
      console.log(error);
      
    }
  }


  useEffect(()=>{
    if (pToken) {
      getProfileData()
    }
  },[pToken])

  return profileData &&  (
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='bg-blue-400/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
        </div>
        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>Tentang</p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>
              {profileData.about}
            </p>
          </div>
          <p className='text-gray-600 font-medium mt-4'>
            Biaya konsultasi : <span>{isEdit ? <input type='number' onChange={(e)=>setProfileData(prev => ({...prev, fees: e.target.value}))} value={profileData.fees}></input> : formatRupiah(profileData.fees)}</span>
          </p>
          <div className='flex gap-2 py-2'>
            <p>Alamat</p>
            <p className='text-sm'>
              {isEdit ? <input type="text" onChange={(e)=>setProfileData(prev => ({...prev, address: {...prev.address,line1:e.target.value}}))} value={profileData.address.line1}/> : profileData.address.line1}
              <br />
              {isEdit ? <input type="text" onChange={(e)=>setProfileData(prev => ({...prev, address: {...prev.address,line2:e.target.value}}))} value={profileData.address.line2}/> : profileData.address.line2}
            </p>
          </div>
          <div className='flex gap-1 pt-2'>
            <input onChange={()=> isEdit && setProfileData(prev => ({...prev, available: !prev.available}))} checked={profileData.available} type="checkbox" name="" id="" />
            <label htmlFor="">Tersedia</label>
          </div>

          {
            isEdit
            ?
            <button onClick={updateProfile} className='px-4 py-1 border border-blue-300 rounded-full text-sm mt-5 hover:bg-blue-300 hover:text-white transition-all'>Save</button>
            :
            <button onClick={()=>setIsEdit(true)} className='px-4 py-1 border border-blue-300 rounded-full text-sm mt-5 hover:bg-blue-300 hover:text-white transition-all'>Edit</button>
          }

        </div>
      </div>
    </div>
  )
}

export default PsikologProfile

  

