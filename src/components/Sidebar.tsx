import { auth } from "@/auth";
import SidebarCart from "@/components/SidebarCart";
import Image from "next/image";
import Link from "next/link";
import { MdSwitchAccount } from "react-icons/md";

const Sidebar = async () => {
  const session = await auth();

  return (
    <div className="fixed top-64 right-2 z-20 flex flex-col gap-3">
      {/* User */}
      <Link
        href={session?.user ? "/dashboard" : "/sign-in"}
        className="bg-accentWhite w-16 h-[70px] rounded-md flex flex-col gap-1 text-accent items-center justify-center shadow-sm shadow-lightGreen group overflow-hidden"
      >
        <div className="flex items-center  justify-center">
          {session?.user ? (
            <Image
              src={session?.user?.image as string}
              alt={session?.user?.name as string}
              className="size-8 rounded-full -translate-x-12 group-hover:translate-x-4 transition-transform duration-200"
              width={32}
              height={32}
            />
          ) : (
            <MdSwitchAccount className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />
          )}

          {session?.user ? (
            <Image
              src={session?.user?.image as string}
              alt={session?.user?.name as string}
              className="size-8 rounded-full -translate-x-4 group-hover:translate-x-12 transition-transform duration-200"
              width={32}
              height={32}
            />
          ) : (
            <MdSwitchAccount className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          )}
        </div>
        <p className="text-xs font-semibold">Profile</p>
      </Link>

      {/* Cart */}
      <SidebarCart />
    </div>
  );
};
export default Sidebar;
