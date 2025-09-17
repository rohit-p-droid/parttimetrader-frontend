import React from 'react'
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { TrendingUp, BarChart3, ArrowRight, Play, Target } from "lucide-react";

const Hero = () => {
    const { isAuthenticated } = useAuth();
    return (
        <>
            <section className="relative bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-6xl font-bold mb-6 animate-fade-in">
                            Smarter Trading Decisions with{" "}
                            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                                AI-powered Research
                            </span>
                        </h1>
                        <p className="text-xl sm:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto animate-slide-up">
                            Analyze stocks, test strategies, and track markets — all in one platform.
                            Make data-driven decisions with professional-grade tools.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
                            {isAuthenticated ? (
                                <Link href="/dashboard" className="btn-primary text-lg px-8 py-4">
                                    <span>Go to Dashboard</span>
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            ) : (
                                <>
                                    <Link href="/register" className="btn-primary text-lg px-8 py-4">
                                        <span>Try Free</span>
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                    <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 flex items-center">
                                        <Play className="mr-2 h-5 w-5" />
                                        <span>View Demo</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Floating trading elements */}
                <div className="absolute top-20 left-10 opacity-20">
                    <TrendingUp className="h-16 w-16 float-animation text-green-300" />
                </div>
                <div className="absolute bottom-20 right-10 opacity-20">
                    <BarChart3 className="h-20 w-20 float-animation text-blue-300" style={{ animationDelay: "1s" }} />
                </div>
                <div className="absolute top-40 right-20 opacity-15">
                    <Target className="h-12 w-12 float-animation text-purple-300" style={{ animationDelay: "2s" }} />
                </div>
            </section>
        </>
    )
}

export default Hero