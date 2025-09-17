"use client";

import { useState, useEffect, useRef } from "react";
import { Search, TrendingUp, TrendingDown, X, Loader2, Clock } from "lucide-react";
import stocksService from "@/services/stocks.service";

interface StockResult {
    symbol: string;
    name?: string;
    price: string;
    change: string;
    changePercent: string;
    isPositive: boolean;
    marketCap?: string;
    volume?: string;
    sector?: string;
}

interface PopularStocks {
    symbol: string;
    name: string;
}

export default function StockSearch() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<StockResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [popularStocks, setPopularStocks] = useState<PopularStocks[]>([])
    const searchRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    const getPopularStocks = async () => {
        stocksService.getPopularStocks()
            .then(data => {
                if (data.success) {
                    setPopularStocks(data.data);
                }
            })
    }

    useEffect(() => {
        const saved = localStorage.getItem("stockSearchHistory");
        if (saved) setRecentSearches(JSON.parse(saved));
        getPopularStocks()
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") setIsModalOpen(false);
        }
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsModalOpen(false);
            }
        }

        if (isModalOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.addEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "unset";
        };
    }, [isModalOpen]);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }
        searchStocks(query);
    }, [query]);

    const searchStocks = async (searchQuery: string) => {
        if (searchQuery.length < 2) return;
        setIsLoading(true);
        try {
            stocksService.searchStock({ q: searchQuery })
                .then(data => {
                    if (data.success && data.data) {
                        setResults(data.data);
                        setIsOpen(true);
                        return;
                    }
                })
            setIsOpen(true);
        } catch (error) {
            console.error("Stock search failed:", error);
            const mockResults = await getMockSearchResults(searchQuery);
            setResults(mockResults);
            setIsOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    const getMockSearchResults = async (searchQuery: string): Promise<StockResult[]> => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const mockData: StockResult[] = [
            {
                symbol: "RELIANCE",
                name: "Reliance Industries Ltd",
                price: "2,847.65",
                change: "+125.40",
                changePercent: "+4.61%",
                isPositive: true,
                marketCap: "₹19.2L Cr",
                volume: "2.5M",
                sector: "Oil & Gas"
            },
            {
                symbol: "TCS",
                name: "Tata Consultancy Services",
                price: "3,421.30",
                change: "-45.20",
                changePercent: "-1.30%",
                isPositive: false,
                marketCap: "₹12.4L Cr",
                volume: "1.8M",
                sector: "IT Services"
            },
            {
                symbol: "INFY",
                name: "Infosys Limited",
                price: "1,534.45",
                change: "+28.75",
                changePercent: "+1.91%",
                isPositive: true,
                marketCap: "₹6.3L Cr",
                volume: "3.2M",
                sector: "IT Services"
            },
            {
                symbol: "HDFC",
                name: "HDFC Bank Limited",
                price: "2,765.20",
                change: "+67.80",
                changePercent: "+2.51%",
                isPositive: true,
                marketCap: "₹15.1L Cr",
                volume: "1.9M",
                sector: "Banking"
            },
            {
                symbol: "AAPL",
                name: "Apple Inc.",
                price: "$175.84",
                change: "+2.45",
                changePercent: "+1.41%",
                isPositive: true,
                marketCap: "$2.7T",
                volume: "45.2M",
                sector: "Technology"
            },
        ];
        return mockData.filter(
            (stock) =>
                stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                stock.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const handleSelectStock = (stock: StockResult) => {
        setQuery(stock.symbol);
        setIsOpen(false);
        const updated = [stock.symbol, ...recentSearches.filter((s) => s !== stock.symbol)].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem("stockSearchHistory", JSON.stringify(updated));
    };

    const clearSearch = () => {
        setQuery("");
        setResults([]);
        setIsOpen(false);
    };

    const handlePopularStockClick = (symbol: string) => {
        setQuery(symbol);
        searchStocks(symbol);
    };

    const openModal = () => {
        setIsModalOpen(true);
        setQuery("");
        setResults([]);
        setIsOpen(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setQuery("");
        setResults([]);
        setIsOpen(false);
    };

    return (
        <>
            {/* Search CTA Section */}
            <section className="py-16 section-bg">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">Stock Search</h2>
                    <p className="text-xl mb-8" style={{ color: 'var(--muted-foreground)' }}>
                        Get real-time prices and performance data for any stock
                    </p>
                    <button
                        onClick={openModal}
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 hover:scale-105 focus:ring-4 focus:ring-blue-500/30 pulse-glow"
                    >
                        <Search className="h-5 w-5 mr-2" />
                        Search Stocks
                    </button>
                </div>
            </section>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div ref={modalRef} className="w-full max-w-lg mx-auto">
                        {/* Single Main Card */}
                        <div className="interactive-card animate-in fade-in zoom-in duration-300 max-h-[85vh] overflow-hidden flex flex-col">

                            {/* Header */}
                            <div className="flex items-center justify-between mb-4 flex-shrink-0">
                                <h3 className="text-xl font-bold gradient-text">Stock Search</h3>
                                <button
                                    onClick={closeModal}
                                    className="p-1.5 hover:bg-muted rounded-lg transition-colors"
                                    style={{ color: 'var(--muted-foreground)' }}
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Search Input Card */}
                            <div className="bg-muted/30 rounded-lg p-4 mb-4 flex-shrink-0">
                                <div ref={searchRef} className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Search className="h-4 w-4" style={{ color: 'var(--muted-foreground)' }} />
                                    </div>
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        onFocus={() => setIsOpen(true)}
                                        placeholder="Search stocks..."
                                        className="w-full pl-12 pr-12 py-3 text-sm border border-border rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
                                        style={{
                                            backgroundColor: 'var(--background)',
                                            color: 'var(--foreground)'
                                        }}
                                        autoFocus
                                    />
                                    {query && !isLoading && (
                                        <button
                                            onClick={clearSearch}
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform"
                                        >
                                            <X className="h-4 w-4" style={{ color: 'var(--muted-foreground)' }} />
                                        </button>
                                    )}
                                    {isLoading && (
                                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                            <Loader2 className="h-4 w-4 animate-spin text-primary-600" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Selected Stock Card */}
                            {query && results.length > 0 && (
                                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950 rounded-lg p-5 mb-4 border border-primary-200 dark:border-primary-800 flex-shrink-0">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 flex items-center justify-center text-sm font-bold text-white">
                                            {results[0].symbol.slice(0, 2)}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-base" style={{ color: 'var(--card-foreground)' }}>
                                                {results[0].symbol}
                                            </h4>
                                            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                                                {results[0].name}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="text-center">
                                            <div className="text-lg font-bold" style={{ color: 'var(--card-foreground)' }}>
                                                {results[0].price}
                                            </div>
                                            <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Current Price</div>
                                        </div>
                                        <div className="text-center">
                                            <div className={`text-sm font-semibold flex items-center justify-center ${results[0].isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                                                }`}>
                                                {results[0].isPositive ? (
                                                    <TrendingUp className="h-3 w-3 mr-1" />
                                                ) : (
                                                    <TrendingDown className="h-3 w-3 mr-1" />
                                                )}
                                                {results[0].changePercent}
                                            </div>
                                            <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Today's Change</div>
                                        </div>
                                    </div>

                                    {/* Additional Stock Info */}
                                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-primary-200 dark:border-primary-700">
                                        {results[0].marketCap && (
                                            <div className="text-center">
                                                <div className="text-xs font-medium" style={{ color: 'var(--card-foreground)' }}>
                                                    {results[0].marketCap}
                                                </div>
                                                <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Market Cap</div>
                                            </div>
                                        )}
                                        {results[0].volume && (
                                            <div className="text-center">
                                                <div className="text-xs font-medium" style={{ color: 'var(--card-foreground)' }}>
                                                    {results[0].volume}
                                                </div>
                                                <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Volume</div>
                                            </div>
                                        )}
                                        {results[0].sector && (
                                            <div className="text-center">
                                                <div className="text-xs font-medium" style={{ color: 'var(--card-foreground)' }}>
                                                    {results[0].sector}
                                                </div>
                                                <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Sector</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Suggestions Area */}
                            <div className="flex-1 overflow-y-auto">
                                {(isOpen || !query) && (
                                    <div className="bg-muted/20 rounded-lg p-4">
                                        {query === "" ? (
                                            <>
                                                {/* Recent Searches */}
                                                {recentSearches.length > 0 && (
                                                    <div className="mb-5">
                                                        <h4 className="text-xs font-semibold mb-3 flex items-center gap-1" style={{ color: 'var(--muted-foreground)' }}>
                                                            <Clock className="h-3 w-3 text-primary-600" /> Recent
                                                        </h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {recentSearches.map((symbol) => (
                                                                <button
                                                                    key={symbol}
                                                                    onClick={() => handlePopularStockClick(symbol)}
                                                                    className="px-3 py-1.5 text-xs rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 hover:from-primary-600 hover:to-secondary-600 hover:text-white transition-all duration-200"
                                                                    style={{ color: 'var(--card-foreground)' }}
                                                                >
                                                                    {symbol}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Popular Stocks */}
                                                <div>
                                                    <h4 className="text-xs font-semibold mb-3" style={{ color: 'var(--muted-foreground)' }}>
                                                        🔥 Popular
                                                    </h4>
                                                    <div className="space-y-2">
                                                        {popularStocks.map((stock, index) => (
                                                            <button
                                                                key={stock.symbol}
                                                                onClick={() => handlePopularStockClick(stock.symbol)}
                                                                className="w-full p-3 rounded-lg hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 dark:hover:from-primary-900 dark:hover:to-secondary-900 transition-all duration-200 flex items-center gap-3 text-left group"
                                                            >
                                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${index % 3 === 0 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                                                                    index % 3 === 1 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                                                                        'bg-gradient-to-r from-purple-500 to-purple-600'
                                                                    }`}>
                                                                    {stock.symbol.slice(0, 2)}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="font-medium text-xs" style={{ color: 'var(--card-foreground)' }}>
                                                                        {stock.symbol}
                                                                    </div>
                                                                    <div className="text-xs truncate" style={{ color: 'var(--muted-foreground)' }}>
                                                                        {stock.name}
                                                                    </div>
                                                                </div>
                                                                <Search className="h-4 w-4 text-primary-600 group-hover:scale-110 transition-transform flex-shrink-0" />
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {results.length > 0 ? (
                                                    <div>
                                                        <h4 className="text-xs font-semibold mb-3" style={{ color: 'var(--muted-foreground)' }}>
                                                            🎯 Results
                                                        </h4>
                                                        <div className="space-y-2">
                                                            {results.map((stock, index) => (
                                                                <button
                                                                    key={index}
                                                                    onClick={() => handleSelectStock(stock)}
                                                                    className="w-full p-3 rounded-lg hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 dark:hover:from-primary-900 dark:hover:to-secondary-900 transition-all duration-200 flex items-center gap-3"
                                                                >
                                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                                                                        {stock.symbol.slice(0, 2)}
                                                                    </div>
                                                                    <div className="flex-1 text-left min-w-0">
                                                                        <div className="font-medium text-xs" style={{ color: 'var(--card-foreground)' }}>
                                                                            {stock.symbol}
                                                                        </div>
                                                                        <div className="text-xs truncate" style={{ color: 'var(--muted-foreground)' }}>
                                                                            {stock.name}
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-right flex-shrink-0">
                                                                        <div className="font-medium text-xs" style={{ color: 'var(--card-foreground)' }}>
                                                                            {stock.price}
                                                                        </div>
                                                                        <div className={`text-xs flex items-center justify-end ${stock.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                                                                            }`}>
                                                                            {stock.isPositive ? (
                                                                                <TrendingUp className="h-2 w-2 mr-0.5" />
                                                                            ) : (
                                                                                <TrendingDown className="h-2 w-2 mr-0.5" />
                                                                            )}
                                                                            {stock.changePercent}
                                                                        </div>
                                                                    </div>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : !isLoading && query ? (
                                                    <div className="text-center py-8">
                                                        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                                                            <Search className="h-8 w-8" style={{ color: 'var(--muted-foreground)' }} />
                                                        </div>
                                                        <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                                                            No stocks found for "{query}"
                                                        </p>
                                                    </div>
                                                ) : null}
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
