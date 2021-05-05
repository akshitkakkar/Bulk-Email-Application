//SurveyFormReview shows users their form input for review
import React from 'react'
import {connect} from 'react-redux'
import formFields from './formFields'
import _ from 'lodash'
import * as actions from '../../actions'
import {withRouter} from 'react-router-dom'

const SurveyReview = ({onCancel, formValues, submitSurvey, history}) => { //props object has formValues and onCancel
  //every element needs a key whenever we produce list in react  
    const reviewFields = _.map(formFields, ({name, label}) => {
        return(
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        )
    })
    
    return(
        <div>
            <h5>Please confirm</h5>
            {reviewFields}
            {/* <div>
                <div>
                    <label>Survey Title</label>
                    <div>
                        {formValues.title}
                    </div>
                </div>
                <div>
                    <label>Subject Line</label>
                    <div>
                        {formValues.subject}
                    </div>
                </div>
                <div>
                    <label>Email Body</label>
                    <div>
                        {formValues.body}
                    </div>
                </div>
            </div> */}
            <button
            className="yellow darken-3 white-text btn-flat"
            onClick={onCancel}
            >
                Cancel
            </button>
            <button
            className="right white-text green btn-flat"
            onClick={() => submitSurvey(formValues, history)} //arrow function so it does not get called as soon as component loads since it already has paranthesis
            ><i className="material-icons right">email</i>
                Send Survey
            </button>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        formValues: state.form.surveyForm.values
    }
}


export default connect(mapStateToProps, actions)(withRouter(SurveyReview)) //action creators get passed as props to our component from actions