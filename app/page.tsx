"use client";

import Link from "next/link";
import Hero from "@/sections/hero";
import Reviews from "../sections/reviews";
import Pricing from "../sections/pricing";
import { useAuth } from "@/lib/auth-context";
import AnalyticsPreview from "../sections/analytics-preview";
import LiveMarketPreview from "@/sections/live-market-preview";
import { Shield, Zap, Users, ArrowRight, Eye, Brain, Filter, Bell } from "lucide-react";
import StockSearch from "../sections/stock-search";



export default function HomePage() {
	const { isAuthenticated } = useAuth();

	const features = [
		{
			icon: <Brain className="h-8 w-8" />,
			title: "AI-Driven Insights",
			description: "Machine learning algorithms analyze market patterns and generate actionable insights."
		},
		{
			icon: <Zap className="h-8 w-8" />,
			title: "Lightning Fast Backtesting",
			description: "Test your strategies on years of historical data in seconds, not hours."
		},
		{
			icon: <Filter className="h-8 w-8" />,
			title: "Advanced Screeners",
			description: "Custom filters to find stocks matching your exact criteria and trading style."
		},
		{
			icon: <Bell className="h-8 w-8" />,
			title: "Smart Alerts",
			description: "Get notified instantly when your conditions are met or opportunities arise."
		},
		{
			icon: <Shield className="h-8 w-8" />,
			title: "Risk Analytics",
			description: "Comprehensive portfolio risk assessment and position sizing recommendations."
		},
		{
			icon: <Users className="h-8 w-8" />,
			title: "Community Strategies",
			description: "Share and discover winning strategies from our community of traders."
		}
	];





	return (
		<div className="min-h-screen page-bg">
			{/* Hero Section */}
			<Hero />

			{/* Live Market Snapshot */}
			<LiveMarketPreview />

			{/* search stocks */}
			<StockSearch/>

			{/* Sample Analytics Preview */}
			<AnalyticsPreview />

			{/* Why Choose Us Features */}
			<section className="py-20 section-bg">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">
							Why Choose PartTimeTrader?
						</h2>
						<p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
							Built by traders, for traders. Every feature designed to give you an edge.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{features.map((feature, index) => (
							<div key={index} className="interactive-card text-center group">
								<div className="text-primary-600 dark:text-primary-400 mb-4 pulse-glow group-hover:scale-110 transition-transform">
									{feature.icon}
								</div>
								<h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--card-foreground)' }}>
									{feature.title}
								</h3>
								<p style={{ color: 'var(--muted-foreground)' }}>
									{feature.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<Reviews />

			{/* Pricing Section */}
			{!isAuthenticated && (
				<Pricing />
			)}

			{/* CTA Section */}
			{!isAuthenticated && (
				<section className="py-20 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white">
					<div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl sm:text-4xl font-bold mb-4">
							Ready to Transform Your Trading?
						</h2>
						<p className="text-xl mb-8 text-blue-100">
							Join 10,000+ traders who've upgraded their decision-making with our platform.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link href="/register" className="btn-primary bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4">
								<span>Start Free Today</span>
								<ArrowRight className="ml-2 h-5 w-5" />
							</Link>
							<Link href="/demo" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 flex items-center justify-center">
								<Eye className="mr-2 h-5 w-5" />
								See It In Action
							</Link>
						</div>
						<p className="text-sm mt-6 text-blue-200">
							No credit card required • Free forever plan available
						</p>
					</div>
				</section>
			)}
		</div>
	);
}
