import { createClient } from 'redis';

export const REDIS = async ()=>{
    const redisService = process.env.redis_service || 'redis'
    const redisPort = process.env.redis_port || 6379
    const client = await createClient({
        url: `redis://${redisService}:${redisPort}`
    })
      .on('error', err => console.log('Redis Client Error', err))
      .on('connect', () => console.log('Redis Client connected... '))

      .connect();
}