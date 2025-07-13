import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const availableDoctors = doctors.filter((doc) => doc.available);

  return (
    <div
      className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <h1 className="text-3xl font-medium">Psikolog Terbaik untuk Anda</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Telusuri daftar lengkap psikolog terpercaya kami dengan mudah
      </p>

      {/* Card Grid */}
      <div
        className="w-full grid gap-4 pt-5 gap-y-6 px-3 sm:px-0"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
      >
        {availableDoctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            data-aos="zoom-in"
            data-aos-delay={index * 100}
            className="w-full"
          >
            <div
              onClick={() => {
                navigate(`/appointment/${item.psikologId}`);
                scrollTo(0, 0);
              }}
              className="shadow-xl rounded-tr-xl rounded-bl-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 will-change-transform"
            >
              <img
                className="bg-blue-100 w-full object-cover"
                src={item.image}
                alt={item.name}
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-green-500">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
                  </span>
                  <p>Tersedia</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 opacity-50 text-sm">
                  {item.speciality}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        data-aos="fade-up"
        data-aos-delay="1000"
        className="bg-blue-50 text-gray-600 items-end px-12 py-3 rounded-full mt-10 hover:scale-105 transition-all duration-300"
      >
        selengkapnya
      </button>
    </div>
  );
};

export default TopDoctors;
