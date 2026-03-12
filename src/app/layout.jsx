import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { Instrument_Sans, Fredoka } from 'next/font/google';

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--next-font-sans',
  display: 'swap',
});

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--next-font-heading',
  display: 'swap',
});

export const metadata = {
  title: 'Waves Waterpark Wardha | Best Amusement Park & Water Rides',
  description: 'Looking for the best waterpark in Wardha? Waves Waterpark offers thrilling water slides, kids splash zone, family rides & food. Book tickets online today!',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${fredoka.variable}`}>
      <head>
        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
             __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AmusementPark",
              "name": "Waves Waterpark",
              "image": "https://thewaves.co.in/hero.jpg",
              "url": "https://thewaves.co.in",
              "telephone": "+918956118571",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Nagpur-Wardha Highway, Between Pawnar and Selu",
                "addressLocality": "Wardha",
                "postalCode": "442104",
                "addressRegion": "Maharashtra",
                "addressCountry": "IN"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "10:00",
                "closes": "17:00"
              }
            })
          }}
        />

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
             __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [{
                "@type": "Question",
                "name": "What is the ticket price for Waves Waterpark in Wardha?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our standard ticket prices start at ₹499 for kids and ₹599 for adults on weekdays."
                }
              }, {
                "@type": "Question",
                "name": "How far is Waves Waterpark from Nagpur?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We are conveniently located just 70 km from Nagpur on the Nagpur-Wardha Highway."
                }
              }, {
                "@type": "Question",
                "name": "What are the timings of the waterpark?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Waves Waterpark is open every day from 10:00 AM to 6:00 PM."
                }
              }]
            })
          }}
        />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
