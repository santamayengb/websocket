const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 80 });

wss.on('connection', (ws, req) => {
  // ... (existing code)

  ws.on('message', (data) => {
    

    // Convert the binary data to a string (assuming it's in UTF-8 encoding)
    const textData = data.toString('utf8');

    try {
      // Parse the text data as JSON
      const jsonData = JSON.parse(textData);

      console.log(`Received JSON: ${JSON.stringify(jsonData)}`);

      // Broadcast the received JSON to all connected clients
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          // Convert the JSON back to a string to send it as a message
          const jsonString = JSON.stringify(jsonData);

        //   {
        //     "name": "relay4",
        //     "state": false,
        //     "id": 4,
        //     "isONTimerActive": false,
        //     "isOFFTimerActive": false,
        //     "onTimer": "1:30",
        //     "offTimer": "2:45"
        // }
          client.send(jsonString);
          console.log(jsonString);
        }
      });
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
