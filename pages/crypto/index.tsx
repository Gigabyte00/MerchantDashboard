// pages/crypto/index.tsx
import React from 'react';
import CryptoTransactionTable from '../../components/CryptoTransactionTable';

const CryptoPaymentsPage = () => {
  // Mock data for demonstration - replace with actual data fetching
  const mockTransactions = [
    {
      id: '1',
      provider: 'Coinbase',
      status: 'Completed',
      amount: 0.5,
      currency: 'ETH',
      createdAt: '2023-10-15T10:30:00Z'
    },
    {
      id: '2',
      provider: 'Circle',
      status: 'Pending',
      amount: 100,
      currency: 'USDC',
      createdAt: '2023-10-14T15:45:00Z'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Crypto Payments</h2>
        <p className="text-muted-foreground">Manage your cryptocurrency transactions.</p>
      </div>
      <CryptoTransactionTable transactions={mockTransactions} />
    </div>
  );
};

export default CryptoPaymentsPage;