import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import {assets} from '../assets/assets.js'
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
const {userData, setUserData, token, backendUrl, loadProfileUserData} = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    try {
      const formData =  new FormData()

      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      image && formData.append('image', image)

      const {data} = await axios.post(backendUrl + '/api/user/update-profile', formData, {headers:{token}})

      if(data.success){
        toast.success("Profil berhasil diperbarui.");
        await loadProfileUserData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error("Gagal memperbarui profil: " + (data.message || "Silakan coba lagi."));
      }
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan saat memperbarui profil. Silakan coba beberapa saat lagi.");
    }
  }

  return userData && (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      {
        isEdit
        ? <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img className="w-36 rounded opacity-75" src={image ? URL.createObjectURL(image): userData.image} alt="" />
              <img className="w-10 absolute bottom-12 right-12" src={image ? '': assets.upload_icon} alt="" />
            </div>
            <input onChange={(e)=> setImage(e.target.files[0])} type="file"  id="image" hidden/>
        </label>
        : <img className="w-36 rounded" src={userData.image} alt="" />
      }
      {isEdit ? (
        <input
          className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">
          {userData.name}
        </p>
      )}

      <hr className="bg-zinc-400 h-[1px] border-none" />
      <div className="flow-root">
        <dl className="-my-3 divide-y divide-gray-200 text-sm">
          {/* Email */}
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Email</dt>
            <dd className="text-gray-700 sm:col-span-2">{userData.email}</dd>
          </div>

          {/* Phone */}
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">No. Telepon</dt>
            <dd className="text-gray-700 sm:col-span-2">
              {isEdit ? (
                <input
                  className="bg-gray-100 max-w-52"
                  type="text"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              ) : (
                <span className="text-blue-400">{userData.phone}</span>
              )}
            </dd>
          </div>

          {/* Address */}
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Alamat</dt>
            <dd className="text-gray-700 sm:col-span-2">
              {isEdit ? (
                <>
                  <input
                    className="bg-gray-50 mb-2 w-full"
                    type="text"
                    value={userData.address.line1}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                  />
                  <input
                    className="bg-gray-50 w-full"
                    type="text"
                    value={userData.address.line2}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                  />
                </>
              ) : (
                <>
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </>
              )}
            </dd>
          </div>

          {/* Gender */}
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Jenis Kelamin</dt>
            <dd className="text-gray-700 sm:col-span-2">
              {isEdit ? (
                <select
                  className="bg-gray-100 max-w-20"
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              ) : (
                <span className="text-gray-400">{userData.gender}</span>
              )}
            </dd>
          </div>

          {/* Date of Birth */}
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Tanggal Lahir</dt>
            <dd className="text-gray-700 sm:col-span-2">
              {isEdit ? (
                <input
                  className="bg-gray-100 max-w-28"
                  type="date"
                  value={userData.dob}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                />
              ) : (
                <span className="text-gray-400">{userData.dob}</span>
              )}
            </dd>
          </div>
        </dl>

        {/* Tombol Simpan / Edit */}
        <div className="mt-8">
          {isEdit ? (
            <button
              className="border border-second px-8 py-2 rounded-full hover:bg-second hover:text-white transition-all"
              onClick={updateUserProfileData}
            >
              Simpan Informasi
            </button>
          ) : (
            <button
              className="border border-second px-8 py-2 rounded-full hover:bg-second hover:text-white transition-all"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
