"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  ArrowLeft,
  Users,
  Building,
  Zap
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    employees: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen page-bg flex items-center justify-center">
        <div className="card max-w-md mx-auto text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--card-foreground)' }}>
            Thank You!
          </h2>
          <p className="mb-6" style={{ color: 'var(--muted-foreground)' }}>
            We've received your inquiry and our enterprise sales team will contact you within 24 hours.
          </p>
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen page-bg">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Enterprise Sales
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Ready to scale your trading operations? Let's discuss how our enterprise 
              solution can transform your organization's trading performance.
            </p>
            <Link href="/" className="inline-flex items-center text-blue-100 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--card-foreground)' }}>
              Get Started with Enterprise
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Work Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="john@company.com"
                    required
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Company Name *</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Your Company Inc."
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              
              <div>
                <label className="form-label">Company Size *</label>
                <select
                  name="employees"
                  value={formData.employees}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="">Select company size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-1000">201-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>
              
              <div>
                <label className="form-label">Tell us about your trading needs</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="form-input"
                  placeholder="Describe your current trading setup, team size, volume requirements, and any specific features you're looking for..."
                />
              </div>
              
              <button type="submit" className="btn-primary w-full">
                <Send className="mr-2 h-4 w-4" />
                Request Enterprise Demo
              </button>
            </form>
          </div>
          
          {/* Contact Information & Features */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--card-foreground)' }}>
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary-600" />
                  <div>
                    <div className="font-medium" style={{ color: 'var(--card-foreground)' }}>
                      Enterprise Sales
                    </div>
                    <div style={{ color: 'var(--muted-foreground)' }}>
                      enterprise@parttimetrader.com
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary-600" />
                  <div>
                    <div className="font-medium" style={{ color: 'var(--card-foreground)' }}>
                      Sales Hotline
                    </div>
                    <div style={{ color: 'var(--muted-foreground)' }}>
                      +1 (555) 123-TRADE
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary-600" />
                  <div>
                    <div className="font-medium" style={{ color: 'var(--card-foreground)' }}>
                      Business Hours
                    </div>
                    <div style={{ color: 'var(--muted-foreground)' }}>
                      Mon-Fri: 9 AM - 6 PM EST
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary-600" />
                  <div>
                    <div className="font-medium" style={{ color: 'var(--card-foreground)' }}>
                      Headquarters
                    </div>
                    <div style={{ color: 'var(--muted-foreground)' }}>
                      New York, NY • Mumbai, India
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enterprise Features */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--card-foreground)' }}>
                Enterprise Features
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Building className="h-5 w-5 text-primary-600 mt-1" />
                  <div>
                    <div className="font-medium" style={{ color: 'var(--card-foreground)' }}>
                      White-label Solution
                    </div>
                    <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                      Customizable platform with your branding and domain
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-primary-600 mt-1" />
                  <div>
                    <div className="font-medium" style={{ color: 'var(--card-foreground)' }}>
                      Team Management
                    </div>
                    <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                      Advanced user roles, permissions, and collaboration tools
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Zap className="h-5 w-5 text-primary-600 mt-1" />
                  <div>
                    <div className="font-medium" style={{ color: 'var(--card-foreground)' }}>
                      High-Performance Infrastructure
                    </div>
                    <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                      Dedicated servers with 99.9% uptime SLA guarantee
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary-600 mt-1" />
                  <div>
                    <div className="font-medium" style={{ color: 'var(--card-foreground)' }}>
                      Priority Support
                    </div>
                    <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                      Dedicated account manager and 24/7 technical support
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial */}
            <div className="card bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
              <div className="text-center">
                <div className="text-lg font-medium mb-2" style={{ color: 'var(--card-foreground)' }}>
                  "PartTimeTrader Enterprise transformed our trading desk operations. 
                  ROI was evident within the first quarter."
                </div>
                <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  — Sarah Johnson, Head of Trading at TechCorp
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
