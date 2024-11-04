import Fastify from 'fastify';
import { sql, redisClient } from './db.js';
import { authRoutes } from './routes/authRoutes.js';
import { itemRoutes } from './routes/itemRoutes.js';
import { purchaseRoutes } from './routes/purchaseRoutes.js';

const server = Fastify({ logger: true });

server.register(authRoutes, { prefix: '/auth' });
server.register(itemRoutes, { prefix: '/api' });
server.register(purchaseRoutes, { prefix: '/api' });

server.get('/', async (request, reply) => {
  reply.send({ message: 'Hello, Fastify!' });
});

const start = async () => {
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server listening on http://localhost:3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
