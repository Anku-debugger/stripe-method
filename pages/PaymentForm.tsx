///////PaymentForm.tsx///////

import React, { useState } from "react";
import useCart from "../hooks/useCart";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { stripePublishableKey } from "../config";

const stripePromise = loadStripe(stripePublishableKey);

const PaymentForm: React.FC = () => {
  const { cart, totalPrice } = useCart();
  const [page, setPage] = useState(true);

  ///////////////////////////////////////////////////////////////////////////////////////////
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    pinCode: "",
    address: "",
    locality: "",
  });

  const handleInputAddChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      setPage(false);
    } 
  };

  const validateForm = () => {
    return (
      formData.name.trim() !== "" &&
      formData.mobile.trim() !== "" &&
      formData.pinCode.trim() !== "" &&
      formData.address.trim() !== "" &&
      formData.locality.trim() !== ""
    );
  };

  ///////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <table style={{ margin: "30px auto" }}>
        <tbody>
          {cart?.map((product) => (
            <tr key={product?.id} style={{ alignItems: "center" }}>
              <td>
                <img
                  src={product?.thumbnail}
                  alt={product?.title}
                  className="w-40 mb-2"
                />
              </td>
              <td>
                <h2>{product?.title} </h2>{" "}
              </td>
              <td>
                <h2>{product?.brand}</h2>
              </td>
              <td>
                <h2>Total Price: $ {product?.price}</h2>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className="flex"
        style={{ justifyContent: "space-evenly", marginBottom: "4%" }}
      >
        <div
          className="m-5 p-5"
          style={{
            width: "50%",
            borderRadius: "5px",
            backgroundColor: "white",
          }}
        >
          {page ? (
            <>
              <h2
                className="text-4xl"
                style={{
                  color: "#ca8a04",
                  fontWeight: "600",
                  textDecoration: "underline",
                  marginBottom: "30px",
                }}
              >
                Edit Address
              </h2>
              <form onSubmit={handleAddSubmit}>
                <div className="contact-details">
                  <h6 className="" style={{ fontWeight: "500" }}>
                    CONTACT DETAILS
                  </h6>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputAddChange}
                      placeholder="Name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleInputAddChange}
                      placeholder="Email"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control "
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputAddChange}
                      placeholder="Mobile No."
                      required
                    />
                  </div>
                </div>

                <div className="address-details">
                  <h6 className="" style={{ fontWeight: "500" }}>
                    ADDRESS
                  </h6>
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control "
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleInputAddChange}
                      placeholder="Pin Code"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control "
                      name="address"
                      value={formData.address}
                      onChange={handleInputAddChange}
                      placeholder="Address(House No, Building, Street Area)"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="locality"
                      value={formData.locality}
                      onChange={handleInputAddChange}
                      placeholder="Locality/Town"
                      required
                    />
                  </div>
                </div>

                <button
                  className="checkout-btn w-full bg-gray-600 text-white rounded-md font-semibold text-lg px-6 py-2"
                  type="submit"
                >
                  Save Address
                </button>
              </form>
            </>
          ) : (
            <Elements stripe={stripePromise}>
              <div className="form-actions" style={{ textAlign: "center" }}>
                <CheckoutForm totalPrice={totalPrice} formData={formData}/>
              </div>
            </Elements>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentForm;