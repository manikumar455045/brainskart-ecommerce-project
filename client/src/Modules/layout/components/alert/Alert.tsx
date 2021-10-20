import React from "react";
import {useSelector} from "react-redux";
import * as alertActions from '../../../../redux/alert/alert.action';
import * as alertReducer from '../../../../redux/alert/alert.reducer';

interface IProps{

}

interface AlertState {
    alerts : alertReducer.AlertState
}

let Alert : React.FC<IProps> = () => {
    let alertState : alertReducer.AlertState = useSelector((state : AlertState) => {
        return state.alerts;
    })
    return(
        <React.Fragment>
            {
                alertState.alerts.length > 0 &&
                    <div className={`alert alert-${alertState.alerts[0].color} alert-dismissible m-3 fixed-top animated slideInDown`}>
                        {alertState.alerts.map(alert => {
                            return (
                                <div key = {alert.id}>
                                    <small>{alert.message}</small>
                                </div>
                            )
                        } )}
                        <button className='btn-close'></button>
                    </div>
            }
        </React.Fragment>
    )
}

export default Alert;