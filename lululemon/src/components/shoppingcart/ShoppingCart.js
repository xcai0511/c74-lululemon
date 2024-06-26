import {useSelector} from "react-redux";
import {EmptyShoppingCart} from "./EmptyShoppingCart";
import {ShoppingCartWithItems} from "./ShoppingCartWithItems";
import AccessAlarmTwoToneIcon from '@mui/icons-material/AccessAlarmTwoTone';
import {useEffect} from "react";


export const ShoppingCart = () => {
    const shoppingCart = useSelector(state => state.shoppingCartReducer.shoppingCart)

    const saveCartToLocalStorage = () => {
        localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    };

    useEffect(() => {
        saveCartToLocalStorage()
    }, []);

    return (

        <div>
            <ShoppingCartWithItems/>
            {JSON.stringify(shoppingCart)}
            {/*{shoppingCart && shoppingCart.length === 0 && <EmptyShoppingCart/>}*/}
            {/*{shoppingCart && shoppingCart.length > 0 && <ShoppingCartWithItems/>}*/}
        </div>

    )
}