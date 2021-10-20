import React, {useEffect , useState} from "react";
import * as userReducer from '../../../../redux/users/user.reducer';
import {useDispatch, useSelector} from "react-redux";
import * as userActions from "../../../../redux/users/user.action";
import Spinner from "../../../layout/components/spinner/Spinner";
import {IAddress} from "../../models/IUser";

interface IProps{

}

interface IState  {
    users : userReducer.UserState
}
interface isEditAddressClicked {
    isEditClicked: boolean
}

//getting user state from store
let UserProfile : React.FC<IProps> = () => {
    let dispatch = useDispatch();
    let userState : userReducer.UserState = useSelector((state : IState) => {
        return state.users
    })

    // for edit button functionality
    let [enableEdit , setEnableEdit] = useState<isEditAddressClicked>({
        isEditClicked : false
    })

    //pre populate address while page renders. setting address from state
    useEffect(() => {
        setAddressState({
            flat : userState.user && userState.user.address ? userState.user.address.flat : '',
            street : userState.user && userState.user.address ? userState.user.address.street : '',
            landmark : userState.user && userState.user.address ? userState.user.address.landmark : '',
            city : userState.user && userState.user.address ? userState.user.address.city : '',
            state : userState.user && userState.user.address ? userState.user.address.state : '',
            country : userState.user && userState.user.address ? userState.user.address.country : '',
            pin : userState.user && userState.user.address ? userState.user.address.pin : 0 ,
            phone : userState.user && userState.user.address ? userState.user.address.phone : 0
        })
    },[userState.user])

    //defining local state for address. after submit will call action to update in db
    let [addressState , setAddressState] = useState<IAddress>({
        flat : '',
        street : '',
        landmark : '',
        city : '',
        state : '',
        country : '',
        pin : 0 ,
        phone : 0
    })

    //function to alter edit address funtionality. if true we can edit else just shows current address
    let clickEditAddress = (event : React.ChangeEvent<HTMLInputElement>) => {
        setEnableEdit({
            isEditClicked : event.target.checked
        })
    }
    // function to update local state
    let updateAddress = (event : React.ChangeEvent<HTMLInputElement>) => {
        setAddressState({
            ...addressState,
            [event.target.name] : event.target.value
        })
    }
    let submitAddress = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(userActions.updateAddress(addressState))
        setEnableEdit({
            isEditClicked : false
        })
    }
    return(
        userState.loading ? <Spinner/> :
        <React.Fragment>
            {/*<pre>{JSON.stringify(userState)}</pre>*/}
            {/*<pre>{JSON.stringify(enableEdit)}</pre>*/}
            {
                Object.keys(userState.user).length > 0 &&
                <section className="mt-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <img src={userState.user.avatar} className="img-responsive img-thumbnail rounded-circle d-block m-auto"  alt=""/>
                            </div>
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-header bg-dark text-center text-white">
                                        Basic Details
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-group">
                                            <li className="list-group-item">Name : {userState.user.name}</li>
                                            <li className="list-group-item">Email : {userState.user.email}</li>
                                            <li className="list-group-item">Mobile : {userState.user.address.phone}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="card mt-2">
                                    <div className="card-header bg-dark text-white">
                                        <div className="row">
                                            <div className="col">
                                                <p className="h6 float-left">Billing Address</p>
                                            </div>
                                            <div className="col">
                                                            <span className="form-check form-switch float-right">
                                                                <input
                                                                    onChange={clickEditAddress}
                                                                    className="form-check-input" type="checkbox"
                                                                    id="flexSwitchCheckChecked"/>
                                                                    <label className="form-check-label"
                                                                           htmlFor="flexSwitchCheckChecked">Edit Address</label>
                                                            </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        {
                                            !enableEdit.isEditClicked ? <ul className="list-group">
                                                <li className="list-group-item">Flat : {userState.user.address.flat}</li>
                                                <li className="list-group-item">Street : {userState.user.address.street}</li>
                                                <li className="list-group-item">Landmark : {userState.user.address.landmark}</li>
                                                <li className="list-group-item">City : {userState.user.address.city}</li>
                                                <li className="list-group-item">State : {userState.user.address.state}</li>
                                                <li className="list-group-item">Country : {userState.user.address.country}</li>
                                                <li className="list-group-item">Pin : {userState.user.address.pin}</li>
                                            </ul> :
                                                <form onSubmit={submitAddress}>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text">Flat :</span>
                                                        <input type="text" name ="flat" onChange={updateAddress} value={addressState.flat} className="form-control" required/>
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text">Street :</span>
                                                        <input type="text" name ="street" onChange={updateAddress} value={addressState.street} className="form-control" required/>
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text">Landmark :</span>
                                                        <input type="text" name ="landmark" onChange={updateAddress} value={addressState.landmark} className="form-control" required/>
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text">City :</span>
                                                        <input type="text" name ="city" onChange={updateAddress} value={addressState.city} className="form-control" required/>
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text">State :</span>
                                                        <input type="text" name ="state" onChange={updateAddress} value={addressState.state} className="form-control" required/>
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text">Country :</span>
                                                        <input type="text" name ="country" onChange={updateAddress} value={addressState.country} className="form-control" required/>
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text">Pin :</span>
                                                        <input type="text" name ="pin" onChange={updateAddress} value={addressState.pin} className="form-control" required/>
                                                    </div>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text">Mobile :</span>
                                                        <input type="text" name ="phone" onChange={updateAddress} value={addressState.phone} className="form-control" required/>
                                                    </div>
                                                    <button className='btn btn-primary btn-small' type='submit'>Submit</button>
                                                    <button className='btn btn-primary btn-small' type='reset'>Reset</button>
                                                </form>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </React.Fragment>
    )
}

export default UserProfile;