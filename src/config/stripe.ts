import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

if(!process.env.STRIPE_SECRET_KEY ) {
    throw new Error('missing stripe secret key in env');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-09-30.clover",
});