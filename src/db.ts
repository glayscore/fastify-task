import postgres from 'postgres';
import { createClient } from 'redis';
import { config } from './config';

export const sql = postgres({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

export const redisClient = createClient({
  url: `redis://${config.redis.host}:${config.redis.port}`,
});

redisClient.connect().catch(console.error);
