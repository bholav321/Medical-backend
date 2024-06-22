import jwt from 'jsonwebtoken';

export const VerifyToken = (req, res, next) => {
    const secretKey = "asjdflasjdfasjkfldoctor";
    try {
        // let token = req.headers.authorization;
        // token = token.split(" ")[1];
        const token = req.body.token;
        jwt.verify(token, secretKey);
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Unathorized User access..." })
    }
}