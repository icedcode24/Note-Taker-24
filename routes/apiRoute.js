const router = require('express').Router();
const uuid = require('../helpers/uuid');
const fs = require('fs');
const util = require('util');
const allNotes = require('../bd/db.json');
const path = require('path');
const notesSaved = allNotes && allNotes.length ? allNotes : [];

// GET ALL NOTES
router.get('/notes', (req, res) => {
   res.json(notesSaved);
})

// SAVE NOTE
router.post('/notes', (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            id: uuid(),
            title,
            text,
        };
        // PUSH NEW NOTE INTO SAVED NOTES
        notesSaved.PUSH(newNote);
        const storedNote = JSON.stringify(notesSaved, null, 2);
        fs.writeFile('./db/db.json', storedNote, (err) => err
        ? console.error(err)
        : console.log(
            'succesful save!'
        )
        );
        const response = {
            status: 'success',
            body: newNote,
        };
        res.status(201).json(response);
    } else {
        res.status(500).json('error saving note');
    }

});
// DELETE NOTE
const deleteNote = (id, notesArr) => {
    for (let i = 0; i < notesArr.length; i++) {
        let note = notesArr[i];
        if (note.id == id) {
            notesArr.splice(i, 1);
            fs.writeFileSync('./db/db.json',JSON.stringify(notesArr, null, 2)
            );
            break;
        };
    };
};
router.delete('/notes/:id', (req, res) => {
    deleteNote(req.params.id, allNotes);
    res.json(true);

});
module.exports = router;
