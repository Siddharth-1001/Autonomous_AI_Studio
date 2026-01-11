"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CookiesPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-3xl mx-auto prose prose-invert prose-lg">
                <h1 className="font-bold tracking-tighter mb-8 text-5xl">Cookie Policy</h1>

                <p>We use cookies to ensure you get the best experience on our website.</p>
                <ul>
                    <li><strong>Essential Cookies:</strong> Required for login and session management.</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how you use the studio. (Opt-in)</li>
                </ul>
            </main>
            <Footer />
        </div>
    );
}
