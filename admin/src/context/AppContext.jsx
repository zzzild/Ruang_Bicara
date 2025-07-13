import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currency = 'Rp.'

    const formatRupiah = (number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);

    const calculateAge = (dob) => {
        const today = new Date()
        const birtDate = new Date(dob)

        let age = today.getFullYear() - birtDate.getFullYear()

        return age
    }
      const months = [
        "",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    
      
    
      const slotDateFormT = (slotDate) => {
        const dateArray = slotDate.split("_");
        return (
          dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
        );
      };

    const value = {
        calculateAge, 
        slotDateFormT,
        currency, formatRupiah
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider