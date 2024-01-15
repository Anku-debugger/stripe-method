import { loadStripe } from "@stripe/stripe-js";
import { stripePublishableKey } from "../config";

const stripe = loadStripe(stripePublishableKey);

export const createPaymentMethod = async (
  cardElement,
  billingDetails,
  customerId
) => {
  try {
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: billingDetails,
    });

    if (error) {
      return { paymentMethod: null, error };
    }

    await stripe.paymentMethods.attach(paymentMethod.id, {
      customer: customerId,
    });

    return { paymentMethod, error: null };
  } catch (error) {
    console.error("Error creating payment method:", error);
    return { paymentMethod: null, error };
  }
};
