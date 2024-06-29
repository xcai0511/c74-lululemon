import fakeCartData from '../../components/shoppingcart/fakeCartData.json'
import {actionTypes} from "../actions/actionTypes";


const initialState = {
    shoppingCart: JSON.parse(localStorage.getItem('shoppingCart')) || fakeCartData.cartItems
    // shoppingCart: fakeCartData.cartItems
    // shoppingCart: []     // 模拟空购物车
}

export const shoppingCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_QUANTITY :
            const updatedCart = state.shoppingCart.map((item, index) => {
                return index === action.payload.index ? {...item, quantity: action.payload.newQuantity}
                    : item
            })
            localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
            return {
                ...state,
                shoppingCart: updatedCart
            }
        case actionTypes.REMOVE_PRODUCTS:
            // deal with filter out the selected product, but also filter same product with different size OR same product with different colors
            const newCart = state.shoppingCart.filter(product => product.productId !== action.payload.productID || (product.productId === action.payload.productID && product.selectedSize !== action.payload.selectedSize) || (product.productId === action.payload.productID && product.selectedColorId !== action.payload.selectedColorId))
            localStorage.setItem('shoppingCart', JSON.stringify(newCart));
            return {...state, shoppingCart: newCart}
        // test to add new items, Whitney you can delete this later
        case actionTypes.ADD_ITEMS:
            const addedCart = [...state.shoppingCart, action.payload]
            return {...state, shoppingCart: addedCart}
        default:
            return state
    }
}