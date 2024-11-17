"use client";

import Image from "next/image";
import { ProductData } from "../../types";
import { ImCross } from "react-icons/im";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/redux/shoppiSlice";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";

interface CartItemProps {
  product: ProductData;
  cart: ProductData[];
}

const CartItem = ({ product, cart }: CartItemProps) => {
  const [existingProduct, setExistingProduct] = useState<ProductData | null>(
    null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const availableProduct = cart?.find((item) => item?._id === product?._id);

    if (availableProduct) {
      setExistingProduct(availableProduct);
    }
  }, [product, cart]);

  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(product?._id));
    toast.success(`${product?.title.substring(0, 12)} quantity increased ✅`);
  };

  const handleDecreaseQuantity = () => {
    if ((existingProduct?.quantity as number) > 1) {
      dispatch(decreaseQuantity(product?._id));
      toast.success(`${product?.title.substring(0, 12)} quantity decreased ✅`);
    } else {
      toast.error(`Quantity can't be less than 1`);
    }
  };

  return (
    <div className="w-full grid grid-cols-5 mb-4 border p-4">
      <div className="flex col-span-5 md:col-span-2 items-center gap-4">
        <ImCross
          className="cursor-pointer text-accent hover:text-lightRed duration-300"
          onClick={() => {
            dispatch(removeFromCart(product?._id));
            toast.success(
              `${product?.title.substring(0, 12)} removed from cart ✅`
            );
          }}
        />

        <Link href={`/product/${product?.slug.current}`}>
          <Image
            src={urlFor(product?.image).url()}
            alt={product?.title}
            width={200}
            height={200}
            className="size-28 object-contain rounded-md"
          />
        </Link>

        <h1 className="font-semibold text-lg">
          {product?.title.substring(0, 20)}
        </h1>
      </div>

      <div className="col-span-5 md:col-span-3 flex items-center justify-between py-4 md:py-0 px-4 lg:px-0">
        <p className="flex w-1/3 items-center font-semibold text-lg">
          ${product?.price}
        </p>

        <div className="w-1/3 flex items-center gap-6 text-lg">
          <button
            className="cursor-pointer text-accent hover:text-lightRed hoverEffect bg-[#f5f5f5] size-8 text-lg border rounded-sm flex items-center justify-center hover:bg-darkOrange/10 hover:border-darkOrange"
            onClick={handleDecreaseQuantity}
          >
            <FaMinus />
          </button>
          <p className="font-semibold text-lg">{product?.quantity}</p>
          <button
            className="cursor-pointer text-accent hover:text-lightRed hoverEffect bg-[#f5f5f5] size-8 text-lg border rounded-sm flex items-center justify-center hover:bg-darkOrange/10 hover:border-darkOrange"
            onClick={handleIncreaseQuantity}
          >
            <FaPlus />
          </button>
        </div>

        <div className="w-1/3 flex items-center font-bold text-lg">
          ${product?.quantity * product?.price}
        </div>
      </div>
    </div>
  );
};
export default CartItem;
