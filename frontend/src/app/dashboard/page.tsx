"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AgentOrchestrator from "@/components/AgentOrchestrator";
import { RefreshCcw, LayoutDashboard, MessageSquare, ThumbsUp, Repeat, Sparkles, TrendingUp, Calendar, ArrowUpRight, Search, Filter, Zap, Shield, Globe, X, Maximize2, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from 'react-markdown';

interface Post {
    id: number;
    content: string;
    post_type: string;
    reactions: number;
    comments: number;
    reposts: number;
    scraped_at: string;
}

export default function Dashboard() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
    const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

    const fetchPosts = async () => {
        try {
            const res = await fetch("http://localhost:8000/posts");
            const data = await res.json();
            setPosts(data);
        } catch (e) {
            console.error("Failed to fetch posts", e);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleScrapeClick = () => {
        setIsConnectModalOpen(true);
    };

    const handleConnectAndSync = async (creds: any) => {
        setLoading(true);
        // Close modal immediately to show loading state on button or keep it open? 
        // Let's keep it open or close it? The UI design has loading state in modal. 
        // But the button in main UI also has loading state. 
        // Let's close modal and let main UI show loading.
        setIsConnectModalOpen(false);

        try {
            await fetch("http://localhost:8000/scrape", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    limit: 10,
                    email: creds.email,
                    password: creds.password,
                    username: creds.username
                }),
            });
            await fetchPosts();
        } catch (e) {
            console.error("Scrape failed", e);
            alert("Failed to scrape. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    const handleAnalyze = async () => {
        setAnalyzing(true);
        try {
            const res = await fetch("http://localhost:8000/analyze", {
                method: "POST",
            });
            const data = await res.json();
            setAnalysis(data.analysis);
            setIsAnalysisModalOpen(true); // Auto open on completion
        } catch (e) {
            console.error("Analysis failed", e);
        } finally {
            setAnalyzing(false);
        }
    };

    // Derived stats
    const totalReactions = posts.reduce((acc, p) => acc + p.reactions, 0);
    const totalComments = posts.reduce((acc, p) => acc + p.comments, 0);
    const avgEngagement = posts.length ? Math.round((totalReactions + totalComments) / posts.length) : 0;

    return (
        <div className="min-h-screen bg-black text-gray-200 font-sans selection:bg-white selection:text-black flex flex-col">
            <Navbar />

            <main className="flex-grow pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto space-y-12">

                    {/* Header Controls */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-4xl font-bold text-white tracking-tight">Command Center</h1>
                                <span className="px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-bold uppercase tracking-wider animate-pulse">
                                    Live
                                </span>
                            </div>
                            <p className="text-gray-400">Manage your autonomous agents and analyze performance.</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleScrapeClick}
                                disabled={loading}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${loading
                                    ? 'bg-zinc-800 text-gray-500 cursor-not-allowed'
                                    : 'bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]'
                                    }`}
                            >
                                <RefreshCcw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                                {loading ? "Syncing..." : "Sync LinkedIn"}
                            </button>
                            <button
                                onClick={handleAnalyze}
                                disabled={analyzing}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full border font-bold transition-all ${analyzing
                                    ? 'bg-zinc-900 border-zinc-800 text-gray-500 cursor-not-allowed'
                                    : 'bg-zinc-900 border-white/20 text-white hover:bg-zinc-800 hover:border-white/40'
                                    }`}
                            >
                                <Sparkles className={`w-4 h-4 ${analyzing ? "animate-pulse text-yellow-500" : "text-yellow-500"}`} />
                                {analyzing ? "Processing..." : "Run AI Analysis"}
                            </button>
                        </div>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                        <StatCard label="Total Posts" value={posts.length} icon={<LayoutDashboard className="w-5 h-5 text-purple-400" />} delay={0.1} />
                        <StatCard label="Total Reactions" value={totalReactions} icon={<ThumbsUp className="w-5 h-5 text-blue-400" />} delay={0.2} />
                        <StatCard label="Avg. Engagement" value={avgEngagement} icon={<TrendingUp className="w-5 h-5 text-green-400" />} delay={0.3} />
                        <StatCard label="Pending Insights" value={posts.length > 0 && !analysis ? "1" : "0"} icon={<Sparkles className="w-5 h-5 text-yellow-400" />} highlight delay={0.4} />
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Feed */}
                        <div className="lg:col-span-2 space-y-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center justify-between mb-2"
                            >
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <LayoutDashboard className="w-5 h-5 text-gray-500" /> Recent Activity
                                </h2>
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-white/10 rounded-lg transition"><Search className="w-4 h-4 text-gray-500" /></button>
                                    <button className="p-2 hover:bg-white/10 rounded-lg transition"><Filter className="w-4 h-4 text-gray-500" /></button>
                                </div>
                            </motion.div>

                            <AnimatePresence>
                                {posts.map((post, i) => (
                                    <motion.div
                                        key={post.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * i }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="group relative bg-zinc-900/40 border border-white/5 hover:border-white/20 p-6 rounded-2xl transition-all duration-300 hover:bg-zinc-900 backdrop-blur-sm"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex gap-2">
                                                <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border rounded-md transition-colors ${post.post_type === 'article' ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' :
                                                    post.post_type === 'video' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                                                        'bg-blue-500/10 border-blue-500/20 text-blue-400'
                                                    }`}>
                                                    {post.post_type}
                                                </span>
                                            </div>
                                            <span className="text-xs text-gray-500 flex items-center gap-1 font-mono">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(post.scraped_at).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-6 font-light group-hover:text-white transition-colors">
                                            {post.content}
                                        </p>

                                        <div className="flex items-center gap-6 pt-4 border-t border-white/5 group-hover:border-white/10 transition-colors">
                                            <Metric icon={<ThumbsUp className="w-4 h-4" />} value={post.reactions} />
                                            <Metric icon={<MessageSquare className="w-4 h-4" />} value={post.comments} />
                                            <Metric icon={<Repeat className="w-4 h-4" />} value={post.reposts} />
                                            <button className="ml-auto text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
                                                View <ArrowUpRight className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {posts.length === 0 && !loading && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-2xl bg-white/5"
                                >
                                    <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4 text-gray-600 border border-white/5">
                                        <RefreshCcw className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">No Data Found</h3>
                                    <p className="text-gray-500 text-sm">Sync your LinkedIn account to populate the dashboard.</p>
                                </motion.div>
                            )}
                        </div>

                        {/* AI Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="lg:col-span-1"
                        >
                            <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 sticky top-32 backdrop-blur-md flex flex-col h-fit">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-yellow-500" />
                                        Agent Insights
                                    </h2>
                                    {analysis && (
                                        <button
                                            onClick={() => setIsAnalysisModalOpen(true)}
                                            className="p-1.5 hover:bg-white/10 rounded-md transition text-gray-400 hover:text-white"
                                            title="View Full Report"
                                        >
                                            <Maximize2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>

                                {analysis ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="relative"
                                    >
                                        <div className="prose prose-invert prose-sm max-w-none line-clamp-[10] opacity-80 mb-4">
                                            <ReactMarkdown>{analysis}</ReactMarkdown>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent pointer-events-none" />
                                        <button
                                            onClick={() => setIsAnalysisModalOpen(true)}
                                            className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-xl text-sm font-bold text-white transition flex items-center justify-center gap-2"
                                        >
                                            <FileText className="w-4 h-4" /> View Full Strategy Report
                                        </button>
                                    </motion.div>
                                ) : (
                                    <div className="text-center py-12 px-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-500/20">
                                            <Brain className="w-8 h-8 text-yellow-500" />
                                        </div>
                                        <h3 className="text-white font-bold mb-2">Ready to Analyze</h3>
                                        <p className="text-xs text-gray-500 leading-relaxed">
                                            Our agents are standing by to process your latest content performance.
                                        </p>
                                    </div>
                                )}

                                {/* System Status */}
                                <div className="mt-8 pt-6 border-t border-white/5">
                                    <div className="flex justify-between items-center text-[10px] text-gray-500 uppercase tracking-widest font-mono">
                                        <span>Agent: Gemini 2.5 Flash</span>
                                        <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Active</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="py-12 border-t border-white/10 mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        <FeatureHighlight icon={<Zap className="w-6 h-6 text-purple-400" />} title="Supercharge" desc="Upgrade to pro agents for 10x faster scraping." />
                        <FeatureHighlight icon={<Shield className="w-6 h-6 text-blue-400" />} title="Secure Vault" desc="Your data is encrypted and isolated." />
                        <FeatureHighlight icon={<Globe className="w-6 h-6 text-green-400" />} title="Global Reach" desc="Translate insights into 40+ languages." />
                    </motion.div>

                </div>
            </main>

            <Footer />

            <AnalysisModal
                isOpen={isAnalysisModalOpen}
                onClose={() => setIsAnalysisModalOpen(false)}
                content={analysis || ""}
            />

            <ConnectLinkedInModal
                isOpen={isConnectModalOpen}
                onClose={() => setIsConnectModalOpen(false)}
                onConnect={handleConnectAndSync}
                loading={loading}
            />

            <AnimatePresence>
                {(loading || analyzing) && (
                    <AgentOrchestrator mode={loading ? 'scraping' : analyzing ? 'analysis' : null} />
                )}
            </AnimatePresence>
        </div>
    );
}

function ConnectLinkedInModal({ isOpen, onClose, onConnect, loading }: { isOpen: boolean, onClose: () => void, onConnect: (creds: any) => void, loading: boolean }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConnect({ email, password, username });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
                <div className="p-6 border-b border-white/10 bg-zinc-900/50 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <RefreshCcw className="w-5 h-5 text-blue-500" /> Connect LinkedIn
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Email / Login ID</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Username / Profile URL</label>
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition"
                            placeholder="johndoe or linkedin.com/in/johndoe"
                        />
                        <p className="text-xs text-gray-500">We use this to verify login and navigate to your profile.</p>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-400 hover:text-white transition">Cancel</button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition flex items-center gap-2 disabled:opacity-50"
                        >
                            {loading ? <RefreshCcw className="w-4 h-4 animate-spin" /> : null}
                            {loading ? "Syncing..." : "Start Sync"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

function AnalysisModal({ isOpen, onClose, content }: { isOpen: boolean, onClose: () => void, content: string }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-4xl max-h-[85vh] bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-zinc-900/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                            <Sparkles className="w-5 h-5 text-yellow-500" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Strategic Analysis</h2>
                            <p className="text-xs text-gray-500 font-mono">GENERATED BY GEMINI 2.5 Flash</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition text-gray-400 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h2:text-white prose-p:text-gray-300 prose-li:text-gray-300 prose-strong:text-white prose-strong:font-bold">
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-zinc-900/50 flex justify-end gap-3">
                    <button onClick={onClose} className="px-6 py-3 rounded-xl hover:bg-white/5 text-gray-300 font-medium transition">
                        Close
                    </button>
                    <button className="px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition flex items-center gap-2">
                        <FileText className="w-4 h-4" /> Export PDF
                    </button>
                </div>
            </motion.div>
        </div>
    )
}

function StatCard({ label, value, icon, highlight = false, delay }: { label: string, value: string | number, icon: any, highlight?: boolean, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.3 }}
            className={`p-6 rounded-2xl border flex flex-col justify-between h-32 relative overflow-hidden group hover:border-white/20 transition-all ${highlight ? "bg-zinc-900 border-yellow-500/20" : "bg-zinc-900/30 border-white/5"
                }`}
        >
            {highlight && <div className="absolute inset-0 bg-yellow-500/5 -z-10" />}
            <div className="flex justify-between items-start">
                <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">{label}</span>
                <span className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">{icon}</span>
            </div>
            <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
        </motion.div>
    )
}

function Metric({ icon, value }: { icon: any, value: number }) {
    return (
        <div className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-white transition-colors cursor-default">
            {icon}
            <span>{value}</span>
        </div>
    )
}

function FeatureHighlight({ icon, title, desc }: any) {
    return (
        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors cursor-default">
            <div className="p-3 bg-zinc-900 rounded-lg border border-white/10">{icon}</div>
            <div>
                <h4 className="text-white font-bold mb-1">{title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
        </div>
    )
}

function Brain(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
            <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
            <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
            <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
            <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
            <path d="M3.477 10.896a4 4 0 0 1 1.155-1.758" />
            <path d="M19.368 9.138a4 4 0 0 1 1.155 1.758" />
        </svg>
    )
}
