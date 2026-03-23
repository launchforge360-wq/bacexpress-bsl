import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BacExpress BSL | Location de boîtes de déménagement au Bas-Saint-Laurent",
    template: "%s | BacExpress BSL",
  },
  description:
    "Location de boîtes de déménagement réutilisables à Rimouski, Matane, Mont-Joli et Rivière-du-Loup. Livraison et cueillette incluses. Forfaits dès 79$.",
  keywords: [
    "location boites déménagement Rimouski",
    "boites déménagement Bas-Saint-Laurent",
    "location boites plastique déménagement",
    "boites réutilisables déménagement BSL",
    "déménagement Rimouski",
    "déménagement Matane",
    "déménagement Mont-Joli",
    "déménagement Rivière-du-Loup",
  ],
  metadataBase: new URL("https://boitededemenagement.ca"),
  openGraph: {
    type: "website",
    locale: "fr_CA",
    url: "https://boitededemenagement.ca",
    siteName: "BacExpress BSL",
    title: "BacExpress BSL | Location de boîtes de déménagement au Bas-Saint-Laurent",
    description:
      "Location de boîtes de déménagement réutilisables à Rimouski, Matane, Mont-Joli et Rivière-du-Loup. Livraison et cueillette incluses. Forfaits dès 79$.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
