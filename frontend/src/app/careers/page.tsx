"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
            <Navbar />
            <main className="pt-40 pb-20 px-6 max-w-4xl mx-auto text-center">
                <h1 className="font-bold tracking-tighter mb-6 text-5xl">Join the Revolution</h1>
                <p className="text-xl text-gray-400 mb-12">We are building the operating system for the autonomous economy.</p>

                <div className="space-y-4">
                    <JobCard title="Senior AI Engineer" location="San Francisco / Remote" type="Full-time" />
                    <JobCard title="Frontend Artist" location="Remote" type="Full-time" />
                    <JobCard title="Growth Hacker" location="New York" type="Contract" />
                </div>
            </main>
            <Footer />
        </div>
    );
}

function JobCard({ title, location, type }: any) {
    return (
        <div className="flex items-center justify-between p-6 rounded-xl bg-zinc-900/30 border border-white/10 hover:border-white/30 transition cursor-pointer text-left">
            <div>
                <h3 className="font-bold text-lg text-white">{title}</h3>
                <p className="text-sm text-gray-500">{location}</p>
            </div>
            <div className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider">
                {type}
            </div>
        </div>
    )
}
