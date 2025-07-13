import React from "react";
import { useContext } from "react";
import { PsikologContext } from "../../context/PsikologContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const PsikologAppointment = () => {
  const {
    pToken,
    getAppointment,
    appointment,
    getDashData,
    completeAppointment,
    cancelAppointment,
  } = useContext(PsikologContext);
  const { calculateAge, slotDateFormT, currency } = useContext(AppContext);

  useEffect(() => {
    if (pToken) {
      getAppointment();
      getDashData();
    }
  }, [pToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">Daftar janji temu</p>

      <div className="bg-white border border-amber-50 rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Client</p>
          <p>Pembayaran</p>
          <p>Usia</p>
          <p>Tanggal & Waktu</p>
          <p className='min-w-[120px]'>Biaya</p>
          <p>Tindakan</p>
        </div>

        {appointment
          .slice()
          .reverse()
          .map((item, index) => {
            return (
              <div
                className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
                key={index}
              >
                <p className="max-sm:hidden">{index + 1}</p>
                <div className="flex items-center gap-2">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={item.userData.image}
                    alt=""
                  />{" "}
                  <p>{item.userData.name}</p>
                </div>
                <div>
                  <p
                    className={`text-xs inline border rounded-full px-2 ${
                      item.payment
                        ? "text-blue-600 border-blue-400"
                        : "text-yellow-600 border-yellow-400"
                    }`}
                  >
                    {item.payment ? "Succes" : "Pending"}
                  </p>
                </div>
                <p className="max-sm:hidden">
                  {calculateAge(item.userData.dob)}
                </p>
                <p>
                  {slotDateFormT(item.slotDate)}, {item.slotTime}
                </p>
                <p className='min-w-[120px]'>
                  {currency}
                  {item.amount}
                </p>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Dibatalkan</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">Selesai</p>
                ) : (
                  <div className="flex">
                    <img
                      onClick={() => cancelAppointment(item.appointmentId)}
                      className="w-10 cursor-pointer"
                      src={assets.cancel_icon}
                      alt=""
                    />
                    <img
                      onClick={() => completeAppointment(item.appointmentId)}
                      className="w-10 cursor-pointer"
                      src={assets.tick_icon}
                      alt=""
                    />
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PsikologAppointment;
