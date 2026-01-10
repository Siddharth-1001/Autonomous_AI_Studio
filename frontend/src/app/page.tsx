"use client";

import { useState, useEffect } from "react";
import { RefreshCcw, BarChart3, MessageSquare, ThumbsUp, Repeat, Sparkles } from "lucide-react";

interface Post {
    id: number;
    content: string;
    post_type: string;
    reactions: number;
    comments: number;
    reposts: number;
    scraped_at: string;
}

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState<string | null>(null);

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

    const handleScrape = async () => {
        setLoading(true);
        try {
            await fetch("http://localhost:8000/scrape", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ limit: 10 }),
            });
            await fetchPosts();
        } catch (e) {
            console.error("Scrape failed", e);
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
        } catch (e) {
            console.error("Analysis failed", e);
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <header className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Analytics Studio AI</h1>
                    <p className="text-gray-400">Agentic insights for your social media presence.</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleScrape}
                        disabled={loading}
                        className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition disabled:opacity-50"
                    >
                        {loading ? <RefreshCcw className="animate-spin w-4 h-4" /> : <RefreshCcw className="w-4 h-4" />}
                        {loading ? "Scraping..." : "Scrape LinkedIn"}
                    </button>
                    <button
                        onClick={handleAnalyze}
                        disabled={analyzing}
                        className="flex items-center gap-2 bg-zinc-800 text-white px-4 py-2 rounded-md hover:bg-zinc-700 transition border border-zinc-700 disabled:opacity-50"
                    >
                        {analyzing ? <Sparkles className="animate-ping w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                        {analyzing ? "Analyzing..." : "Generate Insights"}
                    </button>
                </div>
            </header>

            {analysis && (
                <section className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg animate-fade-in">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-yellow-500" />
                        AI Analysis & Strategy
                    </h2>
                    <div className="prose prose-invert max-w-none whitespace-pre-wrap text-gray-300">
                        {analysis}
                    </div>
                </section>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <div key={post.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg hover:border-zinc-700 transition">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs uppercase tracking-wider text-gray-500 border border-zinc-800 px-2 py-1 rounded-full">{post.post_type}</span>
                            <span className="text-xs text-gray-500">{new Date(post.scraped_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm line-clamp-4 mb-6 text-gray-300 h-20">
                            {post.content}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-gray-400 border-t border-zinc-800 pt-4">
                            <div className="flex items-center gap-1">
                                <ThumbsUp className="w-4 h-4" /> {post.reactions}
                            </div>
                            <div className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" /> {post.comments}
                            </div>
                            <div className="flex items-center gap-1">
                                <Repeat className="w-4 h-4" /> {post.reposts}
                            </div>
                        </div>
                    </div>
                ))}
                {posts.length === 0 && !loading && (
                    <div className="col-span-full text-center py-20 text-gray-500">
                        No posts found. Try scraping some data.
                    </div>
                )}
            </div>
        </div>
    );
}
