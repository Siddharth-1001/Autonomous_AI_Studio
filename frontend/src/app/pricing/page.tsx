"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, Zap, Brain, Rocket } from "lucide-react";
import { motion } from "framer-motion";

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
            <Navbar />

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center mb-20 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-gray-300 mb-6 border border-white/10">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Simple, transparent pricing
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                            Invest in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Autonomy</span>.
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Stop paying for tools that make you work harder. Start paying for results.
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <PricingCard
                        title="Creator"
                        price="$29"
                        description="Perfect for individuals building a personal brand."
                        features={["3 Social Accounts", "Basic Analytics", "Daily AI Insights", "Content Drafting"]}
                        delay={0.1}
                    />
                    <PricingCard
                        title="Professional"
                        price="$79"
                        description="For serious creators and small teams scaling up."
                        features={["10 Social Accounts", "Advanced Analytics", "Real-time AI Strategy", "Viral Prediction", "Competitor Analysis"]}
                        highlight={true}
                        delay={0.2}
                    />
                    <PricingCard
                        title="Agency"
                        price="$299"
                        description="Manage multiple brands with full autonomy."
                        features={["Unlimited Accounts", "White-label Reports", "API Access", "Dedicated Strategy Agent", "Priority Support"]}
                        delay={0.3}
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
}

function PricingCard({ title, price, description, features, highlight = false, delay }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className={`relative p-8 rounded-3xl border flex flex-col ${highlight ? 'bg-zinc-900 border-white/20 shadow-2xl scale-105 z-10' : 'bg-black border-white/10 hover:bg-zinc-900/50 transition'}`}
        >
            {highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full">
                    Most Popular
                </div>
            )}
            <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-400 mb-2">{title}</h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-white">{price}</span>
                    <span className="text-gray-500">/month</span>
                </div>
                <p className="mt-4 text-sm text-gray-400 leading-relaxed">{description}</p>
            </div>

            <div className="space-y-4 mb-8 flex-1">
                {features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                        <CheckCircle2 size={16} className={highlight ? "text-green-400" : "text-gray-600"} />
                        <span className="text-gray-300">{feature}</span>
                    </div>
                ))}
            </div>

            <button className={`w-full py-4 rounded-xl font-bold transition ${highlight ? 'bg-white text-black hover:bg-gray-200' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                Get Started
            </button>
        </motion.div>
    )
}
