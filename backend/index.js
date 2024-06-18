const express = require("express");
const { createServer } = require("node:http");
const IO = require("socket.io")
const app = express();
const server = createServer(app);
const io = IO(server);
const { join } = require("node:path");
const frontendPath = "C:\\Users\\Paul\\Documents\\GitHub\\simple-chat\\frontend\\"; // TODO: make less retarded
const port = 3000;
const host = "0.0.0.0";

// Temp testing stuff
let online = []

// Static stuff
app.use(express.static('frontend'))

// Util functions
function handleMessage(msg) {
    io.emit("chatupdate", msg);
};

// Routes
app.get("/", (req, res) => {
    res.sendFile(join(frontendPath, "index.html"));
});

// Socket logic
io.on("connection", (socket) => {
    console.log("New socket connected!");
    socket.on('disconnect', () => {
        console.log('A socket disconnected!');
      });
    socket.on("chatmsg", (msg) => {
        handleMessage(msg);
    });
    socket.on("settingupdate", (msg) => {
        online.push(msg.username);
        console.log(online);
        // Inform frontend
        io.emit("onlineupdate", online);
    });
  
});

server.listen(port, host, () => {
    console.log(`Backend running on ${host}:${port}...`)
});