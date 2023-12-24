import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen md:px-[100px] px-[16px] font-sg">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
