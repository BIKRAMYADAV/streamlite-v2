const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT 

const {generateUUID} = require('uuid')
// const uid = uuid();

const ws = require('ws')
const wss = new ws.WebSocketServer({port:8080})

//rooms object
const rooms = {};

wss.on('error', console.error);

wss.on('connection', (ws) => {
    console.log('a new client connected')
    ws.on('error', console.error); 
    ws.on('message', (msg) =>{
       const parsedmsg = JSON.parse(msg);
       if(parsedmsg.type === "create"){
        const roomId = generateUUID();
        rooms[roomId] = {
            host: ws,
            viewer: null 
        }
        ws.roomId = roomId
        ws.role = "host"
        ws.send(JSON.stringify({
            "type" : "room-created",
            "roomId" : roomId
        }))
       }else if(parsedmsg === "join"){

       }
    });
    ws.on('close', () => console.log('close'));
} )


