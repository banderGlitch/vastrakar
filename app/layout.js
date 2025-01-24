import "./globals.css";
import Navbar from "./components/sections/Navbar";
import Footer from "./components/sections/Footer";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="h-screen"> {/* Add padding top to account for fixed navbar */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
