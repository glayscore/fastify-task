import { FastifyInstance } from 'fastify';
import { loginHandler, changePasswordHandler } from '../controllers/authController';

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/login', loginHandler);
  fastify.post('/change-password', changePasswordHandler);
}
