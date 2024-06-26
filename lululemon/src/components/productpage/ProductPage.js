import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {Header} from "../shared/Header";
import Footer from "../shared/Footer";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {myKey, productURL, singleProductURL} from "../../redux/helper";
import './ProductPage.scss'
import {Modal} from "./Modal";
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import {ImageCarousel} from "./ImageCarousel";
import {Swatches} from "./Swatches";
import {SizeButtons} from "./SizeButtons";
import {AddToBag} from "./AddToBag";
import {ProductDetails} from "./ProductDetails";
import {WhyWeMadeThis} from "./WhyWeMadeThis";

import {Reviews} from "./Reviews";
import {useSelector} from "react-redux";
import YouMayLikeSide from "./YouMayLikeSide";
import YouMayLike from "./YouMayLike";

export const ProductPage = () => {
    // Router
    const {productID, colorID} = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    // useStates
    const [product, setProduct] = useState({})
    const [selectedColorId, setSelectedColorId] = useState(null)
    const [selectedSwatchIndex, setSelectedSwatchIndex] = useState(null)
    // const [selectedSize, setSelectedSize] = useState(false)
    const [selectedSizeIndex, setSelectedSizeIndex] = useState(null)
    const [selectedLengthIndex, setSelectedLengthIndex] = useState(null);
    const [swatchName, setSwatchName] = useState('')
    const [selectedSize, setSelectedSize] = useState('')
    const [selectedLength, setSelectedLength] = useState('');
    const [isSizeSelected, setIsSizeSelected] = useState(false)
    const [isSizeGroup, setIsSizeGroup] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [expandedIndex, setExpendedIndex] = useState(null);
    const [scrollPosition, setScrollPosition] = useState(0)

    const refs = useRef([])

    const products = useSelector(state => state.filterReducer.products) || [];
    const youMayLikeProducts = products.slice(0, 4);


    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const colorId = params.get('colorId')
        axios.get(`${singleProductURL}/${productID}?mykey=${myKey}`)
            .then(res => {
                const productData = res.data.rs
                console.log('productData ===>', productData)
                if (!productData || !productData.images || productData.images.length === 0) {
                    navigate('/wrong-product')
                }
                setProduct(productData)
                refs.current = productData.featurePanels?.map(() => React.createRef());
                // 默认选中第一个颜色的图片
                if (colorId) {
                    setSelectedColorId(colorId)
                    const swatchIndex = productData.swatches.findIndex(swatch => swatch.colorId === colorId);
                    if (swatchIndex !== -1) {
                        setSelectedSwatchIndex(swatchIndex);
                        setSwatchName(productData.swatches[swatchIndex].swatchAlt);
                    }
                } else if (productData.images && productData.images.length > 0) {
                    // selectedColorId(colorID)
                    setSelectedColorId(productData.images[0].colorId);
                }

            })
            .catch(error => {
                console.log('error fetching product', error)
                navigate('/wrong-product')
            })

    }, [productID, colorID]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productID, colorID]);

    // Define a function to get the images based on selected swatch
    const getCurrentImagesAndAlts = () => {
        const currentImages = product.images?.find(image => image.colorId === selectedColorId)
        if (currentImages) {
            return {
                images: currentImages.mainCarousel.media.split('|').map(img => img.trim()),
                alt: currentImages.mainCarousel.alt
            }
        }
        return {
            images: [],
            alt: 'No Alt'
        }
    }


    const {images, alt} = getCurrentImagesAndAlts()


    const handleSwatchClick = (colorID, index, swatchName) => {
        setSelectedColorId(colorID)
        setSelectedSwatchIndex(index)
        setSwatchName(swatchName)
        navigate(`/product/${productID}?colorId=${colorID}`);
    }
    const handleSizeButtonClick = (size, index, groupTitle) => {
        // setSelectedSize(!selectedSize)
        setSelectedSizeIndex(index)
        setSelectedSize(size)

        setIsSizeSelected(true)
        setIsSizeGroup(true)
    }
    const handleLengthButtonClick = (length, index) => {
        setSelectedLengthIndex(index);
        setSelectedLength(length);
        setIsSizeSelected(true);
        setIsSizeGroup(false)
    }

    const handleModalOpen = () => {
        setIsModalVisible(true)
        setScrollPosition(window.scrollY)
    }

    const handleModalClose = () => {
        setIsModalVisible(false)
        window.scrollTo(0, scrollPosition)
    }
    const handleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    const handleScrollAndExpand = (index) => {
        setExpendedIndex(index); // 设置展开的面板索引
        if (refs.current && refs.current.length > 0 && index < refs.current.length) {
            refs.current[index].current.scrollIntoView({behavior: 'smooth'});
        }
    };
    if (!product) {
        return <div>loading</div>
    }


    return (
        <>
            <div className={isModalVisible === true ? 'productPageWrapperHidden' : 'productPageWrapperActive'}>
                <Header/>
                <div className='productPageContainer'>
                    <div className='productInfoContainer'>

                        <div className='productImagesContainer'>
                            <ImageCarousel images={images} handleModalOpen={handleModalOpen} alt={alt}/>
                            {/*<button className="heartButton">*/}
                            {/*    <div className="heart">&#x2665;</div>*/}
                            {/*</button>*/}
                        </div>
                        <div className='productInfo'>
                            <Link to='/'><h4>What's New Page</h4></Link>
                            <div className='productName'>{product.name}</div>
                            <div className='productPrice'>{product.price}</div>

                            <div className='colorWord'>Colour
                                <div className='colorName wordStyle'>{swatchName}</div>
                            </div>
                            <Swatches product={product} handleSwatchClick={handleSwatchClick}
                                      selectedSwatchIndex={selectedSwatchIndex}/>
                            <SizeButtons product={product} isSizeSelected={isSizeSelected}
                                         selectedSize={selectedSize}
                                         selectedSizeIndex={selectedSizeIndex}
                                         handleSizeButtonClick={handleSizeButtonClick}
                                         handleLengthButtonClick={handleLengthButtonClick}
                                         isSizeGroup={isSizeGroup}
                                         selectedLength={selectedLength}
                                         selectedLengthIndex={selectedLengthIndex}
                            />

                            <AddToBag product={product}
                                      color={selectedColorId}
                                      size={selectedSize}
                                      isExpanded={isExpanded} handleExpand={handleExpand}/>
                            <ProductDetails product={product} refs={refs} handleScroll={handleScrollAndExpand}/>
                        </div>
                        <YouMayLikeSide products={youMayLikeProducts}/>

                    </div>
                    {product.whyWeMadeThis &&
                        <WhyWeMadeThis product={product} images={images} alt={alt} refs={refs}
                                       expandedIndex={expandedIndex} setExpendedIndex={setExpendedIndex}/>}
                </div>
                {/*Details go here*/}

                <br/>
                {/*<div>*/}
                {/*    /!*底下这俩都是返回Whats New Page。看你们爱用哪个都行*!/*/}
                {/*    <Link to='/'>To What's New Page </Link>*/}
                {/*    <br/>*/}
                {/*    <button onClick={() => navigate('/')}>Go Back to What's New Page</button>*/}
                {/*</div>*/}

                <YouMayLike products={youMayLikeProducts}/>

                <Reviews/>
                <Footer/>
            </div>
            {/*Here is the modal, you can close and open it*/}
            {isModalVisible && <Modal images={images} close={handleModalClose} alt={alt} name={product.name}/>}
        </>
    )
}

