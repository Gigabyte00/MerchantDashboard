import type { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

// You'll need to get your webhook secret from your Coinbase Commerce or Circle settings
const COINBASE_WEBHOOK_SECRET = process.env.COINBASE_WEBHOOK_SECRET!;
const CIRCLE_WEBHOOK_SECRET = process.env.CIRCLE_WEBHOOK_SECRET!;

export const config = {
  api: {
    bodyParser: false, // Disable body parsing to use the raw body for signature verification
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    // Handle signature header which can be string or string[]
    const sigHeader = req.headers['x-cc-webhook-signature'];
    const sig = Array.isArray(sigHeader) ? sigHeader[0] : sigHeader;
    
    if (!sig) {
      return res.status(400).json({ error: 'Missing webhook signature' });
    }

    // Get the raw body as Buffer
    const rawBody = await buffer(req);
    
    // Verify webhook signature (example for Coinbase Commerce)
    const expectedSig = crypto
      .createHmac('sha256', COINBASE_WEBHOOK_SECRET)
      .update(rawBody)
      .digest('hex');
    
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig))) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Parse the webhook payload
    const payload = JSON.parse(rawBody.toString());
    
    // Process the webhook based on the event type
    // Add your webhook processing logic here
    console.log('Webhook received:', payload);
    
    // Example: Handle different event types
    switch (payload.event?.type) {
      case 'charge:created':
        // Handle charge created
        break;
      case 'charge:confirmed':
        // Handle charge confirmed
        break;
      case 'charge:failed':
        // Handle charge failed
        break;
      default:
        console.log('Unhandled event type:', payload.event?.type);
    }

    return res.status(200).json({ received: true });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}