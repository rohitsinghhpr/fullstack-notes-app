const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
    try {
        // getting token from request headers
        const token = req.headers.authorization.split(" ")[1];
        // extracting the user name from this token
        const user = jwt.verify(token, process.env.SECRET_KEY);
        // passing the username to the endpoints
        req.user = user;
        next();
    } catch (error) {
        res.type('application/json').status(401).send({
            message: "Invalid Requeset!",
        });
    }
}
module.exports = auth;