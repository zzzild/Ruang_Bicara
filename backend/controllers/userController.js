import validator from "validator";
import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import psikologModel from "../models/psikologModel.js"
import appointmentModel from "../models/appointmentModel.js";
import midtransClient from 'midtrans-client'

// API REGIST USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !password || !email) {
      return res.json({ success: false, message: "Missing detail" });
    }

    // validate email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "enter a valid email" });
    }

    // validate strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "enter a strong password" });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Api user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Api get user profile
const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await userModel
      .findOne({ userId: req.userId })
      .select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Api update user profile
const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, dob, gender } = req.body;
    const userId = req.userId;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    await userModel.findOneAndUpdate(
      { userId }, 
      {
        name,
        phone,
        address: JSON.parse(address),
        dob,
        gender,
      }
    );

    if (imageFile) {
      // uplod image to cloudiary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;

      await userModel.findOneAndUpdate({ userId }, { image: imageUrl });
    }

    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Api booking

const bookAppointment = async (req, res) => {
  try {
    const { psikologId, slotDate, slotTime } = req.body;
const userId = req.userId;

const psikologDataFull = await psikologModel.findOne( {psikologId} ).select("-password");

if (!psikologDataFull || !psikologDataFull.available) {
  return res.json({ success: false, message: "Psikolog tidak tersedia" });
}

let slots_booked = { ...psikologDataFull.slots_booked };

if (slots_booked[slotDate]) {
  if (slots_booked[slotDate].includes(slotTime)) {
    return res.json({ success: false, message: "Slot tidak tersedia" });
  } else {
    slots_booked[slotDate].push(slotTime);
  }
} else {
  slots_booked[slotDate] = [slotTime];
}

const userData = await userModel.findOne( {userId} ).select("-password");

const appointmentData = {
  userId,
  psikologId, // ✔ sesuai schema
  userData,
  psikologData: {
    name: psikologDataFull.name,
    email: psikologDataFull.email,
    speciality: psikologDataFull.speciality,
    image: psikologDataFull.image, // Make sure this field exists
        address: psikologDataFull.address
  },
  amount: psikologDataFull.fees,
  slotTime,
  slotDate,
  date: Date.now(), // ✔ date: Number
};

const newAppointment = new appointmentModel(appointmentData);
await newAppointment.save();

await psikologModel.findOneAndUpdate( {psikologId} , { slots_booked });

res.json({ success: true, message: "Appointment Booked" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Api appointment user
const listAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const appointments = await appointmentModel.find({userId})

    res.json({success: true, appointments})
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message });
  }
}

// Cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const userId = req.userId;

    const appointmentData = await appointmentModel.findOne({appointmentId})

    // verify
    if (appointmentData.userId !== userId) {
      return res.json({success:false, message:"unauthorized action"})
    }

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

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY, 
});

// API payment
const paymentMidtrans = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findOne({ appointmentId });

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment cancelled or not found",
      });
    }

    const parameter = {
      transaction_details: {
        order_id: `order-${appointmentId}-${Date.now()}`,
        gross_amount: appointmentData.amount,
      },
      customer_details: {
        first_name: appointmentData.userData.name,
        email: appointmentData.userData.email,
        phone: appointmentData.userData.phone,
      },
      enabled_payments: ["gopay", "bank_transfer", "shopeepay", "qris"],
    };

    const transaction = await snap.createTransaction(parameter); // ✅ fix di sini

    res.json({
      success: true,
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};


// API verify payment midtrans
const verifyMidtrans = async (req, res) => {
  try {
    const { order_id } = req.body;

    console.log("Menerima order_id:", order_id);

    const statusResponse = await snap.transaction.status(order_id);

    console.log("Status Midtrans:", statusResponse);

    const transactionStatus = statusResponse.transaction_status;

    // Extract appointmentId dari order_id
    // Contoh order_id: "order-APPT12345-1747471610227"
    const appointmentId = order_id.split('-')[1];

    if (transactionStatus === 'settlement') {
      // Update pembayaran di database
      const updated = await appointmentModel.findOneAndUpdate(
        { appointmentId },
        { payment: true },
        { new: true },
        
      );
      res.json({success:true, message:"Payment successful"})
      console.log("Appointment updated:", updated);
    }else [
      res.json({success:true, message:"Payment failed"})
    ]

    res.json({ success: true, data: statusResponse });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};


export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentMidtrans, verifyMidtrans };
