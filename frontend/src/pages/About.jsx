import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl font-medium pt-10 text-gray-500">
        <p>
          TENTANG<span className="text-blue-400"> KAMI</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600 text-justify">
          <p>
            Selamat datang di Ruang Bicara, mitra terpercaya Anda dalam
            melakukan reservasi layanan psikolog secara online dengan mudah dan
            nyaman. Di Ruang Bicara, kami memahami berbagai tantangan yang
            sering dihadapi individu dalam menjadwalkan sesi konsultasi dan
            menjaga kesehatan mental secara berkelanjutan.
          </p>
          <p>
            Ruang Bicara berkomitmen untuk menghadirkan layanan terbaik di
            bidang kesehatan mental berbasis teknologi. Kami terus mengembangkan
            platform kami dengan mengadopsi inovasi terbaru guna meningkatkan
            pengalaman pengguna dan memberikan pelayanan yang berkualitas. Baik
            Anda sedang memulai sesi konsultasi pertama atau melanjutkan proses
            pemulihan, Ruang Bicara siap mendampingi setiap langkah Anda.
          </p>
          <b className="text-gray-800">Visi Kami</b>
          <p>
            menciptakan pengalaman konsultasi psikologis yang mudah diakses.
            Kami bertekad untuk menjadi jembatan antara Anda dan tenaga
            profesional psikolog, agar Anda bisa mendapatkan dukungan yang tepat
            kapan pun dibutuhkan.
          </p>
        </div>
      </div>

      <div className="text-xl my-10 font-medium">
        <p>
          KENAPA{" "}
          <span className="text-blue-400 font-semibold">MEMILIH KAMI</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-20">
        <div className="border text-left px-6 py-8 sm:py-10 flex flex-col gap-5 text-[15px] hover:bg-blue-400 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Efisien</b>
          <p className="leading-relaxed tracking-normal">
            Penjadwalan konsultasi yang cepat dan mudah, cocok untuk jadwal Anda
            yang padat.
          </p>
        </div>
        <div className="border px-6 py-8 sm:py-10 flex flex-col gap-5 text-[15px] hover:bg-blue-400 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Nyaman</b>
          <p className="leading-relaxed tracking-normal">
            Akses layanan profesional dari mana saja, kapan saja tanpa harus
            keluar rumah.
          </p>
        </div>
        <div className="border px-6 py-8 sm:py-10 flex flex-col gap-5 text-[15px] hover:bg-blue-400 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Pendekatan Empatik</b>
          <p className="leading-relaxed tracking-normal">
            Setiap sesi dilakukan dengan pendekatan yang hangat dan penuh empati
            untuk kenyamanan Anda.
          </p>
        </div>
        <div className="border px-6 py-8 sm:py-10 flex flex-col gap-5 text-[15px] hover:bg-blue-400 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Aman dan Terpercaya</b>
          <p className="leading-relaxed tracking-normal">
            Konsultasi dengan psikolog bersertifikat melalui sistem yang menjaga
            privasi Anda.
          </p>
        </div>
        <div className="border px-6 py-8 sm:py-10 flex flex-col gap-5 text-[15px] hover:bg-blue-400 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Dukungan Berkelanjutan</b>
          <p className="leading-relaxed tracking-normal">
            Kami mendampingi Anda di setiap langkah menuju kesehatan mental yang
            lebih baik.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
