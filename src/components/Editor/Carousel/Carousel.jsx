import './Carousel.css'
import React, { useState, useEffect, useMemo } from 'react'

export default function Carousel(props) {
    
    const slides = useMemo(()=> props.data || [], [props.data]);

    const [currentSlide, setCurrentSlide] = useState();

    useEffect(()=> {
        if(slides.length > 0){
            setCurrentSlide(slides[0]);
        }
    }, [slides]);

    const handleCarouselControlsClick = (e)=> {
        const id = e.target.id; 
        setCurrentSlide(slides[id]);
    }

    const carouselControls = ()=> {

        if(slides.map === 0){
            return <li className="cms-carousel-btn"></li>
        }
        
        return slides.map( (slide, i) =>  {
            return  <li 
                        key={i} 
                        id={i}
                        className="cms-carousel-btn"
                        onClick={handleCarouselControlsClick}
                    >
                    </li>
        })
    }

    const carouselSlides = ()=>{

        if(!currentSlide){
            return <div> No slides found</div>
        }

        const style = {backgroundColor: currentSlide.overlayColor};

        return <li className="cms-slide-item">
                    <img className="cms-slide-image" src={currentSlide.backgroundImage} alt="slide"/>
                    <div className="cms-slide-overlay" style={style}></div>
                    <div className="cms-slide-caption">
                        <h5>{currentSlide.header}</h5>
                        <p>{currentSlide.paragraph}</p>
                        <label>{currentSlide.cta}</label>
                    </div>
                </li>
    }

    return (
        <div className="cms-carousel">
            <ul className="cms-carousel-body">
                {carouselSlides()}
            </ul>
            <ol className="cms-carousel-btns">
                {carouselControls()}
            </ol>
            {/* <div className="carousel-control-prev">
                <span className="carousel-control-prev-icon"></span>
                <span className="sr-only">Previous</span>
            </div>
            <div className="carousel-control-next">
                <span className="carousel-control-next-icon"></span>
                <span className="sr-only">Next</span>
            </div> */}
        </div>
    )
}
