import { FastifyReply, FastifyRequest } from 'fastify';
import { findUserByUsername, verifyPassword, updateUserPassword } from '../services/authService';
import bcrypt from 'bcryptjs';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import { sendErrorResponse } from '../utils/responseUtils';
import { AuthRequestBody } from '../types/requestTypes';

export async function loginHandler(request: FastifyRequest<{ Body: AuthRequestBody }>, reply: FastifyReply) {
  const { username, password } = request.body;

  const user = await findUserByUsername(username);
  if (!user) {
    request.log.info('Login failed: User not found');
    return sendErrorResponse(reply, 401, ERROR_MESSAGES.INVALID_CREDENTIALS);
  }

  const isValid = await verifyPassword(password!, user.password);
  if (!isValid) {
    request.log.info('Login failed: Incorrect password');
    return sendErrorResponse(reply, 401, ERROR_MESSAGES.INVALID_CREDENTIALS);
  }

  return reply.send({ message: 'Login successful' });
}

export async function changePasswordHandler(request: FastifyRequest<{ Body: AuthRequestBody }>, reply: FastifyReply) {
  const { username, currentPassword, newPassword } = request.body;

  if (currentPassword === newPassword) {
    return sendErrorResponse(reply, 400, ERROR_MESSAGES.PASSWORDS_MATCH);
  }

  const user = await findUserByUsername(username);
  if (!user) {
    return sendErrorResponse(reply, 404, ERROR_MESSAGES.USER_NOT_FOUND);
  }

  const isValid = await verifyPassword(currentPassword!, user.password);
  if (!isValid) {
    return sendErrorResponse(reply, 401, ERROR_MESSAGES.INCORRECT_CURRENT_PASSWORD);
  }

  const hashedNewPassword = await bcrypt.hash(newPassword!, 10);
  await updateUserPassword(username, hashedNewPassword);

  return reply.send({ message: 'Password updated successfully' });
}
