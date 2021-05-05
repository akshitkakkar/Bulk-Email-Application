import {combineReducers} from 'redux';
import authReducder from './authReducer';
import surveysReducer from './surveysReducer'
import {reducer as reduxForm} from 'redux-form' //renaming imported variables

export default combineReducers({
    auth: authReducder,
    form: reduxForm, //redux-form value produced by this reducer is available on very special key name 'form'
    surveys: surveysReducer
});