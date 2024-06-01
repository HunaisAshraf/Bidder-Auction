"use client";

import { useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { title: "My Details", href: "/profile/details" },
  { title: "Bidding History", href: "/profile/bidding-history" },
  { title: "Watch List", href: "/profile/watchlist" },
  { title: "Wallet", href: "/profile/wallet" },
  { title: "Address", href: "/profile/address" },
];

export default function ProfileComponent() {
  const user = useAppSelector((state) => state.users.user);
  const pathname = usePathname();

  return (
    <div className="">
      <div className="flex items-center gap-3">
        <img
          src={user?.profilePicture}
          alt={user?.name}
          className="rounded-full"
        />
        <p className="text-2xl font-semibold">{user?.name}</p>
      </div>
      <div className="my-10">
        <ul className="flex items-center gap-6">
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
    </div>
  );
}
