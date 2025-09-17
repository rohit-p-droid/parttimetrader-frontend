import React from 'react';
import { Star } from 'lucide-react';

const Reviews = () => {
    const testimonials = [
		{
			name: "Rajesh Kumar",
			role: "Active Trader",
			content: "Increased my portfolio returns by 35% using the AI insights and backtesting features.",
			rating: 5,
			avatar: "RK"
		},
		{
			name: "Priya Sharma",
			role: "Investment Analyst",
			content: "The screeners helped me discover opportunities I would have missed otherwise.",
			rating: 5,
			avatar: "PS"
		},
		{
			name: "Michael Chen",
			role: "Quantitative Trader",
			content: "Best backtesting platform I've used. Lightning fast and incredibly accurate.",
			rating: 5,
			avatar: "MC"
		}
	];
    return (
        <>
            <section className="py-20 section-bg-alt">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">
                            Trusted by Traders Worldwide
                        </h2>
                        <div className="flex justify-center items-center space-x-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                            ))}
                            <span className="ml-2 text-lg font-semibold" style={{ color: 'var(--card-foreground)' }}>4.9/5</span>
                        </div>
                        <p style={{ color: 'var(--muted-foreground)' }}>Based on 10,000+ user reviews</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="card text-center">
                                <div className="flex items-center justify-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="mb-6 italic" style={{ color: 'var(--muted-foreground)' }}>
                                    "{testimonial.content}"
                                </p>
                                <div className="flex items-center justify-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center text-white font-semibold">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-semibold" style={{ color: 'var(--card-foreground)' }}>
                                            {testimonial.name}
                                        </div>
                                        <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                                            {testimonial.role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Reviews