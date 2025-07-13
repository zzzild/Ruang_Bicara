import { useState, createContext } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const PsikologContext = createContext()

const PsikologContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [pToken, setPToken] = useState(localStorage.getItem('pToken')? localStorage.getItem('pToken'): '')

    const [appointment, setAppointment] = useState([])

    const [dashData, setDashData] = useState(false)

    const [profileData, setProfileData] = useState(false)

    const getAppointment = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/psikolog/appointment', {headers:{pToken}})
            if (data.success) {
                setAppointment(data.appointment)
                console.log(data.appointment);
                
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const completeAppointment = async (appointmentId) => {
        
        try {
            const {data} = await axios.post(backendUrl + '/api/psikolog/complete-appointment', {appointmentId}, {headers:{pToken}})
            if (data.success) {
                toast.success(data.message)
                getAppointment()
            }else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        
        try {
            const {data} = await axios.post(backendUrl + '/api/psikolog/cancel-appointment', {appointmentId}, {headers:{pToken}})
            if (data.success) {
                toast.success(data.message)
                getAppointment()
            }else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const getDashData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/psikolog/dashboard', {headers:{pToken}})

            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData)
            }else{
                toast.error(dashData.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getProfileData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/psikolog/profile', {headers:{pToken}})

            if (data.success) {
                setProfileData(data.profileData)
                console.log(data.profileData);
                
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const value = {
        pToken, setPToken,
        backendUrl, getAppointment,
        appointment, setAppointment,
        completeAppointment, cancelAppointment,
        dashData, setDashData, getDashData, profileData,
        setProfileData, getProfileData
    }

    return (
        <PsikologContext.Provider value={value}>
            {props.children}
        </PsikologContext.Provider>
    )
}

export default PsikologContextProvider