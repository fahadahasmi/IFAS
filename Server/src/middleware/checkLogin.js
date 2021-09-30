require('dotenv').config();
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env
const checkLogin = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).json({ error: "Unauthorized access, please use a valid token." });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET_KEY);
        req.user = data.user;
        next();
    } catch (err) {
        res.status(401).json({ error: "Unauthorized access, please use a valid token." });
    }

}

module.exports = checkLogin;