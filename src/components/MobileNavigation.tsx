"use client";

import { navBarLinks } from "@/constants";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface MobileNavigationProps {
  closeMenu: () => void;
}

const MobileNavigation = ({ closeMenu }: MobileNavigationProps) => {
  const { data: session } = useSession();

  const handleLinkClick = () => {
    closeMenu(); // Close the menu when a link is clicked
  };

  return (
    <div className="md:hidden absolute top-0 right-0 w-[70%] h-full bg-white p-4">
      <button
        className="text-3xl font-bold mb-4 hover:text-darkOrange w-full flex items-center justify-end"
        onClick={closeMenu}
      >
        <IoIosCloseCircleOutline />
      </button>

      <nav className="flex flex-col gap-4">
        {navBarLinks?.map((link) => (
          <Link
            href={link?.link}
            key={link?.title}
            className="navBarLink"
            onClick={handleLinkClick}
          >
            {link?.title}
          </Link>
        ))}

        {session ? (
          <Link
            href={"/dashboard"}
            className="navBarLink"
            onClick={handleLinkClick}
          >
            Dashboard
          </Link>
        ) : (
          <Link
            href={"/sign-in"}
            className="navBarLink"
            onClick={handleLinkClick}
          >
            Sign In
          </Link>
        )}
        {session && (
          <Link
            href={"/orders"}
            className="navBarLink"
            onClick={handleLinkClick}
          >
            Orders
          </Link>
        )}
        {session && (
          <Link
            href={"/studio"}
            className="navBarLink"
            onClick={handleLinkClick}
          >
            Studio
          </Link>
        )}
      </nav>
    </div>
  );
};
export default MobileNavigation;
