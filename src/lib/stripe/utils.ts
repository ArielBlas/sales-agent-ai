export const getStripeOAuthLink = (url: string, data: string) => {
  return `https://connect.stripe.com/oauth/authorize?response_type=code&
  client_id=${process.env.STRIPE_CLIENT_ID}&scope=read_write&state=${data}&redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}/${url}`;
};
