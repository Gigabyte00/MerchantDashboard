// lib/crypto/coinbase.ts
import axios from 'axios';
import { createHmac } from 'crypto';

const COINBASE_API = 'https://api.commerce.coinbase.com';
const COINBASE_API_VERSION = '2018-03-22';

interface CoinbaseCharge {
  id: string;
  name: string;
  pricing_type: string;
  local_price: {
    amount: string;
    currency: string;
  };
  metadata: {
    merchantId: string;
    [key: string]: unknown; // Allow other metadata fields
  };
  // Add other relevant charge properties
}

export const createCoinbaseCharge = async (data: {
  name: string;
  amount: number;
  merchantId: string;
  currency?: string; // Make currency optional, default to USD
  metadata?: Record<string, unknown>; // Allow additional metadata
}) => {
  try {
    const res = await axios.post<CoinbaseCharge>(
      `${COINBASE_API}/charges`,
      {
        name: data.name,
        pricing_type: 'fixed_price',
        local_price: {
          amount: data.amount.toFixed(2), // Ensure amount is formatted correctly
          currency: data.currency || 'USD',
        },
        metadata: {
          merchantId: data.merchantId,
          ...data.metadata, // Include additional metadata
        },
      },
      {
        headers: {
          'X-CC-Api-Key': process.env.COINBASE_API_KEY!,
          'X-CC-Version': COINBASE_API_VERSION,
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: unknown }; message?: string };
    console.error('Error creating Coinbase charge:', err.response?.data || err.message);
    throw new Error('Failed to create Coinbase charge');
  }
};

export const retrieveCoinbaseCharge = async (chargeId: string) => {
  try {
    const res = await axios.get<CoinbaseCharge>(
      `${COINBASE_API}/charges/${chargeId}`,
      {
        headers: {
          'X-CC-Api-Key': process.env.COINBASE_API_KEY!,
          'X-CC-Version': COINBASE_API_VERSION,
        },
      }
    );
    return res.data;
  } catch (error: unknown) {
    const err = error as { response?: { data?: unknown }; message?: string };
    console.error(`Error retrieving Coinbase charge ${chargeId}:`, err.response?.data || err.message);
    throw new Error(`Failed to retrieve Coinbase charge ${chargeId}`);
  }
};

export const verifyCoinbaseWebhookSignature = (
  rawBody: string,
  signature: string,
  webhookSecret: string
): boolean => {
  const hmac = createHmac('sha256', webhookSecret);
  hmac.update(rawBody);
  const generatedSignature = hmac.digest('hex');

  return generatedSignature === signature;
};