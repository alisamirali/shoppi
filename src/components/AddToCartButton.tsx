"use client";

import { twMerge } from "tailwind-merge";
import { ProductData } from "../../types";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/shoppiSlice";
import toast from "react-hot-toast";

interface AddToCartButtonProps {
  product: ProductData;
  className?: string;
}

const AddToCartButton = ({ product, className }: AddToCartButtonProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product?.title.substring(0, 12)} added to cart ✅`);
  };

  return (
    <button
      className={twMerge(
        "bg-accent text-white w-full py-2 border border-px border-accent hover:bg-darkOrange hover:border-darkOrange font-semibold tracking-wide flex items-center justify-center gap-1 hoverEffect",
        className
      )}
      onClick={handleAddToCart}
    >
      Add To Cart
    </button>
  );
};
export default AddToCartButton;
