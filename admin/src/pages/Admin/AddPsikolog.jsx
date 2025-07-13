import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import {AdminContext} from '../../context/AdminContext'
import {toast} from 'react-toastify'
import axios from 'axios'

const AddPsikolog = () => {

    const [psiImg, setPsiImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('Individu')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { backendUrl, aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
      event.preventDefault()

      try {
        if (!psiImg){
          return toast.error('Pilih foto')
        }

        const formData = new FormData()

        formData.append('image', psiImg)
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('experience', experience)
        formData.append('fees', Number(fees))
        formData.append('about', about)
        formData.append('speciality', speciality)
        formData.append('degree', degree)
        formData.append('address', JSON.stringify({line1:address1, line2:address2}))


        // consol log fromdata

        formData.forEach((value, key)=>{
          console.log(`${key} : ${value}`);
        })

        const {data} = await axios.post(backendUrl + '/api/admin/add-psikolog', formData, {headers: {aToken}})
        
        if (data.success) {
          toast.success("Data psikolog berhasil ditambahkan.")
          setPsiImg(false)
          setName('')
          setEmail('')
          setDegree('')
          setAbout('')
          setFees('')
          setPassword('')
          setAddress1('')
          setAddress2('')
        } else {
          toast.error("Gagal menambahkan psikolog: " + (data.message || "Silakan coba lagi."))
        }

      } catch (error) {
        toast.error("Terjadi kesalahan saat menambahkan psikolog.")
        console.log(error)
      }
    }

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full border-none">
      <p className="mb-3 text-lg font-medium">Tambah Psikolog</p>

      <div className="bg-white border-none shadow px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="psi-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer" 
              src={psiImg ? URL.createObjectURL(psiImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input onChange={(e)=> setPsiImg(e.target.files[0])} type="file" id="psi-img" hidden />
          <p>
            Masukan foto<br /> Psikolog
          </p>
        </div>

        <div className=" flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Nama lengkap</p>
              <input
                onChange={(e)=> setName(e.target.value)}
                value={name}
                className="border rounded px-3 py-2"
                type="text"
                name=""
                id=""
                placeholder="Masukan nama psikolog baru"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Email</p>
              <input
                onChange={(e)=> setEmail(e.target.value)}
                value={email}
                className="border rounded px-3 py-2"
                type="email"
                name=""
                id=""
                placeholder="Masukan email psikolog baru"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Password</p>
              <input
                onChange={(e)=> setPassword(e.target.value)}
                value={password}
                className="border rounded px-3 py-2"
                type="password"
                name=""
                id=""
                placeholder="Masukan password psikolog baru"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Pengalaman</p>
              <select onChange={(e)=> setExperience(e.target.value)}
                value={experience} className="border rounded px-3 py-2" name="" id="">
                <option value="1 Year">1 Tahun</option>
                <option value="2 Year">2 Tahun</option>
                <option value="3 Year">3 Tahun</option>
                <option value="4 Year">4 Tahun</option>
                <option value="5 Year">5 Tahun</option>
                <option value="6 Year">6 Tahun</option>
                <option value="7 Year">7 Tahun</option>
                <option value="8 Year">8 Tahun</option>
                <option value="9 Year">9 Tahun</option>
                <option value="10 Year">10 Tahun</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Biaya</p>
              <input
                onChange={(e)=> setFees(e.target.value)}
                value={fees}
                className="border rounded px-3 py-2"
                type="number"
                name=""
                id=""
                placeholder="Masukan biaya psikolog baru"
                required
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Spesialisasi</p>
              <select onChange={(e)=> setSpeciality(e.target.value)}
                value={speciality} className="border rounded px-3 py-2" name="" id="">
                <option value="individu">Individu</option>
                <option value="keluarga">Keluarga</option>
                <option value="pasangan">Pasangan</option>
                <option value="anak-anak">Anak-anak</option>
                <option value="remaja">Remaja</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1"> 
              <p>Pendidikan</p>
              <input
                onChange={(e)=> setDegree(e.target.value)}
                value={degree}
                className="border rounded px-3 py-2"
                type="text"
                name=""
                id=""
                placeholder="Masukan pendidikan psikolog baru"
                required
              />
            </div>
            
            <div className="flex-1 flex flex-col gap-1"> 
              <p>Alamat Url</p>
              <input onChange={(e)=> setAddress1(e.target.value)}value={address1} className="border rounded px-3 py-2" type="text" placeholder="masukan url zoom/meet" required />
              <input onChange={(e)=> setAddress2(e.target.value)}value={address2} className="border rounded px-3 py-2" type="text" placeholder="masukan url zoom/meet" required />
            </div>
          </div>
        </div>

        <div>
          <p className="mt-4 mb-2">Tentang Psikolog</p>
          <textarea
            onChange={(e)=> setAbout(e.target.value)} value={about}
            className="w-full px-4 pt-2 border rounded"
            placeholder="Masukan tentang psikolog baru"
            rows={5}
            required
          />
        </div>

        <button type="submit" className="bg-blue-400 px-10 py-3 mt-4 text-white rounded-full">Tambah Psikolog</button>
      </div>
    </form>
  );
};

export default AddPsikolog;
