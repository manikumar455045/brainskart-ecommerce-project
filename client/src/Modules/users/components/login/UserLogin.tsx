import React, {useState} from "react";
import {Link} from "react-router-dom";
import bannerimg from "../../../../Assets/Banner_Hamburger_400.webp"
import brand from "../../../../Assets/img/brand.png"
import {prependListener} from "cluster";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import  * as userActions from '../../../../redux/users/user.action';
import { GoogleLogin } from 'react-google-login';

interface IProps{

}

interface IUser {
    email : string,
    password : string
}
interface  UserError{
    emailError : string,
    passwordError : string
}


let UserLogin : React.FC<IProps> = () => {
    let dispatch = useDispatch();
    let history = useHistory();
    let [user , setUser] = useState<IUser>({
        email : '',
        password : ''
    })

    let [userError , setUserError] = useState<UserError>({
        emailError : '',
        passwordError : ''
    })

    //validate email
    let validateUser = (event : React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            email : event.target.value
        })
        let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        !regExp.test(user.email) ? setUserError({...userError, emailError : "Enter proper email"}) : setUserError({...userError , emailError : ''})
    }

    //validate password
    let validatePassword = (event : React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            password : event.target.value
        })
        let regExp = /^[a-zA-Z0-9_]\w{6,14}$/;
        !regExp.test(user.password) ? setUserError({...userError, passwordError : 'Enter proper password'}) : setUserError({...userError , passwordError : ''})
    }

    //submit
    let submitUser = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(userActions.loginUser(user , history));
    }
    let handleGoogleLogin = (response : any) => {
        dispatch(userActions.googleLogin(response.tokenId, history))
    }
    let handleGoogleLoginFailure = (response: any) => {
        console.log(response)
    }
    return(
        <React.Fragment>
            <pre>{JSON.stringify(user)}</pre>
            <pre>{JSON.stringify(userError)}</pre>
            <section className="mt-3">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-md-4 m-auto">
                           <div className="card">
                                   <img src={bannerimg} className="img-responsive" alt=""/>
                               <div className="card-body bg-form-light">
                                   <form onSubmit={submitUser}>
                                       <div className="mb-3">
                                           <input type="text" value = {user.email} className={`form-control ${userError.emailError.length > 0 ? 'is-invalid' : '' }`} onChange={validateUser} placeholder="username" required/>
                                           {userError.emailError.length>0 ? <small className="text-danger">{userError.emailError}</small> : ''}
                                       </div>
                                       <div className="mb-3">
                                           <input type="password" value = {user.password} className={`form-control ${userError.passwordError.length>0 ? 'is-invalid' : ''}`} onChange={validatePassword} placeholder="password" required/>
                                           {userError.passwordError.length>0 ? <small className="text-danger">{userError.passwordError}</small> : ''}
                                       </div>
                                       <button type="submit" className="btn btn-dark mb-3">Submit</button>
                                        <hr/>
                                       <GoogleLogin
                                           clientId="509138529581-4u7c810o2a9kovq85cpirkijsk1s4a88.apps.googleusercontent.com"
                                           onSuccess={handleGoogleLogin}
                                           onFailure={handleGoogleLoginFailure}
                                           buttonText="Google Login"
                                       />
                                       <div className='mt-3'>
                                           <span>New to Brains Kart?
                                           <Link to="/users/register">Register</Link>
                                           </span>
                                       </div>
                                   </form>
                               </div>
                               <div className="card-footer bg-dark text-center">
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

export default UserLogin;