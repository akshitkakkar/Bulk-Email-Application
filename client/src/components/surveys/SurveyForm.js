// SurveyForm shows a form for a user to add input
import _ from 'lodash' //lodash library has helper functions on it
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form' //allows redux form to communicate with redux store
                                       //nearly identical to the connect helper
                                       //Field renders any type of traditional html element
//name attribute of field is the key name by which the value is stored in redux form
//component - input, type- text in Field tag
//reduxForm helper at the bottom automatically provides handleSubmit function just like connect function
//on submit of form handleSubmit is called and it gives the values out of the form in an object with key as the name property of the value
import SurveyField from './SurveyField'
import {Link} from 'react-router-dom'
import validateEmails from '../../utils/validateEmails'
import formFields from './formFields'

class SurveyForm extends Component {

    renderFields() {
        // return(
        //     <div>
        //         <Field label="Survey Title" type="text" name="title" component={SurveyField}/>
        //         <Field label="Subject Line" type="text" name="subject" component={SurveyField}/>
        //         <Field label="Email Body" type="text" name="body" component={SurveyField}/>
        //         <Field label="Recipient List" type="text" name="emails" component={SurveyField}/>
                
        //     </div>
        // )
        return _.map(formFields, ({label, name}) => {
            return (
                <Field key={name} component={SurveyField} type="text" label={label} name={name}/>
                )
        })
    }
//handleSubmit executes only when the form is valid
    render() {
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        )
    }
}

function validate(values) { //values coming off from our form
    const errors = {};
    // if(!values.title) {
    //     errors.title = 'You must provide a title' //reduxForm passes error message as prop to Field with name of title
    // }
    // if(!values.subject) {
    //     errors.subject = 'You must provide a subject' //reduxForm passes error message as prop to Field with name of title
    // }
    // if(!values.body) {
    //     errors.body = 'You must provide a body' //reduxForm passes error message as prop to Field with name of title
    // }

    _.each(formFields, ({name}) => {
        if(!values[name]) {
            errors[name] = 'You must provide a value'
        }
    })
    errors.recipients = validateEmails(values.recipients || "");

    return errors; //if errors object is empty reduxForm assumes every field is valid
}

export default reduxForm({ //reduxForm helper
    validate, //validate: validate ==> runs on form submit
    form: 'surveyForm', //form name for reduxForm inside state returned form reducer
    destroyOnUnmount: false
})(SurveyForm)