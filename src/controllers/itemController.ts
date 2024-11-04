import { FastifyReply, FastifyRequest } from 'fastify';
import { getMinPrices } from '../services/itemService';
import { sendErrorResponse } from '../utils/responseUtils';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import { Item } from '../types/itemTypes';

export async function getItemsHandler(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  try {
    const items: Item[] = await getMinPrices();
    request.log.info('Items retrieved successfully');
    reply.send(items);
  } catch (error) {
    request.log.error('Error retrieving items:', error);
    sendErrorResponse(reply, 500, ERROR_MESSAGES.FAILED_TO_RETRIEVE_ITEMS);
  }
}
