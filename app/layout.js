import NavBar from "./components/NavBar";
import "./globals.css";

export const metadata = {
  title: "Jasim Tiles",
  description: "Jasim Tiles — Tile Management & Calculation Software",
};
<meta
  name="google-site-verification"
  content="4u6Z-tMyjx_WcYDl3Jo2cEgegMgeE02qGz28V3pTi4A"
/>;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900">
        <div className="min-h-screen flex flex-col">
          <NavBar />
          <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
