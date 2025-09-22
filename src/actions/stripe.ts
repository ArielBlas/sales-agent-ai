"use server";

import { stripe } from "@/lib/stripe";
import { onAuthenticateUser } from "./auth";
import Stripe from "stripe";
import { prismaClient } from "@/lib/prisma";
import { subscriptionPriceId } from "@/lib/data";

export const getAllProductsFromStripe = async () => {
  try {
    const currentUser = await onAuthenticateUser();

    if (!currentUser.user) {
      return {
        error: "User not authenticated",
        status: 401,
        success: false,
      };
    }

    if (!currentUser.user.stripeAccountId) {
      return {
        error: "",
      };
    }

    const products = await stripe.products.list(
      {},
      {
        stripeAccount: currentUser.user.stripeAccountId,
      }
    );

    return {
      products: products.data,
      status: 200,
      success: true,
    };
  } catch (error) {
    console.error("Error getting products from Stripe:", error);
    return {
      error: "Failed getting products from Stripe",
      status: 500,
      success: false,
    };
  }
};

export const onGetStripeClientSecret = async (
  email: string,
  userId: string
) => {
  try {
    let customer: Stripe.Customer;
    const existingCustomers = await stripe.customers.list({
      email: email,
    });
    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: email,
        metadata: {
          userId: userId,
        },
      });
    }

    await prismaClient.user.update({
      where: { id: userId },
      data: { stripeCustomerId: customer.id },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: subscriptionPriceId }],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
      metadata: { userId: userId },
    });

    const paymentIntent = (subscription.latest_invoice as Stripe.Invoice)
      .payment_intent as Stripe.PaymentIntent;

    return {
      status: 200,
      secret: paymentIntent.client_secret,
      customerId: customer.id,
    };
  } catch (error) {
    console.error("Subscription creation error:", error);
    return {
      status: 400,
      message: "Failed to create subscription",
    };
  }
};
