import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";

const poppins = Poppins({
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "meAdota | Adote com amor",
  description: "Encontre seu novo melhor amigo e adote com responsabilidade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={poppins.variable} style={{ fontFamily: "var(--font-display)" }}>
        {children}
      </body>
    </html>
  );
}
