import React, { Component } from "react";
import { Fade } from 'react-slideshow-image';

const fadeImages = [
   '/images/sliderHome/slide_1.png',
    '/images/sliderHome/slide_2.jpg',
    '/images/sliderHome/slide_3.jpg',
    '/images/sliderHome/slide_4.jpg',
    '/images/sliderHome/slide_5.jpg',
    '/images/sliderHome/slide_6.jpg',
    '/images/sliderHome/slide_7.jpg',
    '/images/sliderHome/slide_8.jpg',
    '/images/sliderHome/slide_9.jpg',
    '/images/sliderHome/slide_10.jpg',
    '/images/sliderHome/slide_11.jpeg',

];

const fadeProperties = {
    duration: 2000,
    transitionDuration: 500,
    infinite: true,
    indicators: true
}

const HomeSlider = () => {
    return (
        <Fade {...fadeProperties}>
            {fadeImages.map((photo,index) => <PhotoForSlide photo={photo} id={index}/>)}
        </Fade>
    )
}

class PhotoForSlide extends Component{
    render(){
        return(
            <div className="each-fade">
                <div className="image-container">
                    <img src={this.props.photo} width="100%" />
                </div>
                <h2>First Slide</h2>
            </div>
        )
    }
}

export default HomeSlider