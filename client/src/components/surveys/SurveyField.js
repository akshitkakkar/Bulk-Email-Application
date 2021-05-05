//SurveyField contains logic to render a single lable and text input
import React from 'react'

export default ({input, label, meta: { error, touched }}) => { //props.input => props from reduxFrom because it is being rendered by Field tag
    //{...input} == onBlur={}input.onBlur
    return(
        <div>
            <label>{label}</label>
            <input {...input} style={{marginBottom: '5px'}}/>
            <div className="red-text" style={{marginBottom: '20px'}}>
                {touched && error}
            </div>
        </div>
    )
}