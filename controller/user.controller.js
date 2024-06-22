import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';


export const SignUp = (req,res,next)=>{
    const email = req.body.email;
    const payload = {email};
    const secretKey = "asjdflasjdfasjkfldoctor";
    const token = jwt.sign(payload,secretKey)
    User.create(req.body).then(result=>{
        return res.status(200).json({ message: "User Sign up successfully...", user: result,token })
    }).catch(err=>{
        console.log(err);
        return res.status(401).json({message:"Internal server error..."})
    });
};


export const SignIn = async (request, response, next) => {
    // console.log(req.body)
    try {
        let user = await User.findOne({ contact: request.body.contact });
        if(user){
            return user ? User.checkPassword(request.body.password, user.password) ? res.status(200).json({ message: "User Sign In successfully...", user: result })
                : response.status(401).json({ error: "Bad request (Invalid password)" })
                : response.status(401).json({ error: "Bad request (Unauthorized user)" });
        }
       return  response.status(401).json({ error: "Bad request (Unauthorized user)" });
    }
    catch (err) {
        return response.status(500).json({ error: "Internal server error" });
    }
}

export const findByEmail = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
    return   res.status(200).json({ user });
    } catch (err) {
      console.error(err);
     return res.status(401).json({ message: "Something went wrong" });
    }
  };

// Assuming you have required necessary modules and connected to MongoDB


export const updateUser = async (req, res) => {
    const { name, email, contact, userId } = req.body; 
    try {
        const user = await User.findByIdAndUpdate(userId, { name, email, contact }, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
      return  res.status(200).json({ user });
    } catch (error) {
        console.error('Error updating user:', error);
       return res.status(500).json({ error: 'An error occurred while updating the user' });
    }
};


export const updatePassword = async (req, res, next) => {
    try {
        const { email, password, newPassword } = req.body;
        console.log(email, password, newPassword);
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Unauthorized User..." });
        }
        const isPasswordCorrect = await user.checkPass(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Password does not match" });
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();
        return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
