import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart-context";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
});

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ["latin"],
  variable: '--font-lato',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "QualityMock Woods | Handcrafted Amish Furniture",
  description: "Premium handcrafted Amish furniture for your home.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${lato.variable}`}>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
