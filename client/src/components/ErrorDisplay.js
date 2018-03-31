import React from 'react';
import { Message } from 'semantic-ui-react';

const ErrorDisplay = ({ error, dismissErrorAction }) => {
    return (
        <Message
            error
            onDismiss={dismissErrorAction}
        >
            {error.errorMessage}
        </Message>
    )
}

export default ErrorDisplay;