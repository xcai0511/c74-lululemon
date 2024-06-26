import {actionTypes} from "./actionTypes";

export const addToBag = (product, color, size) => {
    return {
        type: actionTypes.ADD_TO_BAG,
        payload: {product, color, size}
    }
}

export const changeQuantity = (newQuantity, index) => {
    return {
        type: actionTypes.CHANGE_QUANTITY,
        payload: {
            newQuantity,
            index
        }

    }
}

export const removeProduct = (productID) => {
    return {
        type: actionTypes.REMOVE_PRODUCTS,
        payload: productID
    }
}