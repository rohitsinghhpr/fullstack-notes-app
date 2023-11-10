const express = require("express");
const serverless = require("serverless-http");
const connectDB = require("./db/connection.js");
const UserController = require("./controller/user.controller.js");
const NoteController = require("./controller/note.controller.js");
const cors = require("./middleware/cors.js");
const auth = require("./middleware/auth.js");

// connecting to database
connectDB();

const App = express();
const router = express.Router();

// config
App.use(cors);
App.use(express.json());

// entery point
router.get("/",(_,res)=>{
    res.type("application/json").status(200).json({
        "hi":"entry point hit"
    });
});
// user routes
router.post("/signup",UserController.createUser); // signup
router.post("/login",UserController.readUser); // login
// notes routes
router.get("/notes",auth,NoteController.readNotes);
router.get("/notes/:id",auth,NoteController.readByIdNote);
router.post("/notes",auth,NoteController.createNote);
router.put("/notes/:id",auth,NoteController.updateNote);
router.delete("/notes/:id",auth,NoteController.deleteNote);

App.use("/api",router);

module.exports.handler = serverless(App);