import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [psikolog, setPsikolog] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setUserData] = useState(false);

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);

  const getPsikologData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/psikolog/list");
      if (data.success) {
        setPsikolog(data.psikolog);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loadProfileUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message === "Invalid token"
      ) {
        toast.error("Sesi login habis, silakan login ulang.");
        setToken(false);
        localStorage.removeItem("token");
      } else {
        toast.error(error.message);
      }
    }
  };

  const value = {
    doctors: psikolog,
    getPsikologData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadProfileUserData,
    formatRupiah,
  };

  useEffect(() => {
    getPsikologData();
  }, []);

  useEffect(() => {
    if (token) {
      loadProfileUserData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
