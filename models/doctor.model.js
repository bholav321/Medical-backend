import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const doctorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        set: function(password) {
            let saltKey = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(password, saltKey);
        },
        required: true
    },
    email: {
        type: String,
        trim: true,
    },
    contact: {
        type: String, 
        trim: true,
    },
    DOB: {
        type: Date, 
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    address: {
        type: String,
        trim: true,
        required: true
    },
    branch: {
        type: String,
        enum: ['Cardiology', 'Dermatology', 'Endocrinology', 'Gastroenterology', 'Neurology', 'Orthopedics', 'Pediatrics'],
        required: true
    }
}, { versionKey: false });
const Doctor = mongoose.model("doctor",doctorSchema);

Doctor.checkPassword = (password, encryptedPassword)=>{
  return bcrypt.compareSync(password,encryptedPassword);
}

export default Doctor;