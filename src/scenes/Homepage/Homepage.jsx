import React, { Component } from 'react';
import axios from 'axios';

class Homepage extends Component {
    componentDidMount() {
        const url = 'http://google.com';

        axios.get(url)
            .then(response => {
                console.log(response);
            })
    }

    render() {
        return (
            <div>Home page</div>
        );
    }

}

export default Homepage;
