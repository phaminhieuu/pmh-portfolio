import type { Metadata } from "next";
import "@/styles/globals.css";
import { Instrument_Serif, Inter } from "next/font/google";
import Footer from "@/components/footer";

const instrumentSans = Instrument_Serif({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-instrument",
});

const inter = Inter({
	weight: ["300", "400", "500", "600"],
	subsets: ["latin"],
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "Pham Minh Hieu",
	description: "Pham Minh Hieu's personal website",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/cursor.png" />
			</head>
			<body
				suppressHydrationWarning
				className={`${inter.className} ${instrumentSans.variable}`}
			>
				{children}
				<Footer />
			</body>
		</html>
	);
}
