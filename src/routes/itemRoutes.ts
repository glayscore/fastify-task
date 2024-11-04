import { FastifyInstance } from 'fastify';
import { getItemsHandler } from '../controllers/itemController';

export async function itemRoutes(fastify: FastifyInstance) {
  fastify.get('/items', getItemsHandler);
}
