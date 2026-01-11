"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
            <Navbar />

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto space-y-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
                            We believe in <span className="text-white decoration-4 underline decoration-blue-500">Autonomy</span>.
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed">
                            The era of manual "social media management" is over. Humans should create. Machines should distribute, analyze, and optimize.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-12 border-t border-white/10">
                        <div className="space-y-6 text-lg text-gray-300">
                            <p>
                                Autonomous AI Studio was born from a frustration with fragmentation. Creators today have to be data scientists, copywriters, and strategists all at once.
                            </p>
                            <p>
                                We built a system that takes over the busy work. By leveraging agentic workflows, we don't just report on what happened—we tell you what to do next.
                            </p>
                        </div>
                        <div className="h-64 bg-zinc-900 rounded-lg border border-white/10 flex items-center justify-center text-gray-600">
                            [Office/Team Image Placeholder]
                        </div>
                    </div>

                    <div className="space-y-8 text-center pt-12 border-t border-white/10">
                        <h2 className="text-3xl font-bold">Our Team</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <TeamMember name="Siddharth" role="Founder & Engineer" />
                            <TeamMember name="Aria AI" role="Chief Agent Architect" />
                            <TeamMember name="Nexus" role="Strategy Bot" />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

function TeamMember({ name, role }: any) {
    return (
        <div className="p-6 rounded-xl bg-zinc-900/30 border border-white/5">
            <div className="w-20 h-20 bg-gray-800 rounded-full mx-auto mb-4 border border-white/10" />
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-sm text-gray-500">{role}</p>
        </div>
    )
}
