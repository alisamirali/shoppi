"use client";

import Link from "next/link";
import { MdShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";
import { StoreState } from "../../types";

const SidebarCart = () => {
  const { cart } = useSelector((state: StoreState) => state?.shoppi);

  return (
    <Link
      href="/cart"
      className="bg-accentWhite w-16 h-[70px] rounded-md flex flex-col gap-1 text-accent items-center justify-center shadow-sm shadow-lightGreen group overflow-hidden relative"
    >
      <div className="flex items-center  justify-center">
        <MdShoppingCart className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

        <MdShoppingCart className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
      </div>
      <p className="text-xs font-semibold">Buy Now</p>
      <p className="absolute top-1 right-2 bg-darkOrange text-white text-xs size-4 rounded-full flex items-center justify-center font-semibold">
        {cart ? cart?.length : 0}
      </p>
    </Link>
  );
};
export default SidebarCart;
