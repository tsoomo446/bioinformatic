import { ReactNode } from "react";
import { Header } from "./Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="md:px-[100px] px-[16px] font-sg">
        <Header />
        <main>{children}</main>
      </div>
    </>
  );
}
