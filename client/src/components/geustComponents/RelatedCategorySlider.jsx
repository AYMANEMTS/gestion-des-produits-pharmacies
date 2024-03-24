import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useStoreContext} from "../../contexts/StoreContext";
import CardCategory from "./CardCategory";

const RelatedCategorySlider = () => {
    const CustomPrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <button className={className} onClick={onClick}
                    style={{...style, display: 'block', color: 'green', fontSize: '24px'}}>
                <svg xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 448 512" height={"35"} fill={"green"}>
                    <path
                        d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                </svg>
            </button>
        );
    };
    const CustomNextArrow = (props) => {
        const {className, style, onClick} = props;
        return (
            <button className={className} onClick={onClick} style={{...style,display: 'block',color: 'green', fontSize: '24px'}}>
                <svg xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 448 512" height={"35"} fill={"green"}>
                    <path
                        d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
                </svg>
            </button>
        );
    };
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />
    };
    const {usingCategories} = useStoreContext()
    const bestCategories = usingCategories.filter((cat) => cat.produits.length > 1)
    return (
        <div className="mx-auto my-12">
            <Slider {...settings}>
                {bestCategories.map((category,key) => (
                    <div key={key} className="px-2">
                        <CardCategory category={category}/>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default RelatedCategorySlider;