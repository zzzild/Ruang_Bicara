import React, { Fragment, useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Admin/Dashboard';
import { Route, Routes } from 'react-router-dom';
import AllApointments from './pages/Admin/AllApointments';
import AddPsikolog from './pages/Admin/AddPsikolog';
import PsikologList from './pages/Admin/PsikologList';
import { PsikologContext } from './context/PsikologContext';
import PsikologDashboard from './pages/Psikolog/PsikologDashboard';
import PsikologAppointment from './pages/Psikolog/PsikologAppointment';
import PsikologProfile from './pages/Psikolog/PsikologProfile';


const App = () => {

  const {aToken} = useContext(AdminContext)
  const {pToken} = useContext(PsikologContext)

  return aToken || pToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          {/* Admin Route */}
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<Dashboard/>}/>
          <Route path='/all-appointments' element={<AllApointments/>}/>
          <Route path='/add-psikolog' element={<AddPsikolog/>}/>
          <Route path='/psikolog-list' element={<PsikologList/>}/>

          {/* Psikolog Route */}
          <Route path='/psikolog-dashboard' element={<PsikologDashboard/>}/>
          <Route path='/psikolog-appointment' element={<PsikologAppointment/>}/>
          <Route path='/psikolog-profile' element={<PsikologProfile/>}/>
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App
