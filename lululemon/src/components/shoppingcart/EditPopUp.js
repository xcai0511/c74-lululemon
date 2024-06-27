import './EditPopUp.scss'
import {CartCarousel} from "./CartCarousel";
import {useEffect, useState} from "react";
import {addToBag} from "../../redux/actions/shoppingCartActions";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

export const EditPopUp = ({product, key, closeOut}) => {
    console.log('popUpProduct', product)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const price = product.price.slice(0, product.price.indexOf('C')).trim()
    const [colorId, setColorId] = useState(product.images[0].colorId)
    const [colorDes, setColorDes] = useState()
    const [size, setSize] = useState(product.sizesSelected)

    useEffect(() => {
        product.swatches.map(item => {
                if (item.colorId === colorId) {
                    setColorDes(item.swatchAlt)
                }
            }
        )
    }, [colorId]);

    const handleUpdateBag = () => {
        navigate('/shop/mybag')
        dispatch(addToBag(product, colorId, size))
    }

    return <div className="editPopUp">
        <div className="productEdit">
            <div className="carousel"><CartCarousel imgList={product.images[0].mainCarousel.media}/></div>
            <div className="detailEdit">
                <div className="title">{product.name}</div>
                <div className="price">{`${price}.00`}</div>
                <div className="selectedColor">Color: {colorDes}</div>
                <div className="swatchesGroup">
                    {product.swatches.map((item, index) => {
                        if (item.colorId === colorId) {
                            return <div
                                className='swatchImgSelected'
                                style={{background: `url(${item.swatch})`}}
                            ></div>
                        } else {
                            return <div
                                className='swatchImg'
                                style={{background: `url(${item.swatch})`}}
                                onClick={() => {
                                    setColorId(item.colorId)
                                    setColorDes(item.swatchAlt)
                                }}
                            ></div>
                        }
                    })}
                </div>
                <div className="selectedSize">Size: {size}</div>
                <div className="sizesGroup">
                    {product.sizes[0].details.map((item, index) => {
                        if (item === size) {
                            return <button className='sizeBtnSelected'>{item}</button>
                        } else {
                            return <button className='sizeBtn'
                                           onClick={() => {
                                               setSize(item)
                                           }}>{item}</button>
                        }
                        }
                    )}
                </div>
                <button className="updateBtn" onClick={() => {handleUpdateBag()}}>UPDATE ITEM</button>
                <div className="viewDetails">View product details</div>
                <div className='closeOutBtn' onClick={() => closeOut(key)}>x</div>
            </div>
        </div>
    </div>
}