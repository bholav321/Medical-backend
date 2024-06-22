import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const doctorShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    specialty: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        trim: true,
        set: function(password){
            let saltKey = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(password,saltKey);
        }
    },
    address: {
        type: String,
        required: true,
    },
    workingHours: {
        type: String,
        required: true,
    },
},{versionKey: false});

const Doctor = mongoose.model("doctor",doctorShema);

Doctor.checkPassword = (password, encryptedPassword)=>{
  return bcrypt.compareSync(password,encryptedPassword);
}

export default Doctor;