import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async ({ params }: { params?: { id?: string } }) => {
  const { id } = params || {};

  try {
    if (!id) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid request: Missing 'id' parameter" }),
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: {
        id: id,
      },
    });

    if (!order) {
      return new NextResponse(
        JSON.stringify({ message: "Order not found" }),
        { status: 404 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: "eur",
      payment_method_types: ["card"],
      automatic_payment_methods: {
        enabled: true,
      },
    });

    await prisma.order.update({
      where: {
        id: id,
      },
      data: { intent_id: paymentIntent.id },
    });

    return new NextResponse(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error creating payment intent" }),
      { status: 500 }
    );
  }
};