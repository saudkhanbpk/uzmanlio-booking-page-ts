
import { montserrat } from "./fonts";
import "./globals.css";
import { ExpertProvider } from "@/components/context/ExpertContext";
import { InstitutionProvider } from "@/components/context/InstitutionContext";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans`}>
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
