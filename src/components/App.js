import React, { Component } from 'react';
import PostsList from './PostsList'
import PostDetail from './PostDetail'
import { setCategories, setPosts } from '../actions'
import { connect } from 'react-redux'
import * as CategoriesAPI from '../API/CategoriesAPI';
import * as PostsAPI from '../API/PostsAPI';
import { Route } from 'react-router-dom';
import '../index.css';


class App extends Component {
  render() {
    return (

      <div className="UdaciComments">
        <Route exact path="/" component={PostsList} />

        <Route path="/:categories/:post_id" component={PostDetail} />
      </div>

    );
  }
}

export default App