export const config = {
    db: {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'fastify_db',
    },
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
    },
    skinport: {
      apiUrl: process.env.SKINPORT_API_URL || 'https://api.skinport.com/v1/items',
      appId: process.env.SKINPORT_APP_ID || '730',
      currency: process.env.SKINPORT_CURRENCY || 'USD',
    },
};
