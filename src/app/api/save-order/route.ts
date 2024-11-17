import { adminDB } from "@/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const requestBody = await request.json();
    const { cart, email, id, totalAmount } = await requestBody;

    const orderItem = {
      amount: totalAmount,
      items: cart || [],
    };

    if (cart.length) {
      const userOrdersReference = adminDB
        .collection("users")
        .doc(email)
        .collection("orders")
        .doc(id);

      const userDoc = await userOrdersReference.get();

      if (!userDoc?.exists) {
        await userOrdersReference.set({ email });
      }

      await userOrdersReference.set({ value: orderItem }, { merge: true });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Order saved successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error,
    });
  }
};
