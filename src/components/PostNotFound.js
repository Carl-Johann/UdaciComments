import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class PostNotFound extends Component {
    render() {
        return (
            <div id="no-post-found" style={{ textAlign: 'center', marginTop: '4em' }}>
                <h1> No Post Found <Link to="/"> <h2>Go to Main Page </h2></Link> </h1>
            </div>
        )
    }
}

export default PostNotFound

