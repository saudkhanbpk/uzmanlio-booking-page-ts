import { montserrat } from "./fonts";
import "./globals.css";
import { ExpertProvider } from "@/components/context/ExpertContext";
import { InstitutionProvider } from "@/components/context/InstitutionContext";
import GoogleAnalytics from "@/components/GoogleAnalytics";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans`}>
        <GoogleAnalytics />
        <InstitutionProvider>
          <ExpertProvider>
            {children}
          </ExpertProvider>
        </InstitutionProvider>
      </body>
    </html>
  );
}

export const metadata = {
  generator: "v0.app",
};
