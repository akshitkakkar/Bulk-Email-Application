// SurveyNew shows SurveyForm and SurveForReview
import React, { Component } from 'react'
import SurveyForm from './SurveyForm'
import {reduxForm} from 'redux-form'
import SurveyFormReview from './SurveyFormReview'

class SurveyNew extends Component {

    // constructor(props) {
    //     super(props)

    //     this.state = {new: true}
    // }

    //setting state with the help of babel

    state = {showFormReview: false}

    renderContent() {
        if(this.state.showFormReview)
            return <SurveyFormReview onCancel={() => this.setState({showFormReview: false})}/>
        
        return <SurveyForm onSurveySubmit={()=> this.setState({showFormReview: true})}/>
    }

    render() {
        return(
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

export default reduxForm({
    form: 'surveyForm' //clears form values when user navigates away from parent component
                       //no destroyOnUnmount: false here
})(SurveyNew)