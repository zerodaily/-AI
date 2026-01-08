
export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  image?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year';
  features: string[];
  recommended?: boolean;
}

export enum AppRoute {
  HOME = 'home',
  CHAT = 'chat',
  PRICING = 'pricing',
  PROFILE = 'profile'
}

export type SubscriptionStatus = 'none' | 'monthly' | 'yearly';
