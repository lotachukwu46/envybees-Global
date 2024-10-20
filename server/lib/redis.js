import Redis from "ioredis";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create Redis connection
export const redis = new Redis(process.env.UPSTASH_REDIS_URL);
