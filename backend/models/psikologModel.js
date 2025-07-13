import mongoose from "mongoose";
import {nanoid} from 'nanoid'
 
const psikologSchema = new mongoose.Schema({
    psikologId: {
    type: String,
    default: () => nanoid(8), // contoh: "aB3dEfGh"
    unique: true,
    required: true
  },
    name: {type:String, required:true, maxlength: 30 },
    email: {type:String, required:true, unique:true, maxlength: 40},
    password: {type:String, required:true},
    image: {type:String, required:true},
    speciality: {type:String, required:true, maxlength: 20},
    degree: {type:String, required:true, maxlength: 20},
    experience: {type:String, required:true, maxlength: 10},
    about: {type:String, required:true, maxlength: 1500},
    available: {type:Boolean, default:true},
    fees: {type:Number, required:true},
    address: {type:Object, required:true},
    data: {type:Number, require:true},
    slots_booked: {type:Object, default:{}}
}, {minimize:false})

const psikologModel = mongoose.models.psikolog || mongoose.model('psikolog', psikologSchema)

export default psikologModel