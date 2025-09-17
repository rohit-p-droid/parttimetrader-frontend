"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Play, 
  Pause,
  ArrowLeft,
  ArrowRight,
  Target,
  Filter,
  LineChart,
  Zap,
  CheckCircle,
  Star
} from "lucide-react";

export default function DemoPage() {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [demoProgress, setDemoProgress] = useState(0);

  const demos = [
    {
      title: "Smart Stock Screener",
      description: "Find profitable opportunities with AI-powered filtering",
      component: <ScreenerDemo />
    },
    {
      title: "Advanced Backtesting",
      description: "Test your strategies on historical data with lightning speed",
      component: <BacktestDemo />
    },
    {
      title: "Real-time Analytics",
      description: "Professional-grade charts and technical indicators",
      component: <AnalyticsDemo />
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setDemoProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextDemo = () => {
    setCurrentDemo((prev) => (prev + 1) % demos.length);
    setDemoProgress(0);
    setIsPlaying(false);
  };

  const prevDemo = () => {
    setCurrentDemo((prev) => (prev - 1 + demos.length) % demos.length);
    setDemoProgress(0);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen page-bg">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Interactive Platform Demo
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Experience the power of our trading platform. See how professional traders 
              are making smarter decisions with our AI-powered tools.
            </p>
            <div className="flex items-center justify-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-lg">4.9/5 from 10,000+ users</span>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Player */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card">
            {/* Demo Navigation */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <button
                  onClick={prevDemo}
                  className="p-2 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: 'var(--card-foreground)' }}>
                    {demos[currentDemo].title}
                  </h2>
                  <p style={{ color: 'var(--muted-foreground)' }}>
                    {demos[currentDemo].description}
                  </p>
                </div>
                <button
                  onClick={nextDemo}
                  className="p-2 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="btn-primary flex items-center space-x-2"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  <span>{isPlaying ? 'Pause' : 'Play'} Demo</span>
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2 mb-8">
              <div 
                className="bg-gradient-to-r from-primary-600 to-secondary-600 h-2 rounded-full transition-all duration-100"
                style={{ width: `${demoProgress}%` }}
              ></div>
            </div>

            {/* Demo Content */}
            <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-8 min-h-[500px]">
              {demos[currentDemo].component}
              
              {/* Demo Overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="bg-white bg-opacity-90 hover:bg-opacity-100 text-primary-600 rounded-full p-6 transition-all transform hover:scale-110"
                  >
                    <Play className="h-12 w-12 ml-1" />
                  </button>
                </div>
              )}
            </div>

            {/* Demo Dots */}
            <div className="flex justify-center space-x-2 mt-6">
              {demos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentDemo(index);
                    setDemoProgress(0);
                    setIsPlaying(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentDemo ? 'bg-primary-600' : 'bg-border'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="py-16 section-bg-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gradient-text mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl" style={{ color: 'var(--muted-foreground)' }}>
              Built for traders who demand professional results
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--card-foreground)' }}>
                Lightning Fast
              </h3>
              <p style={{ color: 'var(--muted-foreground)' }}>
                Execute backtests and scans in seconds, not minutes
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-secondary-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--card-foreground)' }}>
                Precision Trading
              </h3>
              <p style={{ color: 'var(--muted-foreground)' }}>
                AI-powered insights for more accurate trading decisions
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-accent text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--card-foreground)' }}>
                Proven Results
              </h3>
              <p style={{ color: 'var(--muted-foreground)' }}>
                Join 10,000+ traders with improved portfolio performance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Start your free trial today and experience the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
              Start Free Trial
            </Link>
            <Link href="/" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-all duration-200">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Demo Components
function ScreenerDemo() {
  const [filters, setFilters] = useState([
    { name: "Market Cap", value: "> ₹1000 Cr", active: true },
    { name: "RSI", value: "< 30 (Oversold)", active: true },
    { name: "Volume", value: "> 1M shares", active: true }
  ]);

  const [results] = useState([
    { symbol: "RELIANCE", price: "2,847.65", rsi: "28.5", volume: "2.1M", recommendation: "Strong Buy" },
    { symbol: "TCS", price: "3,421.30", rsi: "25.8", volume: "1.8M", recommendation: "Buy" },
    { symbol: "INFY", price: "1,534.45", rsi: "29.2", volume: "3.2M", recommendation: "Buy" },
    { symbol: "HDFC", price: "2,765.20", rsi: "27.9", volume: "1.5M", recommendation: "Strong Buy" }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="h-6 w-6 text-primary-600" />
        <h3 className="text-xl font-semibold" style={{ color: 'var(--card-foreground)' }}>
          Stock Screener - Oversold Opportunities
        </h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-3" style={{ color: 'var(--card-foreground)' }}>Active Filters</h4>
          <div className="space-y-2">
            {filters.map((filter, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
                <span style={{ color: 'var(--card-foreground)' }}>{filter.name}</span>
                <span className="text-primary-600 font-medium">{filter.value}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3" style={{ color: 'var(--card-foreground)' }}>Filtered Results (4 stocks)</h4>
          <div className="space-y-2">
            {results.map((stock, index) => (
              <div key={index} className="p-3 bg-white dark:bg-gray-800 rounded-lg border">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-semibold" style={{ color: 'var(--card-foreground)' }}>{stock.symbol}</span>
                    <span className="text-sm ml-2" style={{ color: 'var(--muted-foreground)' }}>₹{stock.price}</span>
                  </div>
                  <span className="text-green-600 text-sm font-medium">{stock.recommendation}</span>
                </div>
                <div className="flex space-x-4 text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
                  <span>RSI: {stock.rsi}</span>
                  <span>Vol: {stock.volume}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BacktestDemo() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Target className="h-6 w-6 text-primary-600" />
        <h3 className="text-xl font-semibold" style={{ color: 'var(--card-foreground)' }}>
          Strategy Backtest - EMA Crossover
        </h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
            <h4 className="font-semibold mb-2" style={{ color: 'var(--card-foreground)' }}>Strategy Parameters</h4>
            <div className="space-y-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
              <div>Fast EMA: 12 periods</div>
              <div>Slow EMA: 26 periods</div>
              <div>Signal: MACD crossover</div>
              <div>Stop Loss: 8%</div>
              <div>Take Profit: 15%</div>
            </div>
          </div>
          
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
            <h4 className="font-semibold mb-2" style={{ color: 'var(--card-foreground)' }}>Performance Metrics</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span style={{ color: 'var(--muted-foreground)' }}>Total Return:</span>
                <span className="text-green-600 font-semibold ml-1">+23.8%</span>
              </div>
              <div>
                <span style={{ color: 'var(--muted-foreground)' }}>Sharpe Ratio:</span>
                <span className="font-semibold ml-1" style={{ color: 'var(--card-foreground)' }}>1.45</span>
              </div>
              <div>
                <span style={{ color: 'var(--muted-foreground)' }}>Max Drawdown:</span>
                <span className="text-red-600 font-semibold ml-1">-8.2%</span>
              </div>
              <div>
                <span style={{ color: 'var(--muted-foreground)' }}>Win Rate:</span>
                <span className="font-semibold ml-1" style={{ color: 'var(--card-foreground)' }}>68%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
          <h4 className="font-semibold mb-4" style={{ color: 'var(--card-foreground)' }}>Equity Curve</h4>
          <div className="h-48 bg-gradient-to-r from-green-400 to-blue-500 rounded opacity-80 flex items-end justify-around p-4">
            {[20, 35, 45, 60, 55, 70, 85, 78, 90, 95].map((height, i) => (
              <div 
                key={i} 
                className="bg-white/30 rounded-sm" 
                style={{ height: `${height}%`, width: '8px' }}
              ></div>
            ))}
          </div>
          <p className="text-xs mt-2 text-center" style={{ color: 'var(--muted-foreground)' }}>
            Consistent growth with controlled drawdowns
          </p>
        </div>
      </div>
    </div>
  );
}

function AnalyticsDemo() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <LineChart className="h-6 w-6 text-primary-600" />
        <h3 className="text-xl font-semibold" style={{ color: 'var(--card-foreground)' }}>
          Technical Analysis - AAPL
        </h3>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
          <h4 className="font-semibold mb-3" style={{ color: 'var(--card-foreground)' }}>Price Action</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span style={{ color: 'var(--muted-foreground)' }}>Current:</span>
              <span className="font-semibold" style={{ color: 'var(--card-foreground)' }}>$175.84</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--muted-foreground)' }}>Change:</span>
              <span className="text-green-600 font-semibold">+2.98%</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--muted-foreground)' }}>Volume:</span>
              <span style={{ color: 'var(--card-foreground)' }}>45.2M</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
          <h4 className="font-semibold mb-3" style={{ color: 'var(--card-foreground)' }}>Technical Indicators</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span style={{ color: 'var(--muted-foreground)' }}>RSI (14):</span>
              <span className="text-orange-600">65.4</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--muted-foreground)' }}>MACD:</span>
              <span className="text-green-600">Bullish</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--muted-foreground)' }}>SMA (50):</span>
              <span className="text-green-600">Above</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
          <h4 className="font-semibold mb-3" style={{ color: 'var(--card-foreground)' }}>AI Signal</h4>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">BUY</div>
            <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Confidence: 87%</div>
            <div className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
              Strong momentum with bullish indicators
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
        <h4 className="font-semibold mb-4" style={{ color: 'var(--card-foreground)' }}>Interactive Chart</h4>
        <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded opacity-80 flex items-end justify-around p-2">
          {[40, 65, 45, 80, 55, 70, 85, 78, 90, 88, 95, 92].map((height, i) => (
            <div 
              key={i} 
              className="bg-white/40 rounded-sm" 
              style={{ height: `${height}%`, width: '6px' }}
            ></div>
          ))}
        </div>
        <div className="flex justify-between text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
          <span>9 AM</span>
          <span>12 PM</span>
          <span>3 PM</span>
          <span>4 PM</span>
        </div>
      </div>
    </div>
  );
}
