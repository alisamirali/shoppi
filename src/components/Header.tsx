"use client";

import Container from "@/components/Container";
import Logo from "@/components/Logo";
import MobileNavigation from "@/components/MobileNavigation";
import { navBarLinks } from "@/constants";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";

const Header = () => {
  const { data: session } = useSession();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen((prev) => !prev);
  };

  // Disable scrolling when mobile navigation is open
  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = ""; // Clean up on unmount
    };
  }, [isMobileNavOpen]);

  return (
    <header className="w-full h-20 bg-accentWhite border-b-[1px] border-b-lightText/50 sticky z-50 top-0 left-0 relative">
      <Container className="h-full flex items-center justify-between gap-5 lg:gap-10">
        <Logo />
        <div className="hidden md:inline-flex items-center gap-6">
          {navBarLinks?.map((link) => (
            <Link href={link?.link} key={link?.title} className="navBarLink">
              {link?.title}
            </Link>
          ))}

          {session ? (
            <Link href={"/dashboard"} className="navBarLink">
              Dashboard
            </Link>
          ) : (
            <Link href={"/sign-in"} className="navBarLink">
              Sign In
            </Link>
          )}
          {session && (
            <Link href={"/orders"} className="navBarLink">
              Orders
            </Link>
          )}
          {session && (
            <Link href={"/studio"} className="navBarLink">
              Studio
            </Link>
          )}
        </div>

        <HiMenuAlt2
          className="cursor-pointer inline-flex md:hidden text-2xl hoverEffect hover:text-darkOrange"
          onClick={toggleMobileNav}
        />

        {isMobileNavOpen && (
          <div className="fixed inset-0 z-50 bg-black/50">
            <MobileNavigation closeMenu={() => setIsMobileNavOpen(false)} />
          </div>
        )}
      </Container>
    </header>
  );
};
export default Header;
