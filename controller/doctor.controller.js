import Doctor from "../models/doctor.model.js"
import jwt from 'jsonwebtoken'
export const SignUp = (req,res,next)=>{
    const email = req.body.email;
    const payload = {email};
    const secretKey = "asjdflasjdfasjkfldoctor";
    const token = jwt.sign(payload,secretKey)
    Doctor.create(req.body).then(result=>{
        return res.status(200).json({ message: "User Sign up successfully...", doctor: result,token })
    }).catch(err=>{
        console.log(err);
        return res.status(401).json({message:"Internal server error..."})
    });
};


export const SignIn = async (request, response, next) => {
    // console.log(req.body)
    try {
        let doctor = await Doctor.findOne({ contact: request.body.contact });
        if(doctor){
            return doctor ? Doctor.checkPassword(request.body.password, doctor.password) ? res.status(200).json({ message: "doctor Sign In successfully...", doctor: result })
                : response.status(401).json({ error: "Bad request (Invalid password)" })
                : response.status(401).json({ error: "Bad request (Unauthorized user)" });
        }
       return  response.status(401).json({ error: "Bad request (Unauthorized user)" });
    }
    catch (err) {
        return response.status(500).json({ error: "Internal server error" });
    }
}
