import {useEffect, useState} from "react";
import { paypalClientID } from "../../redux/utils/helper";
import "./Paypal.css";
import { useSelector } from "react-redux";
import authAxios from "../../utils/AuthAxios";
import { useNavigate } from "react-router-dom";
export const Paypal = ({ orderId, amount }) => {
  const navigate = useNavigate();
  const userId =
    useSelector((state) => state.authReducer.userId) ||
    localStorage.getItem("userId");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientID}&currency=USD`;
    script.setAttribute("data-namespace", "paypal_sdk");
    script.async = true;

    script.onload = () => {
      window.paypal_sdk
        .Buttons({
          components: "buttons",
          style: {
            color: "blue",
            shape: "rect",
            // layout: 'vertical',
            label: "paypal",
          },
          fundingSource: window.paypal.FUNDING.PAYPAL,

          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                  amount: {
                    value: amount,
                  },
                }],
            }).then(paypalId => {
              return paypalId
            });
          },
          onApprove: (data, actions) => {
            console.log(data)
            return actions.order.capture().then((details) => {
              // Send payment details to backend
              authAxios
                .post("http://localhost:3399/payment", {
                  amount,
                  orderId,
                  userId,
                  payType: "paypal",
                  paypalId: data.paymentID
                })

                .then((data) => {
                  console.log(data);
                  if (data.status === 200) {
                    navigate("/shop/thankyou");
                  }
                })
                .catch((error) => console.error("Error:", error));
            });
          },
        })
        .render("#paypalButtonContainer");
    };
    document.body.appendChild(script);
  }, []);

  return <div id="paypalButtonContainer"></div>;
};
