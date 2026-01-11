"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
            <Navbar />
            <main className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center">
                <h1 className="font-bold tracking-tighter mb-4 text-5xl md:text-7xl">Thoughts from the Machine.</h1>
                <p className="text-xl text-gray-400 mb-20 max-w-2xl mx-auto">Insights on AI, autonomy, and the future of work.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    <div className="bg-zinc-900/30 border border-white/10 rounded-2xl p-8 hover:bg-zinc-900 transition cursor-pointer">
                        <div className="text-sm text-blue-400 font-bold mb-2">Agent Design</div>
                        <h3 className="text-2xl font-bold mb-4">Why RAG is not enough for True Autonomy</h3>
                        <p className="text-gray-400 text-sm">Retrieval Augmented Generation is great for context, but agentic reasoning requires a fundamental shift in how we structure prompts.</p>
                    </div>
                    <div className="bg-zinc-900/30 border border-white/10 rounded-2xl p-8 hover:bg-zinc-900 transition cursor-pointer">
                        <div className="text-sm text-purple-400 font-bold mb-2">Social Strategy</div>
                        <h3 className="text-2xl font-bold mb-4">The Death of the "Social Media Manager"</h3>
                        <p className="text-gray-400 text-sm">How AI agents are moving from drafting copy to owning the entire distribution pipeline.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
