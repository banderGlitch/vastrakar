import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Weather App",
  description: "A simple weather application",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <body className={`${inter.className} bg-gray-50`}>
        <Navbar />
        <div className="pt-24 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
