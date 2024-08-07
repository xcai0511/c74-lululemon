// header component

import "./Header.css"
import Men from "./Men";
import React, {useEffect, useState} from "react";
import Women from "./Women";
import Accessories from "./Accessories";
import Shoes from "./Shoes";
import FathersDay from "./FathersDay";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {LoginModal} from "../checkout/LoginModal";
import {fetchCartItemsFromDB} from "../../redux/utils/api";

export const Header = ({isSticky}) => {
    const shoppingCart = useSelector(state => state.shoppingCartReducer.shoppingCart)
    const navigate = useNavigate()
    const [hover, setHover] = useState([false, false, false, false, false]);
    const [cartCount, setCartCount] = useState(shoppingCart.length)
    const userInfo = useSelector(state => state.authReducer.user)
    const isLogin = useSelector(state => state.authReducer.loginStatus)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [isSuccess, setIsSuccess] = useState(false)
    // markxu@itlab.com
    // ITLabAPI@2024

    const updateHover = (index, newValue) => {
        // Create a new array with the updated element
        const newItems = [...hover];
        newItems[index] = newValue;
        // Update the state with the new array
        setHover(newItems);
    };

    const handleOpenLoginModal = () => {
        setIsModalOpen(true)
    }
    const handleCLoseLoginModal = () => {
        setIsModalOpen(false)
    }

    useEffect(() => {
        const fetchAndCountCartItems = () => {
            const cartItems = JSON.parse(localStorage.getItem('shoppingCart')) || [];
            const shoppingCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
            setCartCount(shoppingCartCount);
        };

        fetchAndCountCartItems();
    }, [localStorage]);
    return (

        <div className='headerContent'>
            <div className="topHeaderNavigation">
                <div className="topHeaderNavigationIndividual">
                    <a href="">
                        <img src="https://cdn-icons-png.flaticon.com/512/535/535239.png" alt=""/>
                        <p id="miniAnimation">Store Locator</p>
                    </a>
                </div>
                <div className="topHeaderNavigationIndividual">
                    <a href="">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD3XdvwTKsDFBi3y_Twcy_uoLeK9gvEntR3A&s"
                            alt=""/>
                        <p id="miniAnimation">Gift Cards</p>
                    </a>
                </div>
                <div className="topHeaderNavigationIndividual">
                    <a href="">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/1200px-Icon-round-Question_mark.svg.png"
                            alt=""/>
                        <p id="miniAnimation">Get Help</p>
                    </a>
                </div>
                <div className="topHeaderNavigationIndividual">
                    <a href="">
                        <img src="https://static-00.iconduck.com/assets.00/globe-icon-1024x1024-dvnknm0e.png"
                             alt=""/>
                        <p id="miniAnimation">USA</p>
                    </a>
                </div>
            </div>
            <div className={isSticky ? 'sticky' : ""}>
                <div className='headerNavigation'>
                    <div className="headerLeft">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Lululemon_Athletica_logo.svg/2048px-Lululemon_Athletica_logo.svg.png"
                            alt="lululemonLogo"/>

                        <div className="individual" onMouseEnter={() => updateHover(0, true)}
                             onMouseLeave={() => updateHover(0, false)}>
                            <a href="" id="animation">
                                <p>WOMEN</p>
                            </a>
                        </div>

                        <div className="individual" onMouseEnter={() => updateHover(1, true)}
                             onMouseLeave={() => updateHover(1, false)}>
                            <a href="" id="animation">
                                <p>MEN</p>
                            </a>
                        </div>

                        <div className="individual" onMouseEnter={() => updateHover(2, true)}
                             onMouseLeave={() => updateHover(2, false)}>
                            <a href="" id="animation">
                                <p>ACCESSORIES</p>
                            </a>
                        </div>

                        <div className="individual" onMouseEnter={() => updateHover(3, true)}
                             onMouseLeave={() => updateHover(3, false)}>
                            <a href="" id="animation">
                                <p>SHOES</p>
                            </a>
                        </div>
                        <div className="individual" onMouseEnter={() => updateHover(4, true)}
                             onMouseLeave={() => updateHover(4, false)}>
                            <a href="" id="animation">
                                <p style={{color: "#c8102e"}}>FATHER'S DAY</p>
                            </a>
                        </div>
                    </div>

                    <div className="headerRight">
                        <div className="input">
                            <button className="search">
                                <img
                                    src="https://static-00.iconduck.com/assets.00/magnifier-left-icon-512x512-vmy8tses.png"
                                    alt=""/>
                            </button>
                            <input type="text" placeholder="Search"/>
                        </div>

                        <div className="threeIcons">
                            <a onClick={() => {
                                if (isLogin === false)
                                    handleOpenLoginModal()
                            }}>
                                <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" alt=""/>
                                <p id="miniAnimation"> {!isLogin ? 'Sign In' : `${userInfo.firstName} ${userInfo.lastName}`}</p>
                            </a>
                            <a href="">
                                <img src="https://www.svgrepo.com/show/326671/heart-outline.svg" alt=""/>
                            </a>

                            <a onClick={() => navigate('/shop/mybag')}>
                                <img src="https://www.svgrepo.com/show/43071/shopping-bag.svg" alt=""/>
                                <p>{cartCount}</p>
                            </a>
                        </div>
                    </div>
                </div>

                {hover[0] && <Women/>}
                {hover[1] && <Men/>}
                {hover[2] && <Accessories/>}
                {hover[3] && <Shoes/>}
                {hover[4] && <FathersDay/>}
                {isModalOpen && <LoginModal handleModalClose={handleCLoseLoginModal} isSuccess={isSuccess}
                                            setIsSuccess={setIsSuccess}/>}
            </div>
        </div>
    );
};

