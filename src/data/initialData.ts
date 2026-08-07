import { CryptoPrice, InvestmentPlan, User, Transaction, UserInvestment, CryptoLoan, SupportTicket } from '../types';

export const INITIAL_CRYPTO_PRICES: CryptoPrice[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    priceUsd: 87450.00,
    change24h: 3.42,
    icon: '₿',
    depositAddress: 'bc1q9v83f4k2lx7z9p0m1n2b3c4v5x6z7a8b9c0d1e'
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    priceUsd: 3420.50,
    change24h: 1.85,
    icon: 'Ξ',
    depositAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'
  },
  {
    symbol: 'USDT',
    name: 'Tether (TRC20)',
    priceUsd: 1.00,
    change24h: 0.01,
    icon: '₮',
    depositAddress: 'TYDzsY22A3YqS3K87C2e9W9jM1Vq3xL4pZ'
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    priceUsd: 184.20,
    change24h: 5.12,
    icon: '◎',
    depositAddress: '7Xw9k1n2m3b4v5c6x7z8a9b0c1d2e3f4g5h6j7k8'
  }
];

export const INVESTMENT_PLANS: InvestmentPlan[] = [
  {
    id: 'plan_starter',
    name: 'Starter Yield',
    minDeposit: 250,
    maxDeposit: 2499,
    roiPercentage: 8.5,
    durationDays: 7,
    payoutFrequency: 'Daily',
    features: [
      '8.5% Total Profit in 7 Days',
      'Daily Automatic Payouts',
      'Principal Return at Term End',
      '24/7 Dedicated Support',
      'Instant Withdrawal Access'
    ]
  },
  {
    id: 'plan_growth',
    name: 'Growth Portfolio',
    minDeposit: 2500,
    maxDeposit: 9999,
    roiPercentage: 18.0,
    durationDays: 14,
    payoutFrequency: 'Daily',
    popular: true,
    features: [
      '18% Total ROI in 14 Days',
      'Daily Profit Crediting',
      'Capital Guaranteed Security',
      'Priority Admin Processing',
      'Zero Performance Fees'
    ]
  },
  {
    id: 'plan_vip',
    name: 'VIP Institutional',
    minDeposit: 10000,
    maxDeposit: 250000,
    roiPercentage: 42.0,
    durationDays: 30,
    payoutFrequency: 'Daily',
    features: [
      '42% Total ROI in 30 Days',
      'Compound Interest Re-investment',
      'Personal Portfolio Wealth Manager',
      'Instant Express Withdrawals',
      'Eligible for 0% Interest Loans'
    ]
  }
];

export const DEMO_USERS: User[] = [
  {
    id: 'usr_demo',
    name: 'Alex Rivera',
    email: 'user@cryptovest.io',
    password: 'user123',
    role: 'user',
    balanceUsdt: 12450.00,
    totalProfit: 2380.50,
    totalInvested: 5000.00,
    activeLoanBalance: 0.00,
    kycStatus: 'pending',
    createdAt: '2026-03-15T10:30:00Z',
    kycData: {
      fullName: 'Alex E. Rivera',
      idType: 'passport',
      idNumber: 'P98421092',
      country: 'United States',
      submittedAt: '2026-07-24T14:20:00Z',
      documentFrontUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80'
    }
  },
  {
    id: 'usr_admin',
    name: 'admin',
    email: 'admin@cryptovest.io',
    password: '10Million$@12345',
    role: 'admin',
    balanceUsdt: 500000.00,
    totalProfit: 0,
    totalInvested: 0,
    activeLoanBalance: 0,
    kycStatus: 'verified',
    createdAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'usr_sarah',
    name: 'Sarah Jenkins',
    email: 'sarah.j@gmail.com',
    password: 'user123',
    role: 'user',
    balanceUsdt: 8500.00,
    totalProfit: 1200.00,
    totalInvested: 3000.00,
    activeLoanBalance: 2500.00,
    kycStatus: 'verified',
    createdAt: '2026-04-10T11:00:00Z'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_101',
    userId: 'usr_demo',
    userName: 'Alex Rivera',
    userEmail: 'user@cryptovest.io',
    type: 'deposit',
    amount: 5000,
    cryptoAsset: 'USDT',
    status: 'completed',
    date: '2026-07-20T09:15:00Z',
    txHash: '0x8f2a4c11b23908fde732a00e9981a3',
    notes: 'Approved by Admin'
  },
  {
    id: 'tx_102',
    userId: 'usr_demo',
    userName: 'Alex Rivera',
    userEmail: 'user@cryptovest.io',
    type: 'investment_stake',
    amount: 5000,
    cryptoAsset: 'USDT',
    status: 'completed',
    date: '2026-07-21T10:00:00Z',
    notes: 'Staked in Growth Portfolio (14 Days)'
  },
  {
    id: 'tx_103',
    userId: 'usr_demo',
    userName: 'Alex Rivera',
    userEmail: 'user@cryptovest.io',
    type: 'profit',
    amount: 320.50,
    cryptoAsset: 'USDT',
    status: 'completed',
    date: '2026-07-25T18:00:00Z',
    notes: 'Daily Plan Yield Credit'
  },
  {
    id: 'tx_104',
    userId: 'usr_demo',
    userName: 'Alex Rivera',
    userEmail: 'user@cryptovest.io',
    type: 'deposit',
    amount: 2500,
    cryptoAsset: 'BTC',
    cryptoAmount: 0.0285,
    status: 'pending',
    date: '2026-07-26T12:10:00Z',
    txHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f',
    notes: 'Awaiting Admin Hash Verification'
  },
  {
    id: 'tx_105',
    userId: 'usr_demo',
    userName: 'Alex Rivera',
    userEmail: 'user@cryptovest.io',
    type: 'withdrawal',
    amount: 800,
    cryptoAsset: 'USDT',
    status: 'pending',
    date: '2026-07-26T13:45:00Z',
    destinationAddress: 'TYDzsY22A3YqS3K87C2e9W9jM1Vq3xL4pZ',
    notes: 'Pending Admin Manual Payout'
  }
];

