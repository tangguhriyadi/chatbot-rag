import type { Metadata } from "next";
import "../styles/global.css";
import Providers from "./providers";
import MainLayout from "../component/layout/main-layout";

export const metadata: Metadata = {
  title: "Chat RKD",
  description: "Rekadia Chatbot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
