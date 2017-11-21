import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCategories, setPosts, setComments, setComment } from '../actions';
import moment from 'moment';
import sortBy from 'sort-array'
import { Link } from 'react-router-dom'

import EditModal from './EditModal'
import PostComment from './PostComment'
import Post from './Post'

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
import '../index.css';

class PostDetail extends Component {

    state = {
        post: {},
        comments: [],
        isModalOpen: false,

        inputFields: {
            body: {
                state: null,
                value: '',
                type: 'textarea',
            },
            author: {
                state: null,
                value: '',
                type: 'text',
            },
        }
    }






    componentDidMount() {
        CategoriesAPI.getAllCategories().then( categories => {
            // console.log("From fetch", categories);
                // Dispatching to store
                this.props.setAllCategories({categories})



                // We set the default option, so if the user doens't select an option when creating a comment, it's not blank
                this.setState({ createOption: this.props.match.params.category })
            // console.log("From store", this.props.categories)
        })

        PostsAPI.getAllPosts().then( posts => {
            // console.log("From fetch", posts)
                // Dispatching to store
                this.props.setAllPosts({posts})
            // console.log("From store", this.props.posts)
        })


        // If there are posts, we assign to state, the one post matching id's with the id in the url.
        if (this.props.posts['posts'] !== undefined) {


            // We get the post with the same id as the one in the url
            var postWithMatichId = this.props.posts['posts'].filter( post => post.id === this.props.match.params.post_id )


            // There should only ever be 1 instance with matching id's
            let post = postWithMatichId[0]
            this.setState({ post })
        }


        // If there's no posts in store. We GET it from the server, and assign it to state
        if (this.props.posts[0] === undefined ) {
            PostsAPI.getPostById(this.props.match.params.post_id).then( post => {
                this.setState({ post, voteScore: post.voteScore })
            })
        }

        CommentsAPI.getAllPostsForComment(this.props.match.params.post_id).then( comments => {
            this.setState({ comments })
        })


    }










    postVote = (vote) => {
        PostsAPI.votePost(this.props.match.params.post_id, vote).then( post => {
            this.setState({ post })
        })
    }

    voteOnComment = (Id, vote) => {
        CommentsAPI.voteComment(Id, vote).then( response_comment => {
            let indexOfComment = null
            this.state.comments.map( (comment, i) => { if (comment.id === response_comment.id) { indexOfComment = i }})

            let comments = this.state.comments
            comments[indexOfComment] = response_comment

            this.setState({ comments })
        })
    }


    onDeleteComment = (Id) => {
        CommentsAPI.deleteComment(Id).then( response => {
            let comments = this.state.comments.filter( c => c.id !== Id)

            this.setState({ comments })
        })
    }

    openModal  = () => { this.setState({ isModalOpen: true  }) }

    closeModal = () => {
        let inputFieldsEntries = Object.entries(this.state.inputFields)
        let inputFields = this.state.inputFields

        inputFieldsEntries.forEach(([name, value]) => {
                inputFields = {
                    ...inputFields,
                    [name]: {
                        ...inputFields[name],
                        state: null,
                        value: ''
                    }
                }
            }
        )
        this.setState({ isModalOpen: false, inputFields })
    }


    handleSubmit = (inputFields) => {
        let body = inputFields.body
        let author = inputFields.author
        let category = this.props.match.params.category
        let postId = this.props.match.params.post_id
        let comments = this.state.comments

        CommentsAPI.createComment(body.value, author.value, category, postId).then( response_comment => {
            this.setState({ comments: comments.concat([response_comment]) })
        } ).then( this.closeModal() )
    }


    onEditComment = (comment) => {

        let inputFields = this.state.inputFields
        inputFields = {
            ...inputFields,
                body: {
                    ...inputFields.body,
                        value: comment.body
                },
                author: {
                    ...inputFields.author,
                        value: comment.author
                }

        }

        this.setState({ inputFields })
        this.openModal()
    }





    render () {
        const { post_id, category } = this.props.match.params

        const { match, location, history,
                posts, categories,
              } = this.props

        const { post, comments, isModalOpen, postId,
                inputFields
              } = this.state

        // We sort the comments by voreScore. We then sort i by author, otherwise,
        // if two comments have equal votescore, they can start switching positions on render.
        const sortedComments = sortBy(sortBy(comments, 'voteScore'), 'author')

        const addVoteStyle    = { borderTopLeftRadius:  '0px', backgroundColor: '#59b258', width:'51%', borderWidth: '0px' }
        const removeVoteStyle = { borderTopRightRadius: '0px', backgroundColor: '#d64c49', width:'51%', borderWidth: '0px' }
        const cardStyle       = { marginTop: '1em', marginBottom: '1em', backgroundColor: '#e5e5e5' }
        const addCommentStyle = { width: '100%', marginTop: '16px' }
        const smallSpanStyle  = { color: 'black', opacity: 0.6 }
        const titleText       = { textTransform: 'capitalize' }

        return (
            <div className="post-detail">
                {/* Modal that opens when we want to edit or add a comment */}
                <div id="edit-modal">
                    <Modal isOpen={ isModalOpen } >
                        <ModalHeader toggle={ this.closeModal }> Create Comment </ModalHeader>
                        <Container>
                            <EditModal
                                inputFieldsProps={inputFields}
                                onEdit={ (inputFields) => this.handleSubmit(inputFields)}
                                submitBtnText="Post Comment"
                            />
                        </Container> <br/>
                    </Modal>
                </div>


                <Link to={`/${category}`}>
                    <FontAwesome name="angle-left" size="3x" style={{ color: 'gray', marginLeft: '1em', marginTop: '0.4em' }}/>
                </Link>


                <Container className="post-detail-container">
                    {/* The post in detail */}
                    <div id="detail-post">
                        <Post
                            post={ post }
                            onPostVote={ (vote) => this.postVote(vote) }
                        />
                    </div>

                    <Button style={ addCommentStyle } onClick={ this.openModal } > Add Comment </Button>

                    {/* The comments */}
                    <div id="comments">
                        { sortedComments.map( comment => (
                            <PostComment key={comment.id}
                                comment={comment}
                                voteComment={ (id, vote) => this.voteOnComment(id, vote) }
                                editComment={ (comment) => this.onEditComment(comment) }
                                deleteComment={ (id) => this.onDeleteComment(id) }
                            />
                        )) }
                    </div>
                </Container> <br/>
            </div>
        )
    }

}


function mapStateToProps ({ categories, posts, comments }) {
  return {
    categories,
    posts,
    comments,
  }
}


function mapDispatchToProps (dispatch) {
  return {
    setAllCategories: (data) => dispatch(setCategories(data)),
    setAllPosts: (data) => dispatch(setPosts(data)),
    setAllComments: (data) => dispatch(setComments(data)),
    postComment: (data) => dispatch(setComment(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail)
