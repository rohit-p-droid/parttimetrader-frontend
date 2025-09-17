import React, { useEffect, useState } from 'react';
import stockService from '@/services/stocks.service';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface Top4Indices {
    name: string;
    price: string;
    changed_price: number;
    change_pct: number;
}

interface TopGainersLosers {
    symbol: string;
    ltp: number;
    net_price: number;
}

const LiveMarketPreview = () => {
    const [marketData, setMarketData] = useState<Top4Indices[]>();
    const [topGainers, setTopGainers] = useState<TopGainersLosers[]>([]);
    const [topLosers, setTopLosers] = useState<TopGainersLosers[]>([]);

    const fetchMarketData = async () => {
        stockService.getTop4Indices()
            .then(data => {
                if (data.success) {
                    setMarketData(data.data);
                }
            })
    };

    const fetchTopGainersLosers = async () => {
        stockService.getTopGainersLosers()
            .then(data => {
                if (data.success) {
                    console.log(data)
                    setTopGainers(data.data.gainers);
                    setTopLosers(data.data.losers);
                }
            })
    }

    useEffect(() => {
        fetchMarketData();
        fetchTopGainersLosers();
    }, []);

    return (
        <>
            <section className="py-12 section-bg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold gradient-text mb-2">Live Market Snapshot</h2>
                        <p style={{ color: 'var(--muted-foreground)' }}>Real-time market data at your fingertips</p>
                    </div>

                    {/* Market Indices */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {marketData?.map((market, index) => (
                            <div key={index} className="interactive-card text-center">
                                <h3 className="font-semibold text-sm" style={{ color: 'var(--card-foreground)' }}>
                                    {market?.name}
                                </h3>
                                <p className="text-lg font-bold mt-1" style={{ color: 'var(--card-foreground)' }}>
                                    {market?.price}
                                </p>
                                {market.changed_price && <p className={`text-sm ${market.changed_price > 1 ? 'text-green-600' : 'text-red-600'}`}>
                                    {market.changed_price.toFixed(2)} ({market.change_pct && <span>{market.change_pct.toFixed(2)}%</span>})
                                </p>}
                            </div>
                        ))}
                    </div>

                    {/* Top Gainers & Losers */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="card">
                            <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: 'var(--card-foreground)' }}>
                                <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                                Top Gainers
                            </h3>
                            <div className="space-y-3">
                                {topGainers?.map((stock, index) => (
                                    <div key={index} className="flex justify-between items-center p-2 rounded-lg hover:bg-opacity-50 transition-all" style={{ backgroundColor: 'var(--muted)' }}>
                                        <div>
                                            <p className="font-medium" style={{ color: 'var(--card-foreground)' }}>{stock?.symbol}</p>
                                            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>₹{stock?.ltp}</p>
                                        </div>
                                        <p className="text-green-600 font-semibold">{stock?.net_price}%</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="card">
                            <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: 'var(--card-foreground)' }}>
                                <TrendingDown className="h-5 w-5 text-red-600 mr-2" />
                                Top Losers
                            </h3>
                            <div className="space-y-3">
                                {topLosers?.map((stock, index) => (
                                    <div key={index} className="flex justify-between items-center p-2 rounded-lg hover:bg-opacity-50 transition-all" style={{ backgroundColor: 'var(--muted)' }}>
                                        <div>
                                            <p className="font-medium" style={{ color: 'var(--card-foreground)' }}>{stock?.symbol}</p>
                                            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>₹{stock?.ltp}</p>
                                        </div>
                                        <p className="text-red-600 font-semibold">{stock?.net_price}%</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default LiveMarketPreview