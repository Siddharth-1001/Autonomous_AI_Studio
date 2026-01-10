import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
    title: "Analytics Studio AI",
    description: "Agentic AI powered analytics for social media",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased min-h-screen bg-background text-foreground">
                <main className="flex flex-col min-h-screen">
                    {children}
                </main>
            </body>
        </html>
    );
}
