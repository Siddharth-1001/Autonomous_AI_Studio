"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-3xl mx-auto prose prose-invert prose-lg">
                <h1 className="font-bold tracking-tighter mb-8 text-5xl">Terms of Service</h1>
                <p className="text-gray-400 lead">Last updated: January 2026</p>

                <h3>1. Acceptance</h3>
                <p>By using Autonomous AI Studio, you agree to these terms.</p>

                <h3>2. Usage Limits</h3>
                <p>You may not use our platform for unauthorized scraping or spamming. We reserve the right to terminate accounts that violate platform policies (LinkedIn, X, etc.).</p>

                <h3>3. Liability</h3>
                <p>We are not responsible for account bans resulting from aggressive automation settings. Use responsibly.</p>
            </main>
            <Footer />
        </div>
    );
}
