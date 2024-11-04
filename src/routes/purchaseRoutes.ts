import { FastifyInstance } from 'fastify';
import { purchaseHandler } from '../controllers/purchaseController';

export async function purchaseRoutes(fastify: FastifyInstance) {
  fastify.post('/purchase', purchaseHandler);
}
