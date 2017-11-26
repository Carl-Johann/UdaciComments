import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPostInDetail } from '../actions'
import { actionSetCategories, actionSetAllCommentsForPost, actionCreateComment, actionSetPostByPostId } from '../actions/thunkActions'
// import moment from 'moment';
import sortBy from 'sort-array'
import { Link } from 'react-router-dom'

import SubmitFields from './SubmitFields'
import PostComment from './PostComment'
import Post from './Post'

// import * as PostsAPI      from '../API/PostsAPI';
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

        let postInDetail = this.props.postInDetail


        this.props.actionSetPostByPostId(this.props.match.params.post_id)

        // If the store doens't contain the post in detail
        if (Object.getOwnPropertyNames(postInDetail).length === 0) {
            // We get the post in detail
            this.props.actionSetPostByPostId(this.props.match.params.post_id).then( postInDetail => {
                // And if no post is returned, the post has been deleted, and doesn't exist in either the store or on the server
                if (Object.getOwnPropertyNames(postInDetail).length === 0) {
                    // We navigate back to the main page
                    this.props.history.push("/")
                } else {
                    // It exists so we set it to state
                    console.log("boi")
                    this.props.setPostInDetail({ postInDetail })
                }
            })
        }
        this.props.actionSetCategories()
        this.props.actionSetAllCommentsForPost(this.props.match.params.post_id)
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
        const { comments } = this.props
        const { isCreatePostModalOpen, inputFields } = this.state

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
                    <div id="detail-post">
                        <Post

                        />
                    </div>

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
    actionSetCategories: () => dispatch(actionSetCategories()),
    actionSetAllCommentsForPost: (postId) => dispatch(actionSetAllCommentsForPost(postId)),
    actionCreateComment: (bodyValue, authorValue, category, postId) => dispatch(actionCreateComment(bodyValue, authorValue, category, postId)),
    actionSetPostByPostId: (postId) => dispatch(actionSetPostByPostId(postId)),
    setPostInDetail: (postInDetail) => dispatch(setPostInDetail(postInDetail)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)
