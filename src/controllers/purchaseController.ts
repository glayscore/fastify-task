import { FastifyRequest, FastifyReply } from 'fastify';
import { purchaseItem } from '../services/purchaseService';
import { sendErrorResponse } from '../utils/responseUtils';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import { PurchaseRequestBody } from '../types/purchaseTypes';

export async function purchaseHandler(request: FastifyRequest<{ Body: PurchaseRequestBody }>, reply: FastifyReply) {
  const { userId, itemId } = request.body;

  try {
    const result = await purchaseItem(userId, itemId);
    reply.send({ message: 'Purchase successful', newBalance: result.newBalance });
  } catch (error) {
    request.log.error('Error completing purchase:', error);
    sendErrorResponse(reply, 400, ERROR_MESSAGES.FAILED_TO_COMPLETE_PURCHASE);
  }
}
