"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-2xl mx-auto text-center">
                <h1 className="font-bold tracking-tighter mb-4 text-5xl">Get in touch</h1>
                <p className="text-gray-400 mb-12">Building the future of autonomy? We'd love to hear from you.</p>

                <form className="space-y-4 text-left">
                    <div>
                        <label className="block text-sm font-bold mb-2">Email</label>
                        <input type="email" className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white transition" placeholder="you@company.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Message</label>
                        <textarea className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white transition h-32" placeholder="How can we help?" />
                    </div>
                    <button className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition">Send Message</button>
                </form>
            </main>
            <Footer />
        </div>
    );
}
