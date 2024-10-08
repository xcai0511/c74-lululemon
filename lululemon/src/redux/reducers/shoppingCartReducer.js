import { actionTypes } from "../actions/actionTypes";

const initialState = {
  shoppingCart: JSON.parse(localStorage.getItem("shoppingCart")) || [],
  error: null,
  cartId: localStorage.getItem("cartId") || null,
  savedItems: [],
  shippingCost: 0,
  taxRate: 0,
  taxAmount: 0,
  totalBeforeTax: 0,
  shippingMethod: "Standard Shipping",
  orderId: null,
  orderItems: [],
  orderAddress: null,
};

export const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_QUANTITY:
      return {
        ...state,
        shoppingCart: action.payload,
      };
    case actionTypes.EDIT_CART:
      return {
        ...state,
        shoppingCart: action.payload,
      };
    case actionTypes.MERGE_CART_ITEMS:
      return {
        ...state,
        shoppingCart: action.payload,
      };
    case actionTypes.REMOVE_PRODUCTS:
      return {
        ...state,
        shoppingCart: action.payload,
      };
    case actionTypes.ADD_ITEMS:
      return {
        ...state,
        shoppingCart: action.payload,
      };
    case actionTypes.FETCH_CART_SUCCESS:
      return {
        ...state,
        shoppingCart: action.payload,
        error: null,
      };
    case actionTypes.FETCH_CART_ERROR:
      return {
        ...state,
        shoppingCart: [],
        error: action.payload,
      };
    case actionTypes.SET_CARTID:
      return {
        ...state,
        cartId: action.payload,
      };
    case actionTypes.SAVE_FOR_LATER:
      const savedItem = action.payload;
      let newShoppingCart = [...state.shoppingCart];
      newShoppingCart = newShoppingCart.filter((item) => {
        return !(
          item.productId === savedItem.productId &&
          item.colorId === savedItem.colorId &&
          item.size === savedItem.size &&
          item.quantity === savedItem.quantity &&
          item.price === savedItem.price
        );
      });
      return {
        ...state,
        savedItems: [...state.savedItems, savedItem],
        shoppingCart: newShoppingCart,
      };
    case actionTypes.ADD_BACK_TO_CART:
      const unsavedItem = action.payload;
      let newSavedShoppingCart = [...state.savedItems];
      newSavedShoppingCart = newSavedShoppingCart.filter((item) => {
        return !(
          item.productId === unsavedItem.productId &&
          item.colorId === unsavedItem.colorId &&
          item.size === unsavedItem.size &&
          item.quantity === unsavedItem.quantity &&
          item.price === unsavedItem.price
        );
      });
      return {
        ...state,
        shoppingCart: [...state.shoppingCart, unsavedItem],
        savedItems: newSavedShoppingCart,
      };

    case actionTypes.FETCH_SAVED_ITEMS_FROM_SERVER:
      return { ...state, savedItems: action.payload };
    case actionTypes.LOGOUT:
      return { ...state, savedItems: [] };
    case actionTypes.SET_SHIPPING_COST:
      let shippingMethod;
      if (action.payload === 0) {
        shippingMethod = "Standard Shipping (FREE)";
      }
      if (action.payload === 20) {
        shippingMethod = "Express Shipping ($20.00)";
      }
      if (action.payload === 30) {
        shippingMethod = "Priority Shipping ($30.00)";
      }
      return {
        ...state,
        shippingCost: action.payload,
        shippingMethod: shippingMethod,
      };
    case actionTypes.SET_TAX_RATE:
      return {
        ...state,
        taxRate: action.payload,
      };
    case actionTypes.SET_TAX_AMOUNT:
      return {
        ...state,
        taxAmount: action.payload,
      };

    case actionTypes.SET_TOTAL_BEFORE_TAX:
      return {
        ...state,
        totalBeforeTax: action.payload,
      };

    case actionTypes.SET_ORDER_ID:
      return {
        ...state,
        orderId: action.payload,
      };

    case actionTypes.SET_ORDER_ITEMS:
      const newOrderItems = [...action.payload];
      return {
        ...state,
        orderItems: newOrderItems,
      };

    case actionTypes.SET_ORDER_ADDRESS:
      return {
        ...state,
        orderAddress: action.payload,
      };

    default:
      return state;
  }
};


// const initialState = {
//     // shoppingCart: calStorage.getItem('shoppingCart')) || fakeCartData.cartItemsJSON.parse(lo
//     // shoppingCart: fakeCartData.cartItems
//     // shoppingCart: []     // 模拟空购物车
//     shoppingCart: JSON.parse(localStorage.getItem('shoppingCart')) || [],
//     error: null,
// }

// export const shoppingCartReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case actionTypes.CHANGE_QUANTITY :
//             const updatedCart = state.shoppingCart.map((item, index) => {
//                 return index === action.payload.index ? {...item, quantity: action.payload.newQuantity}
//                     : item
//             })
//             localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
//             return {
//                 ...state,
//                 shoppingCart: updatedCart
//             }
//         case actionTypes.EDIT_CART:
//             const editedCart = state.shoppingCart.map((item, index) => {
//                 return index === action.payload.index
//                     ? {...item, size: action.payload.newSize, colorId: action.payload.newColorId}
//                     : item
//             })
//             localStorage.setItem('shoppingCart', JSON.stringify(editedCart));
//             return {
//                 ...state,
//                 shoppingCart: editedCart
//             }
//         case actionTypes.MERGE_CART_ITEMS:
//             const mergedCart = state.shoppingCart.map((item, idx) => {
//                 if (idx === action.payload.existingItemIndex) {
//                     return {...item, quantity: action.payload.updatedQuantity};
//                 }
//                 return item;
//             }).filter((_, idx) => idx !== action.payload.index);
//             localStorage.setItem('shoppingCart', JSON.stringify(mergedCart));
//
//             return {
//                 ...state,
//                 shoppingCart: mergedCart
//             };
//         case actionTypes.REMOVE_PRODUCTS:
//             // deal with filter out the selected product, but also filter same product with different size OR same product with different colors
//             // const newCart = state.shoppingCart.filter(product => product._id !== action.payload.itemId || (product._id === action.payload.itemId && product.selectedSize !== action.payload.selectedSize) || (product._id === action.payload.itemId && product.selectedColorId !== action.payload.selectedColorId))
//
//             const newCart = state.shoppingCart.filter(product => product._id !== action.payload.itemId);
//             localStorage.setItem('shoppingCart', JSON.stringify(newCart));
//             return {...state, shoppingCart: newCart}
//         // test to add new items, Whitney you can delete this later
//         case actionTypes.ADD_ITEMS:
//             const addedCart = [...state.shoppingCart, action.payload]
//             return {...state, shoppingCart: addedCart}
//         case actionTypes.FETCH_CART_SUCCESS:
//             localStorage.setItem('shoppingCart', JSON.stringify(action.payload));
//
//             return {
//                 ...state,
//                 shoppingCart: action.payload,
//                 error: null,
//             };
//         case actionTypes.FETCH_CART_ERROR:
//             return {
//                 ...state,
//                 shoppingCart: [],
//                 error: action.payload,
//             };
//         default:
//             return state
//     }
// }