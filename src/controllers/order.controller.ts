import { Request, Response } from 'express';
import Order from '../models/order.model';
import { stripe } from '../config/stripe';

export const createOrder = async (req: Request, res: Response) => {
    try{
        const { products, totalAmount } = req.body;

        if(!products || !totalAmount) {
            return res.status(400).json({ message: 'Products and total amount are required' });
        }
        const userId = (req as any ).user._id;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(totalAmount * 100), // amount in cents
            currency: 'usd',
            metadata: { userId: userId.toString(), },
        });

        const order = await Order.create({
            user: userId,
            products,
            totalAmount,
            paymentStatus: 'pending',
            paymentIntentId: paymentIntent.id,
        })

        return res.status (201).json ({
            message: 'Order created successfully',
            order,
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

export const confirmpayment = async (req: Request, res: Response) => {
    try{
        const { paymentIntentId } = req.body;
        if(!paymentIntentId) {
            return res.status(400).json({ message: 'Payment Intent ID is required' });
        }

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if(paymentIntent.status === 'succeeded') {
            await Order.findOneAndUpdate(
                { paymentIntentId },
                { paymentStatus: 'paid' },
                { new: true }
            );

            return res.status(200).json({ message: 'Payment confirmed and order updated' });
        } else {
            return res.status(400).json({ message: 'Payment not successful' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}