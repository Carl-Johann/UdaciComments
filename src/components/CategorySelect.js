import React, { Component } from 'react';
import { connect } from 'react-redux'

import sortBy from 'sort-array'

import { Link } from 'react-router-dom'
import { setPostInDetail } from '../actions'
import { actionSetCategories, actionSetPostsForCategory, actionDeletePost, actionClearPostsForCategory, actionEditPost, actionSetAllPosts, actionEditAPostInAllPosts } from '../actions/thunkActions'
import CardPost from './CardPost'

import {
    Card, CardTitle, Container,
    CardColumns,
    Button, ButtonGroup
} from 'reactstrap';


class CategorySelect extends Component {

    state = {
        orderBy: 'voteScore'
    }

    componentDidMount() {
        this.props.actionSetCategories()
        this.props.actionSetAllPosts()
    }

    onOrderButtonClick = (orderBy) => {
        this.setState({ orderBy })
    }


    render() {
        const { categories, posts } = this.props
        const { orderBy } = this.state

        const fixedSortBtns = { cursor: 'pointer', position: 'fixed', bottom: '3em', right: '9.5em', backgroundColor: '#ffc107', borderRadius: '4px'}
        const cardStyle = { marginTop: '2em', marginBottom: '2em', backgroundColor: 'white' }
        const cardTitle = { textAlign: 'center', textTransform: 'capitalize' }

        const sortedPosts = (category) => {
            let posts = this.props.posts.allPosts.filter( p => p.category === category.name )
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
            <div className="category-list">

                <Container >
                    { categories.categories.map( category => (
                        <div key={ category.name }>
                            <Link className="select-category-link" to={`/${category.name}`}  >
                                <Card body style={ cardStyle }>
                                    <CardTitle style={ cardTitle }>
                                        { category.name }
                                    </CardTitle>
                                </Card>
                            </Link>



                            { posts.allPosts !== undefined && ( sortedPosts(category).length !== 0 ?
                                <CardColumns >
                                    { sortedPosts(category).map( post => (

                                        <CardPost
                                            key={ post.id }
                                            post={ post }
                                            openEditModal={ (postId) => this.openEditModal(post)}
                                            goTo={ (location) => this.props.goTo(location) }
                                        />

                                    )) }
                                    </CardColumns>
                            : <h3 style={{ textAlign: 'center' }}> No posts for this category. Add some... </h3> )}
                        </div>
                    ))}
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
                <br/><br/><br/><br/><br/><br/><br/>
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
    actionEditPost: (title, body, postId) => dispatch(actionEditPost(title, body, postId)),
    setPostInDetail: (postInDetail) => dispatch(setPostInDetail(postInDetail)),
    actionSetAllPosts: () => dispatch(actionSetAllPosts()),
    actionEditAPostInAllPosts: (title, body, postId) => dispatch(actionEditAPostInAllPosts(title, body, postId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategorySelect)