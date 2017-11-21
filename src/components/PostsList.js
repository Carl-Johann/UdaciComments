import React, { Component } from 'react';
import '../index.css';
import { connect } from 'react-redux'
import { setCategories, setPosts, setCategory, setPostsForCategory, removePostById } from '../actions'

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
        shownCategory: '',
        postsForCategory: [],
    }


    componentWillMount() {
        this.setState({ postsForCategory: [] })
    }

    componentDidMount() {
        CategoriesAPI.getAllCategories().then( categories => {
            // console.log("From fetch", categories);
                // Dispatching to store
                this.props.setAllCategories({categories})
            console.log("From store1", this.props.categories)
        })

        PostsAPI.getAllPosts().then( posts => {
            // console.log("From fetch", posts)
                // Dispatching to store
                this.props.setAllPosts({ posts })
            // console.log("From store", this.props.posts)
        })

        let shownCategory = this.props.match.params.category

        this.setState({ shownCategory })

        PostsAPI.getPostsByCategory(shownCategory).then( postsForCategory => {
            this.props.setAllPostsForCategory({ postsForCategory })
        })


    }


    viewPostInDetail = (postId) => {
        let shownCategory = this.props.match.params.category
        this.props.history.push(`/${shownCategory}/${postId}`)
    }


    deletePost = (postId) => {
        console.log(13123123123, this.props.posts)
        PostsAPI.deletePost(postId).then( post_response => {
            console.log(123, post_response)

            let postsForCategory = this.state.postsForCategory.filter( post=> post.id !== postId)
            this.props.deletePostById(postId)
            // this.setState({ postsForCategory })

        })
    }


    render() {
        const { categories, category, store } = this.props
        const { postsForCategory, posts } = this.props
        const { categoryColors, shouldSelectorSlide, shownCategory } = this.state

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

                <p className="title unselectable"> { shownCategory } </p>

                <Container>

                    { posts === undefined && (
                        <h3 style={ h3Style } onClick={ () => console.log(this.props) }> No posts for this category. Add some... </h3>
                    )}

                    <CardColumns>
                        { posts.posts !== undefined && ( posts.posts.map( post => (
                            <div key={ post.id }>
                                <Card body inverse color={ categoryColors[post.category] }>
                                    <CardTitle >
                                        <p style={ title } onClick={ () => { this.viewPostInDetail(post.id) }}> { post.title } </p>
                                        <p style={ deleteP } onClick={ () => { this.deletePost(post.id)  }} >
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
    postsForCategory: state.postsForCategory,
    categories: state.categories,
    category: state.category,
    posts: state.posts,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    setAllPostsForCategory:(data) => dispatch(setPostsForCategory(data)),
    setAllCategories:   (data) => dispatch(setCategories(data)),
    setShownCategory: (data) => dispatch(setCategory(data)),
    deletePostById: (data) => dispatch(removePostById(data)),
    setAllPosts:  (data) => dispatch(setPosts(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostsList)