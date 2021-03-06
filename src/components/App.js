import React, { Component } from 'react';

import PostsList from './PostsList'
import PostDetail from './PostDetail'
import CategorySelect from './CategorySelect'
import CreatePost from './CreatePost'
import PostNotFound from './PostNotFound'

import { Route, Switch } from 'react-router-dom';
import '../index.css';


class App extends Component {
  render() {
    return (

      <div className="UdaciComments">
        <Switch>
          <Route exact path = "/noPostsFound" component={ PostNotFound } />
          <Route exact path = "/" component={ CategorySelect }/>
          <Route exact path = "/create_post" render={({ history }) => (
            <CreatePost
              goBack={ () => { history.goBack() }}
              goTo={ (location) => { history.push(location) }}
            />
          )} />

          <Route exact path = "/:category" component={ PostsList } />
          <Route exact path = "/:category/:post_id" component={ PostDetail } />


        </Switch>
      </div>

    );
  }
}

export default App