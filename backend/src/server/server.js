const { createServer } = require('http');
const express = require('express');
const cors = require('cors');
const { MongoClient } = require("mongodb");
const path = require('path');
const bcrypt = require('bcrypt');
require("dotenv").config({path: "../config/.env"});

const app = express();
const hostname = 'localhost';
const port = 25565;

// Middleware
app.use(express.json());


// Add Register Route
app.post('/api/login', async (req, res) => {
    try {
        const { name, username, password } = req.body;
        if (!name || !username || !password) return res.status(400).json({ error: "All fields are required" });

        // Here you would normally check the database for user credentials
        const db = await getDb();
        const user = await db.collection('users').findOne({ username });

        const existingUser = await db.collection('users').findOne({ username });
        if (existingUser) return res.status(400).json({ error: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const doc = { name, username, password: hashedPassword, createdAt: new Date()};
        await users.insertOne(doc);

        res.status(201).json({ success: true });
    } catch (err) {
        console.error("Error in /api/register:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});


/**
// test route

app.get('/', (req, res) =>{
    res.json({ message: "Welcome to the server!"});
});


// Serve static frontend files
app.use(express.static(path.join(__dirname, '../../../echo/public/src/pages/Login.jsx')))


// Example protected route (add more as needed)
// API routes

app.post('/api/login', (req, res) => {
    // Handle login logic here
    res.json({ success: true});
});

// Catch-all: serve index.html fir React routing
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../../../echo/public/src/pages/login', 'index.html'));
})


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});



const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, hostname, () => {
    console.log("Server running at http://" + hostname + ":" + port + "/");
});


*/
