import { ProductData } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request: NextRequest) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  try {
    const requestBody = await request.json();
    const { products, email } = await requestBody;

    const existingItems = await products.map((product: ProductData) => ({
      quantity: product.quantity,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(product.price * 100),
        product_data: {
          name: product?.title,
          description: product?.description,
        },
      },
    }));

    const origin = request.headers.get("origin");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${origin}/success/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel/?canceled=true`,
      metadata: {
        email,
      },
      line_items: existingItems,
    });

    return NextResponse.json({ url: session?.url }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
