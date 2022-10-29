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
            loop={false}
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
                            {item.picture_product !== null ?
                                <img src={item.picture_product} alt="product" />
                                :
                                <img src={"data:image/png;base64, " + item.picture_link_product} alt="product" />
                            }
                    </SwiperSlide>
                ))
            }
        </Swiper>
        <Swiper
            onSwiper={setActiveThumb}
            spaceBetween={10}
            slidesPerView={4}
            modules={[Navigation, Thumbs]}
            className='product-images-slider-thumbs'
        >
            {
                props.images.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="product-images-slider-thumbs-wrapper">
                            {item.picture_product !== null ?
                                <img src={item.picture_product} alt="product" />
                                :
                                <img src={"data:image/png;base64, " + item.picture_link_product} alt="product" />
                            }
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


