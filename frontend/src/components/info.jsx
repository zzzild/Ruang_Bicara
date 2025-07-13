import React from "react";
import { assets } from "../assets/assets";

const info = () => {
  return (
    <section id="about" className="py-16 lg:py-32">
      <div className="container">
        <div className="flex flex-col items-center mb-10 gap-4" data-aos="fade-up"
  data-aos-duration="1000">
          <h1 className="text-3xl font-medium">
            Kapan Harus Konsultasi dengan Psikolog?
          </h1>
          <p className="sm:w-1/3 text-center text-sm">
            Kalau kamu bingung ‘ini normal atau nggak’, mungkin ini saatnya
            bicara
          </p>
        </div>
        <div className="flex flex-wrap">
          <div
            className="mb-10 w-full self-center pr-10 text-center lg:w-1/2 lg:text-start"
            data-aos="fade-right"
          >
            <p className="text-lg  font-extralight text-wolf text-justify ">
              Konsultasi bisa dimulai saat kamu merasa sedih, cemas, atau lelah
              secara emosional dalam waktu yang lama. Jika pikiranmu terasa
              penuh, sulit tidur, atau merasa tidak ada yang bisa diajak bicara,
              itu tanda kamu butuh bantuan. Konsultasi bukan karena kamu lemah,
              tapi karena kamu peduli pada dirimu sendir
              <br /> <br />
              Banyak orang menunda konsultasi karena merasa masalahnya belum cukup “parah” atau takut dianggap berlebihan. Padahal, kamu tidak perlu menunggu sampai benar-benar terpuruk untuk mulai mencari bantuan. Terkadang, cukup dengan didengar oleh orang yang tepat, bebanmu bisa terasa jauh lebih ringan.
            </p>
          </div>
          <div
            className="mt-8 flex w-full self-center px-10 lg:w-1/2"
            data-aos="fade-left"
          >
            <div className="grid grid-cols-3 gap-4 rounded-md">
              <img className="h-full rounded-md" src={assets.poster1} alt="" />
              <img
                className="-mt-8 h-full rounded-md"
                src={assets.poster2}
                alt=""
              />
              <img className="h-full rounded-md" src={assets.poster3} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default info;
