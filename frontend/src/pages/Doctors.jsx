import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
  let filtered = doctors.filter(doc => doc.available); // hanya yang tersedia

  if (speciality) {
    filtered = filtered.filter(doc =>
      doc.speciality.toLowerCase() === speciality.toLowerCase()
    );
  }

  setFilterDoc(filtered);
};


  useEffect(() => {
  console.log("Speciality filter:", speciality);
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-gray-600">
        Lihat Psikolog Berdasarkan Bidang Spesialisasi
      </p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <div
          className="w-full grid gap-4 gap-y-6"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          }}
        >
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item.psikologId}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={index}
            >
              <img className="bg-blue-50" src={item.image} alt="" />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
                  </span>
                  <p>Tersedia</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? "bg-second text-white" : ""
            }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? "flex" : "hidden sm:flex"
            }`}
        >
          {["Individu", "Pasangan", "Remaja", "Anak-anak", "Keluarga"].map(
            (type) => (
              <p
                key={type}
                onClick={() =>
                  speciality === type
                    ? navigate("/doctors")
                    : navigate(`/doctors/${type}`)
                }
                className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === type ? "bg-indigo-100 text-black" : ""
                  }`}
              >
                {type === "Anak-anak" ? "Anak" : type}
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
