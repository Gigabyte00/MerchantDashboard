import type { NextApiRequest, NextApiResponse } from 'next';
import { createCoinbaseCharge } from '@/lib/crypto/coinbase';
import { createCircleCharge } from '@/lib/crypto/circle';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { merchantId, amount, currency, provider } = req.body;

  if (!merchantId || !amount || !currency || !provider) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    let charge;
    if (provider === 'coinbase') {
      charge = await createCoinbaseCharge({ name: `Payment for ${merchantId}`, amount, merchantId });
    } else if (provider === 'circle') {
      // Assuming createCircleCharge function exists in '@/lib/crypto/circle'
      // and accepts similar parameters
      charge = await createCircleCharge({ amount, currency, merchantId });
    } else {
      return res.status(400).json({ message: 'Invalid provider specified' });
    }

    res.status(200).json(charge);
  } catch (error) {
    console.error('Error creating charge:', error);
    res.status(500).json({ message: 'Error creating charge' });
  }
}