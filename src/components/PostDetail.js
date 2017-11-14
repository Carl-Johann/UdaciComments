import React, { Component } from 'react';
import '../index.css';
import { connect } from 'react-redux'
import { setCategories, setPosts } from '../actions'
import * as CategoriesAPI from '../API/CategoriesAPI';
import * as PostsAPI from '../API/PostsAPI';
import moment from 'moment';
import {
    Card, CardTitle, CardText,
    CardColumns, CardSubtitle, CardBody,
    Container,
} from 'reactstrap';


class PostDetail extends Component {

    state = {
        postId: "",
        post: {},
    }

    componentDidMount() {
        CategoriesAPI.getAllCategories().then( categories => {
            // console.log("From fetch", categories);
                // Dispatching to store
                this.props.setAllCategories({categories})
            // console.log("From store", this.props.categories)
        })

        PostsAPI.getAllPosts().then( posts => {
            // console.log("From fetch", posts)
                // Dispatching to store
                this.props.setAllPosts({posts})
            // console.log("From store", this.props.posts)
        })

        if (this.props.posts['posts'] !== undefined) {
            // If there is posts.
            var posts = this.props.posts['posts'].filter( post => post.id === this.props.match.params.post_id )
            let post = posts[0]
            this.setState({ post })
        }

        if (this.props.posts[0] === undefined ) {
            // If there's no posts in store.
            PostsAPI.getPostById(this.props.match.params.post_id).then( post => {
                this.setState({ post })
            })
        }

        this.setState({ postId: this.props.match.params.post_id })


    }

    render () {

        const { match, location, history, posts } = this.props
        const { postId, post } = this.state



        return (
            <div className="post-detail">
                <Container className="post-detail-container">
                    <Card body style={{ backgroundColor: '#e5e5e5' }}>

                        <CardTitle className="title" >
                            <p className="post-title"> { post.title } </p>
                        </CardTitle>

                        <CardText>
                            { post.body }
                        </CardText>

                        <CardText>
                            <small style={{ color: 'black', opacity: 0.6 }}> { post.author } - { moment(post.timestamp).format("DD/MM/YYYY") } </small>
                        </CardText>

                    </Card>

                </Container>
            </div>
        )
    }

}

function mapStateToProps ({ categories, posts }) {
  return {
    categories,
    posts,
  }
}


function mapDispatchToProps (dispatch) {
  return {
    setAllCategories: (data) => dispatch(setCategories(data)),
    setAllPosts: (data) => dispatch(setPosts(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)

