import express from 'express'
import { psikologList, loginPsikolog, appointmentPsikolog, appointmentComplete, appointmentCancel, psikologDashboard, psikologProfile, updatePsikologProfile} from '../controllers/psikologController.js'
import authPsikolog from '../middlewares/authPsikolog.js'

const psikologRouter = express.Router()

psikologRouter.get('/list',psikologList )
psikologRouter.post('/login', loginPsikolog)
psikologRouter.get('/appointment', authPsikolog, appointmentPsikolog)
psikologRouter.post('/complete-appointment', authPsikolog, appointmentComplete)
psikologRouter.post('/cancel-appointment', authPsikolog, appointmentCancel)
psikologRouter.get('/dashboard', authPsikolog, psikologDashboard)
psikologRouter.get('/profile', authPsikolog, psikologProfile)
psikologRouter.post('/update-profile', authPsikolog, updatePsikologProfile)


export default psikologRouter