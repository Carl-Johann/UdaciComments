import React, { Component }  from 'react';
import { connect } from 'react-redux'
import { actionSetPostByPostId, actionVotePost } from '../actions/thunkActions'
import {
    Card, CardTitle, CardText,
    Button, ButtonGroup,
} from 'reactstrap';
import { actionSetCategories, actionSetPostsForCategory, actionDeletePost } from '../actions/thunkActions'
import * as PostsAPI from '../API/PostsAPI';
import FontAwesome from 'react-fontawesome'
import moment from 'moment'


class Post extends Component  {

    componentDidMount() {

        let postId = this.props.postId
        this.props.actionSetPostByPostId(postId)
    }


    postVote = (vote) => {

        let postId = this.props.posts.postInDetail.id
        this.props.actionVotePost(postId, vote)
    }


    render () {
        const smallSpanStyle  = { color: 'black', opacity: 0.6 }
        const addVoteStyle    = { borderTopLeftRadius:  '0px', backgroundColor: '#59b258', width:'51%', borderWidth: '0px' }
        const removeVoteStyle = { borderTopRightRadius: '0px', backgroundColor: '#d64c49', width:'51%', borderWidth: '0px' }

        const { postInDetail } = this.props.posts

        return (
            <div id="post-in-detail">
                <Card style={{ backgroundColor: '#d5d3d3' }}>
                    <div className="div-card-body">
                        { postInDetail !== undefined && (
                            <div id="div-card-text">
                                <CardTitle className="title" >
                                    <span className="post-title"> { postInDetail.title } </span>
                                </CardTitle>

                                <CardText>
                                    { postInDetail.body } <br/>
                                    Vote Score: { postInDetail.voteScore } <br/>
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
    actionSetPostByPostId: (postId) => dispatch(actionSetPostByPostId(postId)),
    actionVotePost: (postId, vote) => dispatch(actionVotePost(postId, vote)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
