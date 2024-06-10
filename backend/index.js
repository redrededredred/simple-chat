const express = require("express");
const { createServer } = require("node:http");
const app = express();
const server = createServer(app);
const port = 3000;
const host = "127.0.0.1";

// Routes
app.get("/", (req, res) => {
    res.send("<h1>Test</h1>")
});

server.listen(port, host, () => {
    console.log(`Backend running on ${host}:${port}...`)
});