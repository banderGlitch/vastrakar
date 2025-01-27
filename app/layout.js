import Navbar from './components/sections/Navbar'
import Footer from './components/sections/Footer'
import MainNav from './components/sections/MainNav'
import PageTransition from './components/ui/PageTransition'
import './globals.css'

export const metadata = {
  title: 'Vastrakari',
  description: 'Your fashion destination'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <PageTransition>
          <main className="flex-grow">
            {children}
          </main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  )
}