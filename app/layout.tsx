import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { WeatherProvider } from "@/components/WeatherProvider"; // New Client Component

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="mdl-js">
      <body className={`${poppins.variable} antialiased`}>
        <WeatherProvider>{children}</WeatherProvider>
      </body>
    </html>
  );
}
