import React, { Component } from 'react';
import '../index.css';
import { connect } from 'react-redux'
import { setCategories, setPosts, setCategory } from '../actions'
import * as CategoriesAPI from '../API/CategoriesAPI';
import * as PostsAPI from '../API/PostsAPI';
import moment from 'moment'
import { Link } from 'react-router-dom'
import {
    Card, Button, CardImg,
    CardTitle, CardText, CardColumns,
    CardSubtitle, CardBody, Row,
    Col, CardFooter, ButtonDropdown,
    DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';

class PostsList extends Component {

    state = {
        categoryColors: {
            'react' : 'success',
            'redux' : 'secondary',
            'udacity' : 'danger',
        },
        shouldSelectorSlide: false,
        shownCategory: 'react',
    }

    componentDidMount() {
        CategoriesAPI.getAllCategories().then( categories => {
            // console.log("From fetch", categories);
                // Dispatching to store
                this.props.setAllCategories({categories})
            // console.log("From store", this.props.categories)
        })

        PostsAPI.getAllPosts().then( posts => {
            // console.log("From fetch", posts)
                // Dispatching to store
                this.props.setAllPosts({posts})
            // console.log("From store", this.props.posts)
        })

        let lort = "react"
        this.props.setShownCategory({lort})

    }


    render() {
        const { posts, categories, category } = this.props
        const { categoryColors, shouldSelectorSlide, shownCategory } = this.state

        const changeSelector = () => { this.state.shouldSelectorSlide ? this.setState({ shouldSelectorSlide : false }) : this.setState({ shouldSelectorSlide : true }) }

        const e = () => { }

        return (
            <div className="container">

                <p className="title unselectable" onClick={ changeSelector } > { shownCategory } </p>

                <ButtonDropdown isOpen={ shouldSelectorSlide } toggle={ e } >


                    <DropdownToggle caret>
                        Button Dropdown
                    </DropdownToggle>

                    <DropdownMenu>
                        { categories['categories'] !== undefined && categories['categories'].map( category => (
                            <Link className="select-category-link" to={`/${category.path}`} key={category.name}>
                                <DropdownItem >
                                    <span className="category-name"> { category.name } </span>
                                </DropdownItem>
                            </Link>
                        )) }
                    </DropdownMenu>

                </ButtonDropdown>


                <CardColumns>
                    { posts['posts'] !== undefined && posts['posts'].map( post => (
                        <div key={ post.id }>

                            <Link className="select-post-link" to={`/${shownCategory}/${post.id}`} key={post.id}>
                                <Card body inverse color={categoryColors[post.category]} >
                                    <CardTitle > { post.title } </CardTitle>
                                    <CardText  > { post.body }  </CardText>
                                    <CardText>
                                        <small style={{ color: 'black', opacity: 0.6 }}> { post.author } - { moment(post.timestamp).format("DD/MM/YYYY") } </small>
                                    </CardText>
                                </Card>
                            </Link>

                        </div>
                     )) }
                </CardColumns>

            </div>
        )

    }
}

function mapStateToProps ({ categories, posts, category }) {
  return {
    categories,
    category,
    posts,
  }
}


function mapDispatchToProps (dispatch) {
  return {
    setAllCategories: (data) => dispatch(setCategories(data)),
    setAllPosts: (data) => dispatch(setPosts(data)),
    setShownCategory: (data) => dispatch(setCategory(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList)

