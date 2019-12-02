const express = require('express');
const server = express();
const port = 5000;
const db = require('./data/db.js');

server.use(express.json());

// POST data
server.post('/api/users', (req, res) => {
    // get the data the client sent
    const userData = req.body;

    if (userData.hasOwnProperty('name') && userData.hasOwnProperty('bio')) {
        db.insert(userData)
            .then(data => {
                res.status(201).json(data);
            })
            .catch(err => {
                console.log("Unable to get data", err);
                res.status(500).json({ error: "There was an error while saving the user to the database" });
            });
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
});

// GET data
server.get('/api/users', (req, res) => {
    db.find()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            console.log("Unable to get data", err);
            res.status(500).json({ message: "The user with the specified ID does not exist." });
        })
});

// get from the root
server.get('/', (req, res) => {
    res.send('API running..');
});

server.listen(port, () => console.log(`Server running on port ${port}`));