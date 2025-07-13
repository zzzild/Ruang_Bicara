import React from "react";

const Step = () => {
  return (
    <div>
  <div
    className="flex flex-col items-center gap-4 py-16 text-gray-800"
    id="speciallity"
    data-aos="fade-up"
    data-aos-duration="1000"
  >
    <h1 className="text-3xl font-medium">Bagaimana Cara Kerjanya?</h1>
    <p className="sm:w-1/3 text-center text-sm">
      4 Langkah Mudah untuk Mendapatkan Solusi
    </p>

    <div>
      <h2 className="sr-only">Steps</h2>

      <div className="mt-4">
        <ol className="grid grid-cols-1 divide-x divide-gray-100 overflow-hidden rounded-lg border border-gray-100 text-sm text-gray-500 sm:grid-cols-4">
          {[
            {
              title: "Cari Psikolog",
              desc: "Temukan psikolog yang sesuai",
              icon: (
                <svg
                  className="size-7 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M11 17a6 6 0 100-12 6 6 0 000 12z"
                  />
                </svg>
              ),
              bg: "bg-blue-200",
            },
            {
              title: "Lihat Profil Psikolog",
              desc: "Pelajari pengalaman psikolog",
              icon: (
                <svg
                  className="size-7 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>
              ),
              bg: "",
            },
            {
              title: "Buat Janji Konsultasi",
              desc: "Pilih jadwal yang tersedia",
              icon: (
                <svg
                  className="size-7 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10m-13 8a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12z"
                  />
                </svg>
              ),
              bg: "bg-blue-200",
            },
            {
              title: "Mulai Konsultasi",
              desc: "Dapatkan solusi terbaik",
              icon: (
                <svg
                  className="size-7 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              ),
              bg: "",
            },
          ].map((step, index) => (
            <li
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              className={`flex items-center justify-center gap-2 p-4 ${step.bg} relative`}
            >
              {index !== 0 && (
                <span className="absolute top-1/2 -left-2 hidden size-4 -translate-y-1/2 rotate-45 border border-gray-100 sm:block ltr:border-s-0 ltr:border-b-0 ltr:bg-white rtl:border-e-0 rtl:border-t-0 rtl:bg-gray-50"></span>
              )}
              {index !== 3 && (
                <span className="absolute top-1/2 -right-2 hidden size-4 -translate-y-1/2 rotate-45 border border-gray-100 sm:block ltr:border-s-0 ltr:border-b-0 ltr:bg-gray-50 rtl:border-e-0 rtl:border-t-0 rtl:bg-white"></span>
              )}

              {step.icon}
              <p className="leading-none text-center">
                <strong className="block font-medium">{step.title}</strong>
                <small className="mt-1 block">{step.desc}</small>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </div>
</div>

  );
};

export default Step;
