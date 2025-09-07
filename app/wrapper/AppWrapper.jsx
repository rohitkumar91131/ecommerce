"use client";
import { usePathname } from "next/navigation";
import HomeHeader from "../components/Ui/HomePageHeader";
import HeaderTwo from "../components/Ui/HeaderTwo";

export default function AppWrapper({ children }) {
  const pathname = usePathname();
  const showHomeHeader = "/";
  const showHeaderTwo = [ "/cart" , "/auth" ];

  return (
    <>
      {pathname === showHomeHeader && <HomeHeader />}
      { showHeaderTwo.includes(pathname) && <HeaderTwo/>}
      {children}
    </>
  );
}
