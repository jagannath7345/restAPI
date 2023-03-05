const express = require("express");
const { createNote, getNote, updateNote, deleteNote } = require("../controller/noteController");
const userAuth = require("../middleware/userAuth");
const noteRoutes = express.Router();

noteRoutes.get('/', userAuth, getNote)
noteRoutes.post('/', userAuth, createNote)
noteRoutes.put('/:id', userAuth, updateNote)
noteRoutes.delete('/:id', userAuth, deleteNote)

module.exports = noteRoutes;