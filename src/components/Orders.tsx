"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { collection, deleteDoc, doc, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import { ProductData } from "@/types";
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { MdClose } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

interface Order {
  id: string;
  value: {
    amount: number;
    items: ProductData[];
  };
}

const Orders = () => {
  const { data: session } = useSession();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleDetails = (orderId: string) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const [orderSnapshot, loading] = useCollection(
    session &&
      query(collection(db, "users", session?.user?.email as string, "orders"))
  );

  const orders = orderSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[];

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await deleteDoc(
        doc(db, "users", session?.user?.email as string, "orders", orderId)
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      toast.success("Order deleted successfully");
    }
  };

  return (
    <div className="flex flex-col gap-y-5">
      {loading ? (
        <div className="flex flex-col flex-1 space-y-6 overflow-auto">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-full py-20 rounded-md shrink-0 animate-pulse bg-zinc-300"
            ></div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.length ? (
            orders.map((order) => (
              <div key={order?.id}>
                <Card
                  className={
                    expandedOrderId === order.id ? "border-darkOrange/30" : ""
                  }
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      Order ID:
                      <span className="text-darkOrange tracking-wide font-normal text-base">
                        {order?.id.slice(-10)}
                      </span>
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm font-medium text-black/60">
                          Total Amount
                        </p>

                        <p className="text-lg font-semibold">
                          ${order?.value?.amount}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-black/60">
                          Payment Status
                        </p>

                        <Badge variant="success">Paid</Badge>
                      </div>

                      <button
                        onClick={() => toggleDetails(order.id)}
                        className="bg-accent text-base text-white hover:bg-black/80 hoverEffect rounded-md font-semibold px-5 py-3 size-fit"
                      >
                        {expandedOrderId === order.id ? "Hide" : "Show"} Details
                      </button>

                      <button
                        className="bg-lightRed text-base text-white hover:bg-red-600 hoverEffect rounded-md font-semibold px-5 py-3 size-fit flex items-center justify-center gap-2"
                        onClick={() => handleDeleteOrder(order?.id)}
                      >
                        <MdClose className="text-base mt-1" />
                        Delete Order
                      </button>
                    </div>
                  </CardContent>

                  <AnimatePresence>
                    {expandedOrderId === order?.id && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          height: 0,
                        }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                      >
                        <Card className="border-0 border-t rounded-none">
                          <CardHeader>
                            <CardTitle className="font-medium text-xl">
                              Order Items
                            </CardTitle>
                          </CardHeader>

                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Item</TableHead>
                                  <TableHead className="text-center">
                                    Price
                                  </TableHead>
                                  <TableHead className="text-center">
                                    Quantity
                                  </TableHead>
                                  <TableHead className="text-right">
                                    Subtotal
                                  </TableHead>
                                </TableRow>
                              </TableHeader>

                              <TableBody>
                                {order?.value?.items.map(
                                  (product: ProductData) => (
                                    <TableRow key={product?._id}>
                                      <TableCell className="text-base font-medium">
                                        {product?.title}
                                      </TableCell>
                                      <TableCell className="text-center text-base font-medium">
                                        ${product?.price}
                                      </TableCell>
                                      <TableCell className="text-center text-base font-medium">
                                        {product?.quantity}
                                      </TableCell>
                                      <TableCell className="text-right text-base font-medium">
                                        ${product?.price * product?.quantity}
                                      </TableCell>
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </div>
            ))
          ) : (
            <div>
              <p className="text-lg font-medium -mt-3">
                Your order data is empty.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Orders;
