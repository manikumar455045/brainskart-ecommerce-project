import React from "react";

interface IProps{

}

let Home : React.FC<IProps> = () => {
    return(
        <React.Fragment>
            <div className="landing-page">
                <div className="wrapper">
                        <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
                            <h5 className="display-3">Welcome to Brains Kart</h5>
                            <p>We deliver you the ultimate shopping experience. Get ready to witness latest varieties in Men's , Women's and Kids wear and get them delivered right to your doorstep.</p>
                            <p>Let's begin your journey with us!!!</p>
                        </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home;