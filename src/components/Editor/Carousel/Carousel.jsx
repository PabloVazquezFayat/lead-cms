import './Carousel.css'
import React from 'react'

export default function Carousel(props) {
    
    const slides = props.data || [];

    console.log(slides)

    const carouselControls = ()=> {

        if(slides.map === 0){
            return <li className="carousel-indicator-btns"></li>
        }
        
        return slides.map( (slide, i) =>  <li key={i} className="carousel-indicator-btns"></li>)
    }

    const carouselSlides = ()=>{

        if(slides.length === 0){
            return <div> No slides found</div>
        }

        return slides.map((slide, i)=> {

            const style = {background: `background: ${slide.overlayColor}}`};

            return <div key={i} className="carousel-item">
                        <img className="" src={slide.backgroundImage} alt="slide"/>
                        <div className="overlay" style={style}></div>
                        <div className="carousel-caption slide-header">
                            <h5>{slide.header}</h5>
                            <p>{slide.paragraph}</p>
                            <p><a href={slide.link}>{slide.cta}</a></p>
                        </div>
                    </div>
        });
    }

    return (
        <div className="carousel slide">
            <ol className="carousel-indicators">
                {carouselControls()}
            </ol>
            <ul className="carousel-inner">
                {carouselSlides()}
            </ul>
            <div className="carousel-control-prev">
                <span className="carousel-control-prev-icon"></span>
                <span className="sr-only">Previous</span>
            </div>
            <div className="carousel-control-next">
                <span className="carousel-control-next-icon"></span>
                <span className="sr-only">Next</span>
            </div>
        </div>
    )
}
