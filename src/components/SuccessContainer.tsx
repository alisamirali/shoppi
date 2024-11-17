"use client";

import Loader from "@/components/Loader";
import { resetCart } from "@/redux/shoppiSlice";
import { StoreState } from "@/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiCheck, HiHome, HiInformationCircle, HiMail } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

const SuccessContainer = ({ id }: { id: string }) => {
  const { cart } = useSelector((state: StoreState) => state?.shoppi);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let price = 0;

    cart.map((item) => {
      price += item?.price * item?.quantity;

      return price;
    });

    setTotalAmount(price);
  }, [cart]);

  const handleSaveOrder = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/save-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          email: session?.user?.email as string,
          id: id,
          totalAmount,
        }),
      });

      const data = await response.json();

      if (data?.success) {
        setLoading(false);
        dispatch(resetCart());
        toast.success(data?.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Error: ${error?.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user && cart?.length) {
      handleSaveOrder();
    }
  }, [session?.user, cart?.length]);

  return (
    <div>
      {loading ? (
        <Loader
          title="Please wait while Payment is processing..."
          className="text-accent font-semibold"
        />
      ) : (
        <div className="bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4 py-20">
          <div className="max-w-md w-full space-y-8 text-center">
            <div className="mx-auto size-40 rounded-full bg-green-200 flex items-center justify-center">
              <div className="rounded-full bg-green-500 flex items-center justify-center">
                <HiCheck className="size-28 text-white" />
              </div>
            </div>

            <h2 className="text-3xl font-extrabold text-gray-900">Success!</h2>
            <p className="text-sm text-gray-600">
              Your payment has been completed successfully!
            </p>

            <p className="text-base text-gray-700 font-medium">
              Thank you for shopping with us. Your order has been placed
              successfully. You should receive an email confirmation shortly.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/"
                className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 hoverEffect shadow-md text-base"
              >
                <HiHome />
                <span className="font-semibold">Home</span>
              </Link>

              <Link
                href="/orders"
                className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 hoverEffect shadow-md text-base"
              >
                <HiInformationCircle />
                <span className="font-semibold">Orders</span>
              </Link>

              <Link
                href="mailto:alisamir.code@gmail.com"
                className="flex items-center gap-1 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 hoverEffect shadow-md text-base"
              >
                <HiMail />
                <span className="font-semibold">Contact</span>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2">
              <div className="size-3 bg-green-200 rounded-full"></div>
              <div className="size-3 bg-green-300 rounded-full"></div>
              <div className="size-3 bg-green-400 rounded-full"></div>
              <div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SuccessContainer;
