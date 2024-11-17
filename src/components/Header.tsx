"use client";

import Container from "@/components/Container";
import Logo from "@/components/Logo";
import Search from "@/components/Search";
import { navBarLinks } from "@/constants";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { HiMenuAlt2 } from "react-icons/hi";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="w-full h-20 bg-accentWhite border-b-[1px] border-b-lightText/50 sticky z-50 top-0 left-0">
      <Container className="h-full flex items-center justify-between gap-5 lg:gap-10">
        <Logo />
        <Search />
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
          <Link href={"/orders"} className="navBarLink">
            Orders
          </Link>
          <Link href={"/studio"} className="navBarLink">
            Studio
          </Link>
        </div>

        <HiMenuAlt2 className="cursor-pointer inline-flex md:hidden text-2xl hoverEffect hover:text-darkOrange" />
      </Container>
    </header>
  );
};
export default Header;
