import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editComment, deleteComment } from '../actions';
import moment from 'moment';

import SubmitFields from './SubmitFields';
import * as CommentsAPI   from '../API/CommentsAPI';

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
        CommentsAPI.voteComment(Id, vote).then( commentToEdit => {
            this.props.editComment({ commentToEdit })
        })
    }

    openEditCommentModal  = () => { this.setState({ isEditCommentModalOpen: true }) }
    closeEditCommentModal = () => { this.setState({ isEditCommentModalOpen: false }) }


    onDeleteComment = (commentToDeleteId) => {
        CommentsAPI.deleteComment(commentToDeleteId).then( response => {
            this.props.deleteComment(commentToDeleteId)
        })
    }


    handleCommentEdit = (inputFields) => {
        let bodyValue = inputFields.body.value
        let commentId = this.props.comment.id

        CommentsAPI.editComment(commentId, bodyValue).then( commentToEdit => {
            this.props.editAComment({ commentToEdit })
        }).then( this.closeEditCommentModal() )
    }



    render() {


        const addVoteStyle    = { borderTopLeftRadius:  '0px', backgroundColor: '#59b258', width:'51%', borderWidth: '0px' }
        const removeVoteStyle = { borderTopRightRadius: '0px', backgroundColor: '#d64c49', width:'51%', borderWidth: '0px' }
        const smallSpanStyle  = { color: 'black', opacity: 0.6 }
        const cardStyle       = { marginTop: '1em', marginBottom: '1em', backgroundColor: '#e5e5e5' }

        const { isEditCommentModalOpen, inputFields } = this.state
        const { postId, comment, editComment } = this.props

        return (
            <div>

            <div id="edit-comment-modal">
                    <Modal isOpen={ isEditCommentModalOpen } >
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

                <Card style={ cardStyle } >
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
                                <span className="left"> Vote Score: { comment.voteScore } <br/>
                                </span> <span className="right edit-comment">
                                    <FontAwesome name="pencil-square-o" onClick={ () => this.openEditCommentModal() }/>
                                </span>
                                <br/> <small style={ smallSpanStyle }> Posted - { moment(comment.timestamp).format("DD/MM/YYYY") } </small>

                            </Media>
                        </Media>
                    </div>

                    <ButtonGroup>
                        <Button className="btn comment-add-vote-score"    onClick={ () => this.voteOnComment(comment.id,  "upVote" ) } style={ addVoteStyle }    > <FontAwesome name="thumbs-up"  /> </Button>
                        <Button className="btn comment-remove-vote-score" onClick={ () => this.voteOnComment(comment.id, "downVote") } style={ removeVoteStyle } > <FontAwesome name="thumbs-down" /> </Button>
                    </ButtonGroup>

                </Card>
            </div>
        )
    }
}


function mapStateToProps ({ categories, comments }) {
  return {
    categories,
    comments,
  }
}


function mapDispatchToProps (dispatch) {
  return {
    editComment: (data) => dispatch(editComment(data)),
    deleteComment: (data) => dispatch(deleteComment(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostComment)