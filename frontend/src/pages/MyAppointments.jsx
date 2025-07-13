import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, token, getPsikologData } = useContext(AppContext);

  const [appointment, setAppointment] = useState([]);
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const navigate = useNavigate();

  const slotDateFormT = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        setAppointment(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error("Gagal mengambil data janji temu. Silakan coba lagi.");
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Janji temu berhasil dibatalkan.");
        getUserAppointments();
        getPsikologData();
      } else {
        toast.error("Gagal membatalkan janji temu: " + data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan saat membatalkan janji temu.");
    }
  };

  const appointmentMidtrans = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-midtrans",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        // Ini untuk memastikan popup Snap ditampilkan
        window.snap.pay(data.token, {
          onSuccess: async (result) => {
            console.log("Pembayaran berhasil:", result);

            try {
              const response = await axios.post(
                backendUrl + "/api/user/verifymidtrans",
                result, // ini kirim result dari Snap
                { headers: { token } }
              );

              if (response.data.success) {
                toast.success("Pembayaran berhasil diverifikasi.");
                getUserAppointments();
                getPsikologData();
                navigate("/my-appointments");
              } else {
                toast.error("Verifikasi gagal: " + response.data.message);
              }
            } catch (err) {
              console.error(err);
              toast.error("Gagal memverifikasi pembayaran.");
            }
          },

          onPending: (result) => {
            console.log("Menunggu pembayaran:", result);
            alert("Pembayaran masih pending.");
          },

          onError: (error) => {
            console.error("Terjadi kesalahan pembayaran:", error);
            alert("Gagal melakukan pembayaran.");
          },

          onClose: () => {
            alert("Popup ditutup tanpa menyelesaikan pembayaran.");
          },
        });
      }
    } catch (error) {
      console.error(error);
      alert("Gagal memulai proses pembayaran. Silakan coba beberapa saat lagi.");
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        Jadwal saya
      </p>
      <div>
        {appointment.length === 0 ? (
          <p className="text-center text-zinc-500 py-6">Belum membuat jadwal</p>
        ) : (
          appointment.slice(0, 3).map((item, index) => (
            <div
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
              key={index}
            >
              <div>
                <img
                  className="w-32 bg-indigo-50"
                  src={item.psikologData.image}
                  alt=""
                />
              </div>
              <div className="flex-1 my-auto text-sm text-zinc-60000">
                <p className="text-neutral-800 text-md font-semibold">
                  {item.psikologData.name}
                </p>
                <p>{item.psikologData.speciality}</p>
               
                <p className="text-sm mt-1">
                  {slotDateFormT(item.slotDate)} | {item.slotTime}
                </p>

                {!item.cancelled && item.payment && !item.isCompleted && (
                <a href={item.psikologData.address.line1} className="text-blue-400 underline">{item.psikologData.address.line1}</a>
                )}
              </div>
              <div></div>
              <div className="flex flex-col gap-2 justify-end">
                {!item.cancelled && item.payment && !item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50">
                    Pembayaran Selesai
                  </button>
                )}
                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button
                    onClick={() => appointmentMidtrans(item.appointmentId)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-blue-400 hover:text-white transition-all duration-300"
                  >
                    Lakukan Pembayaran
                  </button>
                )}
                {!item.cancelled && !item.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(item.appointmentId)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300"
                  >
                    Batalkan
                  </button>
                )}
                {item.cancelled && !item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                    Dibatalkan
                  </button>
                )}
                {item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                    Selesai
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
