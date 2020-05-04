import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';

export const ErrorBanner = ({
    message = 'Uh oh! Something went wrong :(',
    description = 'Look like something went wrong.' +
        ' Please check you connection and/or try again later ',
}) => {
    return (
        <Alert
            banner
            closable
            message={message}
            description={description}
            type="error"
            className="error-banner"
        />
    );
};

ErrorBanner.propTypes = {
    message: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};
