import { createBareServer } from '@tomphttp/bare-server-node';
import { createServer } from 'node:http';

const bare = createBareServer('/bare/');

const server = createServer();

server.on('request', (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Bare Server – Not Found');
  }
});

server.on('upgrade', (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Bare v2 ON en puerto ${PORT} – Listo para UV 2025`);
});
