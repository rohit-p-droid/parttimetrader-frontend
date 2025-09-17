"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { ThemeToggle } from "./theme-toggle";
import { TrendingUp, BarChart3, Wallet, Settings, LogOut, Menu, X } from "lucide-react";

export function Navigation() {
    const { isAuthenticated, user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="section-bg shadow-lg border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <TrendingUp className="h-8 w-8 text-primary-600" />
                            <span className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
                                PartTimeTrader
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {isAuthenticated ? (
                            <>
                                <Link href="/dashboard" className="nav-link flex items-center space-x-1">
                                    <BarChart3 className="h-4 w-4" />
                                    <span>Dashboard</span>
                                </Link>
                                <Link href="/portfolio" className="nav-link flex items-center space-x-1">
                                    <Wallet className="h-4 w-4" />
                                    <span>Portfolio</span>
                                </Link>
                                <Link href="/settings" className="nav-link flex items-center space-x-1">
                                    <Settings className="h-4 w-4" />
                                    <span>Settings</span>
                                </Link>
                                <div className="flex items-center space-x-4">
                                    <ThemeToggle />
                                    <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                                        Welcome, {user?.name || user?.email}
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link href="/features" className="nav-link">Features</Link>
                                <Link href="/pricing" className="nav-link">Pricing</Link>
                                <Link href="/about" className="nav-link">About</Link>
                                <ThemeToggle />
                                <Link href="/login" className="btn-primary">
                                    Login
                                </Link>
                                <Link href="/register" className="btn-secondary">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-2">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="transition-colors"
                            style={{ color: 'var(--muted-foreground)' }}
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t" style={{ borderColor: 'var(--border)' }}>
                            {isAuthenticated ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        className="block px-3 py-2 nav-link"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/portfolio"
                                        className="block px-3 py-2 nav-link"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Portfolio
                                    </Link>
                                    <Link
                                        href="/settings"
                                        className="block px-3 py-2 nav-link"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Settings
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/features"
                                        className="block px-3 py-2 nav-link"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Features
                                    </Link>
                                    <Link
                                        href="/pricing"
                                        className="block px-3 py-2 nav-link"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Pricing
                                    </Link>
                                    <Link
                                        href="/about"
                                        className="block px-3 py-2 nav-link"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        About
                                    </Link>
                                    <Link
                                        href="/login"
                                        className="block px-3 py-2 btn-primary text-center"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="block px-3 py-2 btn-secondary text-center"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
