import React from "react";
import SideBar from "../admin/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SideBar />
      <main>{children}</main>
    </>
  );
}
