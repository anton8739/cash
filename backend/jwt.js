require('dotenv').config()
const jwt = require("jsonwebtoken");
const config = require('config')
const generateAccessToken = (username) => {
   // return jwt.sign(username, "anton8379anton8739", { expiresIn: '1800s' });
    return jwt.sign({username}, process.env.JWT_SECRET,{ expiresIn: '1h' })
}
const validateToken = (token) => {
    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded) {
            return true
        } else {
            return false
        }
    } catch(err) {
        return false
    }

}
module.exports = {generateAccessToken, validateToken};