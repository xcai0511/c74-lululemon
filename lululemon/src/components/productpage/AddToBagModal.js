import React, { useEffect, useState } from "react";
import "./AddToBagModal.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchCartItemsFromDB } from "../../redux/utils/api";

const AddToBagModal = ({
  product,
  recommendedProducts,
  isOpen,
  onClose,
  image,
  selectedSize,
  totalItems,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const shoppingCart = useSelector(
    (state) => state.shoppingCartReducer.shoppingCart
  );
  // const updateTotalPrice = async () => {
  //     const cartItems = await fetchCartItemsFromDB();
  //     let price = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  //     //const newPrice = product.price.replace('$', '').trim();
  //     //const productPrice = Number(parseInt(newPrice.slice(0, newPrice.indexOf(' '))));
  //     setTotalPrice(price);
  // };
  const updateTotalPrice = () => {
    console.log("UPDATE TOTOAL PRICE", shoppingCart);
    const price = shoppingCart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPrice(price);
  };

  useEffect(() => {
    if (isOpen) {
      updateTotalPrice();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  let size = selectedSize;
  if (!size) {
    size = "ONE SIZE";
  }

  const handleCheckOut = () => {
    navigate("/shop/mybag");
  };

  return (
    <div className="modal-cart-overlay" onClick={onClose}>
      <div className="modal-cart-content-bag" onClick={(e) => e.stopPropagation()}>
        <button className="cart-close-button" onClick={onClose}>
          ×
        </button>
        <div className="modal-cart-header">
          <h2>Nice Pick!</h2>
          <i className="fas fa-shopping-bag"></i>
          <span>{`${totalItems} ${
            totalItems === 1 && totalItems !== 0 ? "item" : "items"
          }`}</span>
        </div>
        <div className="modal-cart-body">
          <div className="product-summary">
            <img src={image} alt={product.name} />
            <div>
              <h4>{product.name}</h4>
              <p>{`Size: ${size}`}</p>
              <p>{product.price}</p>
            </div>
          </div>
          <div className="cart-summary">
            <div className="subtotal">
              <p>Subtotal</p>
              <p>{`$${totalPrice} CAD`}</p>
            </div>
            <div className="modal-buttons">
              <button className="view-bag-button" onClick={handleCheckOut}>
                VIEW BAG & CHECKOUT
              </button>
              <button className="continue-shopping-button" onClick={onClose}>
                CONTINUE SHOPPING
                <i className="fa fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="recommended-products">
          <h2>Goes well with</h2>
          <div className="products">
            {recommendedProducts.map((item, index) => (
              <div key={index} className="recommended-product">
                <img
                  src={
                    item.images[0].mainCarousel.media
                      .split("|")
                      .map((img) => img.trim())[0]
                  }
                  alt={item.name}
                />
                <h5>{item.name}</h5>
                <p>{item.price}</p>
              </div>
              // <div>{item.name}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToBagModal;
