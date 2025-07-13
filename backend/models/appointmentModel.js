import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const appointmentSchema = new mongoose.Schema({
  appointmentId: {
    type: String,
    default: () => nanoid(10),
    unique: true,
    required: true
  },
  userId: { type: String, required: true },
  psikologId: { type: String, required: true },
  slotDate: { type: String, required: true , maxlength: 20},
  slotTime: { type: String, required: true, maxlength: 20 }, 
  userData: { type: Object, required: true },
  psikologData: { type: Object, required: true },
  amount: { type: Object, required: true },
  date: { type: Number, required: true, maxlength: 20 },
  cancelled: { type: Boolean, default: false },
  payment: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false }
});

const appointmentModel =
  mongoose.models.appointment || mongoose.model('appointment', appointmentSchema);

export default appointmentModel;
