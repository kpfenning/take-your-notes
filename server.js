const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); 

let notes = [];

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req,res) => {
    fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err,data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'error'});
        }
        const notes = JSON.parse(data);
        res.json(notes);
    });
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();

    fs.readFile(path.join(__dirname, '/db/db.json'),'utf8', (err,data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'error'});
        }
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(notes), (err) => {
            if(err) {
                console.error(err);
                return res.status(500).json({ message: 'error'});
            }
            res.json(newNote);
        })
    });
});

app.delete('/api/notes/:id', (req,res) => {
    const noteId = req.params.id;

    fs.readFile(path.join(__dirname, '/db/db.json'), 'utf8', (err,data) => {
        if(err) {
            console.error(err);
            return res.status(500).json({ message: 'error'});
        }
        const notes = JSON.parse(data);
        const index = notes.findIndex((note) => note.id === noteId);

        if (index !== -1) {
            const deleteNote = notes.splice(index,1) [0];

            fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(notes), (err) => {
                if(err) {
                    console.error(err);
                    return res.status(500).json({ message: 'error'});
                }
                res.json(deleteNote);
            }
            );   
    } else {
        res.status(404).json({ message: "No note found"});
    }
    });
});

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});







