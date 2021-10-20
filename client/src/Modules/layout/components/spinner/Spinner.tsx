import React from "react";
import image from "../../../../Assets/img/spinner.gif";

interface IProps{}

let Spinner:React.FC<IProps> = ({}) => {
    return (
        <React.Fragment>
            <div>
                <img src={image} alt="" className="d-block m-auto"/>
            </div>
        </React.Fragment>
    )
};
export default Spinner;