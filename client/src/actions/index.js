//action creator
//initiate change at redux side of our app

import axios from 'axios';
import {FETCH_USER, FETCH_SURVEYS} from './types';

export const fetchUser = () =>
    async dispatch => { //redux thunk calls this function with dispatch when action creator fetchUser is called
        const res = await axios.get('/api/currentUser')
        dispatch({type: FETCH_USER, payload: res.data});
    } 
    //redux thunk dispatch action function
    //don't have to return action in this case unlike vanilla redux

export const handleToken = (token) =>
    async dispatch => {
        const res = await axios.post('/api/stripe', token);
        dispatch({type: FETCH_USER, payload: res.data})
    }

export const submitSurvey =  (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values)
    history.push('/surveys') //helps navigation from action creator using react router
    dispatch({type: FETCH_USER, payload: res.data})
}

export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys');
    dispatch({type: FETCH_SURVEYS, payload: res.data})
}