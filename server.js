import { WebSocketServer } from 'ws';
import http from 'http';

// Cria um servidor HTTP simples
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('WebSocket server is running\n');
});

// Cria um servidor WebSocket e o anexa ao servidor HTTP
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  // Envia uma mensagem de boas-vindas ao novo cliente
  ws.send('Bem-vindo ao CatMessenger! 🐈😺');

  // Lida com mensagens recebidas dos clientes
  ws.on('message', (message) => {
    // Envia a mensagem recebida para todos os clientes conectados
    wss.clients.forEach(client => {
      if (client.readyState === client.OPEN) {
        client.send(message);
      }
    });
  });

  // Lida com a desconexão dos clientes
  ws.on('close', () => {
    console.log('Conexão WebSocket encerrada');
  });
});

// Inicia o servidor na porta 8080
server.listen(8080);
