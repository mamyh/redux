const auth = require("json-server-auth");
const jsonServer = require("json-server");
const express = require('express');
const http = require('http');
const app = express();

const server = http.createServer(app);
const io = require("socket.io")(server);
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 9000;

// Bind the router db to the app
app.db = router.db;

app.use(middlewares);

global.io = io;

const rules = auth.rewriter({
    users: 640,
    conversations: 660,
    messages: 660,
});

//response middleware

router.render = (req, res) => {
    const path = req.path;
    const method = req.method;
    
    if(path.includes('/conversations') && (method ==="POST" || method === "PATCH")){
        //emit the socket;
        io.emit('conversation',{
            body:res.locals.data
        })
    }
    if(path.includes('/messages') && (method ==="POST" || method === "PATCH")){
        //emit the socket
        io.emit('message',{
            body:res.locals.data
        })
    }
    res.json(res.locals.data)
  }
  

app.use(rules);
app.use(auth);
app.use(router);

server.listen(port);
