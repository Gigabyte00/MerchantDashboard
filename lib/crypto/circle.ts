import axios from 'axios';
import crypto from 'crypto';

const CIRCLE_API = 'https://api.circle.com/v1/payments'; // Use the correct Circle API endpoint

export const createCirclePayment = async (data: {
  amount: {
    amount: string;
    currency: string;
  };
  metadata: {
    merchantId: string;
    invoiceId?: string;
    notes?: string;
  };
  idempotencyKey: string; // Required for idempotency
  source: {
    type: string; // e.g., 'card', 'blockchain'
    id: string; // Token or wallet address
  };
  verification: string; // e.g., 'cvv'
}) => {
  const res = await axios.post(
    CIRCLE_API,
    data,
    {
      headers: {
        'Authorization': `Bearer ${process.env.CIRCLE_API_KEY!}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return res.data;
};

export const getCirclePayment = async (paymentId: string) => {
  const res = await axios.get(
    `${CIRCLE_API}/${paymentId}`,
    {
      headers: {
        'Authorization': `Bearer ${process.env.CIRCLE_API_KEY!}`,
      },
    }
  );
  return res.data;
};

export const verifyCircleWebhookSignature = (payload: string, signature: string, secret: string): boolean => {
  const [timestamp, sig] = signature.split(',');
  if (!timestamp || !sig) {
    return false;
  }
  const message = `${timestamp}.${payload}`;
  const expectedSig = crypto.createHmac('sha256', secret).update(message).digest('hex');
  return sig === expectedSig;
};

// You might need other functions depending on Circle's API capabilities,
// such as refunding payments, listing payments, etc.