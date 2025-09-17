"use server";

import { stripe } from "@/lib/stripe";
import { onAuthenticateUser } from "./auth";

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
