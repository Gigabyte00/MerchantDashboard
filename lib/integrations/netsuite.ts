// lib/integrations/netsuite.ts

import axios from 'axios';
// @ts-expect-error: No types for oauth-1.0a
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';

interface NetSuiteConfig {
  consumerKey: string;
  consumerSecret: string;
  tokenId: string;
  tokenSecret: string;
  accountId: string;
  restletUrl: string;
}

interface NetSuiteTransactionData {
  // Define the structure of the data your RESTlet expects
  amount: number;
  memo: string;
  currency: string;
  merchantId: string;
  transactionId: string;
}

const getNetSuiteOAuthHeader = (
  config: NetSuiteConfig,
  url: string,
  method: string
): string => {
  const oauth = new OAuth({
    consumer: {
      key: config.consumerKey,
      secret: config.consumerSecret,
    },
    signature_method: 'HMAC-SHA256',
    hash_function(base_string: string, key: string) {
      return crypto.createHmac('sha256', key).update(base_string).digest('base64');
    },
  });

  const request_data = {
    url: url,
    method: method,
    data: {
      // Add any parameters required for OAuth here, though often the data is in the body for POST
      oauth_nonce: oauth.generateNonce(),
      oauth_timestamp: oauth.getTimeStamp(),
      oauth_version: '1.0',
      oauth_signature_method: 'HMAC-SHA256',
    },
  };

  const token = {
    key: config.tokenId,
    secret: config.tokenSecret,
  };

  const authHeader = oauth.toHeader(oauth.authorize(request_data, token));
  return authHeader.Authorization;
};

export const syncToNetSuite = async (
  config: NetSuiteConfig,
  txData: NetSuiteTransactionData
): Promise<unknown> => {
  try {
    const url = config.restletUrl;
    const method = 'POST';

    const authorization = getNetSuiteOAuthHeader(config, url, method);

    const response = await axios({
      method: method,
      url: url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization,
      },
      data: txData,
    });

    // Assuming your RESTlet returns a success indicator or relevant data
    return response.data;

  } catch (error: unknown) {
    const err = error as { response?: { data?: unknown }; message?: string };
    console.error('Error syncing to NetSuite:', err.response?.data || err.message);
    throw error; // Re-throw the error for handling in the calling function
  }
};

// You might add other NetSuite related functions here, e.g., for fetching data if needed. 