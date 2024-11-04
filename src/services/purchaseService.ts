import { sql } from '../db';
import { PurchaseResult, User, Item } from '../types/purchaseTypes';
import { ERROR_MESSAGES } from '../constants/errorMessages';

export async function purchaseItem(userId: number, itemId: number): Promise<PurchaseResult> {
  const [user] = await sql<User[]>`SELECT balance FROM users WHERE id = ${userId}`;
  const [item] = await sql<Item[]>`SELECT price, available FROM items WHERE id = ${itemId}`;

  if (!user || !item) {
    throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
  }

  if (!item.available) {
    throw new Error(ERROR_MESSAGES.ITEM_ALREADY_SOLD);
  }

  if (user.balance < item.price) {
    throw new Error(ERROR_MESSAGES.INSUFFICIENT_BALANCE);
  }

  const newBalance = user.balance - item.price;

  await sql.begin(async (tx) => {
    await tx`UPDATE users SET balance = ${newBalance} WHERE id = ${userId}`;
    await tx`UPDATE items SET available = FALSE WHERE id = ${itemId}`;
    await tx`INSERT INTO purchases (user_id, item_id, price) VALUES (${userId}, ${itemId}, ${item.price})`;
  });

  return { newBalance };
}
