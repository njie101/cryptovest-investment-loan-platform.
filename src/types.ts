export type UserRole = 'user' | 'admin';

export type KycStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

export type TransactionType = 'deposit' | 'withdrawal' | 'profit' | 'loan_disbursal' | 'loan_repayment' | 'investment_stake';

export type TransactionStatus = 'pending' | 'approved' | 'completed' | 'rejected';

export interface KycData {
  fullName: string;
  idType: 'passport' | 'driver_license' | 'national_id';
  idNumber: string;
  country: string;
  documentFrontUrl?: string;
  documentBackUrl?: string;
  submittedAt: string;
  rejectionReason?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  type: TransactionType;
  amount: number;
  cryptoAsset: string; // BTC, ETH, USDT, SOL
  cryptoAmount?: number;
  status: TransactionStatus;
  date: string;
  txHash?: string;
  destinationAddress?: string;
  notes?: string;
}

export interface InvestmentPlan {
  id: string;
  name: string;
  minDeposit: number;
  maxDeposit: number;
  roiPercentage: number;
  durationDays: number;
  payoutFrequency: 'Daily' | 'Weekly' | 'Monthly';
  features: string[];
  popular?: boolean;
}

export interface UserInvestment {
  id: string;
  userId: string;
  planId: string;
  planName: string;
  amountInvested: number;
  roiPercentage: number;
  totalProfitEarned: number;
  startDate: string;
  endDate: string;
  status: 'pending' | 'active' | 'completed' | 'rejected';
  nextPayoutDate: string;
  paymentMethod?: 'balance' | 'crypto_deposit';
  cryptoAsset?: string;
  depositAddress?: string;
  txHash?: string;
  approvedAt?: string;
  rejectionReason?: string;
}

export interface TicketMessage {
  id: string;
  senderRole: 'user' | 'admin';
  senderName: string;
  message: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  category: 'Deposit' | 'Withdrawal' | 'Investment' | 'Account/KYC' | 'Technical' | 'General';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'open' | 'in_progress' | 'replied' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
}

export interface CryptoLoan {
  id: string;
  userId: string;
  userName: string;
  requestedAmount: number;
  collateralAsset: string; // BTC, ETH, SOL
  collateralAmount: number;
  durationMonths: number;
  interestRateAnnual: number;
  status: 'pending' | 'approved' | 'active' | 'repaid' | 'rejected';
  requestedAt: string;
  repayByDate?: string;
  approvedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  balanceUsdt: number;
  totalProfit: number;
  totalInvested: number;
  activeLoanBalance: number;
  kycStatus: KycStatus;
  kycData?: KycData;
  createdAt: string;
  walletAddresses?: {
    btc?: string;
    eth?: string;
    usdt?: string;
    sol?: string;
  };
}

export interface CryptoPrice {
  symbol: string;
  name: string;
  priceUsd: number;
  change24h: number;
  icon: string;
  depositAddress: string;
}
