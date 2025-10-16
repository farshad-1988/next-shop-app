import type { Metadata } from "next";
import { Roboto } from "next/font/google";

//Next.js automatically handles CSS at runtime, but TypeScript complains because it doesn’t know the type.
// create a file named global.d.ts in your project root and add accepted modules for this TS app
// like declare module "*.css" or declare module "*.jpg" ....
import "./globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import Header from "./(components)/Header";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  //only download the characters we need for better performance
  subsets: ["latin"],
  //is related to font-display when font is loading, swap is good for performance(prevent Flash of Invisible Text) and very fast Flash of Unstyled Text
  display: "swap",
  variable: "--font-roboto",
});

// export const metadata: Metadata = {
//   title: "SHOP APP",
//   description: "a simple shop app built with nextjs15 and material ui",
// };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <AppRouterCacheProvider options={{ key: "css" }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            {children}
            {/* footer */}
            <footer>
              <p>&copy; {new Date().getFullYear()} SHOP APP</p>
            </footer>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
