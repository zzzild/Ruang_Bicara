import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { PsikologContext } from '../context/PsikologContext'
import { useNavigate } from 'react-router-dom'


const Login = () => {

    const [state,setState] = useState('Admin')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const navigate = useNavigate()

    const {setAToken, backendUrl} = useContext(AdminContext)
    const {setPToken} = useContext(PsikologContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (state === 'Admin') {
                const {data} = await axios.post(backendUrl + '/api/admin/login', {email,password})
                if (data.success) {
                    localStorage.setItem('aToken', data.token)
                    setAToken(data.token)
                    navigate('/admin-dashboard')
                } else {
                  toast.error(data.message)
                }
            } else {

              const {data} = await axios.post(backendUrl + '/api/psikolog/login', {email, password})
              if (data.success) {
                    localStorage.setItem('pToken', data.token)
                    setPToken(data.token)
                    console.log(data.token)
                    navigate('/psikolog-dashboard')
                } else {
                  toast.error(data.message)
                }

            }
        } catch (error) {
            toast.error('Terjadi kesalahan saat login');
    console.error(error);
        }
    }


  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 mx-auto items-start p-8 min-w-[340px] sm:min-w-96 border-gray-300  border rounded-xl text-[#5E5E5E] text-sm shadow-lg '>
        <p className='text-2xl font-semibold m-auto'> Masuk <span className='text-blue-400'>{state}</span> </p>
        <div className='w-full'>
            <p>Email</p>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full'>
            <p>Password</p>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
        </div>
        <button className='bg-blue-400 text-white w-full py-2 rounded-md text-base'>Masuk</button>
        {
            state === 'Admin'
            ? <p>Psikolog Login? <span className='text-blue-400 underline cursor-pointer' onClick={()=>setState('Psikolog')}>Click here</span></p>
            : <p>Admin Login? <span className='text-blue-400 underline cursor-pointer' onClick={()=>setState('Admin')}>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login;