import Script from 'next/script';
import "./globals.css";

export const metadata = {
  title: "Audit Automatizare E-commerce | FluxRoot",
  description: "Descoperă câți bani pierzi lunar din lipsă de automatizări. Diagnostic gratuit în 3 minute.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <body className="antialiased">
        {children}
        <Script id="clarity" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "vr0eycrskr");
        `}</Script>
      </body>
    </html>
  );
}
