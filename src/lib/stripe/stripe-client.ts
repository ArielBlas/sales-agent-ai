import { loadStripe } from "@stripe/stripe-js";

export const useStripeElements = (connectAccountId?: string) => {
  if (connectAccountId) {
    const StripePromise = async () =>
      await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "", {
        stripeAccount: connectAccountId,
      });

    return { StripePromise };
  }

  const StripePromise = async () =>
    await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

  return { StripePromise };
};
