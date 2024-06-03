"use client";

import { useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfilePictureModal from "./ProfilePictureModal";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const links = [
  { title: "My Details", href: "/profile/details" },
  {
    title: "Bidding History",
    href: "/profile/bidding-history",
    role: "bidder",
  },
  { title: "Auctions", href: "/profile/auctions", role: "auctioner" },
  { title: "Watch List", href: "/profile/watchlist", role: "bidder" },
  { title: "Wallet", href: "/profile/wallet" },
  { title: "Address", href: "/profile/address", role: "bidder" },
];

export default function ProfileComponent() {
  // const user = useAppSelector((state) => state.users.user);
  const pathname = usePathname();

  const user = JSON.parse(localStorage.getItem("auth")!);
  console.log(user);
  const filteredLink = links.filter(
    (link) => link.role === user?.role || !link.role
  );
  return (
    <div className="">
      <div className="flex items-center gap-3">
        {user?.profilePicture ? (
          <img
            src={user?.profilePicture}
            alt={user?.name}
            className="rounded-full h-40 w-40"
          />
        ) : (
          <>
            <AccountCircleIcon sx={{ fontSize: 200 }} />
          </>
        )}
        <p className="text-3xl font-semibold">{user?.name}</p>
        <ProfilePictureModal />
      </div>
      <div className="my-10">
        <ul className="flex items-center gap-6">
          {filteredLink.map((l) => {
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
