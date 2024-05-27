"use client";

import { Button } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const links = [
  { title: "Home", href: "/" },
  { title: "Auction", href: "/auction" },
  { title: "Watch List", href: "/watchlist" },
  { title: "Chat", href: "/chat" },
  { title: "notification", href: "/notification" },
];

export default function Header() {
  const [auth, setAuth] = useState(false);
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <header className="bg-white py-3">
      <nav className="flex justify-between items-center w-[92%]  mx-auto">
        <div>
          <Link href="/">
            <h1 className="font-semibold text-3xl text-gray-600">BIDDER</h1>
          </Link>
        </div>
        <div
          className={`nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 ${
            menu ? "top-[-100%]" : "top-[9%]"
          } md:w-auto  w-full flex items-center px-5`}
        >
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
            {links.map((l) => {
              const isActive = pathname === l.href ? true : false;
              return (
                <li key={l.title}>
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
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex items-center gap-6">
          {!auth ? (
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
          <button className="md:hidden" onClick={toggleMenu}>
            {menu ? (
              <MenuIcon className="text-3xl cursor-pointer " />
            ) : (
              <CloseIcon className="text-3xl cursor-pointer " />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
