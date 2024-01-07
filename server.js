const express = require('express');
const path = require('path');
const fs = require('fs');
const generateId = require('generate-unique-id');

const app = express();
const PORT = process.env.PORT || 3001;

const { notes } = require('./Develop/db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});


app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});
