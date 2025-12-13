import type { Metadata } from "next";
import RootLayoutComponent from "@/components/root/RootLayoutComponent";

export const metadata: Metadata = {
  title: "Table Assignment - Data Management",
  description:
    "An accessible data table application with filtering, sorting, and search capabilities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayoutComponent>{children}</RootLayoutComponent>;
}
