import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const {backendUrl, token, setToken} = useContext(AppContext)
  const navigate = useNavigate()

  const [state,setState] = useState('Sign Up')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (state === 'Sign Up') {

        const {data} = await axios.post(backendUrl + '/api/user/register', {name, password, email})
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Pendaftaran berhasil. Selamat datang!');
        } else {
          toast.error(data.message || 'Pendaftaran gagal, silakan coba lagi.')
        }
      } else {
        const {data} = await axios.post(backendUrl + '/api/user/login', {password, email})
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Login berhasil. Selamat datang kembali!');
        } else {
          toast.error(data.message || 'Login gagal, periksa kembali email dan password Anda.')
        }
      }
    } catch (error) {
      toast.error('Terjadi kesalahan. Silakan coba beberapa saat lagi.');
      console.error(error);
    }
  }

  useEffect(()=> {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg '>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Buat akun' : "Masuk"}</p>
        <p>Silahkan {state === 'Sign Up' ? 'Buat akun' : "Masuk"} untuk membuat janji</p>
        {
          state === 'Sign Up' && <div className='w-full'>
          <p>Nama Lengkap</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
        </div>
        }
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
        </div>
        <button type='submit' className='bg-second text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? 'Buat akun' : "Masuk"}</button>
        {
          state === "Sign Up"
          ? <p>Sudah punya akun? <span onClick={()=>setState('Login')} className='text-second underline cursor-pointer'>Masuk disini</span> </p>
          : <p>Belum punya akun? <span onClick={()=>setState('Sign Up')} className='text-second underline cursor-pointer'>Daftar disini</span></p>
        }
      </div>
    </form>
  )
}

export default Login
