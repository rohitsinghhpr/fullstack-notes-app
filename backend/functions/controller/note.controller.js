const Note = require("../model/note.model.js");

class NoteController {
  static async createNote(req, res) {
    try {
      // getting fields from request
      const { title, content } = req.body;
      const id = req.user.id;
      const note = new Note({ title, content, createdBy: id });
      const result = await note.save();
      // res 
      res.type('application/json').status(200).json({
        message:"Note created",
        note: {
          _id: result._id,
          title: result.title,
          content: result.content,
          complete: result.complete,
          createdAt: result.createdAt,
          updatedAt: result.updatedAt
        },
      });
    } catch (error) {
      res.type('application/json').status(500).send({
        message: "Server Error",
      });
    }
  }
  // -------------------------------------------
  static async readNotes(req, res) {
    try {
      // getting fields from request
      const id = req.user.id;
      const notes = await Note.find({ createdBy: id }, "-createdBy -__v").exec();
      res.type('application/json').status(200).json({
        notes:notes.reverse(),
        size:notes.length
      });
    } catch (error) {
      res.type('application/json').status(500).send({
        message: "Server Error",
      });
    }
  }
  // -------------------------------------------
  static async readByIdNote(req, res) {
    try {
      // getting fields from request para 
      const noteID = req.params.id;
      const note = await Note.findById(noteID, "-createdBy -__v").exec();
      res.type('application/json').status(200).send({ note });
    } catch (error) {
      res.type('application/json').status(500).send({
        message: "Server Error",
      });
    }
  }
  // -------------------------------------------
  static async updateNote(req, res) {
    try {
      // getting fields from request para 
      const noteID = req.params.id;
      const { title, content } = req.body;
      await Note.findByIdAndUpdate(noteID, { title, content });
      const note = await Note.findById(noteID, "-createdBy -__v").exec();
      res.type('application/json').status(200).send({
        message: "Updated Successfully",
        note
      }); // exclue - "-createdBy -__v" ...pending.
    } catch (error) {
      res.type('application/json').status(500).send({
        message: "Server Error",
      });
    }
  }
  // -------------------------------------------
  static async deleteNote(req, res) {
    try {
      // getting fields from request para 
      const noteID = req.params.id;
      const note = await Note.findByIdAndDelete(noteID);
      res.type('application/json').status(200).send({
        message: "Deleted Successfully",
        note
      });
    } catch (error) {
      res.type('application/json').status(500).send({
        message: "Server Error",
      });
    }
  }
}
module.exports = NoteController;