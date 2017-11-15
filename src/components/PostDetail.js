import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCategories, setPosts } from '../actions';
import moment from 'moment';

import * as CategoriesAPI from '../API/CategoriesAPI';
import * as PostsAPI      from '../API/PostsAPI';
import * as CommentsAPI   from '../API/CommentsAPI';

import {
    ProgressBar, Popover, OverlayTrigger,
    Media,
} from 'react-bootstrap';
import {
    Card, CardTitle, CardText,
    CardColumns, CardSubtitle, CardBody,
    Container, Button, ButtonGroup
} from 'reactstrap';
import '../index.css';

class PostDetail extends Component {

    state = {
        postId: "",
        post: {},
        comments: [],
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
            // If there is posts, we set assign it to state
            var posts = this.props.posts['posts'].filter( post => post.id === this.props.match.params.post_id )
            let post = posts[0]
            this.setState({ post })
        }

        if (this.props.posts[0] === undefined ) {
            // If there's no posts in store. We GET it from server, and assign it to state
            PostsAPI.getPostById(this.props.match.params.post_id).then( post => {
                this.setState({ post })
            })
        }

        this.setState({ postId: this.props.match.params.post_id })

        CommentsAPI.getAllPostsForComment(this.props.match.params.post_id).then( comments => {
            this.setState({ comments })
        })

    }

    render () {

        const { match, location, history, posts } = this.props
        const { postId, post, comments } = this.state
        const { post_id } = this.props.match.params

        const popoverBottom = (
            <Popover id="popover-trigger-hover-focus" title="Popover bottom">
                <strong>Holy guacamole!</strong> Check this info.
            </Popover>
        )

        const onVote = (vote) => {
            console.log(123, vote)
            PostsAPI.votePost(post_id, vote).then( response => (
                console.log(555, response)
            ))
        }




        return (
            <div className="post-detail">
                <Container className="post-detail-container">
                    <Card body style={{ backgroundColor: '#e5e5e5' }}>

                        <CardTitle className="title" >
                            <p className="post-title"> { post.title } </p>
                        </CardTitle>

                        <span> { post.body } </span>


                        { post.voteScore < 0 && (
                            <ProgressBar style={{ height: '3em', marginTop: '1em', marginBottom: '0.5em' }} bsStyle="danger"  now={ post.voteScore } label={`${ post.voteScore } votes`} key={1} />
                        ) }

                        { post.voteScore > 0 && (
                            <ProgressBar style={{ height: '3em', marginTop: '1em', marginBottom: '0.5em' }} bsStyle="success" now={ post.voteScore } label={`${ post.voteScore } votes`} key={2} />
                        ) }

                        { post.voteScore === 0 && (
                            <ProgressBar style={{ height: '3em', marginTop: '1em', marginBottom: '0.5em' }} bsStyle="warning" now={0} label={ "0 votes" } key={3} />
                        ) }

                        <small style={{ color: 'black', opacity: 0.6 }}> { post.author } - { moment(post.timestamp).format("DD/MM/YYYY") } </small>


                    </Card>

                    <br/>

                    <div>
                        { comments.map( comment => (
                            <Card  key={ comment.id } style={{ marginTop: '1em', marginBottom: '1em', backgroundColor: '#e5e5e5' }}>
                                <div className="comment-body">
                                <Media>

                                    <Media.Body>
                                        <Media.Heading> { comment.author } </Media.Heading>
                                        <p>{ comment.body }</p>
                                        <small style={{ color: 'black', opacity: 0.6 }}> Posted - { moment(post.timestamp).format("DD/MM/YYYY") } </small>
                                    </Media.Body>

                                </Media>
                                </div>

                                <ButtonGroup>
                                    <Button className="btn comment-add-vote-score"    onClick={ () => onVote("upVote") }   style={{ borderTopLeftRadius: '0px'  , backgroundColor: '#59b258', width:'51%', borderWidth: '0px' }} > + </Button>
                                    <Button className="btn comment-remove-vote-score" onClick={ () => onVote("downVote") } style={{ borderTopRightRadius: '0px' , backgroundColor: '#d64c49', width:'51%', borderWidth: '0px' }} > - </Button>
                                </ButtonGroup>

                            </Card>
                        )) }
                    </div>


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

