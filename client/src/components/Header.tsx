"use client";

import { Button } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const links = [
  { title: "Home", href: "/" },
  { title: "Auction", href: "/auction" },
  { title: "Watch List", href: "/watchlist" },
  { title: "Chat", href: "/chat" },
  { title: "notification", href: "/notification" },
];

export default function Header() {
  const [auth, setAuth] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  return (
    <header className="px-20 py-3 shadow-sm">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <h1 className="font-semibold text-3xl text-gray-600">BIDDER</h1>
        </Link>
        <div className="flex gap-5">
          {links.map((l) => {
            const isActive = pathname === l.href ? true : false;
            return (
              <Link
                key={l.title}
                className={
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-gray-500 font-semibold"
                }
                href={l.href}
              >
                {l.title}
              </Link>
            );
          })}
        </div>
        <div className="flex gap-2">
          {auth ? (
            <>
              <Button
                onClick={() => router.push("/login")}
                className="font-bold "
                variant="outlined"
              >
                SignIn
              </Button>
              <Button
                onClick={() => router.push("/signup")}
                className="font-bold bg-blue-600"
                variant="contained"
              >
                SignUp
              </Button>
            </>
          ) : (
            <>
              <Button className="font-bold bg-blue-600" variant="contained">
                Logout
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
