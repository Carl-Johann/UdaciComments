import React, { Component }  from 'react';
import { connect } from 'react-redux'
import { setPostInDetail } from '../actions'
import { actionSetPostByPostId, actionVotePost, actionEditPost, actionEditAPostInAllPosts } from '../actions/thunkActions'
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
        }
    }

    componentDidMount() {
        let post = this.props.postInDetail
        // console.log("postInDetail:", postInDetail)
        // console.log("this:", this)
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



    // shouldComponentUpdate = (nextProps, nextState) => {
    //     if (JSON.stringify(nextProps.postInDetail) !== JSON.stringify(this.props.postInDetail)) {
    //         let postInDetail = nextProps.postInDetail
    //         this.setState({ postInDetail })
    //     }

    //     console.log("nextProps:", nextProps)

    //     // return a boolean value
    //     return true;
    // }





    // postVote = (vote) => {

    //     let postId = this.props.postInDetail.id
    //     this.props.actionVotePost(postId, vote)
    // }

    editModalToggle = () => {
       this.setState({ isEditModalOpen: !this.state.isEditModalOpen });
    }





    // handlePostEdit = (inputFields) => {
    //     this.props.actionEditPost(inputFields.title.value, inputFields.body.value, this.props.postInDetail.id)
    //     .then( postInDetail => {
    //         this.props.setPostInDetail({ postInDetail })
    //         this.editModalToggle()
    //     } )
    //     this.props.actionEditAPostInAllPosts(inputFields.title.value, inputFields.body.value, this.props.postInDetail.id)
    // }


    render () {
        const smallSpanStyle  = { color: 'black', opacity: 0.6 }
        const addVoteStyle    = { borderTopLeftRadius:  '0px', backgroundColor: '#59b258', width:'51%', borderWidth: '0px', cursor: 'pointer' }
        const removeVoteStyle = { borderTopRightRadius: '0px', backgroundColor: '#d64c49', width:'51%', borderWidth: '0px', cursor: 'pointer' }
        const title  = { display: 'inline-block', width: '100%', marginRight: '-10em' }
        const deleteP = { display: 'inline', zIndex: '99999', cursor: 'pointer' }

        const { inputFields, isEditModalOpen } = this.state
        const { postInDetail, postVote } = this.props


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
                        { postInDetail !== undefined && (
                            <div id="div-card-text">

                                <CardTitle >
                                    <p style={ title } className="title unselectable"> { postInDetail.title } </p>

                                    <p style={ deleteP } onClick={ () => { this.deletePost(postInDetail.id) }}>
                                        <FontAwesome name="times" style={{ float: 'right' }}/>
                                    </p>
                                </CardTitle>

                                <span className="right" style={{ cursor: 'pointer' }}>
                                    <FontAwesome name="pencil-square-o" onClick={ () => this.editModalToggle() }/>
                                </span>

                                <CardText>
                                    { postInDetail.body } <br/>
                                    Vote Score: { postInDetail.voteScore } <br/>
                                    { postInDetail.commentCount === 0 ? 'No Comments' : (postInDetail.commentCount > 1 ? postInDetail.commentCount + ' Comments' : '1 Comment') } <br/>
                                    <small style={ smallSpanStyle }> { postInDetail.author } - { moment( postInDetail.timestamp ).format("DD/MM/YYYY") } </small>
                                </CardText>
                            </div>
                        ) }
                    </div>

                    <ButtonGroup>
                        <Button className="btn comment-add-vote-score"    onClick={ () => postVote( "upVote" ) } style={ addVoteStyle } >
                            <FontAwesome name="thumbs-up" />
                        </Button>

                        <Button className="btn comment-remove-vote-score" onClick={ () => postVote("downVote") } style={ removeVoteStyle } >
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
    actionSetPostByPostId: (postId) => dispatch(actionSetPostByPostId(postId)),
    actionVotePost: (postId, vote) => dispatch(actionVotePost(postId, vote)),
    actionEditPost: (title, body, postId) => dispatch(actionEditPost(title, body, postId)),
    actionEditAPostInAllPosts: (title, body, postId) => dispatch(actionEditAPostInAllPosts(title, body, postId)),
    setPostInDetail: (editPost) => dispatch(setPostInDetail(editPost)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
