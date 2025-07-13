import validator from "validator"
import bcrypt from 'bcryptjs'
import { v2 as cloudinary } from "cloudinary"
import psikologModel from "../models/psikologModel.js"
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'


// API FOR ADDING PSIKOLOG
const addPsikolog = async (req, res) => {

    try{
        const{ name, email, password, speciality, degree, experience, about, fees, address} = req.body
        const imageFile = req.file

        // checking all data to add psikolog
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success:false, message:"Missing Details"})
        }

        // validate email format
        if (!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a valid email"})
        }

        // validate password
        if(password.length < 8) {
            return res.json({success:false, message:"Please enter a strong password"})
        }

        // hashing psikolog password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // uplod image
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
        
        const imageUrl = imageUpload.secure_url

        const psikologData = {
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newPsikolog = new psikologModel(psikologData)
        await newPsikolog.save()

        return res.json({success:true, message:"psikolog added"})

    }catch(error){
        console.log(error)
        return res.json({success:false, message:error.message})
    }
}

// API ADMIN LOGIN
const loginAdmin = async (req, res) => {
    try{

        const {email, password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true, token})

        } else {
            res.json({success:false, message:"Invalid credentials"})
        }

    }catch (error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// Api to get all doctors list for  admin panel

const allPsikolog = async (req,res) => {
    try {

        const psikolog = await psikologModel.find({}).select('-password')
        res.json({success:true, psikolog})

    } catch (error) {
        console.log(error)
        return res.json({success:false, message:error.message})
    }
}

const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({success:true, appointments})
    } catch (error) {
        console.log(error)
        return res.json({success:false, message:error.message})
    }
}
// Api canceled appointment from admin
// Cancel appointment
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    console.log(appointmentId)

    const appointmentData = await appointmentModel.findOne({appointmentId})

console.log("Result from DB:", appointmentData);
    await appointmentModel.findOneAndUpdate({appointmentId}, {cancelled:true})

    // realese slots

    const {psikologId, slotDate, slotTime} = appointmentData

    const psikologData = await psikologModel.findOne({psikologId})

    let slots_booked = psikologData.slots_booked

    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

    await psikologModel.findOneAndUpdate({psikologId}, {slots_booked})

    res.json({success:true, message:'Appointment Canceled'})

    
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message });
  }
}

// DELETE psikolog
const deletePsikolog = async (req, res) => {
  try {
    const { psikologId } = req.body;

    if (!psikologId) {
      return res.json({ success: false, message: 'psikologId is required' });
    }

    const deleted = await psikologModel.findOneAndDelete({ psikologId });

    if (!deleted) {
      return res.json({ success: false, message: 'Psikolog not found' });
    }

    res.json({ success: true, message: 'Psikolog deleted successfully' });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// API get dashboard data
const adminDashboard =  async (req, res) => {
    
    try {
        
        const psikolog = await psikologModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            psikolog: psikolog.length,
            appointments: appointments.length,
            client: users.length,
            latestAppointment: appointments.reverse().slice(0,5)
        }

        res.json({success:true, dashData})


    } catch (error) {
        console.log(error)
    res.json({ success: false, message: error.message });
    }


    
}



export {addPsikolog, loginAdmin, allPsikolog, appointmentsAdmin, appointmentCancel, adminDashboard, deletePsikolog}