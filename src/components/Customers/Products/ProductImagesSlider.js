import './product-image-slider.scss'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper'
import { useState } from 'react'
import { Pagination } from "swiper";
import { ImageViewer } from "react-image-viewer-dv"

import { ImageGroup, Image } from 'react-fullscreen-image'

const ProductImagesSlider = props => {
    const [activeThumb, setActiveThumb] = useState(null)

    return <>
        <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation, Thumbs]}
            grabCursor={true}
            thumbs={{ swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null }}
            className='product-images-slider'
        >
            {
                props.images.map((item, index) => (
                    <SwiperSlide key={index}>
                        <ImageViewer>
                            <img src={"data:image/png;base64, " + item.picture_link_product} alt="product images" />
                        </ImageViewer>
                    </SwiperSlide>
                ))
                // <ImageGroup>
                //     <ul className="images">
                //         {props.images.map((item, index) => (
                //             <li key={item}>
                //                 <SwiperSlide key={index}>
                //                     <Image
                //                         src={"data:image/png;base64, " + item.picture_link_product}
                //                         alt="nature"
                //                         style={{
                //                             position: 'absolute',
                //                             top: 0,
                //                             left: 0,
                //                             right: 0,
                //                             bottom: 0,
                //                             height: '100%',
                //                             width: '100%',
                //                             objectFit: 'cover',
                //                         }}
                //                     />
                //                 </SwiperSlide>
                //             </li>
                //         ))}
                //     </ul>
                // </ImageGroup>
            }
        </Swiper>
        <Swiper
            onSwiper={setActiveThumb}
            // loop={true}
            spaceBetween={10}
            slidesPerView={4}
            modules={[Navigation, Thumbs]}
            className='product-images-slider-thumbs'
        >
            {
                props.images.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="product-images-slider-thumbs-wrapper">
                            <img src={"data:image/png;base64, " + item.picture_link_product} alt="product images" />
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    </>
}

ProductImagesSlider.propTypes = {
    images: PropTypes.array.isRequired
}

export default ProductImagesSlider


