import React from 'react';
import Link from 'next/link';
import { CheckCircle, ChevronRight } from 'lucide-react';

const Pricing = () => {
    const pricingPlans = [
        {
            name: "Free",
            price: "₹0",
            period: "/month",
            features: [
                "5 Backtests per month",
                "10 Stocks in screener",
                "Basic technical indicators",
                "Community access",
                "Email alerts"
            ],
            cta: "Start Free",
            popular: false
        },
        {
            name: "Pro",
            price: "₹999",
            period: "/month",
            features: [
                "Unlimited backtests",
                "Full stock universe",
                "Advanced AI insights",
                "Real-time alerts",
                "Portfolio analytics",
                "API access",
                "Priority support"
            ],
            cta: "Upgrade to Pro",
            popular: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            period: "",
            features: [
                "White-label solution",
                "Custom integrations",
                "Dedicated support",
                "Advanced analytics",
                "Team collaboration",
                "Custom indicators",
                "SLA guarantee"
            ],
            cta: "Contact Sales",
            popular: false
        }
    ];
    return (
        <>
            <section className="py-20 section-bg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">
                            Choose Your Trading Edge
                        </h2>
                        <p className="text-xl" style={{ color: 'var(--muted-foreground)' }}>
                            Start free, upgrade when you're ready to dominate the markets
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pricingPlans.map((plan, index) => (
                            <div key={index} className={`card relative ${plan.popular ? 'ring-2 ring-primary-500 transform scale-105' : ''}`}>
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                            MOST POPULAR
                                        </span>
                                    </div>
                                )}
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--card-foreground)' }}>
                                        {plan.name}
                                    </h3>
                                    <div className="mb-6">
                                        <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                                        <span style={{ color: 'var(--muted-foreground)' }}>{plan.period}</span>
                                    </div>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, fIndex) => (
                                        <li key={fIndex} className="flex items-center">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                            <span style={{ color: 'var(--card-foreground)' }}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href={plan.name === 'Enterprise' ? '/contact' : '/register'}
                                    className={`w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'} text-center flex items-center justify-center`}
                                >
                                    {plan.cta}
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Pricing