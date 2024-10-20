import Stripe from "stripe";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create Stripe instance with secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
