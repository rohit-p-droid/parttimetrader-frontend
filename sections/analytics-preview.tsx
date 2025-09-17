import React from 'react';
import Link from 'next/link';
import { LineChart, Target, Unlock } from 'lucide-react';

const AnalyticsPreview = () => {
    return (
        <>
            <section className="py-20 section-bg-alt">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">
                            Powerful Analytics & Tools
                        </h2>
                        <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
                            Get a glimpse of our professional-grade trading tools
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Stock Screener Preview */}
                        <div className="card relative">
                            <div className="absolute top-4 right-4">
                                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                    PREVIEW
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--card-foreground)' }}>
                                Stock Screener
                            </h3>
                            <p className="mb-4" style={{ color: 'var(--muted-foreground)' }}>
                                Today's RSI &lt; 30 Stocks (Oversold)
                            </p>
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: 'var(--muted)' }}>
                                    <span style={{ color: 'var(--card-foreground)' }}>STOCK-A</span>
                                    <span className="text-primary-600">RSI: 28.5</span>
                                </div>
                                <div className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: 'var(--muted)' }}>
                                    <span style={{ color: 'var(--card-foreground)' }}>STOCK-B</span>
                                    <span className="text-primary-600">RSI: 25.8</span>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent dark:from-gray-800 z-10 rounded flex items-center justify-center">
                                        <div className="text-center">
                                            <Unlock className="h-8 w-8 mx-auto mb-2 text-primary-600" />
                                            <p className="text-sm font-semibold" style={{ color: 'var(--card-foreground)' }}>Login to view all</p>
                                        </div>
                                    </div>
                                    <div className="blur-sm">
                                        <div className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: 'var(--muted)' }}>
                                            <span>••••••</span>
                                            <span>•••••</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link href="/register" className="btn-primary w-full">
                                Unlock Full Screener
                            </Link>
                        </div>

                        {/* Technical Chart Preview */}
                        <div className="card">
                            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--card-foreground)' }}>
                                Technical Analysis
                            </h3>
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold" style={{ color: 'var(--card-foreground)' }}>AAPL</span>
                                    <span className="text-green-600">+2.45%</span>
                                </div>
                                <div className="h-32 bg-gradient-to-r from-green-400 to-blue-500 rounded opacity-80 flex items-end justify-around p-2">
                                    {[40, 65, 45, 80, 55, 70, 85].map((height, i) => (
                                        <div key={i} className="bg-white/30 rounded-sm" style={{ height: `${height}%`, width: '8px' }}></div>
                                    ))}
                                </div>
                                <p className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
                                    RSI: 65.4 | MACD: Bullish | SMA: Above 50
                                </p>
                            </div>
                            <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
                                Interactive charts with 50+ technical indicators
                            </p>
                            <Link href="/register" className="btn-secondary w-full">
                                <LineChart className="mr-2 h-4 w-4" />
                                Access Charts
                            </Link>
                        </div>

                        {/* Backtest Demo */}
                        <div className="card">
                            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--card-foreground)' }}>
                                Strategy Backtesting
                            </h3>
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg mb-4">
                                <h4 className="font-semibold mb-2" style={{ color: 'var(--card-foreground)' }}>EMA Crossover Strategy</h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <span style={{ color: 'var(--muted-foreground)' }}>Return:</span>
                                        <span className="text-green-600 font-semibold ml-1">+23.8%</span>
                                    </div>
                                    <div>
                                        <span style={{ color: 'var(--muted-foreground)' }}>Sharpe:</span>
                                        <span className="font-semibold ml-1" style={{ color: 'var(--card-foreground)' }}>1.45</span>
                                    </div>
                                    <div>
                                        <span style={{ color: 'var(--muted-foreground)' }}>Max DD:</span>
                                        <span className="text-red-600 font-semibold ml-1">-8.2%</span>
                                    </div>
                                    <div>
                                        <span style={{ color: 'var(--muted-foreground)' }}>Win Rate:</span>
                                        <span className="font-semibold ml-1" style={{ color: 'var(--card-foreground)' }}>68%</span>
                                    </div>
                                </div>
                            </div>
                            <Link href="/register" className="btn-primary w-full">
                                <Target className="mr-2 h-4 w-4" />
                                Start Backtesting
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AnalyticsPreview