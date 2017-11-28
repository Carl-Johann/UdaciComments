import React, { Component }  from 'react';
import { connect } from 'react-redux'
import { actionVotePost, actionEditPost } from '../actions/thunkActions'
import SubmitFields from './SubmitFields'
import {
    Card, CardTitle, CardText,
    Button, ButtonGroup, Modal,
    ModalHeader, Container
} from 'reactstrap';
import { Link } from 'react-router-dom'

import FontAwesome from 'react-fontawesome'
import moment from 'moment'


class Post extends Component  {

    state = {
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
        },
        postInDetail: {}
    }

    componentDidMount() {
        let postInDetail = this.props.allPosts.find( post => post.id === this.props.postInDetailId)
        if (postInDetail !== undefined) {
            let fields = this.state.inputFields
            let inputFields = {
                ...fields,
                title: {
                    ...fields.title,
                    value: postInDetail.title
                },
                body: {
                    ...fields.body,
                    value: postInDetail.body
                }

            }
            this.setState({
                postInDetail,
                inputFields
            })

        }

    }


    shouldComponentUpdate = (nextProps, nextState) => {
        let newDetailPost = nextProps.allPosts.find( post => post.id === this.props.postInDetailId)
        if (newDetailPost !== undefined) {
            if (JSON.stringify(newDetailPost) !== JSON.stringify(this.state.postInDetail)) {
                let fields = nextState.inputFields

                let inputFields = {
                    ...fields,
                    title: {
                        ...fields.title,
                        value: newDetailPost.title
                    },
                    body: {
                        ...fields.body,
                        value: newDetailPost.body
                    }
                }
                this.setState({
                    postInDetail: newDetailPost,
                    inputFields
                })
            }
        }
        // return a boolean value
        return true;
    }


    postVote = (vote) => {

        let postId = this.state.postInDetail
        this.props.actionVotePost(postId, vote)
    }


    editModalToggle = () => {
       this.setState({ isEditModalOpen: !this.state.isEditModalOpen });
    }


    handlePostEdit = (inputFields) => {
        // console.log("handlePostEdit was called. Fields:", inputFields)
        // We should edit 'allPosts' based on the inputFields, and the post from 'this.props.post'
        // The input fields are the new values.

        let postId = this.props.postInDetail.id
        let titleValue = inputFields.title.value
        let bodyValue  = inputFields.body.value

        this.props.actionEditPost(titleValue, bodyValue, postId).then( this.editModalToggle() )
    }


    render () {
        const smallSpanStyle  = { color: 'black', opacity: 0.6 }
        const addVoteStyle    = { borderTopLeftRadius:  '0px', backgroundColor: '#59b258', width:'51%', borderWidth: '0px', cursor: 'pointer' }
        const removeVoteStyle = { borderTopRightRadius: '0px', backgroundColor: '#d64c49', width:'51%', borderWidth: '0px', cursor: 'pointer' }
        const title   = { display: 'inline-block', width: '100%', marginRight: '-10em' }
        const deleteP = { display: 'inline', zIndex: '99999', cursor: 'pointer' }

        const { inputFields, isEditModalOpen, postInDetail } = this.state
        const { commentsLength, deletePost } = this.props


        return (
            <div id="post-in-detail">


                <div id="edit-post-modal">
                    <Modal isOpen={ isEditModalOpen }>
                        <ModalHeader toggle={ this.editModalToggle }> Edit Comment </ModalHeader>
                        <Container>
                            <SubmitFields
                                inputFieldsProps={ inputFields }
                                onEdit={ inputFields => this.handlePostEdit(inputFields)}
                                submitBtnText="Edit Post"
                            />
                        </Container> <br/>
                    </Modal>
                </div>


                <Card style={{ backgroundColor: '#d5d3d3' }}>
                    <div className="div-card-body">
                        { postInDetail.length !== 0 && (
                            <div id="div-card-text">

                                <CardTitle >
                                    <p style={ title } className="title unselectable"> { postInDetail.title } </p>

                                    <p style={ deleteP } onClick={ () => { deletePost(postInDetail.id) }}>
                                        <FontAwesome name="times" style={{ float: 'right' }}/>
                                    </p>
                                </CardTitle>

                                <span className="right" style={{ cursor: 'pointer' }}>
                                    <FontAwesome name="pencil-square-o" onClick={ () => this.editModalToggle() }/>
                                </span>

                                <CardText>
                                    { postInDetail.body } <br/>
                                    Vote Score: { postInDetail.voteScore } <br/>
                                    { commentsLength === 0 ? 'No Comments' : (commentsLength > 1 ? commentsLength + ' Comments' : '1 Comment') } <br/>
                                    <small style={ smallSpanStyle }> { postInDetail.author } - { moment( postInDetail.timestamp ).format("DD/MM/YYYY") } </small>
                                </CardText>
                            </div>
                        ) }
                    </div>

                    <ButtonGroup>
                        <Button className="btn comment-add-vote-score"    onClick={ () => this.postVote( "upVote" ) } style={ addVoteStyle } >
                            <FontAwesome name="thumbs-up" />
                        </Button>

                        <Button className="btn comment-remove-vote-score" onClick={ () => this.postVote("downVote") } style={ removeVoteStyle } >
                            <FontAwesome name="thumbs-down" />
                        </Button>
                    </ButtonGroup>

                </Card>
            </div>
        )
    }

}


function mapStateToProps ({ posts }) {
  return {
    posts
  }
}


function mapDispatchToProps (dispatch) {
  return {
    actionVotePost: (postId, vote) => dispatch(actionVotePost(postId, vote)),
    actionEditPost: (title, body, postId) => dispatch(actionEditPost(title, body, postId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
