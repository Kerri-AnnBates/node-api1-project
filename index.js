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
            .then(user => {
                res.status(201).json(user);
            })
            .catch(err => {
                console.log("Unable to get data", err);
                res.status(500).json({ error: "There was an error while saving the user to the database" });
            });
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }
});

// GET all users.
server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.end(); // ?
            res.status(500).json({ message: "The user with the specified ID does not exist." });
        })
});

// GET by id.
server.get('/api/users/:id', (req, res) => {
    // Get the id to GET
    const id = req.params.id;
    db.findById(id)
        .then(user => {
            if(user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.end();
            res.status(500).json({ error: "The user information could not be retrieved." });
        })
})

// DELETE user.
server.delete('/api/users/:id', (req, res) => {
    // get id for user to delete
    const id = req.params.id;
    db.remove(id)
        .then(user => {
            if(user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res.end();
            res.status(500).json({ error: "The user information could not be retrieved." });
        })
})

// get from the root
server.get('/', (req, res) => {
    res.send('API running..');
});

server.listen(port, () => console.log(`Server running on port ${port}`));