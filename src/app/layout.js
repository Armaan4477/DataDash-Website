import { Inter, Poppins, Montserrat } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ThemeProvider } from '../context/ThemeContext';
import { Analytics } from "@vercel/analytics/next"
import ScrollObserver from '../components/ScrollObserver';
import ScrollToTop from '../components/ScrollToTop';

const inter = Inter({ subsets: ['latin'] });

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins'
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-montserrat'
})

export const metadata = {
  title: 'DataDash',
  description: 'Effortless File Sharing Anywhere!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                let theme = localStorage.getItem('theme');
                if (!theme) theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                document.documentElement.classList.toggle('dark', theme === 'dark');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${poppins.variable} ${montserrat.variable} min-h-screen dark:bg-dark-bg bg-light-bg dark:text-dark-text text-light-text transition-colors flex flex-col`}>
        <ThemeProvider>
          <Navbar />
          <ScrollObserver>
          <main className="flex-grow">
            {children}
          </main>
          </ScrollObserver>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                // Testimonial Carousel functionality
                const testimonialList = document.getElementById('testimonial-list');
                if (testimonialList) {
                  let currentIndex = 0;
                  const items = testimonialList.children;
                  const totalItems = items.length;
                  
                  if (totalItems > 1) {
                    setInterval(() => {
                      currentIndex = (currentIndex + 1) % totalItems;
                      testimonialList.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
                    }, 5000);
                  }
                }
              });
            `
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}
