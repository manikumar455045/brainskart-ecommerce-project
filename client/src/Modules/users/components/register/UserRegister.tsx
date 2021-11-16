import React, {useState} from "react";
import bannerimg from "../../../../Assets/Banner_Hamburger_400.webp";
import {Link} from "react-router-dom";
import brand from "../../../../Assets/img/brand.png";
import register from "../../../../Assets/register.jpg"
import * as userActions from "../../../../redux/users/user.action";
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';


interface IUser{
    name: string,
    email: string,
    password : string
}
interface IUserError{
    nameError : string,
    emailError : string,
    passwordError : string
}

interface IProps{

}

let UserRegister : React.FC<IProps> = () => {
    let dispatch = useDispatch();
    let history = useHistory();
    let [userState , setUserState] = useState<IUser>({
        name : '',
        email : '',
        password : ''
    });
    let [userErrorState, setUserErrorState] = useState<IUserError>({
        nameError : "",
        emailError : "",
        passwordError : ""
    });

    //Validate Name
    let validateUser = (event : React.ChangeEvent<HTMLInputElement>) => {
        setUserState({
            ...userState,
            name : event.target.value
        })
        let regExp = /^[a-zA-Z0-9_]{5,10}$/;
        !regExp.test(userState.name) ? setUserErrorState({...userErrorState , nameError : 'Enter Proper name'}) :
            setUserErrorState({...userErrorState, nameError : ''})
    }
    //Validate email
    let validateEmail = (event : React.ChangeEvent<HTMLInputElement>) => {
        setUserState({
            ...userState,
            email : event.target.value
        })
        let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        !regExp.test(userState.email) ? setUserErrorState({...userErrorState , emailError : 'Enter Proper email address'}) :
            setUserErrorState({...userErrorState, emailError : ''})
    }
    // validate Password
    let validatePassword = (event : React.ChangeEvent<HTMLInputElement>) => {
        setUserState({...userState, password : event.target.value});
        let regExp = /^[a-zA-Z0-9_]\w{6,14}$/;
        (!regExp.test(event.target.value)) ?
            setUserErrorState({...userErrorState, passwordError : 'Enter a Proper Password'}) :
            setUserErrorState({...userErrorState, passwordError : ''})
    };

    let submitRegisteredUser = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(userActions.userRegister(userState , history));
    }
    let handleGoogleLogin = (response : any) => {
        dispatch(userActions.googleLogin(response.tokenId, history))
    }
    let handleGoogleLoginFailure = (response: any) => {
        console.log(response)
    }
    return(
        <React.Fragment>
            {/*<pre>{JSON.stringify(userState)}</pre>
            <pre>{JSON.stringify(userErrorState)}</pre>*/}
            <section className="mt-3">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-md-4 m-auto">
                            <div className="card">
                                <div className="card-header bg-dark text-center text-white">Enter your details</div>
                                <div className="card-body bg-form-light">
                                    <form onSubmit={submitRegisteredUser}>
                                        <div className="mb-3">
                                            <input name = "name" value = {userState.name}type="text" className={`form-control ${userErrorState.nameError.length>0 ? 'is-invalid' : '' }`} placeholder="Name" onChange={validateUser} required/>
                                            {userErrorState.nameError.length>0 ? <small className="text-danger font-weight-bold">{userErrorState.nameError}</small> : ''}
                                        </div>
                                        <div className="mb-3">
                                            <input name = "email" value={userState.email} type="email" className={`form-control ${userErrorState.emailError.length>0 ? 'is-invalid' : ''}`} placeholder="username" onChange={validateEmail} required/>
                                            {userErrorState.emailError.length>0 ? <small className="text-danger">{userErrorState.emailError}</small> : ''}
                                        </div>
                                        <div className="mb-3">
                                            <input name="password" value={userState.password} type="password" className={`form-control ${userErrorState.passwordError.length>0 ? 'is-invalid' : ''}`} placeholder="password" onChange={validatePassword} required/>
                                            {userErrorState.passwordError.length>0 ? <small className="text-danger">{userErrorState.passwordError}</small> : ''}
                                        </div>
                                        <button type="submit" className="btn btn-dark mb-3">Submit</button>
                                        <hr/>
                                        <GoogleLogin
                                            clientId="509138529581-4u7c810o2a9kovq85cpirkijsk1s4a88.apps.googleusercontent.com"
                                            onSuccess={handleGoogleLogin}
                                            onFailure={handleGoogleLoginFailure}
                                            buttonText="Google Login"
                                        />
                                        <div className="mt-3">
                                           <span>Already have an account?
                                           <Link to="/users/login">Login</Link>
                                           </span>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer bg-dark mt-3 text-center">
                                    <img src={brand} width="150" height="50" alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default UserRegister;