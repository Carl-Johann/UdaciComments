import React, { Component } from 'react';
import '../index.css';
import { connect } from 'react-redux'
import { setPostInDetail } from '../actions'
import { actionSetAllPosts, actionVotePost } from '../actions/thunkActions'

import SubmitFields from './SubmitFields'
import CardPost from './CardPost'

import sortBy from 'sort-array'
import { Link } from 'react-router-dom'

import FontAwesome from 'react-fontawesome'
import {
    Button, ModalHeader, CardColumns,
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

        // If 'allPosts' weren't downloaded in another component, like 'CategorySelect',
        //  we download them and update store
        if (this.props.allPosts === undefined) this.props.actionSetAllPosts().then( postsLength => {
            postsLength === 0 ? this.setState({ noPosts: true }) : this.setState({ noPosts: false })
        } )
    }



    onOrderButtonClick = (orderBy) => { this.setState({ orderBy }) }


    render() {
        const { posts } = this.props
        const { noPosts, orderBy, isEditModalOpen, inputFields } = this.state

        const fixedSortBtns = { cursor: 'pointer', position: 'fixed', bottom: '3em', right: '9.5em', backgroundColor: '#ffc107', borderRadius: '4px'}
        const backBtn = { color: 'gray', marginLeft: '1em', marginTop: '0.4em' }

        const sortedPosts = () => {

            let posts = this.props.posts.allPosts.filter( p => p.category === this.props.match.params.category )
            switch(orderBy) {
            case 'author':
                return sortBy(posts, orderBy)
            case 'timestamp':
                return sortBy(posts, orderBy).reverse()
            default:
                return sortBy(posts, orderBy).reverse()
            }
        }


        return (
            <div className="category-posts">
                <br/>
                 <span className="left">
                    <Link to={`/`}>
                        <FontAwesome name="angle-left" size="3x" style={ backBtn } />
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
                        { posts.allPosts !== undefined && ( sortedPosts().map( post => (
                            <CardPost
                                key={ post.id }
                                post={ post }
                            />
                        ))) }
                    </CardColumns>
                </Container>


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

                <br/><br/><br/><br/><br/><br/>
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
    actionSetAllPosts: () => dispatch(actionSetAllPosts()),
    actionVotePost: (postId, vote) => dispatch(actionVotePost(postId, vote)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostsList)