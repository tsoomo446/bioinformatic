import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { Space_Grotesk } from "next/font/google";
import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import enUS from "antd/lib/locale/en_US";
const sg = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sg",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider locale={enUS}>
      <main className={sg.variable}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </ConfigProvider>
  );
}
