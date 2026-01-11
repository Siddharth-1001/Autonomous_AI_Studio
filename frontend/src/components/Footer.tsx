"use client";

import Link from "next/link";
import { Linkedin, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="py-20 border-t border-white/10 bg-black text-white">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
                <div className="col-span-2 lg:col-span-2 space-y-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-black rounded-full" />
                        </div>
                        <span className="text-lg font-bold tracking-tighter">Autonomous AI Studio</span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                        The first social OS powered by autonomous agents. Designed for creators who value intelligence over raw data.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-white">Product</h4>
                    <Link href="/features" className="text-sm text-gray-500 hover:text-white transition">Features</Link>
                    <Link href="/integrations" className="text-sm text-gray-500 hover:text-white transition">Integrations</Link>
                    <Link href="/pricing" className="text-sm text-gray-500 hover:text-white transition">Pricing</Link>
                    <Link href="/changelog" className="text-sm text-gray-500 hover:text-white transition">Changelog</Link>
                </div>

                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-white">Company</h4>
                    <Link href="/about" className="text-sm text-gray-500 hover:text-white transition">About</Link>
                    <Link href="/careers" className="text-sm text-gray-500 hover:text-white transition">Careers</Link>
                    <Link href="/blog" className="text-sm text-gray-500 hover:text-white transition">Blog</Link>
                    <Link href="/contact" className="text-sm text-gray-500 hover:text-white transition">Contact</Link>
                </div>

                <div className="flex flex-col gap-4">
                    <h4 className="font-bold text-white">Legal</h4>
                    <Link href="/privacy" className="text-sm text-gray-500 hover:text-white transition">Privacy</Link>
                    <Link href="/terms" className="text-sm text-gray-500 hover:text-white transition">Terms</Link>
                    <Link href="/security" className="text-sm text-gray-500 hover:text-white transition">Security</Link>
                    <Link href="/cookies" className="text-sm text-gray-500 hover:text-white transition">Cookies</Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
                <p>© 2026 Autonomous AI Studio Inc. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <Linkedin size={16} className="hover:text-white cursor-pointer transition" />
                    <Twitter size={16} className="hover:text-white cursor-pointer transition" />
                </div>
            </div>
        </footer>
    );
}
