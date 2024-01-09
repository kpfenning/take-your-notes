const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); 

let notes = [];

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));
});

app.get('/api/notes', (req,res) => {
    fs.readFile(path.join(__dirname, 'Develop/db/db.json'), (err,data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({error});
        }
        const notes = JSON.parse(data);
        res.json(notes);
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});






