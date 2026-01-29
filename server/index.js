const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT 

const ws = require('ws')
const wss = new ws.WebSocketServer({port:8080})

wss.on('error', console.error);

wss.on('connection', (ws) => {
    console.log('a new client connected')
    ws.on('error', console.error); 
    ws.on('message', () => console.log('message') );
    ws.on('close', () => console.log('close'));
} )


