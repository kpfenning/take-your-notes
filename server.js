const express = require('express');
const path = require('path');
const fs = require('fs');
const generateId = require('generate-unique-id');

const app = express();
const PORT = process.env.PORT || 3001;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); 

let notes = [];






