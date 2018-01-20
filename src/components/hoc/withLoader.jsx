import React from 'react';
import Spinner from 'components/Spinner/Spinner';

const withLoader = (WrappedComponent) => (
    (props) => (
        props.isLoading ? (
            <Spinner />
        ) : (
            <WrappedComponent {...props} />
        )
    )
);

export default withLoader;
