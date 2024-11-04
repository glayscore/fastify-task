import { sql } from '../db';
import { hashPassword, comparePasswords } from '../utils/passwordUtils';
import { User } from '../types/userTypes';

export async function findUserByUsername(username: string): Promise<User | undefined> {
  const result = await sql<User[]>`SELECT * FROM users WHERE username = ${username}`;
  return result[0];
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return comparePasswords(password, hashedPassword);
}

export async function updateUserPassword(username: string, newPassword: string): Promise<void> {
  const hashedPassword = await hashPassword(newPassword);
  await sql`UPDATE users SET password = ${hashedPassword} WHERE username = ${username}`;
}
