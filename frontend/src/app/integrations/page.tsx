"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Linkedin, Twitter, MessageCircle, FileText, Slack, Github, Mail, Trello } from "lucide-react";

export default function IntegrationsPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
            <Navbar />

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto mb-20 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                        Connected <span className="text-gray-500">Everywhere</span>.
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Our agents live where you work. Seamlessly integrate with your existing stack.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <IntegrationCard icon={<Linkedin size={32} />} name="LinkedIn" status="Active" desc="Full scraper & posting support." />
                    <IntegrationCard icon={<Twitter size={32} />} name="X (Twitter)" status="Active" desc="Viral monitoring & thread generation." />
                    <IntegrationCard icon={<MessageCircle size={32} />} name="Reddit" status="Beta" desc="Subreddit scanning & trend detection." />
                    <IntegrationCard icon={<FileText size={32} />} name="Substack" status="Planned" desc="Newsletter to social resizing." />
                    <IntegrationCard icon={<Slack size={32} />} name="Slack" status="Planned" desc="Daily digests in your team channel." />
                    <IntegrationCard icon={<Github size={32} />} name="GitHub" status="Planned" desc="Turn commits into devlog posts." />
                    <IntegrationCard icon={<Mail size={32} />} name="Gmail" status="Planned" desc="Draft replies from your inbox." />
                    <IntegrationCard icon={<Trello size={32} />} name="Notion" status="Planned" desc="Sync content calendar instantly." />
                </div>
            </main>

            <Footer />
        </div>
    );
}

function IntegrationCard({ icon, name, status, desc }: any) {
    return (
        <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 flex flex-col gap-4 hover:bg-zinc-900 transition hover:border-white/30 cursor-pointer">
            <div className="flex justify-between items-start">
                <div className="p-3 bg-white/5 rounded-xl text-white">
                    {icon}
                </div>
                <div className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'}`}>
                    {status}
                </div>
            </div>
            <div>
                <h3 className="text-lg font-bold mb-1">{name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
        </div>
    )
}
