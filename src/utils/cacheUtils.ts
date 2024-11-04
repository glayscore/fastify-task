import { redisClient } from '../db';

export async function getCache(key: string): Promise<string | null> {
  return redisClient.get(key);
}

export async function setCache(key: string, value: string, expiration: number): Promise<void> {
  await redisClient.setEx(key, expiration, value);
}