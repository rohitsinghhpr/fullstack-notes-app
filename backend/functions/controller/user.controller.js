const dotenv = require("dotenv");
dotenv.config();
const User = require("../model/user.model.js");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const bcrypt = require('bcryptjs');

class UserController {
    static async createUser(req, res) {
        try {
            // getting fields from request
            const { name, email, password } = req.body;
            // field checking
            if (name == null || undefined) {
                // 400 - bad request
                return res.type('text/json').status(400).send(JSON.stringify({
                    message: "Name field required.",
                }));
            }
            else if (email == null || undefined) {
                // 400 - bad request
                return res.type('text/json').status(400).send(JSON.stringify({
                    message: "Email field required.",
                }));
            }
            else if (password == null || undefined) {
                // 400 - bad request
                return res.type('text/json').status(400).send(JSON.stringify({
                    message: "Password field required.",
                }));
            }

            // already exit or not 
            let user = await User.findOne({ email: email });
            if (user) {
                // 409 - confilict
                return res.type('text/json').status(409).send(JSON.stringify({
                    message: `User already exists with ${email}.`,
                }))
            }
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashPassword = await bcrypt.hash(password, salt);
            user = new User({ name, email, password: hashPassword });
            await user.save();
            return res.type('text/json').status(201).send({
                message: "User created successfully.",
            });
        } catch (error) {
            // 500 internal server error
            res.type('text/json').status(500).send({
                message: "Server error",
            });
        }
    }
    // ---------------------------------------------------------------------------------
    static async readUser(req, res) {
        try {
            // getting fields from request
            const { email, password } = req.body;
            if (email == null || undefined) {
                // 400 - bad request
                return res.type('text/json').status(400).send(JSON.stringify({
                    message: "Email field required.",
                }));
            }
            else if (password == null || undefined) {
                // 400 - bad request
                return res.type('text/json').status(400).send(JSON.stringify({
                    message: "Password field required.",
                }));
            }
            const user = await User.findOne({ email: email });
            // not exit
            if (!user) {
                // 400 - bad request
                return res.type('text/json').status(400).send(JSON.stringify({
                    message: "Please provide valid credential, email does not match",
                }));
            }
            // password matching
            const passResult = await bcrypt.compare(password, user.password);
            if (!passResult) {
                // 400 - bad request
                return res.type('text/json').status(400).send(JSON.stringify({
                    message: "Please provide valid credential, password does not match",
                }));
            }
            // token generating
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY);
            // 200 - ok
            return res.type('text/json').status(200).send(JSON.stringify({
                message: "Login successful",
                user: {
                    name: user.name,
                    email: user.email
                },
                token
            }));
        } catch (error) {
            // 500 internal server error
            res.type('text/json').status(500).send({
                message: "Server error",
            });
        }
    }
}
module.exports = UserController;