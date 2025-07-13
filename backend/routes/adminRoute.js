import express from 'express'
import { addPsikolog, allPsikolog, loginAdmin, appointmentsAdmin, appointmentCancel, adminDashboard, deletePsikolog} from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailablity } from '../controllers/psikologController.js'

const adminRouter = express.Router()

adminRouter.post('/add-psikolog', authAdmin,upload.single('image'), addPsikolog)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-psikolog', authAdmin ,allPsikolog)
adminRouter.post('/change-availability', authAdmin ,changeAvailablity)
adminRouter.get('/appointments', authAdmin, appointmentsAdmin)
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel)
adminRouter.get('/dashboard', authAdmin, adminDashboard)
adminRouter.post('/delete-psikolog', authAdmin, deletePsikolog)





export default adminRouter