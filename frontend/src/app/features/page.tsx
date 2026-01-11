"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Brain, Zap, Layers, RefreshCcw, ShieldCheck, Share2 } from "lucide-react";

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
            <Navbar />

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto mb-20 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
                    >
                        Powerful <span className="text-gray-500">Intelligence</span>.
                    </motion.h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Everything you need to dominate social media without lifting a finger.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Brain className="w-8 h-8 text-purple-400" />}
                        title="Cognitive Analysis"
                        desc="Our agents don't just clear data; they understand context, tone, and sentiment using state-of-the-art LLMs."
                        delay={0}
                    />
                    <FeatureCard
                        icon={<RefreshCcw className="w-8 h-8 text-blue-400" />}
                        title="Autopilot Scrapers"
                        desc="Self-healing scrapers that adapt to LinkedIn and X UI changes instantly. Zero maintenance required."
                        delay={0.1}
                    />
                    <FeatureCard
                        icon={<Layers className="w-8 h-8 text-green-400" />}
                        title="Cross-Platform Logic"
                        desc="Connect dots between your newsletters and your tweets. See the holistic picture of your growth."
                        delay={0.2}
                    />
                    <FeatureCard
                        icon={<Zap className="w-8 h-8 text-yellow-400" />}
                        title="Instant Strategy"
                        desc="Get daily action plans. 'Post this topic at 9am'. 'Reply to this user'. Executable advice."
                        delay={0.3}
                    />
                    <FeatureCard
                        icon={<ShieldCheck className="w-8 h-8 text-red-400" />}
                        title="Enterprise Security"
                        desc="Your data is encrypted and isolated. We never train our base models on your private metrics."
                        delay={0.4}
                    />
                    <FeatureCard
                        icon={<Share2 className="w-8 h-8 text-orange-400" />}
                        title="Viral Prediction"
                        desc="Test your drafts against our AI audience simulator before you hit publish."
                        delay={0.5}
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
}

function FeatureCard({ icon, title, desc, delay }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="p-8 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-white/20 transition group"
        >
            <div className="mb-6 p-3 bg-white/5 rounded-xl w-fit group-hover:bg-white/10 transition-colors">
                {icon}
            </div>
            <h3 className="text-2xl font-bold mb-4">{title}</h3>
            <p className="text-gray-400 leading-relaxed">
                {desc}
            </p>
        </motion.div>
    )
}
