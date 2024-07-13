const express = require('express');
const app = express();
const path = require('path');
const port = 4000;

// CORS middleware with restricted access
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow only from Server A
    res.header('Access-Control-Allow-Methods', 'GET'); // Restrict to only GET
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Add Authorization header
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Middleware to check for the secret token
app.use('/file', (req, res, next) => {
    const secretToken = 'af2aac6e8c58aa10a8723d7800d8b0e3';
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader === `Bearer ${secretToken}`) {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
});

// Serve example.txt file
app.get('/file', (req, res) => {
    res.sendFile(path.join(__dirname, 'example.txt'));
});

app.listen(port, () => {
    console.log(`Server B listening at http://localhost:${port}`);
});
