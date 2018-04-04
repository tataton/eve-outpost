import React from 'react';

const ErrorDisplay = ({ errorMessage, dismissErrorAction }) => {

    if (errorMessage) {
        console.log(errorMessage);
        return (
            <div class="ui negative message">
                <i class="close icon" onClick={dismissErrorAction}></i>
                <div class="header">
                    {errorMessage}
                </div>
            </div>
        )
    } else {
        return null;
    }

}

export default ErrorDisplay;