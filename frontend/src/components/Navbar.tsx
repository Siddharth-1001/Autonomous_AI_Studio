"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-black rounded-full" />
                    </div>
                    <div className="text-xl font-bold tracking-tighter text-white">Autonomous AI Studio</div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/features" className="text-sm font-medium text-gray-300 hover:text-white transition">Features</Link>
                    <Link href="/casestudies" className="text-sm font-medium text-gray-300 hover:text-white transition">Case Studies</Link>
                    <Link href="/pricing" className="text-sm font-medium text-gray-300 hover:text-white transition">Pricing</Link>
                    <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-white transition">About</Link>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-5 py-2.5 text-sm bg-white text-black hover:bg-gray-200 transition rounded-full font-bold tracking-wide"
                    >
                        <BarChart3 className="w-4 h-4" />
                        Launch Studio
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden p-2 text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black border-b border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-6">
                            <Link href="/features" className="text-lg font-medium text-white" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
                            <Link href="/casestudies" className="text-lg font-medium text-white" onClick={() => setIsMobileMenuOpen(false)}>Case Studies</Link>
                            <Link href="/pricing" className="text-lg font-medium text-white" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
                            <Link href="/about" className="text-lg font-medium text-white" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                            <div className="h-px bg-white/10 my-2" />
                            <Link href="/dashboard" className="text-lg font-medium text-white" onClick={() => setIsMobileMenuOpen(false)}>Launch Studio</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
