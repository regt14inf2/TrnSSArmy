const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const config = process.env;

dotenv.config();

const verifyToken = (req, res, next) => {
    const tokenString = req.body.token || req.query.token || req.headers.authorization;
    const token = tokenString ? tokenString.split('Bearer ')[1] : undefined;

    if (!token) {
        return res.status(403).json("A token is required for authentication");
    }
    else{
        try {
            const verify = jwt.verify(token, config.TOKEN_KEY);
            req.user = verify;
        } catch (err) {
            return res.status(401).json("Invalid Token");
        }
    }
    return next();
};

module.exports = {verifyToken};