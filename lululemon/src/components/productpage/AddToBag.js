import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import './AddToBag.scss'
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addToBag} from "../../redux/actions/shoppingCartActions";

export const AddToBag = ({product, color, size, isExpanded, handleExpand}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleAddToBag = () => {
        navigate('/shop/mybag')
        dispatch(addToBag(product, color, size))
    }


    return (
        <div className='addToBagContainer'>
            <div className='ship'>
                <label className='shipLabel' htmlFor="ship1">
                    <input id='ship1' className='ship1' type="radio"/> <h3>Ship it to me</h3>
                </label>
                <span>Free shipping and returns</span>
            </div>
            <div className='pickupContainer'>
                <div className='iconContainer'>
                    <StorefrontOutlinedIcon className='pickupIcon'/>
                    <h3>Pick up in store</h3>
                </div>
                <div className='expand'>
                    {isExpanded === false ?
                        <div className='addIcon' onClick={handleExpand}><AddIcon/></div> :
                        <div className='removeIcon' onClick={handleExpand}><RemoveIcon/></div>}
                </div>
            </div>
            {isExpanded === true && (
                <div className='pickUpInfoContainer'>
                    <div className='pickUpInfo'>
                        Available for Buy & Pick-Up at these locations in Toronto, Ontario Change
                        Locations
                        Pick up in-store within 2 hours.
                    </div>
                    <label htmlFor="locationInput">
                        <input type="radio" id='locationInput' className='locationInput'/> Sherway
                        Gardens (15.2 km)
                    </label>
                </div>)}
            <div className='buttonContainer'>
                <button className='button1' onClick={() => handleAddToBag(product)}>ADD TO BAG</button>

            </div>
            <div className='otherStoreContainer'>
                <button className='button2'>Check All Store Inventory</button>
            </div>
        </div>
    )
}