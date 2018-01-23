import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'components/Spinner/Spinner';
import fadeIn from 'components/hoc/fadeIn';

/*
 * withLoader - A high order component that takes a isLoading prop, and displays
 * either a spinner or the wrapped content. Has options to transition in.
 */

const withLoader = (WrappedComponent) => {
    const transitions = {
        fadeIn
    }

    const WithLoaderInner = (props) => {
        const FinalComponent = props.transition
            ? transitions[props.transition](WrappedComponent)
            : WrappedComponent;

        return (
            props.isLoading ? (
                <Spinner />
            ) : (
                <FinalComponent {...props} />
            )
        )
    }

    WithLoaderInner.propTypes = {
        transition: PropTypes.oneOf(['fadeIn']),
    }

    WithLoaderInner.defaultProps = {
        transition: null,
    }

    return WithLoaderInner;
};

export const WithLoader = withLoader(({ children }) => children);

export default withLoader;
