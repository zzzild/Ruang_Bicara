import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { PsikologContext } from "../context/PsikologContext";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const {pToken} = useContext(PsikologContext)

  return (
    <div className="min-h-screen border-none shadow bg-white border-r ">
      {aToken && 
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-blue-400" : ""
              }`
            }
            to="/admin-dashboard"
          >
            <img src={assets.home_icon} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-blue-400" : ""
              }`
            }
            to={"/all-appointments"}
          >
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Penjadwalan</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-blue-400" : ""
              }`
            }
            to={"/add-psikolog"}
          >
            <img src={assets.add_icon} alt="" />
            <p className="hidden md:block">Tambah Psikolog</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-blue-400" : ""
              }`
            }
            to={"/psikolog-list"}
          >
            <img src={assets.people_icon} alt="" />
            <p className="hidden md:block">Daftar psikolog</p>
          </NavLink>
        </ul>
      }
      {pToken && 
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-blue-400" : ""
              }`
            }
            to="/psikolog-dashboard"
          >
            <img src={assets.home_icon} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-blue-400" : ""
              }`
            }
            to={"/psikolog-appointment"}
          >
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Penjadwalan</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-blue-400" : ""
              }`
            }
            to={"/psikolog-profile"}
          >
            <img src={assets.people_icon} alt="" />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      }
    </div>
  );
};

export default Sidebar;
