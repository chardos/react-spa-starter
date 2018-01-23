import React from "react";
import "./fadeIn.css";

/*
 * Fade in - A high order component that animates the wrapped component when
 * it is rendered to the page.
 */

const fadeIn = WrappedComponent => {
    return class FadeIn extends React.Component {
        constructor() {
            super();
            this.state = {
                fadedIn: false
            };
        }

        componentDidMount() {
            setTimeout(() => {
                this.setState({ fadedIn: true });
            }, 0);
        }

        render() {
            const classNames = this.state.fadedIn ? "faded faded--in" : "faded";

            return (
                <div className={classNames}>
                    <WrappedComponent {...this.props} />
                </div>
            );
        }
    };
};

export const FadeIn = fadeIn(({ children }) => children);

export default fadeIn;
