import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { aToken, dashData, getDashData, cancelAppointment } =  useContext(AdminContext);
  const {slotDateFormT} = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100  hover:scale-105 transition-all">
            <img className="w-14" src={assets.doctor_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600 ">
                {dashData.psikolog}
              </p>
              <p className="text-gray-400"> Psikolog</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100  hover:scale-105 transition-all ">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Janji Temu</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100  hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600 ">
                {dashData.client}
              </p>
              <p className="text-gray-400">Client</p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-amber-50">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">History</p>
          </div>

          <div className="pt-4 border border-amber-50 border-t-0">
            {dashData.latestAppointment.map((item, index) => (
              <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100" key={index}>
                <img className="rounded-full w-10 h-10" src={item.userData.image} alt="" />
                <div className="flex-1 text-sm">
                  <p className="text-gray-600 font-medium">{item.userData.name}</p>
                  <p className="text-gray-600">{slotDateFormT(item.slotDate)}</p>
                </div>

                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Dibatalkan</p>
                ) : item.isCompleted ? (<p className="text-green-500 text-xs font-medium">Selesai</p>) :
                
                (
                  <p className="text-yellow-400 text-xs font-medium">Menunggu</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
