"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Globe, Database, Search, Zap, Code, Terminal, Cpu, Shield, Sparkles, Brain, Layers, PenTool, Radio } from "lucide-react";

interface AgentOrchestratorProps {
    mode: 'scraping' | 'analysis' | null;
}

export default function AgentOrchestrator({ mode }: AgentOrchestratorProps) {
    const [logs, setLogs] = useState<string[]>([]);

    // Config based on mode with technical but "process-rich" text
    const config = mode === 'scraping' ? {
        title: "Autonomous Extraction Swarm",
        coreIcon: <Globe className="w-16 h-16 text-blue-500" />,
        coreColor: "bg-blue-500/10 border-blue-500/30",
        ringColor: "border-blue-500/20",
        glowColor: "bg-blue-500",
        agents: [
            { icon: <Search className="w-6 h-6" />, name: "Navigator", color: "text-blue-400 bg-blue-950 border-blue-500/30" },
            { icon: <Code className="w-6 h-6" />, name: "Extractor", color: "text-cyan-400 bg-cyan-950 border-cyan-500/30" },
            { icon: <Database className="w-6 h-6" />, name: "Archiver", color: "text-indigo-400 bg-indigo-950 border-indigo-500/30" },
            { icon: <Shield className="w-6 h-6" />, name: "Sentinel", color: "text-sky-400 bg-sky-950 border-sky-500/30" },
        ],
        logLines: [
            "Initializing secure browser environment...",
            "Injecting stealth navigation protocols...",
            "Locating DOM elements with high precision...",
            "Harvesting raw data points...",
            "Filtering noise and irrelevant signals...",
            "Structuring unstructured content...",
            "Validating data integrity...",
            "Optimizing assets for storage...",
            "Finalizing extraction bundle...",
        ]
    } : {
        title: "Neural Analysis Engine",
        coreIcon: <Brain className="w-16 h-16 text-yellow-500" />,
        coreColor: "bg-yellow-500/10 border-yellow-500/30",
        ringColor: "border-yellow-500/20",
        glowColor: "bg-yellow-500",
        agents: [
            { icon: <Sparkles className="w-6 h-6" />, name: "Insight", color: "text-amber-400 bg-amber-950 border-amber-500/30" },
            { icon: <Cpu className="w-6 h-6" />, name: "Compute", color: "text-orange-400 bg-orange-950 border-orange-500/30" },
            { icon: <Layers className="w-6 h-6" />, name: "Pattern", color: "text-rose-400 bg-rose-950 border-rose-500/30" },
            { icon: <PenTool className="w-6 h-6" />, name: "Strategy", color: "text-yellow-400 bg-yellow-950 border-yellow-500/30" },
        ],
        logLines: [
            "Loading context into working memory...",
            "Tokenizing input for semantic analysis...",
            "Identifying key engagement patterns...",
            "Correlating signals across data points...",
            "Synthesizing strategic insights...",
            "Drafting actionable recommendations...",
            "Refining tone and clarity...",
            "Calculating confidence scores...",
            "Generating final intelligence report...",
        ]
    };

    // Log streaming effect
    useEffect(() => {
        if (!mode) return;
        setLogs([]);
        let currentIndex = 0;

        const interval = setInterval(() => {
            if (currentIndex < config.logLines.length) {
                setLogs(prev => {
                    const newLogs = [...prev, config.logLines[currentIndex]];
                    return newLogs.slice(-3); // Keep only last 3
                });
                currentIndex = (currentIndex + 1) % config.logLines.length;
            }
        }, 1200);

        return () => clearInterval(interval);
    }, [mode, config.logLines]);

    if (!mode) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center overflow-hidden"
        >
            {/* CSS-based Grid Background (No 404s) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }}
            />

            {/* Ambient Background Glow */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none ${mode === 'scraping' ? 'bg-blue-900/40' : 'bg-yellow-900/40'}`}
            />

            <div className="relative z-10 flex flex-col items-center w-full max-w-4xl px-4">

                {/* Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight flex items-center justify-center gap-3">
                        {config.coreIcon}
                        {config.title}
                    </h2>
                    <div className="flex items-center justify-center gap-2 text-sm font-mono text-gray-500 uppercase tracking-widest">
                        <span className={`w-2 h-2 rounded-full ${config.glowColor} animate-pulse shadow-[0_0_10px_currentColor]`} />
                        Autonomous System Actived
                    </div>
                </motion.div>

                {/* Main Visualization Core */}
                <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] flex items-center justify-center mb-16">

                    {/* Orbit Ring 1 (Static but dashed) */}
                    <div className={`absolute inset-0 rounded-full border border-dashed ${config.ringColor} opacity-30`} />

                    {/* Orbit Ring 2 (Rotating Container) */}
                    {/* Using a simplified rotation approach: The container rotates, forcing children to orbit. Children counter-rotate to stay upright. */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className={`absolute inset-4 md:inset-10 rounded-full border ${config.ringColor} opacity-40`}
                    >
                        {config.agents.map((agent, i) => {
                            // Position agents around the circle using absolute positioning + transforms
                            // angle in degrees
                            const angle = (i * 360) / config.agents.length;

                            return (
                                <div
                                    key={agent.name}
                                    className="absolute top-1/2 left-1/2 w-0 h-0"
                                    style={{
                                        transform: `rotate(${angle}deg) translate(0, -200px)` // Push out to radius (approx 200px)
                                    }}
                                >
                                    {/* Counter-rotate content to keep it upright */}
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                        // Rotate matches parent duration but negative
                                        className="flex flex-col items-center justify-center w-24 -ml-12 -mt-12" // Center the 0x0 origin
                                    >
                                        <div className={`p-4 rounded-xl border backdrop-blur-md shadow-lg mb-2 ${agent.color}`}>
                                            {agent.icon}
                                        </div>
                                        <div className="px-3 py-1 bg-black/80 rounded-full border border-white/10 backdrop-blur-md whitespace-nowrap">
                                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">{agent.name}</span>
                                        </div>
                                    </motion.div>
                                </div>
                            )
                        })}
                    </motion.div>

                    {/* Central Core */}
                    <div className="relative z-20 flex items-center justify-center">
                        <div className={`absolute inset-[-20px] rounded-full ${config.glowColor} blur-2xl opacity-20 animate-pulse`} />
                        <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full ${config.coreColor} border-2 flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-md bg-black/40`}>
                            {config.coreIcon}
                        </div>
                    </div>
                </div>

                {/* Log Stream */}
                <div className="w-full max-w-lg h-32 relative flex flex-col items-center justify-end pb-4 bg-gradient-to-t from-black via-transparent to-transparent">
                    <AnimatePresence mode="popLayout">
                        {logs.map((log, i) => (
                            <motion.div
                                key={`${log}-${i}`} // Ensure unique key for each instance
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                className="text-center my-1"
                            >
                                <span className={`text-sm md:text-base font-medium ${mode === 'scraping' ? 'text-blue-300' : 'text-yellow-300'}`}>
                                    {log}
                                </span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="flex gap-2 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: '0s' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>

            </div>
        </motion.div>
    );
}
