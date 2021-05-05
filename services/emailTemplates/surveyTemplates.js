const keys = require('../../config/keys')

module.exports = (survey) => {
    //backticks do not require escape character for new line
    return `
    <html>
        <body>
            <div style="text-align: center;">
                <h3>Hi! I'd like your review</h3>
                <p>Please answer the following question:</p>
                <p>${survey.body}</p>
            </div>    
        <div style="text-align: center;">
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
        </div>
        <div style="text-align: center;">
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
        </div>
        </body>
    </html>
    `
}