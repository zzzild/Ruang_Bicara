import psikologModel from "../models/psikologModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"


const changeAvailablity = async (req, res) => {
    try {
        const { psikologId } = req.body

        const psiData = await psikologModel.findOne({ psikologId });
        if (!psiData) {
          return res.json({ success: false, message: 'Psikolog tidak ditemukan' });
        }

        await psikologModel.findOneAndUpdate(
          { psikologId },
          { available: !psiData.available }
        )

        res.json({ success: true, message: 'Availability Changed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const psikologList = async (req, res) => {
    try {
        const psikolog = await psikologModel.find({}).select(['-password', '-email'])

        res.json({success:true, psikolog})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const loginPsikolog = async (req, res) => {
    
    try {
        
        const { email, password} = req.body
        const psikolog = await psikologModel.findOne({email})

        if (!psikolog) {
            return res.json({success: false, message:'Invalid Credentials'})
        }

        const isMatch = await bcrypt.compare(password, psikolog.password)

        if (isMatch) {
            
            const token = jwt.sign({id:psikolog.psikologId}, process.env.JWT_SECRET)

            res.json({success:true, token})

        } else {
            res.json({success: false, message:'Invalid Credentials'})
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// Api get psikolog for psikolog panel
const appointmentPsikolog = async (req, res) => {
    try {
        const psikologId = req.psikologId
        const appointment = await appointmentModel.find({psikologId})

        res.json({success: true, appointment})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// API MARK COMPLETED
const appointmentComplete = async (req, res) => {
    try {
        const {  appointmentId } = req.body;
        const psikologId = req.psikologId

        const appointmentData = await appointmentModel.findOne({ appointmentId });

        if (!appointmentData) {
            return res.json({ success: false, message: 'Appointment not found' });
        }

        // Debug log (optional)
        console.log("DB psikologId:", appointmentData.psikologId);
        console.log("Request psikologId:", psikologId);

        if (String(appointmentData.psikologId) === String(psikologId)) {
            await appointmentModel.findOneAndUpdate(
                { appointmentId },
                { isCompleted: true }
            );
            return res.json({ success: true, message: 'Appointment completed' });
        } else {
            return res.json({ success: false, message: 'Mark Failed: ID mismatch' });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API cancel COMPLETED
const appointmentCancel = async (req, res) => {
    try {
        
        const { appointmentId} = req.body
        const psikologId = req.psikologId

        const appointmentData = await appointmentModel.findOne({appointmentId})

        if (appointmentData && appointmentData.psikologId === psikologId) {
            await appointmentModel.findOneAndUpdate({appointmentId}, {cancelled: true})
            return res.json({success:true, message:'Appointment cancelled'})
        } else {
            return res.json({success:false, message:'Cancelled Failed'})
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const psikologDashboard = async (req, res) => {
    try {
        
        const psikologId = req.psikologId;


        const appointment = await appointmentModel.find({psikologId})

        let earnings = 0

        appointment.map((item)=> {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let client = []

        appointment.map((item) => {
            if (!client.includes(item.userId)) {
                client.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointment: appointment.length,
            client: client.length,
            latestAppointment: appointment.reverse().slice(0,5)
        }

        res.json({success:true, dashData})


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API PSIKOLOG PROFILE FOR PSIKOLOG PANEL
const psikologProfile = async (req, res) => {
    try {
        const psikologId = req.psikologId;
        const profileData = await psikologModel.findOne({psikologId}).select('-password')

        res.json({success:true , profileData})


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API UPDATE PROFILE PSIKOLOG
const updatePsikologProfile = async (req, res) => { 
    try {
        
        const {fees, address, available} = req.body
        const psikologId = req.psikologId;

        await psikologModel.findOneAndUpdate({psikologId}, {fees, address, available})

        res.json({success:true, message:'Profile update'})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    changeAvailablity, psikologList,
    loginPsikolog, appointmentPsikolog,
    appointmentCancel, appointmentComplete,
    psikologDashboard, psikologProfile,
    updatePsikologProfile
}