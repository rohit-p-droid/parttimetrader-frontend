"use client";

import { useAuth } from "@/lib/auth-context";
import { ProtectedRoute } from "@/components/protected-route";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  PieChart,
  Activity
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    {
      title: "Portfolio Value",
      value: "$124,532.45",
      change: "+12.5%",
      isPositive: true,
      icon: <DollarSign className="h-6 w-6" />
    },
    {
      title: "Today's P&L",
      value: "+$2,845.32",
      change: "+2.3%",
      isPositive: true,
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      title: "Active Positions",
      value: "15",
      change: "+3",
      isPositive: true,
      icon: <BarChart3 className="h-6 w-6" />
    },
    {
      title: "Win Rate",
      value: "73.2%",
      change: "+5.1%",
      isPositive: true,
      icon: <Activity className="h-6 w-6" />
    }
  ];

  const recentTrades = [
    { symbol: "AAPL", side: "BUY", quantity: 100, price: "$175.50", pnl: "+$245", time: "10:30 AM" },
    { symbol: "MSFT", side: "SELL", quantity: 50, price: "$420.25", pnl: "+$180", time: "11:15 AM" },
    { symbol: "GOOGL", side: "BUY", quantity: 25, price: "$2,850.00", pnl: "-$125", time: "12:00 PM" },
    { symbol: "TSLA", side: "SELL", quantity: 75, price: "$245.80", pnl: "+$320", time: "2:45 PM" },
  ];

  const topPositions = [
    { symbol: "AAPL", shares: 500, value: "$87,750", pnl: "+$4,250", percentage: "35.2%" },
    { symbol: "MSFT", shares: 200, value: "$84,050", pnl: "+$2,100", percentage: "33.7%" },
    { symbol: "GOOGL", shares: 50, value: "$142,500", pnl: "+$1,250", percentage: "15.8%" },
    { symbol: "NVDA", shares: 150, value: "$38,250", pnl: "+$850", percentage: "15.3%" },
  ];

  return (
    <ProtectedRoute>
      <div className="p-6 max-w-7xl mx-auto page-bg min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text">
            Welcome back, {user?.name || user?.email}
          </h1>
          <p className="mt-1" style={{ color: 'var(--muted-foreground)' }}>
            Here's your trading overview for today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="interactive-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--card-foreground)' }}>
                    {stat.value}
                  </p>
                  <p className={`text-sm ${stat.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.isPositive ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'} pulse-glow`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Trades */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold" style={{ color: 'var(--card-foreground)' }}>
                Recent Trades
              </h2>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentTrades.map((trade, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg transition-all hover:scale-105" style={{ backgroundColor: 'var(--muted)' }}>
                  <div className="flex items-center space-x-3">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      trade.side === 'BUY' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                    }`}>
                      {trade.side}
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: 'var(--card-foreground)' }}>{trade.symbol}</p>
                      <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{trade.quantity} shares @ {trade.price}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${trade.pnl.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {trade.pnl}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{trade.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Positions */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold" style={{ color: 'var(--card-foreground)' }}>
                Top Positions
              </h2>
              <PieChart className="h-5 w-5" style={{ color: 'var(--muted-foreground)' }} />
            </div>
            <div className="space-y-4">
              {topPositions.map((position, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 dark:text-primary-400 font-medium text-sm">
                        {position.symbol.slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{position.symbol}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{position.shares} shares</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">{position.value}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-sm text-green-600">{position.pnl}</p>
                      <span className="text-sm text-gray-500 dark:text-gray-400">({position.percentage})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 gradient-text">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="interactive-card text-center group">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform pulse-glow" />
              <h3 className="font-medium mb-1" style={{ color: 'var(--card-foreground)' }}>Buy Stocks</h3>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Execute a buy order</p>
            </button>
            <button className="interactive-card text-center group">
              <TrendingDown className="h-8 w-8 text-red-600 mx-auto mb-2 group-hover:scale-110 transition-transform pulse-glow" />
              <h3 className="font-medium mb-1" style={{ color: 'var(--card-foreground)' }}>Sell Stocks</h3>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Execute a sell order</p>
            </button>
            <button className="interactive-card text-center group">
              <BarChart3 className="h-8 w-8 text-primary-600 mx-auto mb-2 group-hover:scale-110 transition-transform pulse-glow" />
              <h3 className="font-medium mb-1" style={{ color: 'var(--card-foreground)' }}>Market Analysis</h3>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>View market insights</p>
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
