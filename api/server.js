const express = require("express");
const server = express();

server.use(express.json());

module.exports = server;

let newId = 2;
let hobbits = [
    {
        id: 1,
        name: "Samwise"
    }
];

server.post("/api/hobbits", (req, res) => {
    if (req.body && req.body.name && typeof req.body.name === "string") {
        hobbits.push({ id: newId, name: req.body.name });
        newId++;
        res.status(201).json([newId-1]);
    } else {
        res.status(400).json({ error: "wrong format kiddo" });
    }
});

server.delete("/api/hobbits/:id", (req, res) => {
    let hobbitExists = false;
    let hobbitIndex = undefined;
    hobbits.forEach((hobbit, index) => {
        if (hobbit.id === parseInt(req.params.id)) {
            hobbitIndex = index;
            hobbitExists = true;
        }
    });

    if (hobbitExists) {
        hobbits.splice(hobbitIndex, 1);
        res.status(200).json(1);
    } else {
        res.status(404).json({ error: "that hobbit doesn't exist" });
    }
});