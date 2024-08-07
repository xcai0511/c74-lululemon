// Add an item to the cart
import {actionTypes} from "./actionTypes";

export const addItems = (product) => (dispatch, getState) => {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    const existingItemIndex = cart.findIndex(
        (item) => item.productId === product.productId && item.colorId === product.colorId && item.size === product.size
    );

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    dispatch({
        type: actionTypes.ADD_ITEMS,
        payload: cart,
    });
};

// Change the quantity of a specific item in the cart
export const changeQuantity = (newQuantity, index) => (dispatch, getState) => {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    if (index >= 0 && index < cart.length) {
        cart[index].quantity = newQuantity;
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        dispatch({
            type: actionTypes.CHANGE_QUANTITY,
            payload: cart,
        });
    }
};

// Update an item in the cart
export const edtCart = (newSize, newColorId, index, colorDes, image) => (dispatch, getState) => {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    if (index >= 0 && index < cart.length) {
        cart[index].size = newSize;
        cart[index].colorId = newColorId;
        cart[index].swatchName = colorDes;
        cart[index].image = image;

        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        dispatch({
            type: actionTypes.EDIT_CART,
            payload: cart,
        });
    }
};

// Remove an item from the cart
export const removeProduct = (itemId) => (dispatch, getState) => {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    cart = cart.filter((product) => product._id !== itemId);

    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    dispatch({
        type: actionTypes.REMOVE_PRODUCTS,
        payload: cart,
    });
};

// Fetch cart items from local storage
export const fetchCartItems = () => (dispatch) => {
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    dispatch({
        type: actionTypes.FETCH_CART_SUCCESS,
        payload: cart,
    });
};
// import {actionTypes} from "./actionTypes";
// import axios from "axios";
//
// // export const changeQuantity = (newQuantity, index) => {
// //     return {
// //         type: actionTypes.CHANGE_QUANTITY,
// //         payload: {
// //             newQuantity,
// //             index
// //         }
// //
// //     }
// // }
// export const changeQuantity = (newQuantity, index, itemId) => async dispatch => {
//     try {
//         const response = await axios.post(`http://localhost:8000/cart/update/${itemId}`, {quantity: newQuantity});
//         dispatch({
//             type: actionTypes.CHANGE_QUANTITY,
//             payload: {
//                 newQuantity,
//                 index
//             }
//         });
//         dispatch(fetchCartItems());
//     } catch (error) {
//         console.error("Error updating quantity:", error);
//         // 可以在此处添加错误处理逻辑
//     }
// };
//
// export const updateQuantity = (quantity, index, itemId) => {
//     return {
//         type: actionTypes.CHANGE_QUANTITY,
//         payload: {
//             newQuantity: quantity,
//             index: index,
//             itemId: itemId
//         }
//     }
// };
//
//
// // export const edtCart = (newSize, newColorId, index, itemId) => async dispatch => {
// //     try {
// //         const response = await axios.post(`http://localhost:8000/cart/update/${itemId}`,
// //             {size: newSize, colorId: newColorId});
// //         dispatch({
// //             type: actionTypes.EDIT_CART,
// //             payload: {
// //                 newSize,
// //                 newColorId,
// //                 index
// //             }
// //         });
// //         dispatch(fetchCartItems());
// //     } catch (error) {
// //         console.error("Error updating cart:", error);
// //         // 可以在此处添加错误处理逻辑
// //     }
// // };
// export const edtCart = (newSize, newColorId, index, itemId, colorDes, image) => async (dispatch, getState) => {
//     try {
//         const {shoppingCartReducer: {shoppingCart}} = getState();
//
//         // 查找是否存在相同的商品
//         const existingItemIndex = shoppingCart.findIndex(item =>
//             item.productId === shoppingCart[index].productId &&
//             item.colorId === newColorId &&
//             item.size === newSize
//         );
//
//         if (existingItemIndex !== -1 && existingItemIndex !== index) {
//             // 如果存在相同的商品，并且不是当前更新的商品，合并数量
//             const updatedQuantity = shoppingCart[existingItemIndex].quantity + shoppingCart[index].quantity;
//             await axios.post(`http://localhost:8000/cart/update/${shoppingCart[existingItemIndex]._id}`, {quantity: updatedQuantity});
//
//             // 删除当前商品
//             await axios.delete(`http://localhost:8000/cart/delete/${itemId}`);
//
//             // 更新 Redux store
//             dispatch({
//                 type: actionTypes.MERGE_CART_ITEMS,
//                 payload: {
//                     existingItemIndex,
//                     updatedQuantity
//                 }
//             });
//         } else {
//             // 否则，正常更新
//             await axios.post(`http://localhost:8000/cart/update/${itemId}`, {
//                 size: newSize,
//                 colorId: newColorId,
//                 swatchName: colorDes,
//                 image: image});
//             dispatch({
//                 type: actionTypes.EDIT_CART,
//                 payload: {
//                     newSize,
//                     newColorId,
//                     index,
//                     colorDes,
//                     image
//                 }
//             });
//         }
//
//         dispatch(fetchCartItems());
//     } catch (error) {
//         console.error("Error updating cart:", error);
//     }
// };
//
// export const removeProduct = (itemId, selectedSize, selectedColorId) => {
//
//     return {
//         type: actionTypes.REMOVE_PRODUCTS,
//         // payload: {productID, selectedSize, selectedColorId}
//         payload: {itemId, selectedSize, selectedColorId}
//
//     }
// }
// // test to add new items, Whitney you can delete this later
//
// export const addItems = (product) => {
//     return {
//         type: actionTypes.ADD_ITEMS,
//         payload: product
//     }
// }
// export const fetchCartSuccess = (cartItems) => ({
//     type: actionTypes.FETCH_CART_SUCCESS,
//     payload: cartItems,
// });
//
// export const fetchCartFailure = (error) => ({
//     type: actionTypes.FETCH_CART_ERROR,
//     payload: error,
// });
// export const fetchCartItems = () => async (dispatch) => {
//     try {
//         const response = await axios.get('http://localhost:8000/cart');
//         console.log(response.data);
//         dispatch(fetchCartSuccess(response.data));
//     } catch (error) {
//         dispatch(fetchCartFailure(error));
//     }
// }
//
