import React, { Component } from 'react';
import { connect } from 'react-redux'

import FontAwesome from 'react-fontawesome'
import moment from 'moment'
import { setPostInDetail }  from '../actions'
import { actionDeletePost, actionEditPost, actionEditAPostInAllPosts } from '../actions/thunkActions'
import { Link } from 'react-router-dom'
import SubmitFields from './SubmitFields'

import {
    Card, ModalHeader,
    CardTitle, CardText,
    Container, Modal
} from 'reactstrap';

class CardPost extends Component {

     state = {
        categoryColors: {
            'react' : 'success',
            'redux' : 'secondary',
            'udacity' : 'danger',
        },
        isEditModalOpen: false,
        inputFields: {
            title: {
                state: null,
                value: '',
                type: 'text',
            },
            body: {
                state: null,
                value: '',
                type: 'textarea',
            }
        }
    }

    componentDidMount() {
        let post = this.props.post
        let fields = this.state.inputFields
        let inputFields = {
            ...fields,
            title: {
                ...fields.title,
                value: post.title
            },
            body: {
                ...fields.body,
                value: post.body
            }

        }
        this.setState({
            inputFields
        })
    }

    openEditModal = () => {
        this.setState({
            isEditModalOpen: true,
        })
    }

    handlePostEdit = (inputFields) => {
        this.props.actionEditPost(inputFields.title.value, inputFields.body.value, this.props.post.id)
        .then( this.closeEditModal() )
        this.props.actionEditAPostInAllPosts(inputFields.title.value, inputFields.body.value, this.props.post.id)
    }

    closeEditModal = () => {
        this.setState({ isEditModalOpen: false })
    }

    deletePost = (postId) => {
        this.props.actionDeletePost(postId)
    }


    render() {

        const { post } = this.props
        const { categoryColors, inputFields, isEditModalOpen } = this.state

        const title  = { display: 'inline-block', width: '85%', cursor: 'pointer' }
        const smallSpanStyle  = { color: 'black', opacity: 0.6 }
        const deleteP = { display: 'inline', zIndex: '99999', cursor: 'pointer' }

        return (
            <div>

                <div id="edit-post-modal">
                    <Modal isOpen={ isEditModalOpen }>
                        <ModalHeader toggle={ this.closeEditModal }> Edit Comment </ModalHeader>
                        <Container>
                            <SubmitFields
                                inputFieldsProps={ inputFields }
                                onEdit={ inputFields => this.handlePostEdit(inputFields)}
                                submitBtnText="Edit Post"
                            />
                        </Container> <br/>
                    </Modal>
                </div>


                <Card body inverse color={ categoryColors[post.category] }>
                    <CardTitle >
                        <Link to={`/${post.category}/${post.id}`} style={{ color: 'white', textDecoration: 'none' }}>
                            <p style={ title }> { post.title } </p>
                        </Link>
                        <p style={ deleteP } onClick={ () => { this.deletePost(post.id) }}>
                            <FontAwesome name="times" style={{ float: 'right' }}/>
                        </p>
                    </CardTitle>


                    <span className="right" style={{ cursor: 'pointer' }}>
                        <FontAwesome name="pencil-square-o" onClick={ () => this.openEditModal(post) }/>
                    </span>

                    <Link to={`/${post.category}/${post.id}`} style={{ color: 'white', textDecoration: 'none' }}  >

                        <CardText  style={{ cursor: 'pointer' }}>
                            { post.body } <br/>
                            Vote Score: { post.voteScore } <br/>
                            { post.commentCount === 0 ? 'No Comments' : (post.commentCount > 1 ? post.commentCount + ' Comments' : '1 Comment') } <br/>
                            <small style={ smallSpanStyle }> { post.author } - { moment(post.timestamp).format("DD/MM/YYYY") } </small>
                        </CardText>
                    </Link>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = ({ posts }) => {
  return {
    posts,
    postInDetail: posts.postInDetail
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    actionDeletePost: (postId) => dispatch(actionDeletePost(postId)),
    setPostInDetail: (postInDetail) => dispatch(setPostInDetail(postInDetail)),
    actionEditPost: (title, body, postId) => dispatch(actionEditPost(title, body, postId)),
    actionEditAPostInAllPosts: (title, body, postId) => dispatch(actionEditAPostInAllPosts(title, body, postId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardPost)