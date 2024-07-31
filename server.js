import { WebSocketServer } from 'ws';
import http from 'http';

// Cria um servidor HTTP simples
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Servidor WebSocket está em execução\n');
});

// Cria um servidor WebSocket e o anexa ao servidor HTTP
const wss = new WebSocketServer({ server });

// Define a função para lidar com novas conexões WebSocket
wss.on('connection', (ws) => {
  // Envia uma mensagem de boas-vindas ao novo cliente
  ws.send('Bem-vindo ao CatMessenger! 🐈😺');

  // Lida com mensagens recebidas dos clientes
  ws.on('message', (message) => {
    // Envia a mensagem recebida para todos os clientes conectados
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Lida com a desconexão dos clientes
  ws.on('close', () => {
    console.log('Conexão WebSocket encerrada');
  });

  // Lida com erros na conexão
  ws.on('error', (error) => {
    console.error(`Erro na conexão WebSocket: ${error.message}`);
  });
});

// Inicia o servidor na porta 8080
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
