import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
 
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Retrieve unsynced crypto transactions from the database
    const unsyncedTransactions = await prisma.cryptoTransaction.findMany({
      where: {
        OR: [
          { syncedToQB: false },
          { syncedToNetSuite: false },
        ],
        status: 'confirmed', // Only sync confirmed transactions
      },
    });

 if (unsyncedTransactions.length === 0) {
 return res.status(200).json({ message: 'No confirmed unsynced transactions to process' });
 }

 // Since we are no longer syncing to QuickBooks or NetSuite in this endpoint,
 // we can simply return the list of unsynced transactions that meet the criteria.
 // Further processing or syncing to accounting systems should happen elsewhere.

    const syncResults = unsyncedTransactions.map((transaction: any) => ({ id: transaction.id, status: 'awaiting_accounting_sync' }));

    res.status(200).json({ message: 'Sync process completed', results: syncResults });

  } catch (error) {
    console.error('Error during sync process:', error);
    res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
  } finally {
    await prisma.$disconnect();
  }
}