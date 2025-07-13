import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { psikologId } = useParams(); // ganti param jadi psikologId
  const { doctors, backendUrl, token, getPsikologData, formatRupiah } =
    useContext(AppContext);
  const daysOfWeek = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  const navigate = useNavigate();

  const [psiInfo, setPsiInfo] = useState(null);
  const [psiSlots, setPsiSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchPsiInfo = () => {
    const info = doctors.find((doc) => doc.psikologId === psikologId); // pakai psikologId
    setPsiInfo(info);
    console.log(info);
  };

  const getAvailableSlots = () => {
    setPsiSlots([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMilliseconds(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable =
          psiInfo.slots_booked[slotDate] &&
          psiInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 60);
      }

      setPsiSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Silakan masuk untuk membuat janji temu");
      return navigate("/login");
    }

    if (!psiSlots[slotIndex] || !psiSlots[slotIndex][0]) {
      toast.error("Waktu konsultasi tidak tersedia. Silakan pilih slot lain.");
      return;
    }

    try {
      const date = psiSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        {
          psikologId: psiInfo.psikologId,
          slotDate,
          slotTime,
        },
        {
          headers: { token },
        }
      );

      if (data.success) {
        toast.success("Janji temu berhasil dibuat.");
        getPsikologData();
        navigate("/my-appointments");
      } else {
        toast.error("Gagal membuat janji temu: " + data.message);
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat membuat janji temu.");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPsiInfo();
  }, [doctors, psikologId]);

  useEffect(() => {
    if (psiInfo) getAvailableSlots();
  }, [psiInfo]);

  return (
    psiInfo && (
      <div>
        {/* Details Psikolog */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-second w-full sm:max-w-72 rounded-lg"
              src={psiInfo.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {psiInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {psiInfo.degree} - {psiInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {psiInfo.experience}
              </button>
            </div>

            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900">
                Tentang <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1 text-justify">
                {psiInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Biaya konsultasi:{" "}
              <span className="text-gray-600">
                {formatRupiah(psiInfo.fees)}
              </span>
            </p>
          </div>
        </div>

        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Pilih waktu konsultasi</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {doctors.length &&
              psiSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-20 rounded-2xl cursor-pointer ${
                    slotIndex === index
                      ? "bg-blue-400 text-white"
                      : "border border-gray-200"
                  }`}
                  key={index}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          <div className="flex items-center gap-3 w-full overflow-x-scroll  mt-4">
            {psiSlots.length &&
            psiSlots[slotIndex] &&
            psiSlots[slotIndex].length === 0 ? (
              <p className="text-sm text-red-500 mt-2">
                Konsultasi untuk hari ini sudah tidak tersedia.
              </p>
            ) : (
              psiSlots[slotIndex] &&
              psiSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  key={index}
                  className={`text-sm font-light select-none flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-blue-400 text-white"
                      : " border border-gray-500 hover:border-gray-800"
                  }`}
                >
                  {item.time.toLowerCase()}
                </p>
              ))
            )}
          </div>

          <button
            onClick={bookAppointment}
            className="bg-second text-white text-sm font-light px-14 py-3 rounded-full my-6"
          >
            Buat janji temu
          </button>
        </div>

        <RelatedDoctors
          psikologId={psikologId}
          speciality={psiInfo.speciality}
        />
      </div>
    )
  );
};

export default Appointment;
