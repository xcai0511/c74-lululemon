import fakeCartData from '../../components/shoppingcart/fakeCartData.json'
import {actionTypes} from "../actions/actionTypes";


const initialState = {
    // shoppingCart: JSON.parse(localStorage.getItem('shoppingCart')) || fakeCartData.cartItems
    // shoppingCart: fakeCartData.cartItems
    shoppingCart: JSON.parse(localStorage.getItem('shoppingCart')) || []
}

export const shoppingCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_BAG:
            let addProduct = action.payload.product
            let idExist = false
            const addQuantity = state.shoppingCart.map(item => {
                if (item.productId === action.payload.product.productId
                    // && item.images[0].colorId === action.payload.color
                    // && item.sizesSelected === action.payload.size
                ) { if (item.images[0].colorId === action.payload.color) {
                    console.log('SAME', item.quantity)
                    idExist = true
                    let addItem = {
                        ...item,
                        quantity: (item.quantity || 0) + 1
                    }
                    console.log(addItem)
                    return addItem
                }

                }})

            if (idExist) {
                return {...state, shoppingCart: addQuantity}
            }

            if (!idExist) {
                addProduct = {
                    ...addProduct,
                    images: addProduct.images.filter(item => item.colorId === action.payload.color)
                }
                addProduct = {
                    ...addProduct,
                    sizesSelected: action.payload.size
                }
                addProduct = {
                    ...addProduct,
                    quantity: 1
                }
                console.log('add', addProduct)
                return {
                    ...state,
                    shoppingCart: [...state.shoppingCart, addProduct]
            }}
        case actionTypes.CHANGE_QUANTITY :
            const updatedCart = state.shoppingCart.map((item, index) => {
                return index === action.payload.index ? {...item, quantity: action.payload.newQuantity}
                    : item
            })
            // localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
            return {
                ...state,
                shoppingCart: updatedCart
            }
        case actionTypes.REMOVE_PRODUCTS:
            const newCart = state.shoppingCart.filter(product => product.productId !== action.payload)
            // localStorage.setItem('shoppingCart', JSON.stringify(newCart));
            return {...state, shoppingCart: newCart}
        default:
            return state
    }
}