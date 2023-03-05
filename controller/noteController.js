const noteModel = require("../models/noteModel");

const createNote = async (req, res) => {
  const { title, description } = req.body;
  try {
    const userNote = new noteModel({
      title: title,
      description: description,
      userId: req.userId,
    });
    await userNote.save();
    res.status(201).json(userNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
const getNote = async (req, res) => {
  try {
    const allNotes = await noteModel.find({ userId: req.userId });
    res.status(200).json(allNotes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
const updateNote = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  const newNotes = {
    title: title,
    description: description,
    userId: req.userId,
  };
  try {
    await noteModel.findByIdAndUpdate(id, newNotes, { new: true });
    res.status(200).json(newNotes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
const deleteNote = async(req, res) => {
    const id = req.params.id
    try {
        const notes = await noteModel.findByIdAndRemove(id);
        res.status(202).json(notes);
    } catch (error) {
        console.log(error);
    res.status(500).json({ message: "Something went wrong" }); 
    }
};

module.exports = { createNote, getNote, updateNote, deleteNote };
