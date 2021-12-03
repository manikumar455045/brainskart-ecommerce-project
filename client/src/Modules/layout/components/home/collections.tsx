import React from "react";
import img4 from "../../../../Assets/img/it-fairtrade-sustainability-d.jpg";
import img from "../../../../Assets/img/pexels-polina-tankilevitch-5585863.jpg";
import img2 from "../../../../Assets/img/store-at-glance-men-d.jpg"
import img3 from "../../../../Assets/img/rtor0030_1_e935734d.jpg"
import img5 from "../../../../Assets/img/Boys-Bottom-Wear-4.png"
import img6 from "../../../../Assets/img/desktop_cat_stay_classy_budget_boy4to6y_21102021.jpg"

interface IProps{

}

let Collections : React.FC<IProps> = () => {
    return(
        <React.Fragment>
            <section className="m-3 btn-outline-dark">
                <h1 className="text-center p-3">Our Collections</h1>
            </section>
            <section className="container">
                <img src={img4} className='img-fluid' alt=""/>
            </section>

            <section className="mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 text-section">
                            <h1 className="font-weight-bold">MENS WEAR</h1>
                            <p>Shop Our Latest Collections of Shirts Online From The Comfort Of Your Home!Click to discover more...</p>
                            <button className="btn btn-outline-dark"><a href="/products/men" className="text-dark">SHOP NOW</a></button>
                        </div>
                        <div className="col-md-4">
                            <img src={img2} className="img"  alt=""/>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={img3} className="img"  alt=""/>
                        </div>
                        <div className="col-md-8 text-section">
                            <h1 className="font-weight-bold">WOMENS WEAR</h1>
                            <p>Latest designer collections straight out of the fashion houses delivered right to your doorstep.</p>
                            <button className="btn btn-outline-dark"><a href="/products/women" className="text-dark">SHOP NOW</a></button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 text-section">
                            <h1 className="font-weight-bold">KIDS WEAR</h1>
                            <p>Shop Our Latest Collections of Shirts Online From The Comfort Of Your Home!Click to discover more...</p>
                            <button className="btn btn-outline-dark"><a href="/products/men" className="text-dark">SHOP NOW</a></button>
                        </div>
                        <div className="col-md-4">
                            <img src={img5} className="img"  alt=""/>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container">
                <img src={img6} className='img-fluid' alt=""/>
            </section>
        </React.Fragment>
    )

}

export default Collections;