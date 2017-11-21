import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCategories, setPosts, setComments, setComment } from '../actions';
import moment from 'moment';
import sortBy from 'sort-array'
import { Link } from 'react-router-dom'
import EditModal from './EditModal'

import * as CategoriesAPI from '../API/CategoriesAPI';
import * as PostsAPI      from '../API/PostsAPI';
import * as CommentsAPI   from '../API/CommentsAPI';

import FontAwesome from 'react-fontawesome'
import {
    ProgressBar, Popover, OverlayTrigger,
    Media,
} from 'react-bootstrap';
import {
    Card, CardTitle, CardText,
    CardColumns, CardSubtitle, CardBody,
    Container, Button, ButtonGroup,
    Modal, ModalHeader, ModalBody,
    ModalFooter, FormFeedback, FormGroup,
    ControlLabel, Input,
} from 'reactstrap';


const PostComment = ({ comment, voteComment, editComment, deleteComment }) => {

    const addVoteStyle    = { borderTopLeftRadius:  '0px', backgroundColor: '#59b258', width:'51%', borderWidth: '0px' }
    const removeVoteStyle = { borderTopRightRadius: '0px', backgroundColor: '#d64c49', width:'51%', borderWidth: '0px' }
    const smallSpanStyle  = { color: 'black', opacity: 0.6 }
    const cardStyle       = { marginTop: '1em', marginBottom: '1em', backgroundColor: '#e5e5e5' }


    return (
        <Card style={cardStyle}>
            <div className="div-card-body">
                <Media>
                    <Media.Body>

                        <Media.Heading>
                            <span className="left"> { comment.author } </span>
                            <span className="right edit-comment">
                                <FontAwesome name="times" onClick={ () => deleteComment(comment.id) }/>
                            </span>
                        </Media.Heading>


                        <br/> { comment.body } <br/>
                        <span className="left"> Vote Score: { comment.voteScore } <br/>
                        </span> <span className="right edit-comment">
                            <FontAwesome name="pencil-square-o" onClick={ () => editComment(comment) }/>
                        </span>
                        <br/> <small style={ smallSpanStyle }> Posted - { moment(comment.timestamp).format("DD/MM/YYYY") } </small>

                    </Media.Body>
                </Media>
            </div>

            <ButtonGroup>
                <Button className="btn comment-add-vote-score"    onClick={ () => voteComment(comment.id,  "upVote" ) } style={ addVoteStyle }    > <FontAwesome name="thumbs-up"  /> </Button>
                <Button className="btn comment-remove-vote-score" onClick={ () => voteComment(comment.id, "downVote") } style={ removeVoteStyle } > <FontAwesome name="thumbs-down" /> </Button>
            </ButtonGroup>

        </Card>
    )
}

export default PostComment