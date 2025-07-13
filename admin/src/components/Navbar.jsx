import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'
import { PsikologContext } from '../context/PsikologContext'

const Navbar = () => {

  const {aToken, setAToken} = useContext(AdminContext)
  const {pToken, setPToken} = useContext(PsikologContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
    pToken && setPToken('')
    pToken && localStorage.removeItem('pToken')
  }

  return (
    <div className='flex border-none shadow justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-36 sm:w-40 cursor-pointer' src={assets.logo} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin': 'Psikolog'}</p>
      </div>
      <button onClick={logout} className='bg-blue-400 text-white text-sm px-10 py-2 rounded-full'>Keluar</button>
    </div>
  )
}

export default Navbar
