import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Transaction,
  UserInvestment,
  CryptoLoan,
  CryptoPrice,
  KycData,
  InvestmentPlan,
  SupportTicket,
  TicketMessage
} from '../types';
import {
  DEMO_USERS,
  INITIAL_TRANSACTIONS,
  INITIAL_USER_INVESTMENTS,
  INITIAL_CRYPTO_LOANS,
  INITIAL_CRYPTO_PRICES,
  INVESTMENT_PLANS,
  INITIAL_TICKETS
} from '../data/initialData';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  transactions: Transaction[];
  investments: UserInvestment[];
  loans: CryptoLoan[];
  cryptoPrices: CryptoPrice[];
  investmentPlans: InvestmentPlan[];
  tickets: SupportTicket[];
  activePage: 'home' | 'services' | 'about' | 'contact' | 'dashboard' | 'admin';
  dashboardTab: 'overview' | 'investments' | 'loans' | 'deposit' | 'withdraw' | 'kyc' | 'history' | 'tickets';
  adminTab: 'overview' | 'deposits' | 'withdrawals' | 'kyc' | 'loans' | 'users' | 'plans' | 'tickets';
  isAuthModalOpen: boolean;
  authMode: 'login' | 'register';
  
  // Navigation & UI controls
  setActivePage: (page: 'home' | 'services' | 'about' | 'contact' | 'dashboard' | 'admin') => void;
  setDashboardTab: (tab: 'overview' | 'investments' | 'loans' | 'deposit' | 'withdraw' | 'kyc' | 'history' | 'tickets') => void;
  setAdminTab: (tab: 'overview' | 'deposits' | 'withdrawals' | 'kyc' | 'loans' | 'users' | 'plans' | 'tickets') => void;
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  switchDemoRole: (role: 'user' | 'admin') => void;

  // Investment Plans Admin Management
  updateInvestmentPlan: (updatedPlan: InvestmentPlan) => void;
  addInvestmentPlan: (newPlan: Omit<InvestmentPlan, 'id'>) => void;
  deleteInvestmentPlan: (planId: string) => void;

  // Deposit Addresses Management
  updateUserWalletAddresses: (userId: string, walletAddresses: { btc?: string; eth?: string; usdt?: string; sol?: string }) => void;
  updateCryptoDepositAddress: (symbol: string, depositAddress: string) => void;

  // Auth
  login: (email: string, password?: string) => boolean;
  register: (name: string, email: string, password?: string) => boolean;
  logout: () => void;

  // User Actions
  submitKyc: (data: Omit<KycData, 'submittedAt'>) => void;
  requestDeposit: (amount: number, asset: string, txHash?: string) => void;
  requestWithdrawal: (amount: number, asset: string, destinationAddress: string) => { success: boolean; message: string };
  stakeInvestment: (
    planId: string,
    amount: number,
    paymentMethod?: 'balance' | 'crypto_deposit',
    cryptoAsset?: string,
    txHash?: string,
    depositAddress?: string
  ) => { success: boolean; message: string };
  requestLoan: (requestedAmount: number, collateralAsset: string, collateralAmount: number, durationMonths: number) => void;

  // Support Tickets
  createSupportTicket: (
    subject: string,
    category: SupportTicket['category'],
    priority: SupportTicket['priority'],
    message: string
  ) => { success: boolean; message: string };
  replyToTicket: (ticketId: string, messageText: string, senderRole: 'user' | 'admin') => void;
  updateTicketStatus: (ticketId: string, status: SupportTicket['status']) => void;

  // Admin Actions
  approveDeposit: (txId: string) => void;
  rejectDeposit: (txId: string, reason?: string) => void;
  approveInvestmentStake: (investmentId: string) => void;
  rejectInvestmentStake: (investmentId: string, reason?: string) => void;
  approveWithdrawal: (txId: string) => void;
  rejectWithdrawal: (txId: string, reason?: string) => void;
  approveKyc: (userId: string) => void;
  rejectKyc: (userId: string, reason: string) => void;
  approveLoan: (loanId: string) => void;
  rejectLoan: (loanId: string) => void;
  addProfitToUser: (userId: string, profitAmount: number, notes?: string) => void;
  updateUserBalance: (userId: string, newBalance: number) => void;
  updateUserLoanBalance: (userId: string, newLoanBalance: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('cv_users');
    const loadedUsers: User[] = saved ? JSON.parse(saved) : DEMO_USERS;
    return loadedUsers.map(u => {
      if (u.role === 'admin' || u.id === 'usr_admin') {
        return {
          ...u,
          name: 'admin',
          email: 'admin@cryptovest.io',
          password: '10Million$@12345'
        };
      }
      return u;
    });
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('cv_current_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.role === 'admin' || parsed.id === 'usr_admin') {
        return {
          ...parsed,
          name: 'admin',
          email: 'admin@cryptovest.io',
          password: '10Million$@12345'
        };
      }
      return parsed;
    }
    return DEMO_USERS[0]; // Default logged-in demo user
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('cv_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [investments, setInvestments] = useState<UserInvestment[]>(() => {
    const saved = localStorage.getItem('cv_investments');
    return saved ? JSON.parse(saved) : INITIAL_USER_INVESTMENTS;
  });

  const [loans, setLoans] = useState<CryptoLoan[]>(() => {
    const saved = localStorage.getItem('cv_loans');
    return saved ? JSON.parse(saved) : INITIAL_CRYPTO_LOANS;
  });

  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>(() => {
    const saved = localStorage.getItem('cv_crypto_prices');
    return saved ? JSON.parse(saved) : INITIAL_CRYPTO_PRICES;
  });
  const [investmentPlans, setInvestmentPlans] = useState<InvestmentPlan[]>(() => {
    const saved = localStorage.getItem('cv_investment_plans');
    return saved ? JSON.parse(saved) : INVESTMENT_PLANS;
  });

  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem('cv_tickets');
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });

  const [activePage, setActivePage] = useState<'home' | 'services' | 'about' | 'contact' | 'dashboard' | 'admin'>('home');
  const [dashboardTab, setDashboardTab] = useState<'overview' | 'investments' | 'loans' | 'deposit' | 'withdraw' | 'kyc' | 'history' | 'tickets'>('overview');
  const [adminTab, setAdminTab] = useState<'overview' | 'deposits' | 'withdrawals' | 'kyc' | 'loans' | 'users' | 'plans' | 'tickets'>('overview');

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // URL route parsing on initial load and navigation
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search;
      const pathname = window.location.pathname;
      const hash = window.location.hash;

      if (search.includes('page=admin') || pathname.includes('/admin') || hash === '#admin') {
        setActivePage('admin');
      } else if (search.includes('page=dashboard') || pathname.includes('/dashboard') || hash === '#dashboard') {
        setActivePage('dashboard');
      }
    }
  }, []);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('cv_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('cv_current_user', JSON.stringify(currentUser));
      // Keep currentUser state in sync with updated users array
      const found = users.find(u => u.id === currentUser.id);
      if (found && JSON.stringify(found) !== JSON.stringify(currentUser)) {
        setCurrentUser(found);
      }
    } else {
      localStorage.removeItem('cv_current_user');
    }
  }, [users, currentUser]);

  useEffect(() => {
    localStorage.setItem('cv_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('cv_investments', JSON.stringify(investments));
  }, [investments]);

  useEffect(() => {
    localStorage.setItem('cv_loans', JSON.stringify(loans));
  }, [loans]);

  useEffect(() => {
    localStorage.setItem('cv_tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('cv_investment_plans', JSON.stringify(investmentPlans));
  }, [investmentPlans]);

  useEffect(() => {
    localStorage.setItem('cv_crypto_prices', JSON.stringify(cryptoPrices));
  }, [cryptoPrices]);

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  const switchDemoRole = (role: 'user' | 'admin') => {
    const target = users.find(u => u.role === role);
    if (target) {
      setCurrentUser(target);
      if (role === 'admin') {
        setActivePage('admin');
      } else {
        setActivePage('dashboard');
      }
    }
  };

  const login = (emailOrUsername: string, passwordInput?: string): boolean => {
    const cleanInput = emailOrUsername.trim().toLowerCase();
    const found = users.find(
      u =>
        u.email.toLowerCase() === cleanInput ||
        u.name.toLowerCase() === cleanInput ||
        (cleanInput === 'admin' && u.role === 'admin')
    );

    if (found) {
      if (passwordInput && found.password && found.password !== passwordInput) {
        return false;
      }
      setCurrentUser(found);
      closeAuthModal();
      if (found.role === 'admin') {
        setActivePage('admin');
      } else {
        setActivePage('dashboard');
      }
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password?: string): boolean => {
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return false; // Email exists
    }
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name,
      email,
      password: password || 'user123',
      role: 'user',
      balanceUsdt: 0,
      totalProfit: 0,
      totalInvested: 0,
      activeLoanBalance: 0,
      kycStatus: 'unverified',
      createdAt: new Date().toISOString()
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    closeAuthModal();
    setActivePage('dashboard');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setActivePage('home');
  };

  const submitKyc = (data: Omit<KycData, 'submittedAt'>) => {
    if (!currentUser) return;
    const fullKyc: KycData = {
      ...data,
      submittedAt: new Date().toISOString()
    };

    setUsers(prev =>
      prev.map(u => {
        if (u.id === currentUser.id) {
          return {
            ...u,
            kycStatus: 'pending',
            kycData: fullKyc
          };
        }
        return u;
      })
    );
  };

  const requestDeposit = (amount: number, asset: string, txHash?: string) => {
    if (!currentUser) return;
    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      type: 'deposit',
      amount,
      cryptoAsset: asset,
      status: 'pending',
      date: new Date().toISOString(),
      txHash: txHash || `0x${Math.random().toString(16).substring(2, 18)}`,
      notes: 'Submitted deposit awaiting admin review'
    };

    setTransactions(prev => [newTx, ...prev]);
  };

  const requestWithdrawal = (amount: number, asset: string, destinationAddress: string) => {
    if (!currentUser) return { success: false, message: 'Please login first' };
    if (currentUser.balanceUsdt < amount) {
      return { success: false, message: 'Insufficient balance available for withdrawal' };
    }

    // Deduct balance or reserve
    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      type: 'withdrawal',
      amount,
      cryptoAsset: asset,
      status: 'pending',
      date: new Date().toISOString(),
      destinationAddress,
      notes: 'Withdrawal requested, pending admin clearance'
    };

    // Deduct immediately from balance to prevent double request
    setUsers(prev =>
      prev.map(u => {
        if (u.id === currentUser.id) {
          return { ...u, balanceUsdt: u.balanceUsdt - amount };
        }
        return u;
      })
    );

    setTransactions(prev => [newTx, ...prev]);
    return { success: true, message: 'Withdrawal request submitted successfully' };
  };

  const stakeInvestment = (
    planId: string,
    amount: number,
    paymentMethod: 'balance' | 'crypto_deposit' = 'balance',
    cryptoAsset: string = 'USDT',
    txHash?: string,
    depositAddress?: string
  ) => {
    if (!currentUser) return { success: false, message: 'Please login first' };
    const plan = investmentPlans.find(p => p.id === planId);
    if (!plan) return { success: false, message: 'Invalid plan selected' };

    if (amount < plan.minDeposit || amount > plan.maxDeposit) {
      return { success: false, message: `Investment amount must be between $${plan.minDeposit.toLocaleString()} and $${plan.maxDeposit.toLocaleString()}` };
    }

    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + plan.durationDays * 24 * 60 * 60 * 1000);
    const nextPayout = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);

    if (paymentMethod === 'crypto_deposit') {
      const newInv: UserInvestment = {
        id: `inv_${Date.now()}`,
        userId: currentUser.id,
        planId: plan.id,
        planName: plan.name,
        amountInvested: amount,
        roiPercentage: plan.roiPercentage,
        totalProfitEarned: 0,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        status: 'pending',
        nextPayoutDate: nextPayout.toISOString(),
        paymentMethod: 'crypto_deposit',
        cryptoAsset,
        depositAddress,
        txHash
      };

      const newTx: Transaction = {
        id: `tx_${Date.now()}`,
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        type: 'investment_stake',
        amount,
        cryptoAsset,
        status: 'pending',
        date: new Date().toISOString(),
        txHash,
        notes: `Pending Investment Deposit for ${plan.name}`
      };

      setInvestments(prev => [newInv, ...prev]);
      setTransactions(prev => [newTx, ...prev]);

      return {
        success: true,
        message: `Investment deposit of $${amount.toLocaleString()} USDT for ${plan.name} submitted! Pending Admin verification.`
      };
    } else {
      if (currentUser.balanceUsdt < amount) {
        return { success: false, message: 'Insufficient USDT balance to complete stake. Please deposit first or select direct crypto deposit.' };
      }

      const newInv: UserInvestment = {
        id: `inv_${Date.now()}`,
        userId: currentUser.id,
        planId: plan.id,
        planName: plan.name,
        amountInvested: amount,
        roiPercentage: plan.roiPercentage,
        totalProfitEarned: 0,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        status: 'active',
        nextPayoutDate: nextPayout.toISOString(),
        paymentMethod: 'balance'
      };

      const newTx: Transaction = {
        id: `tx_${Date.now()}`,
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        type: 'investment_stake',
        amount,
        cryptoAsset: 'USDT',
        status: 'completed',
        date: new Date().toISOString(),
        notes: `Staked in ${plan.name} (${plan.durationDays} Days)`
      };

      setUsers(prev =>
        prev.map(u => {
          if (u.id === currentUser.id) {
            return {
              ...u,
              balanceUsdt: u.balanceUsdt - amount,
              totalInvested: u.totalInvested + amount
            };
          }
          return u;
        })
      );

      setInvestments(prev => [newInv, ...prev]);
      setTransactions(prev => [newTx, ...prev]);

      return { success: true, message: `Successfully staked $${amount.toLocaleString()} into ${plan.name}!` };
    }
  };

  const approveInvestmentStake = (investmentId: string) => {
    const inv = investments.find(i => i.id === investmentId);
    if (!inv || inv.status !== 'pending') return;

    setInvestments(prev =>
      prev.map(i => {
        if (i.id === investmentId) {
          return {
            ...i,
            status: 'active',
            approvedAt: new Date().toISOString()
          };
        }
        return i;
      })
    );

    setUsers(prev =>
      prev.map(u => {
        if (u.id === inv.userId) {
          return { ...u, totalInvested: u.totalInvested + inv.amountInvested };
        }
        return u;
      })
    );

    setTransactions(prev =>
      prev.map(t => {
        if (t.userId === inv.userId && t.type === 'investment_stake' && t.status === 'pending' && t.amount === inv.amountInvested) {
          return { ...t, status: 'completed', notes: 'Approved & Active Investment Stake' };
        }
        return t;
      })
    );
  };

  const rejectInvestmentStake = (investmentId: string, reason?: string) => {
    const inv = investments.find(i => i.id === investmentId);
    if (!inv) return;

    setInvestments(prev =>
      prev.map(i => {
        if (i.id === investmentId) {
          return {
            ...i,
            status: 'rejected',
            rejectionReason: reason || 'Investment deposit rejected by Admin'
          };
        }
        return i;
      })
    );

    setTransactions(prev =>
      prev.map(t => {
        if (t.userId === inv.userId && t.type === 'investment_stake' && t.status === 'pending' && t.amount === inv.amountInvested) {
          return { ...t, status: 'rejected', notes: reason || 'Investment deposit rejected' };
        }
        return t;
      })
    );
  };

  const createSupportTicket = (
    subject: string,
    category: SupportTicket['category'],
    priority: SupportTicket['priority'],
    message: string
  ) => {
    if (!currentUser) return { success: false, message: 'Please login first' };
    const now = new Date().toISOString();
    const newTicket: SupportTicket = {
      id: `tkt_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      subject,
      category,
      priority,
      status: 'open',
      createdAt: now,
      updatedAt: now,
      messages: [
        {
          id: `msg_${Date.now()}`,
          senderRole: currentUser.role,
          senderName: currentUser.name,
          message,
          createdAt: now
        }
      ]
    };

    setTickets(prev => [newTicket, ...prev]);
    return { success: true, message: 'Support ticket submitted! An admin will review and reply shortly.' };
  };

  const replyToTicket = (ticketId: string, messageText: string, senderRole: 'user' | 'admin') => {
    const now = new Date().toISOString();
    const senderName = senderRole === 'admin' ? 'Support Agent' : (currentUser?.name || 'Client');

    setTickets(prev =>
      prev.map(t => {
        if (t.id === ticketId) {
          const newMsg: TicketMessage = {
            id: `msg_${Date.now()}`,
            senderRole,
            senderName,
            message: messageText,
            createdAt: now
          };
          const newStatus = senderRole === 'admin' ? 'replied' : 'in_progress';
          return {
            ...t,
            status: newStatus,
            updatedAt: now,
            messages: [...t.messages, newMsg]
          };
        }
        return t;
      })
    );
  };

  const updateTicketStatus = (ticketId: string, status: SupportTicket['status']) => {
    setTickets(prev =>
      prev.map(t => {
        if (t.id === ticketId) {
          return { ...t, status, updatedAt: new Date().toISOString() };
        }
        return t;
      })
    );
  };

  const requestLoan = (requestedAmount: number, collateralAsset: string, collateralAmount: number, durationMonths: number) => {
    if (!currentUser) return;
    const newLoan: CryptoLoan = {
      id: `loan_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      requestedAmount,
      collateralAsset,
      collateralAmount,
      durationMonths,
      interestRateAnnual: 5.5,
      status: 'pending',
      requestedAt: new Date().toISOString()
    };

    setLoans(prev => [newLoan, ...prev]);
  };

  // ADMIN ACTIONS
  const approveDeposit = (txId: string) => {
    const tx = transactions.find(t => t.id === txId);
    if (!tx || tx.status !== 'pending') return;

    // Credit user balance
    setUsers(prev =>
      prev.map(u => {
        if (u.id === tx.userId) {
          return { ...u, balanceUsdt: u.balanceUsdt + tx.amount };
        }
        return u;
      })
    );

    setTransactions(prev =>
      prev.map(t => {
        if (t.id === txId) {
          return { ...t, status: 'completed', notes: 'Approved and credited by Admin' };
        }
        return t;
      })
    );
  };

  const rejectDeposit = (txId: string, reason?: string) => {
    setTransactions(prev =>
      prev.map(t => {
        if (t.id === txId) {
          return { ...t, status: 'rejected', notes: reason || 'Deposit rejected by Admin' };
        }
        return t;
      })
    );
  };

  const approveWithdrawal = (txId: string) => {
    setTransactions(prev =>
      prev.map(t => {
        if (t.id === txId) {
          return { ...t, status: 'completed', notes: 'Withdrawal processed & broadcasted by Admin' };
        }
        return t;
      })
    );
  };

  const rejectWithdrawal = (txId: string, reason?: string) => {
    const tx = transactions.find(t => t.id === txId);
    if (!tx) return;

    // Refund user balance since it was deducted on request
    setUsers(prev =>
      prev.map(u => {
        if (u.id === tx.userId) {
          return { ...u, balanceUsdt: u.balanceUsdt + tx.amount };
        }
        return u;
      })
    );

    setTransactions(prev =>
      prev.map(t => {
        if (t.id === txId) {
          return { ...t, status: 'rejected', notes: reason || 'Withdrawal rejected & refunded by Admin' };
        }
        return t;
      })
    );
  };

  const approveKyc = (userId: string) => {
    setUsers(prev =>
      prev.map(u => {
        if (u.id === userId) {
          return { ...u, kycStatus: 'verified' };
        }
        return u;
      })
    );
  };

  const rejectKyc = (userId: string, reason: string) => {
    setUsers(prev =>
      prev.map(u => {
        if (u.id === userId) {
          return {
            ...u,
            kycStatus: 'rejected',
            kycData: u.kycData ? { ...u.kycData, rejectionReason: reason } : undefined
          };
        }
        return u;
      })
    );
  };

  const approveLoan = (loanId: string) => {
    const loan = loans.find(l => l.id === loanId);
    if (!loan) return;

    // Disburse loan funds directly into user USDT balance & set active loan debt
    setUsers(prev =>
      prev.map(u => {
        if (u.id === loan.userId) {
          return {
            ...u,
            balanceUsdt: u.balanceUsdt + loan.requestedAmount,
            activeLoanBalance: u.activeLoanBalance + loan.requestedAmount
          };
        }
        return u;
      })
    );

    // Update loan status
    setLoans(prev =>
      prev.map(l => {
        if (l.id === loanId) {
          return {
            ...l,
            status: 'active',
            approvedAt: new Date().toISOString(),
            repayByDate: new Date(Date.now() + loan.durationMonths * 30 * 24 * 60 * 60 * 1000).toISOString()
          };
        }
        return l;
      })
    );

    // Record loan disbursal transaction
    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      userId: loan.userId,
      userName: loan.userName,
      userEmail: users.find(u => u.id === loan.userId)?.email || '',
      type: 'loan_disbursal',
      amount: loan.requestedAmount,
      cryptoAsset: 'USDT',
      status: 'completed',
      date: new Date().toISOString(),
      notes: `Loan Disbursed by Admin ($${loan.requestedAmount})`
    };

    setTransactions(prev => [newTx, ...prev]);
  };

  const rejectLoan = (loanId: string) => {
    setLoans(prev =>
      prev.map(l => {
        if (l.id === loanId) {
          return { ...l, status: 'rejected' };
        }
        return l;
      })
    );
  };

  const addProfitToUser = (userId: string, profitAmount: number, notes?: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    setUsers(prev =>
      prev.map(u => {
        if (u.id === userId) {
          return {
            ...u,
            balanceUsdt: u.balanceUsdt + profitAmount,
            totalProfit: u.totalProfit + profitAmount
          };
        }
        return u;
      })
    );

    // Log transaction
    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      type: 'profit',
      amount: profitAmount,
      cryptoAsset: 'USDT',
      status: 'completed',
      date: new Date().toISOString(),
      notes: notes || 'Manual Profit Addition by Admin'
    };

    setTransactions(prev => [newTx, ...prev]);
  };

  const updateUserBalance = (userId: string, newBalance: number) => {
    setUsers(prev =>
      prev.map(u => {
        if (u.id === userId) {
          return { ...u, balanceUsdt: newBalance };
        }
        return u;
      })
    );
  };

  const updateUserLoanBalance = (userId: string, newLoanBalance: number) => {
    setUsers(prev =>
      prev.map(u => {
        if (u.id === userId) {
          return { ...u, activeLoanBalance: newLoanBalance };
        }
        return u;
      })
    );
  };

  const updateInvestmentPlan = (updatedPlan: InvestmentPlan) => {
    setInvestmentPlans(prev =>
      prev.map(p => (p.id === updatedPlan.id ? updatedPlan : p))
    );
  };

  const addInvestmentPlan = (newPlanData: Omit<InvestmentPlan, 'id'>) => {
    const newPlan: InvestmentPlan = {
      ...newPlanData,
      id: `plan_${Date.now()}`
    };
    setInvestmentPlans(prev => [...prev, newPlan]);
  };

  const deleteInvestmentPlan = (planId: string) => {
    setInvestmentPlans(prev => prev.filter(p => p.id !== planId));
  };

  const updateUserWalletAddresses = (
    userId: string,
    walletAddresses: { btc?: string; eth?: string; usdt?: string; sol?: string }
  ) => {
    setUsers(prev =>
      prev.map(u => {
        if (u.id === userId) {
          return {
            ...u,
            walletAddresses: {
              ...(u.walletAddresses || {}),
              ...walletAddresses
            }
          };
        }
        return u;
      })
    );
  };

  const updateCryptoDepositAddress = (symbol: string, depositAddress: string) => {
    setCryptoPrices(prev =>
      prev.map(c => (c.symbol.toUpperCase() === symbol.toUpperCase() ? { ...c, depositAddress } : c))
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        transactions,
        investments,
        loans,
        cryptoPrices,
        investmentPlans,
        tickets,
        activePage,
        dashboardTab,
        adminTab,
        isAuthModalOpen,
        authMode,
        setActivePage,
        setDashboardTab,
        setAdminTab,
        openAuthModal,
        closeAuthModal,
        switchDemoRole,
        updateInvestmentPlan,
        addInvestmentPlan,
        deleteInvestmentPlan,
        updateUserWalletAddresses,
        updateCryptoDepositAddress,
        login,
        register,
        logout,
        submitKyc,
        requestDeposit,
        requestWithdrawal,
        stakeInvestment,
        requestLoan,
        createSupportTicket,
        replyToTicket,
        updateTicketStatus,
        approveDeposit,
        rejectDeposit,
        approveInvestmentStake,
        rejectInvestmentStake,
        approveWithdrawal,
        rejectWithdrawal,
        approveKyc,
        rejectKyc,
        approveLoan,
        rejectLoan,
        addProfitToUser,
        updateUserBalance,
        updateUserLoanBalance
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
