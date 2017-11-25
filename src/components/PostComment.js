import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editComment, deleteComment } from '../actions';
import { actionDeleteComment, actionEditComment, actionVoteComment } from '../actions/thunkActions'
import moment from 'moment';

import SubmitFields from './SubmitFields';

import FontAwesome from 'react-fontawesome';
import {
    Card, Container, Button,
    ButtonGroup, Modal, ModalHeader,
    Media
} from 'reactstrap';


class PostComment extends Component {

    state = {
        isEditCommentModalOpen: false,
        inputFields: {
            body: {
                state: null,
                value: '',
                type: 'textarea',
            },
        }
    }

    componentDidMount() {
        let inputFields = this.state.inputFields
        inputFields = {
            ...inputFields,
            body: {
                ...inputFields.body,
                value: this.props.comment.body
            }
        }
        this.setState({ inputFields })
    }



    voteOnComment = (Id, vote) => {
        this.props.actionVoteComment(Id, vote)
    }

    openEditCommentModal  = () => { this.setState({ isEditCommentModalOpen: true  }) }
    closeEditCommentModal = () => { this.setState({ isEditCommentModalOpen: false }) }

    onDeleteComment = (commentToDeleteId) => {
        this.props.actionDeleteComment(commentToDeleteId)
    }

    handleCommentEdit = (inputFields) => {
        let bodyValue = inputFields.body.value
        let commentId = this.props.comment.id

        this.props.actionEditComment(bodyValue, commentId)
        .then( this.closeEditCommentModal() )
    }





    render() {

        const addVoteStyle    = { borderTopLeftRadius:  '0px', backgroundColor: '#59b258', width:'51%', borderWidth: '0px' }
        const removeVoteStyle = { borderTopRightRadius: '0px', backgroundColor: '#d64c49', width:'51%', borderWidth: '0px' }
        const cardStyle       = { marginTop: '1em', marginBottom: '1em', backgroundColor: '#d5d3d3' }
        const smallSpanStyle  = { color: 'black', opacity: 0.6 }

        const { isEditCommentModalOpen, inputFields } = this.state
        const { postId, comment, editComment } = this.props

        return (
            <div>

                <div id="edit-comment-modal">
                    <Modal isOpen={ isEditCommentModalOpen }>
                        <ModalHeader toggle={ this.closeEditCommentModal }> Edit Comment </ModalHeader>
                        <Container>
                            <SubmitFields
                                inputFieldsProps={ inputFields }
                                onEdit={ inputFields => this.handleCommentEdit(inputFields)}
                                submitBtnText="Edit Comment"
                            />
                        </Container> <br/>
                    </Modal>
                </div>

                <Card style={ cardStyle }>
                    <div className="div-card-body">
                        <Media>
                            <Media body>

                                <Media heading>
                                    <span className="left"> { comment.author } </span>
                                    <span className="right edit-comment">
                                        <FontAwesome name="times" onClick={ () => this.onDeleteComment(comment.id) }/>
                                    </span>
                                </Media>

                                <br/> { comment.body } <br/>

                                <span className="left">
                                    Vote Score: { comment.voteScore } <br/>
                                </span>

                                <span className="right edit-comment">
                                    <FontAwesome name="pencil-square-o" onClick={ () => this.openEditCommentModal() }/>
                                </span>

                                <br/> <small style={ smallSpanStyle }> Posted - { moment(comment.timestamp).format("DD/MM/YYYY") } </small>
                            </Media>
                        </Media>
                    </div>

                    <ButtonGroup>
                        <Button className="btn comment-add-vote-score"    onClick={ () => this.voteOnComment(comment.id,  "upVote" ) } style={  addVoteStyle   } > <FontAwesome name="thumbs-up"   /> </Button>
                        <Button className="btn comment-remove-vote-score" onClick={ () => this.voteOnComment(comment.id, "downVote") } style={ removeVoteStyle } > <FontAwesome name="thumbs-down" /> </Button>
                    </ButtonGroup>

                </Card>
            </div>
        )
    }
}


function mapStateToProps ({ categories }) {
  return {
    categories,
  }
}


function mapDispatchToProps (dispatch) {
  return {
    actionEditComment: (bodyValue, commentId) => dispatch(actionEditComment(bodyValue, commentId)),
    actionVoteComment: (Id, vote) => dispatch(actionVoteComment(Id, vote)),
    actionDeleteComment: (data) => dispatch(actionDeleteComment(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostComment)