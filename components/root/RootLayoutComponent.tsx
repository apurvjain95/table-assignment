import "@radix-ui/themes/styles.css";
import "@/app/globals.css";

import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayoutComponent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className={`antialiased`} id="rootElement">
        <Theme appearance="light" accentColor="purple" grayColor="gray">
          {children}
        </Theme>
      </body>
    </html>
  );
}
