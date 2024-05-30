import "./globals.css";
import { Providers } from "./providers";
import { fonts } from "./fonts";

export const metadata = {
  title: `Dreamy destinations`,
  description: `A hotel website.`,
};

function Footer() {
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <div className="container mx-auto px-5">Footer</div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fonts.rubik.variable}>
      <body>
        <section className="min-h-screen">
          <main>
            <Providers>{children}</Providers>
          </main>
          <Footer />
        </section>
      </body>
    </html>
  );
}
