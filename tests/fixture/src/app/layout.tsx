import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TaskForge",
  description: "Collaborative task management for small teams",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
