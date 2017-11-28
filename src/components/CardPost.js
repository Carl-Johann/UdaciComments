import React, { Component } from 'react';
import { connect } from 'react-redux'

import FontAwesome from 'react-fontawesome'
import moment from 'moment'
import { actionDeletePost, actionEditPost, actionVotePost} from '../actions/thunkActions'
import { Link } from 'react-router-dom'
import SubmitFields from './SubmitFields'

import {
    Card, ModalHeader,
    CardTitle, CardText,
    Container, Modal, Button,
    ButtonGroup
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
        this.setState({ inputFields })
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        if (JSON.stringify(nextProps.post) !== JSON.stringify(this.props.post)) {
            let post = nextProps.post
            let fields = nextState.inputFields
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
            this.setState({ inputFields })
        }


        // return a boolean value
        return true;
    }


    onVote = (vote) => {
        // We need to modify 'allPosts'. This post in 'allPosts'

        let post = this.props.post
        this.props.actionVotePost(post, vote)
    }


    handlePostEdit = (inputFields) => {
        // We should edit 'allPosts' based on the inputFields, and the post from 'this.props.post'
        // The input fields are the new values.

        let postId = this.props.post.id
        let titleValue = inputFields.title.value
        let bodyValue  = inputFields.body.value

        this.props.actionEditPost(titleValue, bodyValue, postId).then( this.changeModalState() )
    }


    changeModalState = () => { this.setState({ isEditModalOpen: !this.state.isEditModalOpen }) }


    deletePost = (postId) => { this.props.actionDeletePost(postId) }


    render() {

        const { post } = this.props
        const { categoryColors, inputFields, isEditModalOpen } = this.state

        const title  = { display: 'inline-block', width: '85%', cursor: 'pointer' }
        const smallSpanStyle  = { color: 'black', opacity: 0.6 }
        const deleteP = { display: 'inline', zIndex: '99999', cursor: 'pointer' }
        const addVoteStyle    = { borderTopLeftRadius:  '0px', backgroundColor: '#59b258', width:'51%', borderWidth: '0px', cursor: 'pointer' }
        const removeVoteStyle = { borderTopRightRadius: '0px', backgroundColor: '#d64c49', width:'51%', borderWidth: '0px', cursor: 'pointer' }


        return (
            <div>

                <div id="edit-post-modal">
                    <Modal isOpen={ isEditModalOpen }>
                        <ModalHeader toggle={ this.changeModalState }> Edit Comment </ModalHeader>
                        <Container>
                            <SubmitFields
                                inputFieldsProps={ inputFields }
                                onEdit={ inputFields => this.handlePostEdit(inputFields)}
                                submitBtnText="Edit Post"
                            />
                        </Container> <br/>
                    </Modal>
                </div>


                <Card inverse color={ categoryColors[post.category] } style={{ paddingBottom: '0px', border: '0px' }}>
                    <div className="div-card-body">
                        <CardTitle >
                            <Link to={`/${post.category}/${post.id}`} style={{ color: 'white', textDecoration: 'none' }}>
                                <p style={ title }> { post.title } </p>
                            </Link>
                            <p style={ deleteP } onClick={ () => { this.deletePost(post.id) }}>
                                <FontAwesome name="times" style={{ float: 'right' }}/>
                            </p>
                        </CardTitle>


                        <span className="right" style={{ cursor: 'pointer' }}>
                            <FontAwesome name="pencil-square-o" onClick={ () => this.changeModalState() }/>
                        </span>

                        <Link to={`/${post.category}/${post.id}`} style={{ color: 'white', textDecoration: 'none' }}  >

                            <CardText style={{ cursor: 'pointer' }}>
                                { post.body } <br/>
                                Vote Score: { post.voteScore } <br/>
                                { post.commentCount === 0 ? 'No Comments' : (post.commentCount > 1 ? post.commentCount + ' Comments' : '1 Comment') } <br/>
                                <small style={ smallSpanStyle }> { post.author } - { moment(post.timestamp).format("DD/MM/YYYY") } </small>
                            </CardText>
                        </Link>
                    </div>

                    <ButtonGroup style={{ width: '100%' }}>
                        <Button className="btn comment-add-vote-score"    onClick={ () => this.onVote( "upVote" ) } style={ addVoteStyle } >
                            <FontAwesome name="thumbs-up" />
                        </Button>

                        <Button className="btn comment-remove-vote-score" onClick={ () => this.onVote("downVote") } style={ removeVoteStyle } >
                            <FontAwesome name="thumbs-down" />
                        </Button>
                    </ButtonGroup>
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
    actionEditPost: (titleValue, bodyValue, postId) => dispatch(actionEditPost(titleValue, bodyValue, postId)),
    actionVotePost: (post, vote) => dispatch(actionVotePost(post, vote)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardPost)