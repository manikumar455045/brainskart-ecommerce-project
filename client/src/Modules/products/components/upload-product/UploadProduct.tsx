import React, {useState} from "react";
import {Link} from "react-router-dom";
import brand from "../../../../Assets/img/brand.png";
import {IProduct} from "../../Models/IProduct";
import * as ProductActions from "../../../../redux/product/product.action"
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {useSelector} from 'react-redux';
import * as userReducer from '../../../../redux/users/user.reducer';
interface IProps{

}
interface IState {
    product : IProduct
}
interface IUser{
    users : userReducer.UserState
}
let UploadProduct : React.FC<IProps> = () => {
    let dispatch = useDispatch();
    let history = useHistory();
    let userState : userReducer.UserState = useSelector((state : IUser) => {
        return state.users;
    })
    let [productState , setProductState] = useState<IState>({
        product : {} as IProduct
    })

    let UpdateInput = (event : React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setProductState({
            product : {
                ...productState.product,
                [event.target.name]: event.target.value
            }
        })
    }
    let UpdateImage = async (event : React.ChangeEvent<HTMLInputElement | any>) => {
        let image : Blob = event.target.files[0];
        let base64image : string | ArrayBuffer = await convertToBase64(image);
        setProductState({
            product : {
                ...productState.product,
                image : base64image.toString()
            }
        })
    }

    let convertToBase64 = (image : Blob) : Promise<string | ArrayBuffer> => {
        return new Promise((resolve , reject) => {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(image);
            fileReader.addEventListener('load' , () => {
                if(fileReader.result){
                    resolve(fileReader.result)
                }
                else{
                    reject("An error occured")
                }
            })
        })
    }

    let submitProduct = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(ProductActions.uploadProduct(productState.product , history))
    }
    return(
        <React.Fragment>
            {/*<pre>{JSON.stringify(productState)}</pre>*/}
            {
                userState.user.isAdmin ?
                    <section className="mt-3">
                        <div className="container">
                            <div className="row text-center">
                                <div className="col-md-6 m-auto">
                                    <div className="card">
                                        <div className="card-header bg-dark text-center text-white">Enter the product details</div>
                                        <div className="card-body bg-form-light">
                                            <form onSubmit={submitProduct}>
                                                <div className="mb-3">
                                                    <input name = "name" type="text" className="form-control" onChange={UpdateInput} placeholder="Name" required/>
                                                </div>
                                                <div className="mb-3">
                                                    <input name = "brand" type="text" className="form-control" onChange={UpdateInput} placeholder="Brand" required/>
                                                </div>
                                                <div className="mb-3">
                                                    <input name = "price" type="text" className="form-control" onChange={UpdateInput} placeholder="price" required/>
                                                </div>
                                                <div className="mb-3">
                                                    <input name = "qty" type="number" className="form-control" onChange={UpdateInput} placeholder="quantity" required/>
                                                </div>
                                                <div className="mb-3">
                                                    <input type="file" className="form-control" onChange={UpdateImage} required/>
                                                </div>
                                                <div className="mb-3">
                                                    <select className="form-select" name="category" onChange={UpdateInput}>
                                                        <option selected>Select Category</option>
                                                        <option value="MEN">Men</option>
                                                        <option value="WOMEN">Women</option>
                                                        <option value="KIDS">Kids</option>
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <textarea name = "description" className="form-control" rows={3} onChange={UpdateInput} placeholder="Description" required/>
                                                </div>
                                                <div className="mb-3">
                                                    <textarea name="usage" className="form-control" rows={3} onChange={UpdateInput} placeholder="Usage" required/>
                                                </div>
                                                <button type="submit" className="btn btn-dark mb-3">Submit</button>
                                            </form>
                                        </div>
                                        <div className="card-footer bg-dark text-center">
                                            <img src={brand} width="150" height="50" alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> :
                    <section className = "mt-3">
                        <div className="container">
                            <div className="row">
                                <div className="col  align-items-center">
                                    <div className="lead">Hey {userState.user.name} !!! You are not an admin to upload to Products..</div>
                                    <div className="lead">Please contact Administrator</div>
                                </div>
                            </div>
                        </div>
                    </section>
            }

        </React.Fragment>
    )
}

export default UploadProduct;