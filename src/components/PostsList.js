import React, { Component } from 'react';
import '../index.css';
import { connect } from 'react-redux'
import { setCategories, setPostsForCategory } from '../actions'

import * as CategoriesAPI from '../API/CategoriesAPI';
import * as PostsAPI from '../API/PostsAPI';

import moment from 'moment'
import { Link } from 'react-router-dom'

import FontAwesome from 'react-fontawesome'
import {
    Card, Button, CardImg,
    CardTitle, CardText, CardColumns,
    CardSubtitle, CardBody, Row,
    Col, CardFooter, ButtonDropdown,
    DropdownToggle, DropdownMenu, DropdownItem, Container
} from 'reactstrap';

class PostsList extends Component {

    state = {
        categoryColors: {
            'react' : 'success',
            'redux' : 'secondary',
            'udacity' : 'danger',
        },
        noPosts: false
    }

    componentDidMount() {
        CategoriesAPI.getAllCategories().then( categories => {
                this.props.setCategories({ categories })
        })



        PostsAPI.getPostsByCategory(this.props.match.params.category).then( postsForCategory => {
            this.props.setPostsForCategory({ postsForCategory })
            postsForCategory.length === 0 ? this.setState({ noPosts: true }) : this.setState({ noPosts: false })
        })


    }


    viewPostInDetail = (postId) => {
        let shownCategory = this.props.match.params.category
        this.props.history.push(`/${shownCategory}/${postId}`)
    }


    deletePost = (postId) => {
        PostsAPI.deletePost(postId).then( post_response => {
            let postsForCategory = this.props.posts.postsForCategory.filter( post => post.id !== postId)
            this.props.setAllPostsForCategory({ postsForCategory })

            postsForCategory.length === 0 ? this.setState({ noPosts: true }) : this.setState({ noPosts: false })
        })
    }


    render() {
        const { categories, category, store, postsForCategory, posts } = this.props
        const { categoryColors, noPosts } = this.state

        const fixedAddBtn = { cursor: 'pointer', position: 'fixed', bottom: '3em', right: '3em', borderColor: '#ffc107', backgroundColor: '#ffc107', color: '#111' }
        const title  = { display: 'inline-block', width: '85%', cursor: 'pointer' }
        const backBtn = { color: 'gray', marginLeft: '1em', marginTop: '0.4em' }
        const smallSpanStyle  = { color: 'black', opacity: 0.6 }
        const deleteP = { display: 'inline', zIndex: '99999', cursor: 'pointer' }
        const cardTextStyle = { cursor: 'pointer' }
        const h3Style = { textAlign: 'center' }
        const times = { float: 'right' }

        return (

            <div className="categorys-posts">
                 <span className="left">
                    <Link to={`/`}>
                        <FontAwesome name="angle-left" size="3x" style={ backBtn }/>
                    </Link>
                </span>

                <p className="title unselectable"> { this.props.match.params.category } </p>

                <Container>

                    { noPosts && (
                        <h3 style={ h3Style }> No posts for this category. Add some... </h3>
                    )}

                    <CardColumns>
                        { posts.postsForCategory !== undefined && ( posts.postsForCategory.map( post => (
                            <div key={ post.id }>
                                <Card body inverse color={ categoryColors[post.category] }>
                                    <CardTitle >
                                        <p style={ title } onClick={ () => { this.viewPostInDetail(post.id) }}> { post.title } </p>
                                        <p style={ deleteP } onClick={ () => { this.deletePost(post.id) }} >
                                            <FontAwesome name="times" style={times}/>
                                        </p>
                                    </CardTitle>

                                    <CardText onClick={ () => { this.viewPostInDetail(post.id) }} style={ cardTextStyle }>
                                        { post.body } <br/>
                                        <small style={ smallSpanStyle }> { post.author } - { moment(post.timestamp).format("DD/MM/YYYY") } </small>
                                    </CardText>
                                </Card>
                            </div>
                        ))) }
                    </CardColumns>

                <Link to={`/create_post`}  >
                    <Button style={ fixedAddBtn } >
                        Add Post
                    </Button>
                </Link>

                </Container>
            </div>


        )

    }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    posts: state.posts
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    setPostsForCategory: (data) => dispatch(setPostsForCategory(data)),
    setCategories:       (data) => dispatch(setCategories(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostsList)