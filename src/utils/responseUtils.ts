import { FastifyReply } from 'fastify';

export const sendErrorResponse = (reply: FastifyReply, status: number, message: string) => {
  reply.status(status).send({ error: message });
};
