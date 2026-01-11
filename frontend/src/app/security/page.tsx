"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SecurityPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-3xl mx-auto prose prose-invert prose-lg">
                <h1 className="font-bold tracking-tighter mb-8 text-5xl">Security</h1>

                <h3>Encryption</h3>
                <p>All data is encrypted in transit (TLS 1.3) and at rest (AES-256).</p>

                <h3>AI Safety</h3>
                <p>Our agents operate in isolated sandboxes. They cannot access your local file system or perform unauthorized actions outside of the scoped APIs.</p>

                <h3>Credentials</h3>
                <p>We do not store your LinkedIn passwords in plain text. We use secure OAuth tokens where possible, or encrypted storage for credentials.</p>
            </main>
            <Footer />
        </div>
    );
}