export const INITIAL_USER_INVESTMENTS: UserInvestment[] = [
  {
    id: 'inv_101',
    userId: 'usr_demo',
    planId: 'plan_growth',
    planName: 'Growth Portfolio',
    amountInvested: 5000,
    roiPercentage: 18.0,
    totalProfitEarned: 642.80,
    startDate: '2026-07-21T10:00:00Z',
    endDate: '2026-08-04T10:00:00Z',
    status: 'active',
    nextPayoutDate: '2026-07-27T10:00:00Z',
    paymentMethod: 'balance'
  },
  {
    id: 'inv_102',
    userId: 'usr_sarah',
    planId: 'plan_pro',
    planName: 'Pro Arbitrage Tier',
    amountInvested: 10000,
    roiPercentage: 25.0,
    totalProfitEarned: 0,
    startDate: '2026-07-26T14:00:00Z',
    endDate: '2026-08-16T14:00:00Z',
    status: 'pending',
    nextPayoutDate: '2026-07-27T14:00:00Z',
    paymentMethod: 'crypto_deposit',
    cryptoAsset: 'USDT',
    depositAddress: 'TYDzsY22A3YqS3K87C2e9W9jM1Vq3xL4pZ',
    txHash: '0x99a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4'
  }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'tkt_101',
    userId: 'usr_demo',
    userName: 'Alex Rivera',
    userEmail: 'user@cryptovest.io',
    subject: 'Assigned Wallet Address Confirmation for USDT Deposit',
    category: 'Deposit',
    priority: 'High',
    status: 'replied',
    createdAt: '2026-07-25T11:00:00Z',
    updatedAt: '2026-07-25T14:30:00Z',
    messages: [
      {
        id: 'msg_1',
        senderRole: 'user',
        senderName: 'Alex Rivera',
        message: 'Hello Admin team, I am planning to stake $5,000 USDT into the Growth Portfolio. Can you confirm my assigned deposit wallet address?',
        createdAt: '2026-07-25T11:00:00Z'
      },
      {
        id: 'msg_2',
        senderRole: 'admin',
        senderName: 'Support Agent',
        message: 'Hello Alex! Your assigned USDT TRC20 wallet address has been configured in your account deposit tab. You can submit the deposit directly or choose direct staking deposit. Let us know if you need any assistance!',
        createdAt: '2026-07-25T14:30:00Z'
      }
    ]
  },
  {
    id: 'tkt_102',
    userId: 'usr_sarah',
    userName: 'Sarah Jenkins',
    userEmail: 'sarah.j@gmail.com',
    subject: 'Investment Stake Verification Request',
    category: 'Investment',
    priority: 'Medium',
    status: 'open',
    createdAt: '2026-07-26T15:10:00Z',
    updatedAt: '2026-07-26T15:10:00Z',
    messages: [
      {
        id: 'msg_3',
        senderRole: 'user',
        senderName: 'Sarah Jenkins',
        message: 'Hi, I just submitted a deposit of $10,000 USDT for the Pro Arbitrage Tier with transaction hash 0x99a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4. Please approve my stake.',
        createdAt: '2026-07-26T15:10:00Z'
      }
    ]
  }
];

export const INITIAL_CRYPTO_LOANS: CryptoLoan[] = [
  {
    id: 'loan_101',
    userId: 'usr_sarah',
    userName: 'Sarah Jenkins',
    requestedAmount: 2500,
    collateralAsset: 'ETH',
    collateralAmount: 1.2,
    durationMonths: 6,
    interestRateAnnual: 4.5,
    status: 'active',
    requestedAt: '2026-07-10T08:00:00Z',
    repayByDate: '2027-01-10T08:00:00Z',
    approvedAt: '2026-07-11T09:30:00Z'
  }
];
