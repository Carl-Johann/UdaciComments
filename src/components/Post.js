import React, { Component }  from 'react';
import {
    Card, CardTitle, CardText,
    Button, ButtonGroup,
} from 'reactstrap';
import * as PostsAPI from '../API/PostsAPI';
import FontAwesome from 'react-fontawesome'
import moment from 'moment'


class Post extends Component  {


    state = {
        post: {}
    }


    componentDidMount() {
        PostsAPI.getPostById(this.props.postId).then( post => {
            this.setState({ post })
        })
    }


    postVote = (vote) => {
        let postId = this.state.post.id

        PostsAPI.votePost(this.state.post.id, vote).then( post => {
            this.setState({ post })
        })
    }

    render () {
            const smallSpanStyle  = { color: 'black', opacity: 0.6 }
            const addVoteStyle    = { borderTopLeftRadius:  '0px', backgroundColor: '#59b258', width:'51%', borderWidth: '0px' }
            const removeVoteStyle = { borderTopRightRadius: '0px', backgroundColor: '#d64c49', width:'51%', borderWidth: '0px' }

        return (
            <div id="post-in-detail">
                <Card style={{ backgroundColor: '#e5e5e5' }}>
                    <div className="div-card-body">

                        <CardTitle className="title" >
                            <span className="post-title"> { this.state.post.title } </span>
                        </CardTitle>

                        <CardText>
                            { this.state.post.body } <br/>
                            Vote Score: { this.state.post.voteScore } <br/>
                            <small style={ smallSpanStyle }> { this.state.post.author } - { moment( this.state.post.timestamp ).format("DD/MM/YYYY") } </small>
                        </CardText>

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

export default Post