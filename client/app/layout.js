import "./globals.css";

export const metadata = {
  title: "AI Code Mentor",
  description: "Explain code using AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0f0f11] text-white">{children}</body>
    </html>
  );
}
