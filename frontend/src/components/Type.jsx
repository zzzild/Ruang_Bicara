import React from "react";
import { assets } from "../assets/assets";

const tujuanData = [
  {
    icon: <img src={assets.avatar2} alt="avatar1" className="mb-3 h-10 w-10" />,
    title: "Depresi",
    desc: "Merasa hampa, lelah tanpa sebab, kehilangan minat terhadap hal yang dulu disukai, atau merasa tidak berharga ? Itu bisa jadi tanda depresi",
  },
  {
    icon: <img src={assets.avatar1} alt="avatar2" className="mb-3 h-10 w-10" />,
    title: "Kecemasan Berlebih",
    desc: "Apakah kamu sering khawatir berlebihan, atau jantung sering berdebar saat harus tampil di depan orang? Bisa jadi kamu mengalami gangguan kecemasan",
  },
  {
    icon: <img src={assets.avatar4} alt="avatar3" className="mb-3 h-10 w-10" />,
    title: "Bipolar",
    desc: "Pernah merasa sangat semangat , lalu beberapa hari kemudian merasa sedih ?, Prubahan suasana hati yang ekstrem bisa jadi gangguan bipolar",
  },
  {
    icon: <img src={assets.avatar3} alt="avatar4" className="mb-3 h-10 w-10" />,
    title: "Overthinking ",
    desc: "Aku takut salah, Orang lain pasti mikir aku gagal, Jika pikiran seperti ini terus muncul, bisa jadi kamu perlu bicara dengan profesional.",
  },
];

const Type = () => {
  return (
    <section id="pilar" className="py-16 lg:py-32">
      <div className="container">
        <div
          className="flex flex-col items-center mb-10 gap-4"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h1 className="text-3xl font-medium text-center">
            Kapan Harus Konsultasi dengan Psikolog?
          </h1>
          <p className="sm:w-1/3 text-center text-sm">
            Kalau kamu bingung ‘ini normal atau nggak’, mungkin ini saatnya
            bicara
          </p>
        </div>

        {/* Card Section */}
        <div className="w-full " data-aos="fade-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-center items-stretch">
            {tujuanData.map((item, index) => (
              <div
                key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                className="w-full"
              >
                <div className="h-full flex flex-col justify-between max-w-sm mx-auto rounded-lg bg-gradient-to-r from-blue-300 to-blue-200 p-6 transition-transform duration-300 ease-in-out hover:scale-105 will-change-transform">
                  {item.icon}
                  <h5 className="mb-2 text-2xl font-semibold text-white tracking-tight text-ink">
                    {item.title}
                  </h5>
                  <p className="font-medium text-xs text-justify leading-relaxed text-gray-500">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Type;
