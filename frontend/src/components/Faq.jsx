import React from "react";

const Faq = () => {
  return (
    <div
  className="flex flex-col items-start gap-4 my-16 text-gray-900 md:mx-10"
  id="faq"
  data-aos="fade-up"
  data-aos-duration="1000"
>
  <h1 className="text-3xl text-start font-medium">
    Yuk, Kenalan dengan Layanan Konsultasi Psikolog Online!
  </h1>

  <div className="space-y-4 mt-4 w-full">
    <details
      className="group [&_summary::-webkit-details-marker]:hidden"
      open
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <summary className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900">
        <h2 className="text-lg font-medium">
          Saya belum pernah konsultasi ke psikolog. Gimana cara mulainya?
        </h2>
        <svg
          className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <p className="px-4 pt-4 text-gray-900">
        Tenang, cukup daftar akun, pilih psikolog yang cocok, lalu buat
        janji. Kamu bisa konsultasi lewat chat, video call, atau
        telepon—semuanya dari rumah.
      </p>
    </details>

    <details
      className="group [&_summary::-webkit-details-marker]:hidden"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <summary className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900">
        <h2 className="text-lg font-medium">
          Apakah saya bisa cerita tentang masalah pribadi?
        </h2>
        <svg
          className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <p className="px-4 pt-4 text-gray-900">
        Tentu! Semua konsultasi bersifat rahasia. Ceritamu aman bersama
        psikolog kami yang profesional dan berlisensi.
      </p>
    </details>

    <details
      className="group [&_summary::-webkit-details-marker]:hidden"
      data-aos="fade-up"
      data-aos-delay="300"
    >
      <summary className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900">
        <h2 className="text-lg font-medium">
          Apakah layanan ini hanya untuk orang dengan gangguan mental?
        </h2>
        <svg
          className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <p className="px-4 pt-4 text-gray-900">
        Tidak. Konsultasi psikolog cocok untuk siapa saja—baik yang sedang
        merasa stres, cemas, bingung ambil keputusan, atau sekadar butuh
        teman bicara yang profesional.
      </p>
    </details>
  </div>
</div>

  );
};

export default Faq;
