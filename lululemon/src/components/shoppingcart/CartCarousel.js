import './CartCarousel.scss'
import {useState} from "react";
export const CartCarousel = ({imgList}) => {
    const [imgId, setImgId] = useState(0)
    const imgUrls = imgList.split('|')
    return <div className='cardCarousel'>
        <img src={imgUrls[imgId]} alt=""/>
        <div className="arrows">
            {imgId > 0 &&
                <div className="arrowBefore" onClick={() =>
                    imgId > 0 && setImgId(imgId - 1)}>
                    {'<'}
                </div>
            }
            {imgId < imgUrls.length - 1 &&
                <div className="arrowNext" onClick={() =>
                    imgId < imgUrls.length - 1 && setImgId(imgId + 1)}>
                    {'>'}
                </div>
            }

        </div>
    </div>
}