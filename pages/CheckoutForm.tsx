//////checkOutForm.tsx////////

import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm: React.FC<{ totalPrice: number; formData: any }> = ({ totalPrice,formData }) => {
  const [error, setError] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { token } = await stripe.createToken(cardElement as any);

      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token.id,
          amount: totalPrice*100, 
          formData: formData,
        }),
      });

      if (response.ok) {
        const { requires_action, paymentIntentClientSecret } = await response.json();
        if (requires_action) {
          const { error } = await stripe.confirmCardPayment(paymentIntentClientSecret);
          if (error) {
            console.error('Payment failed:', error);
            setError('Payment failed. Please try again.');
          } else {
            setError("");
            console.log('Payment succeeded!');
            alert("Payment succeeded!")
          }
        } else {
          console.log('Payment successful!');
        }
      } else {
        console.error('Payment failed:', await response.json());
        setError('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setError('Payment failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} data-testid="checkout-form">
      <CardElement />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit" disabled={!stripe}>
        Pay ${totalPrice}.00
      </button>
    </form>
  );
};

export default CheckoutForm;

