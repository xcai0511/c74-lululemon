import "./App.css";
import { WhatsNewPage } from "./pages/WhatsNewPage";
import { SuggestionsPage } from "./pages/SuggestionsPage";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ProductPage } from "./pages/ProductPage";
import { WrongPage } from "./components/productpage/WrongPage";
import { WrongProductPage } from "./components/productpage/WrongProductPage";
import { ShoppingCart } from "./pages/ShoppingCart";
import { Checkout } from "./components/checkout/Checkout";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  loginSuccess,
  logout,
  setToken,
  setUser,
} from "./redux/actions/authAction";
import { ThankYou } from "./components/checkout/ThankYou";
import { SignupPage } from "./components/signup/Signup";
import { ForgotPassword } from "./components/checkout/ForgotPassword";
import { SetNewPassword } from "./components/checkout/SetNewPassword";
import { Dashboard } from "./components/profile/Dashboard";
import PurchaseHistory from "./components/profile/PurchaseHistory";
import Profile from "./components/profile/Profile";
import WishlistPage from "./components/profile/Wishlist";
import { OpenAIChatboxTest } from "./components/test/OpenAIChatbox.js";
import { CheckoutPaymentPage } from "./components/checkout/CheckoutPaymentPage";

import { TextSearchPage } from "./pages/TextSearchPage";
import { OrderPage } from "./components/order-test-purpose/OrderPage.js";
import Login from "./components/login/Login";
import { OrderDetails } from "./components/order-test-purpose/OrderDetails.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      const tokenExpiration = localStorage.getItem("tokenExpiration");
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (token && tokenExpiration) {
        const isTokenExpired = new Date().getTime() > tokenExpiration;

        if (isTokenExpired) {
          dispatch(logout());
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
          localStorage.removeItem("userInfo");
        } else {
          dispatch(setToken(token));
          dispatch(setUser(userInfo));
          dispatch(loginSuccess());
          const timeUntilExpiration = tokenExpiration - new Date().getTime();
          setTimeout(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpiration");
            localStorage.removeItem("userInfo");
            dispatch(logout());
            alert("Your session has expired. Please log in again.");
          }, timeUntilExpiration);
        }
      }
    };
    initializeAuth();
  }, [dispatch]);
  // if (token && tokenExpiration) {
  //     const isTokenExpired = new Date().getTime() > tokenExpiration;
  //     if (isTokenExpired) {
  //         const newToken = await refreshToken();
  //         if (newToken) {
  //             dispatch(setToken(newToken));
  //             dispatch(setUser(userInfo));
  //             dispatch(loginSuccess())
  //         } else {
  //             localStorage.removeItem('token');
  //             localStorage.removeItem('tokenExpiration');
  //             localStorage.removeItem('userInfo');
  //         }
  //     } else {
  //         dispatch(setToken(token));
  //         dispatch(setUser(userInfo));
  //         dispatch(loginSuccess())
  //
  //     }
  // }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WhatsNewPage />} />
          <Route path="/suggested" element={<SuggestionsPage />} />
          <Route path="/suggestion" element={<TextSearchPage />} />
          <Route path="/product/:productID" element={<ProductPage />} />
          <Route path="/wrong-product" element={<WrongProductPage />} />
          <Route path="/shop/mybag" element={<ShoppingCart />} />
          <Route path="/shop/checkout" element={<Checkout />} />
          <Route path="/shop/thankyou" element={<ThankYou />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/forgotpassword/:token" element={<SetNewPassword />} />

          <Route path="/account/dashboard" element={<Dashboard />} />
          <Route
            path="/account/purchaseHistory"
            element={<PurchaseHistory />}
          />
          <Route path="/account/profile" element={<Profile />} />
          <Route path="/account/wishlist" element={<WishlistPage />} />
          <Route
            path="/shop/checkout/payment"
            element={<CheckoutPaymentPage />}
          />
          <Route path="*" element={<WrongPage />} />
          <Route path="/test/openAI" element={<OpenAIChatboxTest />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/order/:orderId" element={<OrderDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
