"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ChangelogPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
            <Navbar />

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-5xl font-bold tracking-tighter mb-16 text-center">Changelog</h1>

                    <div className="space-y-16 relative border-l border-white/10 ml-4 md:ml-0 pl-8 md:pl-0">
                        <ChangeEntry
                            version="v1.0.0"
                            date="January 10, 2026"
                            title="Public Launch"
                            changes={[
                                "Initial release of Autonomous AI Studio.",
                                "LinkedIn scraper (v1) with self-healing selectors.",
                                "Agentic Analysis Dashboard.",
                                "Multi-agent workflow engine (AutoGen integration)."
                            ]}
                        />
                        <ChangeEntry
                            version="v0.9.5"
                            date="December 28, 2025"
                            title="Beta Access"
                            changes={[
                                "Added 'Viral Prediction' model.",
                                "Dark mode UI overhaul.",
                                "Fixed asyncio event loop issues on Windows."
                            ]}
                        />
                        <ChangeEntry
                            version="v0.9.0"
                            date="December 15, 2025"
                            title="Alpha Test"
                            changes={[
                                "Core scraping logic implemented.",
                                "Basic LLM integration (Gemini 2.5 Flash).",
                            ]}
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

function ChangeEntry({ version, date, title, changes }: any) {
    return (
        <div className="relative md:grid md:grid-cols-5 md:gap-12">
            <div className="md:col-span-1 md:text-right mb-4 md:mb-0 relative">
                <div className="absolute -left-[41px] md:-right-[57px] top-1.5 w-4 h-4 bg-black border-2 border-white rounded-full z-10" />
                <div className="text-sm font-bold text-white">{version}</div>
                <div className="text-xs text-gray-500 font-mono">{date}</div>
            </div>
            <div className="md:col-span-4 bg-zinc-900/30 p-8 rounded-2xl border border-white/5">
                <h3 className="text-xl font-bold mb-6">{title}</h3>
                <ul className="space-y-3">
                    {changes.map((change: string, i: number) => (
                        <li key={i} className="flex gap-3 text-gray-400 text-sm leading-relaxed">
                            <span className="text-white mt-1.5 w-1 h-1 bg-white rounded-full block flex-shrink-0" />
                            {change}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
