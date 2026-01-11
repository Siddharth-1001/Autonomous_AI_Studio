"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function CaseStudiesPage() {
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
                        Proven <span className="text-gray-500">Results</span>.
                    </motion.h1>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    <CaseStudy
                        client="Sarah Jenks"
                        role="Tech Influencer"
                        result="+310% Growth"
                        desc="Sarah was spending 20 hours a week on content. With our Autonomous Agents, she cut that to 2 hours while tripling her following."
                        imageColor="bg-purple-900/20"
                    />
                    <CaseStudy
                        client="Davide Silva"
                        role="SaaS Founder"
                        result="5X Engagement"
                        desc="Davide needed leads, not just likes. Our strategy agent focused on 'Problem-Aware' content, driving a massive spike in inbound DMs."
                        imageColor="bg-blue-900/20"
                    />
                    <CaseStudy
                        client="Nexus Corp"
                        role="Enterprise Team"
                        result="1.2M Impressions"
                        desc="Nexus needed to coordinate 5 executive profiles. Our system synchronized their posting schedules to dominate the feed on launch day."
                        imageColor="bg-green-900/20"
                    />
                    <CaseStudy
                        client="Elena Roc"
                        role="VC Associate"
                        result="Top Voice Badge"
                        desc="Elena wanted authority. Our deep-dive analysis agent helped her spot trends 2 weeks before they went mainstream."
                        imageColor="bg-yellow-900/20"
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
}

function CaseStudy({ client, role, result, desc, imageColor }: any) {
    return (
        <div className="group cursor-pointer">
            <div className={`h-80 rounded-2xl mb-6 relative overflow-hidden border border-white/5 ${imageColor} transition-all group-hover:border-white/20`}>
                <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold opacity-30 group-hover:opacity-50 transition-opacity">
                    {result}
                </div>
            </div>
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="text-2xl font-bold mb-1">{client}</h3>
                    <p className="text-sm text-gray-500 font-mono mb-4">{role}</p>
                </div>
                <div className="p-2 border border-white/10 rounded-full group-hover:bg-white group-hover:text-black transition">
                    <ArrowUpRight size={20} />
                </div>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md">
                {desc}
            </p>
        </div>
    )
}
