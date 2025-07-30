import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { token, setToken, userData } = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt=""
      />
      <div className="flex items-center gap-8 ml-auto">
        <ul className="hidden md:flex items-start gap-5 font-medium ">
          <NavLink to="/">
            <li className="py-1">Beranda</li>
            <hr className="border-none outline-none h-0.5 bg-blue-400 w-3/5 m-auto hidden " />
          </NavLink>
          <NavLink to="/doctors">
            <li className="py-1">Psikolog</li>
            <hr className="border-none outline-none h-0.5 bg-blue-400 w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to="/about">
            <li className="py-1">Tentang</li>
            <hr className="border-none outline-none h-0.5 bg-blue-400 w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to="/contact">
            <li className="py-1">Kontak</li>
            <hr className="border-none outline-none h-0.5 bg-blue-400 w-3/5 m-auto hidden" />
          </NavLink>
        </ul>

        <div className="flex items-center gap-4">
          {token && userData ? (
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <img
                className="w-8 h-8 rounded-full"
                src={userData.image}
                alt=""
              />
              <img className="w-2.5" src={assets.dropdown_icon} alt="" />
              <div className="absolute w-56 top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                <div className=" bg-white shadow-lg divide-y divide-gray-100 rounded flex flex-col gap-4 p-2">
                  <p
                    onClick={() => navigate("my-profile")}
                    className=" cursor-pointer text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg px-4 py-2"
                  >
                    Profile Saya
                  </p>
                  <p
                    onClick={() => navigate("my-appointments")}
                    className="cursor-pointer text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg px-4 py-2"
                  >
                    Jadwal Saya
                  </p>
                  <p
                    onClick={logout}
                    className="cursor-pointer text-red-700 hover:bg-red-50 rounded-lg px-4 py-2"
                  >
                    Keluar
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-400 text-white px-8 py-3 rounded-full font-light hidden border-none  hover:scale-105 transition-all duration-300 md:block"
            >
              Buat Akun
            </button>
          )}
          <img
            onClick={() => setShowMenu(true)}
            src={assets.menu_icon}
            className="w-6  md:hidden"
            alt=""
          />
          {/* mobile menu */}
          <div
            className={`${
              showMenu ? "fixed w-full" : "h-0 w-0"
            } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
          >
            <div className="flex items-center justify-between px-5 py-6 border-b border-b-gray-400">
              <img className="w-36" src={assets.logo} alt="" />
              <img
                className="w-7"
                onClick={() => setShowMenu(false)}
                src={assets.cross_icon}
                alt=""
              />
            </div>
            <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
              <NavLink onClick={() => setShowMenu(false)} to="/">
                <p className="px-96 py-4 rounded inline-block">Beranda</p>
              </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/doctors">
                <p className="px-96 py-4 rounded inline-block">Semua</p>
              </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/about">
                <p className="px-96 py-4 rounded inline-block">Tentang</p>
              </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/contact">
                <p className="px-96 py-4 rounded inline-block">Kontak</p>
              </NavLink>

              {/* Tambahkan tombol Buat Akun di bawah menu */}
              {!token && (
                <button
                  onClick={() => {
                    setShowMenu(false);
                    navigate("/login");
                  }}
                  className="w-full py-4 bg-blue-400 text-white rounded-md inline-block "
                >
                  Buat Akun
                </button>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
