import React from 'react';
import moment from 'moment'

import {
    Card, CardTitle, CardText,
    CardColumns, CardSubtitle, CardBody,
    Container, Button, ButtonGroup,
    Modal, ModalHeader, ModalBody,
    ModalFooter, FormFeedback, FormGroup,
    ControlLabel, Input,
} from 'reactstrap';
import FontAwesome from 'react-fontawesome'



const Post = ({ post, onPostVote }) => {

    const smallSpanStyle  = { color: 'black', opacity: 0.6 }
    const addVoteStyle    = { borderTopLeftRadius:  '0px', backgroundColor: '#59b258', width:'51%', borderWidth: '0px' }
    const removeVoteStyle = { borderTopRightRadius: '0px', backgroundColor: '#d64c49', width:'51%', borderWidth: '0px' }

    return (
        <Card style={{ backgroundColor: '#e5e5e5' }}>
            <div className="div-card-body">

                <CardTitle className="title" >
                    <span className="post-title"> { post.title } </span>
                </CardTitle>

                <CardText>
                    { post.body } <br/>
                    Vote Score: { post.voteScore } <br/>
                    <small style={ smallSpanStyle }> { post.author } - { moment( post.timestamp ).format("DD/MM/YYYY") } </small>
                </CardText>

            </div>

            <ButtonGroup>
                <Button className="btn comment-add-vote-score"    onClick={ () => onPostVote( "upVote" ) } style={ addVoteStyle }    > <FontAwesome name="thumbs-up"  /> </Button>
                <Button className="btn comment-remove-vote-score" onClick={ () => onPostVote("downVote") } style={ removeVoteStyle } > <FontAwesome name="thumbs-down" /> </Button>
            </ButtonGroup>

        </Card>
    )

}

export default Post