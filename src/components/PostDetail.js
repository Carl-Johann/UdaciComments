import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCategories, setPosts, setComments, setComment } from '../actions';
import moment from 'moment';

import * as CategoriesAPI from '../API/CategoriesAPI';
import * as PostsAPI      from '../API/PostsAPI';
import * as CommentsAPI   from '../API/CommentsAPI';

import {
    ProgressBar, Popover, OverlayTrigger,
    Media, FormGroup, ControlLabel,
    FormControl,
} from 'react-bootstrap';
import {
    Card, CardTitle, CardText,
    CardColumns, CardSubtitle, CardBody,
    Container, Button, ButtonGroup, Modal,
    ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import '../index.css';

class PostDetail extends Component {

    state = {
        postId: "",
        post: {},
        comments: [],
        voteScore: 0,
        isModalOpen: true,

        createTitle: '',
        createBody: '',
        createAuthor: '',
        createOption: '',
    }






    componentDidMount() {
        CategoriesAPI.getAllCategories().then( categories => {
            // console.log("From fetch", categories);
                // Dispatching to store
                this.props.setAllCategories({categories})



                // We set the default option to the first category, so if the user doens't select an option when creating a comment, it's not blank
                this.setState({
                    createOption: categories[0].name
                })
            // console.log("From store", this.props.categories)
        })

        PostsAPI.getAllPosts().then( posts => {
            // console.log("From fetch", posts)
                // Dispatching to store
                this.props.setAllPosts({posts})
            // console.log("From store", this.props.posts)
        })

        // If there are posts, we assign the one post with matching id's with the id in the url to state.
        if (this.props.posts['posts'] !== undefined) {


            // We get the post with the same id as the one in the url
            var postWithMatichId = this.props.posts['posts'].filter( post => post.id === this.props.match.params.post_id )


            // There should only ever be 1 instance with matich id's
            let post = postWithMatichId[0]
            this.setState({ post })
        }


        // If there's no posts in store. We GET it from server, and assign it to state
        if (this.props.posts[0] === undefined ) {
            PostsAPI.getPostById(this.props.match.params.post_id).then( post => {
                this.setState({ post, voteScore: post.voteScore })
            })
        }



        // We get the post_id from url, and set it to state
        this.setState({ postId: this.props.match.params.post_id })

        CommentsAPI.getAllPostsForComment(this.props.match.params.post_id).then( comments => {
            this.setState({ comments })
        })



    }








    postVote = (vote) => {
        PostsAPI.votePost(this.props.match.params.post_id, vote).then( response_post => {

            switch(vote) {
            case 'upVote':
                this.setState({ post: response_post }); break
            case 'downVote':
                this.setState({ post: response_post }); break
            }
        })
    }

    voteOnComment = (commentId, vote) => {
        CommentsAPI.voteComment(commentId, vote).then( response_comment => {
            let indexOfComment = null
            this.state.comments.map( (comment, i) => { if (comment.id === response_comment.id) { indexOfComment = i }})

            let comments = this.state.comments
            comments[indexOfComment] = response_comment


            this.setState({ comments })
        })
    }

    closeModal = () => { this.setState({ isModalOpen : false }) }

    openModal  = () => { this.setState({ isModalOpen : true  }) }



    handleTitleChange  = (event) => { this.setState({createTitle:  event.target.value }); }
    handleBodyChange   = (event) => { this.setState({createBody:   event.target.value }); }
    handleAuthorChange = (event) => { this.setState({createAuthor: event.target.value }); }
    handleOptionChange = (event) => { this.setState({createOption: event.target.value }); }


    handeSubmit = () => {
        console.log(this.state.createTitle)
        console.log(this.state.createBody)
        console.log(this.state.createAuthor)
        console.log(this.state.createOption)



    }


    render () {

        const { match, location, history, posts, categories } = this.props
        const { post,  comments, isModalOpen, createTitle, createBody, createAuthor } = this.state
        const { post_id } = this.props.match.params



        return (
            <div className="post-detail">

                 <Modal isOpen={ isModalOpen } toggle={ this.openModal }>
                    <ModalHeader toggle={ this.closeModal }> Create Comment </ModalHeader>

                    <ModalBody>
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup controlId="formValidationNull" validationState={null}>

                                <FormControl required placeholder="Title" value={createTitle} onChange={this.handleTitleChange} type="text" />
                                <FormControl placeholder="Body"  value={createBody} onChange={this.handleBodyChange} type="textarea" />
                                <FormControl placeholder="Author (you)" value={createAuthor} onChange={this.handleAuthorChange} type="text" />


                                <FormControl defaultValue='React' componentClass="select" onChange={this.handleOptionChange} style={{ textTransform: 'capitalize' }} placeholder="Select Category">
                                    <option disabled> Select category... </option>
                                    { categories['categories'] !== undefined && categories['categories'].map( category => (
                                        <option name={category.name} key={category.name} > {category.name} </option>
                                    ) )}
                                </FormControl>

                            </FormGroup>
                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary"   onClick={ this.handeSubmit  } > Post Comment </Button>
                        <Button color="secondary" onClick={ this.closeModal } > Cancel </Button>
                    </ModalFooter>

                </Modal>


                <Container className="post-detail-container">

                    <Card style={{ backgroundColor: '#e5e5e5' }}>
                        <div className="div-card-body">

                            <CardTitle className="title" >
                                <p className="post-title"> { post.title } </p>
                            </CardTitle>

                            <CardText>
                                { post.body } <br/>
                                Vote Score: { post.voteScore } <br/>

                                <small style={{ color: 'black', opacity: 0.6 }}> { post.author } - { moment( post.timestamp ).format("DD/MM/YYYY") } </small>
                            </CardText>

                        </div>

                        <ButtonGroup>
                            <Button className="btn comment-add-vote-score"    onClick={ () => this.postVote("upVote")   } style={{ borderTopLeftRadius:  '0px' , backgroundColor: '#59b258', width:'51%', borderWidth: '0px' }} > + </Button>
                            <Button className="btn comment-remove-vote-score" onClick={ () => this.postVote("downVote") } style={{ borderTopRightRadius: '0px' , backgroundColor: '#d64c49', width:'51%', borderWidth: '0px' }} > - </Button>
                        </ButtonGroup>

                    </Card>

                    <Button style={{ width: '100%', marginTop: '16px' }} onClick={ this.openModal }> Add Comment </Button>

                    <div>
                        { comments.map( comment =>
                            <Card  key={ comment.id } style={{ marginTop: '1em', marginBottom: '1em', backgroundColor: '#e5e5e5' }}>
                                <div className="div-card-body">
                                <Media>

                                    <Media.Body>
                                        <Media.Heading> { comment.author } </Media.Heading>
                                        { comment.body } <br/>
                                        Vote Score: { comment.voteScore } <br/>

                                        <small style={{ color: 'black', opacity: 0.6 }}> Posted - { moment(post.timestamp).format("DD/MM/YYYY") } </small>
                                    </Media.Body>

                                </Media>
                                </div>

                                <ButtonGroup>
                                    <Button className="btn comment-add-vote-score"    onClick={ () =>  this.voteOnComment(comment.id,  "upVote" ) } style={{ borderTopLeftRadius:  '0px' , backgroundColor: '#59b258', width:'51%', borderWidth: '0px' }} > + </Button>
                                    <Button className="btn comment-remove-vote-score" onClick={ () =>  this.voteOnComment(comment.id, "downVote") } style={{ borderTopRightRadius: '0px' , backgroundColor: '#d64c49', width:'51%', borderWidth: '0px' }} > - </Button>
                                </ButtonGroup>

                            </Card>
                        ) }
                    </div>

                </Container>
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
