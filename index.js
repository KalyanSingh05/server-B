const express = require('express');
const app = express();
const path = require('path');
const port = 4000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://your-server-a.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.get('/file', (req, res) => {
    res.sendFile(path.join(__dirname, 'example.txt'));
});

app.listen(port, () => {
    console.log(`Server B listening at http://localhost:${port}`);
});
