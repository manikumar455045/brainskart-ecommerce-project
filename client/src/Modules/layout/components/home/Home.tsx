import React from "react";
import img from '../../../../Assets/img/pexels-polina-tankilevitch-5585863.jpg'
import img2 from '../../../../Assets/img/pexels-bess-hamiti-35188.jpg'
import img3 from '../../../../Assets/img/pexels-photo-7624399.jpeg'
import img4 from '../../../../Assets/img/it-fairtrade-sustainability-d.jpg'
import Collections from "./collections";


interface IProps{

}

let Home : React.FC<IProps> = () => {
    return(
        /*<React.Fragment>
            <div className="landing-page">
                <div className="wrapper">
                        <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
                            <h5 className="display-3">Welcome to Brains Kart</h5>
                            <p>We deliver you the ultimate shopping experience. Get ready to witness latest varieties in Men's , Women's and Kids wear and get them delivered right to your doorstep.</p>
                            <p>Let's begin your journey with us!!!</p>
                        </div>
                </div>
            </div>
        </React.Fragment>*/
            <React.Fragment>
                <section className="m-3 m-md-0">
                <div className="container-fluid">
                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-interval='4000' data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="wrapper d-flex justify-content-center">
                                    <div className="img-section flex-1">
                                        <img src={img} className="img img-thumbnail" alt=""/>
                                    </div>
                                    <div className="text-section  flex-1">
                                        <h3>SUMMER SALE</h3>
                                        <p>DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.</p>
                                        <button className="btn btn-outline-dark"><a href="/products/men" className='text-dark'>Shop Now</a></button>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="wrapper d-flex justify-content-center">
                                    <div className="img-section flex-1">
                                        <img src={img2} className="img" alt=""/>
                                    </div>
                                    <div className="text-section flex-1">
                                        <h3>KIDS COLLECTION</h3>
                                        <p>DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.</p>
                                        <button className="btn btn-outline-dark"><a href="/products/kids" className='text-dark'>Shop Now</a></button>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="wrapper d-flex justify-content-center">
                                    <div className="img-section flex-1">
                                        <img src={img3} className="img" alt=""/>
                                    </div>
                                    <div className="text-section flex-1">
                                        <h3>AUTUMN COLLECTION</h3>
                                        <p>DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.</p>
                                        <button className="btn btn-outline-dark"><a href="/products/men" className='text-dark'>Shop Now</a></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </section>
                <Collections/>
            </React.Fragment>
    )
}

export default Home;