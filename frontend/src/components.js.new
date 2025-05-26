import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Plus, 
  Info, 
  Search, 
  Bell, 
  User, 
  Coins, 
  Gift, 
  Star, 
  Share2, 
  Calendar, 
  Target, 
  Award, 
  Lock,
  Heart,
  Volume2,
  BookOpen,
  Gamepad2,
  ChevronRight,
  ChevronLeft,
  X,
  Check,
  Shield,
  Zap,
  Users,
  Radio,
  MapPin,
  Flame,
  Skull,
  Compass,
  Wrench,
  Brain,
  Eye,
  MessageSquare,
  AlertTriangle,
  Headphones,
  Video,
  Mic,
  Globe
} from 'lucide-react';

// Enhanced Business Ecosystem Data for ThriveChaos
// Mock Coach/Entrepreneur Profiles
const mockCoaches = [
  {
    id: "coach_001",
    name: "Sarah Revolution",
    title: "Survival Skills Master",
    communities: ["Urban Survival Academy", "Off-Grid Living Pro"],
    subscribers: 2847,
    monthlyRevenue: 8940,
    mlmLevel: 5,
    downlineCount: 147,
    totalCommissions: 3240,
    avatar: "https://images.unsplash.com/photo-1615709972711-574e9f76f37d?w=200",
    bio: "Former military survival instructor teaching urban and wilderness survival",
    specialties: ["Urban survival", "Water procurement", "Shelter building"],
    subscriptionPlan: "pro",
    joinDate: "2023-08-15",
    badge: "verified"
  },
  {
    id: "coach_002", 
    name: "Marcus CryptoSage",
    title: "Financial Freedom Coach",
    communities: ["Crypto Rebels Elite", "DeFi Masters", "Investment Sanctuary"],
    subscribers: 5623,
    monthlyRevenue: 18760,
    mlmLevel: 7,
    downlineCount: 312,
    totalCommissions: 7890,
    avatar: "https://images.unsplash.com/photo-1606512741416-fb5bbceaa4e2?w=200",
    bio: "Helping rebels achieve financial independence through crypto and DeFi",
    specialties: ["Cryptocurrency", "DeFi protocols", "Investment strategies"],
    subscriptionPlan: "empire",
    joinDate: "2023-06-10",
    badge: "elite"
  }
];

// Mock Subscription Data
const mockSubscriptions = [
  {
    id: "sub_001",
    userId: "coach_001",
    plan: "pro",
    status: "active",
    currentPeriodStart: "2024-01-01",
    currentPeriodEnd: "2024-02-01",
    amount: 79,
    currency: "USD",
    nextBilling: "2024-02-01"
  }
];

// Mock MLM Network Data
const mockMLMNetwork = {
  userId: "coach_001",
  totalDownline: 147,
  activeDownline: 89,
  levels: [
    { level: 1, count: 12, commission: 89.40 },
    { level: 2, count: 24, commission: 127.20 },
    { level: 3, count: 31, commission: 98.60 },
    { level: 4, count: 28, commission: 56.80 },
    { level: 5, count: 22, commission: 34.50 },
    { level: 6, count: 18, commission: 18.90 },
    { level: 7, count: 8, commission: 6.75 },
    { level: 8, count: 4, commission: 2.40 }
  ],
  monthlyCommissions: 435.55,
  totalCommissions: 3240.00,
  rank: "Chaos Commander"
};