"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, Brain, Linkedin, Twitter, MessageCircle, FileText, CheckCircle2, LayoutDashboard, ThumbsUp, TrendingUp, Sparkles, MessageSquare, Repeat, Search, Filter, Play } from "lucide-react";
import { motion } from "framer-motion";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center text-center px-4 pt-48 pb-32 space-y-8 max-w-5xl mx-auto z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] -z-10" />
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex justify-center mb-8">
                        <span className="px-4 py-1.5 text-xs font-mono uppercase tracking-widest border border-white/10 bg-white/5 rounded-full text-gray-400 flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            System V1.0 Online
                        </span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                        BEYOND ANALYTICS.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">PURE INTELLIGENCE.</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
                        The first social OS powered by autonomous agents. Stop staring at fragmented dashboards. Let AI scrape, analyze, and strategize for you.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 pt-8"
                >
                    <Link href="/dashboard" className="px-8 py-4 bg-white text-black text-lg font-bold rounded-full hover:bg-gray-200 transition flex items-center justify-center gap-2">
                        Enter Studio <ArrowRight className="w-5 h-5" />
                    </Link>
                    <button className="px-8 py-4 bg-transparent border border-white/20 text-white text-lg font-bold rounded-full hover:bg-white/10 transition flex items-center justify-center gap-2">
                        <Play className="w-4 h-4 fill-white" /> Watch Demo
                    </button>
                </motion.div>
            </section>

            {/* SECTION 1: Infographic Animation (Agentic Analysis) */}
            <section id="features" className="py-32 bg-zinc-950/50 relative overflow-hidden border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-sm font-mono text-gray-500 mb-20 text-center uppercase tracking-widest">Autonomous Data Pipeline</h2>

                    <div className="relative flex flex-col md:flex-row items-center justify-between gap-12">
                        {/* Left: Sources */}
                        <div className="flex flex-col gap-4 w-full md:w-auto">
                            <SocialNode icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" sub="Connected" delay={0} />
                            <SocialNode icon={<Twitter className="w-5 h-5" />} label="X (Twitter)" sub="Connected" delay={0.2} />
                            <SocialNode icon={<MessageCircle className="w-5 h-5" />} label="Reddit" sub="Scanning" delay={0.4} />
                            <SocialNode icon={<FileText className="w-5 h-5" />} label="Substack" sub="Pending" delay={0.6} />
                        </div>

                        {/* ANIMATION CONNECTION LINES */}
                        <div className="hidden md:flex flex-1 h-[1px] bg-gradient-to-r from-white/10 via-white/20 to-white/10 relative overflow-hidden">
                            <motion.div
                                animate={{ x: [-100, 500], opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
                            />
                        </div>

                        {/* Center: The AI Brain */}
                        <div className="relative z-10 mx-auto md:mx-12 my-8 md:my-0">
                            <motion.div
                                animate={{ boxShadow: ["0 0 30px rgba(255,255,255,0.05)", "0 0 60px rgba(255,255,255,0.2)", "0 0 30px rgba(255,255,255,0.05)"] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="w-48 h-48 bg-black border border-white/20 rounded-full flex flex-col items-center justify-center relative backdrop-blur-xl"
                            >
                                <Brain className="w-16 h-16 text-white mb-4" />
                                <div className="text-xs font-bold tracking-widest">CORE AGENT</div>
                                <div className="text-[10px] text-gray-500 mt-1 font-mono">PROCESSING</div>
                            </motion.div>
                        </div>

                        {/* ANIMATION CONNECTION LINES RIGHT */}
                        <div className="hidden md:flex flex-1 h-[1px] bg-gradient-to-r from-white/10 via-white/20 to-white/10 relative overflow-hidden">
                            <motion.div
                                animate={{ x: [-100, 500], opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.8 }}
                                className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
                            />
                        </div>

                        {/* Right: Outputs */}
                        <div className="flex flex-col gap-4 text-right w-full md:w-auto">
                            <OutputNode label="Growth Strategy" sub="Generated" delay={0.8} />
                            <OutputNode label="Viral Insights" sub="Ready" delay={1.0} />
                            <OutputNode label="Content Calendar" sub="Drafted" delay={1.2} />
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: Full Analytic Dashboard Mockup */}
            <section className="py-32 px-4 relative overflow-hidden bg-black">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black -z-20" />

                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Command Center</h2>
                        <p className="text-xl text-gray-400 font-light">Your entire digital footprint. One premium interface.</p>
                    </div>

                    {/* HIGH FIDELITY MOCKUP CONTAINER */}
                    <motion.div
                        initial={{ y: 50, opacity: 0, rotateX: 5 }}
                        whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="relative rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-[0_0_100px_rgba(255,255,255,0.05)] overflow-hidden max-w-[1200px] mx-auto transform-gpu"
                        style={{ perspective: "2000px" }}
                    >
                        {/* Mock Window Header */}
                        <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2 bg-white/5 justify-between">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                            </div>
                        </div>

                        {/* Visual Dashboard Mockup Content */}
                        <div className="p-8 grid grid-cols-1 md:grid-cols-12 gap-8 bg-[#050505]">

                            {/* LEFT PANEL */}
                            <div className="col-span-1 md:col-span-8 space-y-8">
                                {/* Stats Row */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <MockStat label="Total Posts" value="1,284" icon={<LayoutDashboard size={16} />} />
                                    <MockStat label="Total Reactions" value="84.2K" icon={<ThumbsUp size={16} />} />
                                    <MockStat label="Engagement" value="5.8%" icon={<TrendingUp size={16} />} trend="+1.2%" />
                                </div>

                                {/* Post List */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm text-gray-500 pb-2 border-b border-white/5">
                                        <span>Recent Activity</span>
                                        <div className="flex gap-2"><Filter size={14} /><Search size={14} /></div>
                                    </div>

                                    <MockPost
                                        type="LinkedIn"
                                        date="Today, 10:42 AM"
                                        content="Agentic AI is shifting the paradigm from 'copilots' to 'autonomy'. We are no longer just prompting; we are orchestrating systems. #AI #FutureOfWork"
                                        likes="1,240"
                                        comments="342"
                                        reposts="85"
                                    />
                                    <MockPost
                                        type="Twitter"
                                        date="Yesterday, 4:15 PM"
                                        content="Just shipped the new RAG pipeline for the Analytics Studio. The latency drop is insane using pure vector search. 🚀"
                                        likes="892"
                                        comments="124"
                                        reposts="210"
                                    />
                                </div>
                            </div>

                            {/* RIGHT PANEL - AI SIDEBAR */}
                            <div className="col-span-1 md:col-span-4">
                                <div className="bg-zinc-900/30 border border-white/10 rounded-xl p-6 h-full backdrop-blur-sm">
                                    <div className="flex items-center gap-2 mb-6 text-yellow-500 font-bold">
                                        <Sparkles size={18} /> Agent Insights
                                    </div>
                                    <div className="space-y-6">
                                        <div className="text-sm text-gray-300 leading-relaxed font-light">
                                            <strong className="text-white block mb-2">Analysis Complete</strong>
                                            Based on your last 10 posts, <span className="text-white font-medium">technical deep-dives</span> are outperforming general updates by <span className="text-green-400">240%</span>.
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                            <div className="text-xs uppercase text-gray-500 tracking-wider mb-2 font-bold">Action Item</div>
                                            <p className="text-sm text-gray-300">Draft a thread comparing "Agentic vs. Generative AI" for tomorrow morning (9:00 AM EST).</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 3: Case Studies */}
            <section id="casestudies" className="py-32 bg-zinc-900/30 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Proven Results</h2>
                        <p className="text-lg text-gray-400 font-light">See how creators scale with autonomy.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <CaseStudyCard
                            name="Sarah Jenks"
                            role="Tech Influencer"
                            description="Successfully scaled from 15k to 85k followers in 3 months by letting the strategy agent optimize her posting schedule."
                            stat1="85k Followers"
                            stat2="+310% Growth"
                        />
                        <CaseStudyCard
                            name="Davide Silva"
                            role="SaaS Founder"
                            description="Automated his entire thought leadership pipeline. The system now drafts 90% of his LinkedIn content."
                            stat1="20h/week Saved"
                            stat2="5X Engagement"
                        />
                    </div>
                </div>
            </section>

            {/* SECTION 4: Autonomy Features */}
            <section className="py-32 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-5xl font-bold mb-8 leading-tight">Fully Autonomous.<br />Truly Useful.</h2>
                        <div className="space-y-8">
                            <AutonomyFeature
                                title="Self-Healing Scrapers"
                                desc="Our agents detect UI changes on LinkedIn and X, automatically adjusting selectors without crashing."
                            />
                            <AutonomyFeature
                                title="Cross-Platform Correlation"
                                desc="Identify how a tweet's viral spike influences your LinkedIn profile views in real-time."
                            />
                        </div>
                    </div>
                    <div className="relative group mt-8 md:mt-0">
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-3xl -rotate-6 transform transition-transform group-hover:rotate-0 duration-500" />
                        <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 relative rotate-3 transform shadow-2xl transition-transform group-hover:rotate-0 duration-500">
                            <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
                                <div className="flex gap-2 text-xs font-mono text-gray-500">
                                    &gt;_ SYSTEM_LOGS
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-xs text-green-500 font-bold uppercase">Live</span>
                                </div>
                            </div>
                            <div className="space-y-6 font-mono text-sm">
                                <AgentLog time="10:42:05" msg="[Scraper] LinkedIn session verified." />
                                <AgentLog time="10:42:15" msg="[Analyst] Engagement rate +15% vs last week." highlight />
                                <AgentLog time="10:43:01" msg="[Strategy] Generating 3 ideas based on outlier data..." highlight />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5: CTA */}
            <section className="py-32 px-4 relative">
                <div className="absolute inset-0 bg-white/5 -z-10" />
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter">READY TO SCALE?</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Join the waitlist for the most advanced agentic analytics platform ever built.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="px-6 py-4 rounded-full bg-black border border-white/20 text-white w-full sm:w-80 focus:outline-none focus:border-white transition"
                        />
                        <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition whitespace-nowrap">
                            Get Early Access
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}


// --- SUB COMPONENTS ---

// CaseStudyCard, SocialNode, OutputNode, MockStat, MockPost, AutonomyFeature, AgentLog remain here as they are specific to Landing Page sections.


function CaseStudyCard({ name, role, description, stat1, stat2 }: any) {
    return (
        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 hover:bg-zinc-800 transition group">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-700 rounded-full" />
                <div>
                    <div className="font-bold text-white">{name}</div>
                    <div className="text-sm text-gray-500 font-mono">{role}</div>
                </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-8 flex-1">{description}</p>
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                <div>
                    <div className="text-xl font-bold text-white mb-1 group-hover:text-green-400 transition">{stat1}</div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-500">Metric</div>
                </div>
                <div>
                    <div className="text-xl font-bold text-white mb-1 group-hover:text-green-400 transition">{stat2}</div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-500">Result</div>
                </div>
            </div>
        </div>
    )
}

function SocialNode({ icon, label, sub, delay }: { icon: any, label: string, sub: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 bg-[#0A0A0A] border border-white/10 px-6 py-4 rounded-xl w-full md:w-64 group hover:border-white/30 transition-all cursor-default"
        >
            <div className="p-2.5 bg-white/5 rounded-lg text-white group-hover:bg-white group-hover:text-black transition-colors">{icon}</div>
            <div>
                <div className="font-bold text-sm tracking-wide">{label}</div>
                <div className="text-xs text-gray-500 font-mono">{sub}</div>
            </div>
        </motion.div>
    )
}

function OutputNode({ label, sub, delay }: { label: string, sub: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center justify-between gap-4 bg-white text-black px-6 py-4 rounded-xl w-full md:w-64 ml-auto hover:bg-gray-200 transition-colors cursor-default"
        >
            <div className="text-left">
                <div className="font-bold text-sm tracking-wide">{label}</div>
                <div className="text-xs text-gray-600 font-mono">{sub}</div>
            </div>
            <CheckCircle2 size={18} className="text-green-600" />
        </motion.div>
    )
}

function MockStat({ label, value, icon, trend }: { label: string, value: string, icon: any, trend?: string }) {
    return (
        <div className="bg-zinc-900/50 border border-white/5 p-4 rounded-lg flex flex-col justify-between h-24">
            <div className="flex justify-between items-start text-gray-500">
                <span className="text-[10px] uppercase tracking-wider">{label}</span>
                {icon}
            </div>
            <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-white">{value}</span>
                {trend && <span className="text-xs text-green-400 font-medium">{trend}</span>}
            </div>
        </div>
    )
}

function MockPost({ type, date, content, likes, comments, reposts, isArticle }: { type: string, date: string, content: string, likes: string, comments: string, reposts: string, isArticle?: boolean }) {
    return (
        <div className="bg-zinc-900/50 border border-white/5 p-4 rounded-lg hover:bg-zinc-900 transition-colors">
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${type === 'LinkedIn' ? 'bg-blue-900/20 border-blue-800 text-blue-400' : type === 'Twitter' ? 'bg-sky-900/20 border-sky-800 text-sky-400' : 'bg-orange-900/20 border-orange-800 text-orange-400'}`}>
                        {type}
                    </span>
                    <span className="text-[10px] text-gray-500">{date}</span>
                </div>
            </div>
            <div className="text-sm text-gray-300 font-light leading-relaxed mb-4">
                {content}
            </div>
            {isArticle && <div className="h-24 bg-white/5 rounded-md mb-4 border border-white/5 flex items-center justify-center text-xs text-gray-600">Cover Image Placeholder</div>}
            <div className="flex items-center gap-6 text-xs text-gray-500">
                <div className="flex items-center gap-1 hover:text-white transition"><ThumbsUp size={12} /> {likes}</div>
                <div className="flex items-center gap-1 hover:text-white transition"><MessageSquare size={12} /> {comments}</div>
                <div className="flex items-center gap-1 hover:text-white transition"><Repeat size={12} /> {reposts}</div>
            </div>
        </div>
    )
}

function AutonomyFeature({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="flex gap-4">
            <div className="mt-1">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <CheckCircle2 size={16} className="text-white" />
                </div>
            </div>
            <div>
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{desc}</p>
            </div>
        </div>
    )
}

function AgentLog({ time, msg, highlight = false }: { time: string, msg: string, highlight?: boolean }) {
    return (
        <div className={`flex gap-4 ${highlight ? 'text-white' : 'text-gray-500'}`}>
            <span className="opacity-40 min-w-[80px]">{time}</span>
            <span>{msg}</span>
        </div>
    )
}
