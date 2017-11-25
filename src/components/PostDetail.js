import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionSetCategories, actionSetAllCommentsForPost, actionCreateComment } from '../actions/thunkActions'
import moment from 'moment';
import sortBy from 'sort-array'
import { Link } from 'react-router-dom'

import SubmitFields from './SubmitFields'
import PostComment from './PostComment'
import Post from './Post'

import * as PostsAPI      from '../API/PostsAPI';
import * as CommentsAPI   from '../API/CommentsAPI';

import FontAwesome from 'react-fontawesome'
import {
    Card, CardTitle, CardText,
    CardColumns, CardSubtitle, CardBody,
    Container, Button, ButtonGroup,
    Modal, ModalHeader, ModalBody,
    ModalFooter, FormFeedback, FormGroup,
    ControlLabel, Input,
} from 'reactstrap';
import '../index.css';

class PostDetail extends Component {

    state = {

        isCreatePostModalOpen:  false,
        editingCommentId: '',

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
        this.props.actionSetCategories()

        this.props.actionSetAllCommentsForPost(this.props.match.params.post_id)
    }


    openCreatePostModal  = () => { this.setState({ isCreatePostModalOpen: true }) }


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
        let comments = this.props.comments.comments
        let isEditingComment = this.state.isEditCommentModalOpen
        let isCreatingPost = this.state.isCreatePostModalOpen

        this.props.actionCreateComment(body, author, category, postId)
        .then( this.closeModal() )
    }



    render () {
        const { postId, category } = this.props.match.params
        const { comments } = this.props
        const { post, isCreatePostModalOpen, isEditCommentModalOpen, inputFields } = this.state
        const { post_id } = this.props.match.params

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
                            postId={post_id}
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


function mapStateToProps ({ comments }) {
  return {
    comments,
  }
}


function mapDispatchToProps (dispatch) {
  return {
    actionSetCategories: () => dispatch(actionSetCategories()),
    actionSetAllCommentsForPost: (postId) => dispatch(actionSetAllCommentsForPost(postId)),
    actionCreateComment: (bodyValue, authorValue, category, postId) => dispatch(actionCreateComment(bodyValue, authorValue, category, postId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)
