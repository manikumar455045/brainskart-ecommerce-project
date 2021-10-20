import * as alertActions from './alert.action';

export interface Alert {
    id : string,
    message : string,
    color : string
}

export interface AlertState {
    alerts : Alert[]
}

let initialState : AlertState = {
    alerts : [] as Alert[]
}

export const reducer = (state = initialState , action : any) : AlertState => {
    switch (action.type) {
        case alertActions.SET_ALERT :
            return {
                alerts : [...state.alerts , action.payload]
            }
        case alertActions.REMOVE_ALERT :
            let updatedAlerts = state.alerts.filter(alert => alert.id !== action.payload.id)
            return {
              alerts : [...updatedAlerts]
            }
        default : return state
    }
}