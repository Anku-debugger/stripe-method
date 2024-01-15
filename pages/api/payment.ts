import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { Stripe } from "stripe";
import { NextApiRequestCookies, NextApiRequestQuery } from "next/dist/server/api-utils";
import { NextDataPathnameNormalizer } from "next/dist/server/future/normalizers/request/next-data";

const corsMiddleware = Cors({
  methods: ["POST"],
});

const stripe = new Stripe(process.env.stripeSecretKey, {
  apiVersion: "2023-10-16",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await new Promise((resolve, reject) => {
    corsMiddleware(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

  if (req.method === "POST") {
    try {
      const { amount, token, formData } = req.body;
      const { name, email, mobile, pinCode, address, locality } = formData;

      const customer = await stripe.customers.create({
        email: email,
        name: name, 
        address: { 
          line1: address,
          city: locality,
          postal_code: pinCode,
          country: 'IN', 
        },
      });

      const billingDetails = {
        address: {
          city: locality,
          country: 'IN', 
          line1: address,
          line2: 'Mandi', 
          postal_code: pinCode,
          state: 'Chandigarh'
        },
        email: email,
        name: name,
        phone: mobile,
      };

      console.log("billing details are : ", billingDetails);

      const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: {
          token: token,
        },
        billing_details: billingDetails,
      });

      await stripe.invoiceItems.create({
        customer: customer.id,
        amount: 2500,
        currency: "usd",
        description: "test",
      });

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        receipt_email: email,
        currency: 'usd',
        payment_method: paymentMethod.id,
        confirm: true,
        customer: customer.id,
        description: 'test',
        return_url: 'http://localhost:3000/',
      });
      

      console.log("PaymentIntent are:", paymentIntent);

      if (paymentIntent.status === "requires_action") {
        return res
          .status(200)
          .json({
            requires_action: true,
            paymentIntentClientSecret: paymentIntent.client_secret,
          });
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Stripe API Error:", error);

      if (error instanceof Error) {
        return res
        .status(500)
        .json({ error: "Stripe API Error", message: error.message });
      } else {
        return res
        .status(500)
        .json({
          error: "Internal Server Error",
          message: "Payment failed. Please try again.",
        });
      }
    }
  }

  return res.status(400).json({ error: "Bad Request" });
}
