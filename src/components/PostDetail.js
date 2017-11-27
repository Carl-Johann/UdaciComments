import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPostInDetail } from '../actions'
import {
    // actionSetCategories, actionSetAllCommentsForPost, actionCreateComment, actionSetPostByPostId
    actionSetAllCommentsForPost,
    actionVotePost,
    actionSetAllPosts,
} from '../actions/thunkActions'
// import moment from 'moment';
import sortBy from 'sort-array'
import { Link } from 'react-router-dom'

import SubmitFields from './SubmitFields'
import PostComment from './PostComment'
import Post from './Post'

import * as PostsAPI      from '../API/PostsAPI';
// import * as CommentsAPI   from '../API/CommentsAPI';

import FontAwesome from 'react-fontawesome'
import {
    Container, Button, Modal,
    ModalHeader,
} from 'reactstrap';
import '../index.css';

class PostDetail extends Component {

    state = {
        isCreatePostModalOpen: false,
        editingCommentId: '',
        post: {},

        inputFields: {
            body: {
                state: null,
                value: '',
                type: 'textarea',
            },
            author: {
                state: null,
                value: '',
                type: 'text',
            }
        }
    }



    componentDidMount() {

        // We get all the comments for this specific post
        this.props.actionSetAllCommentsForPost(this.props.match.params.post_id)
        let detailPostId = this.props.match.params.post_id


        // If 'allPosts' werent downloaded in another component, we get it here and set it to state
        if (this.props.allPosts === undefined) { this.props.actionSetAllPosts().then( allPosts => {

            // we find the post being viewed in detail, and set it to state
            let post = allPosts.find( post => post.id === detailPostId )
            this.setState({ post })
        }) } else {

            // else if 'allPosts' were downloaded in another component,
            // we simply find the post being viewed in detail, and set it to state
            let post = this.props.allPosts.find( post => post.id === detailPostId )
            this.setState({ post })
        }
    }




    openCreatePostModal = () => { this.setState({ isCreatePostModalOpen: true }) }


    closeModal = () => {
        let inputFieldsEntries = Object.entries(this.state.inputFields)
        let inputFields = this.state.inputFields

        inputFieldsEntries.forEach(([name, value]) => {
                inputFields = {
                    ...inputFields,
                    [name]: {
                        ...inputFields[name],
                        state: null,
                        value: ''
                    }
                }
            }
        )

        this.setState({
            isCreatePostModalOpen: false,
            inputFields
        })
    }



    postVote = (vote) => {

        let postId = this.state.post.id
        this.props.actionVotePost(postId, vote).then( votedPost => {
            this.setState({ post: votedPost })
        })
    }


    handleCreatePost = (inputFields) => {
        let body = inputFields.body.value
        let author = inputFields.author.value
        let category = this.props.match.params.category
        let postId = this.props.match.params.post_id

        this.props.actionCreateComment(body, author, category, postId)
        .then( this.closeModal() )
    }



    render () {
        const { category } = this.props.match.params
        const { comments, postInDetail } = this.props
        const { isCreatePostModalOpen, inputFields, post } = this.state

        // We sort the comments by voreScore. We then sort i by body, otherwise,
        // if two comments have equal votescore, they can start switching positions on render.
        const sortedComments = sortBy(sortBy(comments.comments, 'author'), 'voteScore').reverse()


        const addCommentStyle = { width: '100%', marginTop: '16px' }

        return (
            <div className="post-detail">

                {/* Modal that opens when we want to edit or add a comment */}
                <div id="create-post-modal">
                    <Modal isOpen={ isCreatePostModalOpen } >
                        <ModalHeader toggle={ this.closeModal }> Create Comment </ModalHeader>
                        <Container>
                            <SubmitFields
                                inputFieldsProps={ inputFields }
                                onEdit={ data => this.handleCreatePost(data)}
                                submitBtnText="Post Comment"
                            />
                        </Container> <br/>
                    </Modal>
                </div>


                <Link to={`/${category}`}>
                    <FontAwesome name="angle-left" size="3x" style={{ color: 'gray', marginLeft: '1em', marginTop: '0.4em' }}/>
                </Link>


                <Container className="post-detail-container">

                    {/* The post in detail */}
                    { post !== undefined && (
                        <div id="detail-post">
                            <Post
                                postInDetail={ post }
                                postVote={ (vote) => this.postVote(vote) }
                            />
                        </div>
                    )}


                    <Button style={ addCommentStyle } onClick={ () => this.openCreatePostModal() } > Add Comment </Button>

                    {/* The comments */}
                    <div id="comments">
                        { sortedComments.map( comment => (
                            <PostComment key={ comment.id }
                                comment={ comment }
                                editComment={ comment => this.onEditComment(comment) }
                            />
                        )) }
                    </div>

                </Container> <br/>
            </div>
        )
    }

}


function mapStateToProps ({ comments, posts }) {
  return {
    comments,
    posts,
    postsForCategory: posts.postsForCategory,
    postInDetail: posts.postInDetail
  }
}


function mapDispatchToProps (dispatch) {
  return {
    // actionSetCategories: () => dispatch(actionSetCategories()),
    // actionCreateComment: (bodyValue, authorValue, category, postId) => dispatch(actionCreateComment(bodyValue, authorValue, category, postId)),
    // actionSetPostByPostId: (postId) => dispatch(actionSetPostByPostId(postId)),
    // setPostInDetail: (postInDetail) => dispatch(setPostInDetail(postInDetail)),
    actionVotePost: (postId, vote) => dispatch(actionVotePost(postId, vote)),
    actionSetAllCommentsForPost: (postId) => dispatch(actionSetAllCommentsForPost(postId)),
    actionSetAllPosts: () => dispatch(actionSetAllPosts()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)
