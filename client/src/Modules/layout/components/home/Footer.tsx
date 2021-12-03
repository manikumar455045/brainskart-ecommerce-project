import React from "react";
import brand from "../../../../Assets/img/brand.png";

let Footer : React.FC = () => {
    return(
        <React.Fragment>
            <section className="mt-5 bg-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={brand} className="mt-3" alt=""/>
                            <p className="footer-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at, cumque cupiditate doloremque harum impedit qui quidem sunt voluptate! Laborum.</p>
                            <div className='mb-3'>
                                <i className="fab fa-facebook fa-2x m-2"></i>
                                <i className="fab fa-instagram fa-2x m-2"></i>
                                <i className="fab fa-twitter fa-2x m-2"></i>
                            </div>

                        </div>
                        <div className="col-md-3">
                            <section className="m-5">
                                <h3>Useful Links</h3>
                                <div className="links mt-2">
                                    <li><a href="/products/men" className="text-dark m-2">Mens Wear</a></li>
                                    <li><a href="/products/women" className="text-dark m-2">Womens Wear</a></li>
                                    <li><a href="/products/kids" className="text-dark m-2">Kids Wear</a></li>
                                </div>
                            </section>
                        </div>
                        <div className="col-md-3">
                            <section className="m-5">
                                <h3>Need help?</h3>
                                <div className="links mt-2">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, eveniet.</p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default Footer;