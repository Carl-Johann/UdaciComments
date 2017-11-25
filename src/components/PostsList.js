import React, { Component } from 'react';
import '../index.css';
import { connect } from 'react-redux'
import { actionSetCategories, actionSetPostsForCategory, actionDeletePost, actionClearPostsForCategory, actionEditPost } from '../actions/thunkActions'

import * as CategoriesAPI from '../API/CategoriesAPI';
import * as PostsAPI from '../API/PostsAPI';
import SubmitFields from './SubmitFields'

import moment from 'moment'
import sortBy from 'sort-array'
import { Link } from 'react-router-dom'

import FontAwesome from 'react-fontawesome'
import {
    Card, Button, ModalHeader,
    CardTitle, CardText, CardColumns,
    Container, ButtonGroup, Modal
} from 'reactstrap';

class PostsList extends Component {

    state = {
        categoryColors: {
            'react' : 'success',
            'redux' : 'secondary',
            'udacity' : 'danger',
        },
        noPosts: false,
        orderBy: 'voteScore',

        isEditModalOpen: false,
        postToEdit: {},

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
        this.props.actionSetCategories()

        let category = this.props.match.params.category

        this.props.actionSetPostsForCategory(category).then( postsForCategoryLength =>
            postsForCategoryLength === 0 ? this.setState({ noPosts: true }) : this.setState({ noPosts: false })
        )
    }

    componentWillUnmount() {
        this.props.actionClearPostsForCategory()
    }




    openEditModal = post => {
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

        this.setState({
            inputFields,
            isEditModalOpen: true,
            postToEdit: post,
        })
    }

    closeEditModal = () => {
        this.setState({
            isEditModalOpen: false,
            postToEdit: {}
        }
    )}

    viewPostInDetail = (postId) => {
        let shownCategory = this.props.match.params.category
        this.props.history.push(`/${shownCategory}/${postId}`)
    }


    deletePost = (postId) => {
        this.props.actionDeletePost(postId).then( postsForCategoryLength =>
            postsForCategoryLength === 0 ? this.setState({ noPosts: true }) : this.setState({ noPosts: false })
        )
    }

    onOrderButtonClick = (orderBy) => {
        this.setState({ orderBy })
    }


    handlePostEdit = (inputFields) => {
        this.props.actionEditPost(inputFields.title.value, inputFields.body.value, this.state.postToEdit.id)
        .then( this.closeEditModal() )
    }




    render() {
        const { categories, category, store, postsForCategory, posts } = this.props
        const { categoryColors, noPosts, orderBy, isEditModalOpen, inputFields } = this.state

        const fixedSortBtns = { cursor: 'pointer', position: 'fixed', bottom: '3em', right: '9.5em', backgroundColor: '#ffc107', borderRadius: '4px'}
        const title  = { display: 'inline-block', width: '85%', cursor: 'pointer' }
        const backBtn = { color: 'gray', marginLeft: '1em', marginTop: '0.4em' }
        const smallSpanStyle  = { color: 'black', opacity: 0.6 }
        const deleteP = { display: 'inline', zIndex: '99999', cursor: 'pointer' }



        const sortedPosts = () => {
            switch(orderBy) {
            case 'voteScore':
                return sortBy(posts.postsForCategory, orderBy).reverse()
            case 'author':
                return sortBy(posts.postsForCategory, orderBy)
            case 'timestamp':
                return sortBy(posts.postsForCategory, orderBy).reverse()
            }
        }


        return (
            <div className="categorys-posts">
                 <span className="left">
                    <Link to={`/`}>
                        <FontAwesome name="angle-left" size="3x" style={ backBtn }/>
                    </Link>
                </span>

                <p className="title unselectable"> { this.props.match.params.category } </p>



                <div id="edit-post-modal">
                    <Modal isOpen={ isEditModalOpen }>
                        <ModalHeader toggle={ this.closeEditModal }> Edit Comment </ModalHeader>
                        <Container>
                            <SubmitFields
                                inputFieldsProps={ inputFields }
                                onEdit={ inputFields => this.handlePostEdit(inputFields)}
                                submitBtnText="Edit Post"
                            />
                        </Container> <br/>
                    </Modal>
                </div>



                <Container>
                    { noPosts && (
                        <h3 style={{ textAlign: 'center' }}> No posts for this category. Add some... </h3>
                    )}

                    <CardColumns>
                        { posts.postsForCategory !== undefined && ( sortedPosts().map( post => (
                            <div key={ post.id }>
                                <Card body inverse color={ categoryColors[post.category] }>
                                    <CardTitle >
                                        <p style={ title } onClick={ () => { this.viewPostInDetail(post.id) }}> { post.title } </p>
                                        <p style={ deleteP } onClick={ () => { this.deletePost(post.id) }}>
                                            <FontAwesome name="times" style={{ float: 'right' }}/>
                                        </p>
                                    </CardTitle>

                                    <span className="right">
                                        <FontAwesome name="pencil-square-o" onClick={ () => this.openEditModal(post) }/>
                                    </span>

                                    <CardText onClick={ () => { this.viewPostInDetail(post.id) }} style={{ cursor: 'pointer' }}>
                                        { post.body } <br/>
                                        Vote Score: { post.voteScore } <br/>
                                        <small style={ smallSpanStyle }> { post.author } - { moment(post.timestamp).format("DD/MM/YYYY") } </small>
                                    </CardText>
                                </Card>
                            </div>
                        ))) }
                    </CardColumns>

                <Link to={`/create_post`}>
                    <Button className="add-post-btn">
                        Add Post
                    </Button>
                </Link>


                <ButtonGroup style={ fixedSortBtns }>
                    <Button id="sort-btn" onClick={() => this.onOrderButtonClick('voteScore')} active={ orderBy === 'voteScore' }> Vote Score  </Button>
                    <Button id="sort-btn" onClick={() => this.onOrderButtonClick('author'   )} active={ orderBy === 'author'    }>   Author    </Button>
                    <Button id="sort-btn" onClick={() => this.onOrderButtonClick('timestamp')} active={ orderBy === 'timestamp' }> Create Date </Button>
                </ButtonGroup>


                </Container>
            </div>


        )

    }
}

const mapStateToProps = ({ categories, posts }) => {
  return {
    categories,
    posts,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    actionSetCategories: () => dispatch(actionSetCategories()),
    actionClearPostsForCategory: () => dispatch(actionClearPostsForCategory()),
    actionSetPostsForCategory: (category) => dispatch(actionSetPostsForCategory(category)),
    actionDeletePost: (postId) => dispatch(actionDeletePost(postId)),
    actionEditPost: (title, body, postId) => dispatch(actionEditPost(title, body, postId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostsList)