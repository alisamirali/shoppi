/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useDispatch, useSelector } from "react-redux";
import { ProductData, StoreState } from "../../types";
import CartItem from "@/components/CartItem";
import { resetCart } from "@/redux/shoppiSlice";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import emptyCart from "../assets/emptyCart.webp";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import { useEffect, useState } from "react";

const CartContainer = ({ session }: any) => {
  const { cart } = useSelector((state: StoreState) => state?.shoppi);
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(0);

  const handleResetCart = () => {
    const confirm = window.confirm("Are you sure you want to reset the cart?");

    if (confirm) {
      dispatch(resetCart());
      toast.success("Cart has been reset successfully");
    }
  };

  useEffect(() => {
    let price = 0;

    cart.map((item) => {
      price += item?.price * item?.quantity;

      return price;
    });

    setTotalAmount(price);
  }, [cart]);

  const handleCheckout = async () => {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products: cart,
        email: session?.user?.email,
      }),
    });

    const { url } = await response.json();

    if (url) {
      window.location.href = url;
    }
  };

  return (
    <div>
      {cart?.length > 0 ? (
        <div className="pb-20">
          <div className="w-full bg-[#f5f5f5] text-accent hidden lg:grid grid-cols-5 place-content-center p-4 text-lg font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Subtotal</h2>
          </div>

          <div className="mt-5">
            {cart?.map((product: ProductData) => (
              <CartItem key={product._id} product={product} cart={cart} />
            ))}
          </div>

          <button
            onClick={handleResetCart}
            className="my-5 bg-lightRed text-white font-semibold px-8 py-2 uppercase hover:bg-red-600 hoverEffect rounded-sm"
          >
            Reset Cart
          </button>

          <div className="max-w-7xl flex justify-end">
            <div className="w-96 flex flex-col gap-4">
              <h2 className="text-2xl font-semibold">Cart Summary</h2>
              <div>
                <p className="w-full flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 px-4 text-lg font-medium">
                  Subtotal <span>${totalAmount}</span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 px-4 text-lg font-medium">
                  Shipping Charge
                  <span>$0</span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 px-4 text-lg font-medium">
                  Total <span>${totalAmount}</span>
                </p>
              </div>

              <Button
                className="rounded-md disabled:bg-darkOrange/40 disabled:cursor-not-allowed"
                disabled={!session?.user}
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>

              {!session?.user && (
                <p className="text-[1rem] text-lightRed text-center font-medium -mt-2">
                  Please login to proceed to checkout
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          className="flex items-center justify-center h-[60vh]"
          initial={{
            y: 20,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <div className="flex flex-col items-center text-center max-w-[500px] p-4">
            <Image src={emptyCart} alt="Empty Cart" width={300} height={300} />

            <h2 className="text-2xl font-bold uppercase mb-3">
              Your cart is empty
            </h2>

            <p className="text-sm font-semibold w-[80%] mb-6">
              Give it purpose - fill it with clothes, electronics, and shoes,
              and make it happy.
            </p>

            <Link
              href="/"
              className="bg-lightOrange text-white px-8 py-3 rounded-md hover:bg-darkOrange hoverEffect font-semibold text-[1rem]"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};
export default CartContainer;
