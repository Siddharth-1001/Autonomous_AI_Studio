"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-3xl mx-auto prose prose-invert prose-lg">
                <h1 className="font-bold tracking-tighter mb-8 text-5xl">Privacy Policy</h1>
                <p className="text-gray-400 lead">Last updated: January 2026</p>

                <h3>1. Introduction</h3>
                <p>At Autonomous AI Studio, we take your privacy seriously. We only scrape data that is publicly available or that you have explicitly authorized us to access via your connected accounts.</p>

                <h3>2. Data Usage</h3>
                <p>We use your data strictly to generate analytics and content strategies for you. We do not sell your data to third parties. Our AI models are not trained on your private proprietary metrics.</p>

                <h3>3. Cookies</h3>
                <p>We use cookies to maintain your session and improve the platform experience.</p>
            </main>
            <Footer />
        </div>
    );
}
