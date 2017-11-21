import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setCategories, setPosts, setComments, setComment } from '../actions';
import * as CategoriesAPI from '../API/CategoriesAPI';
import { Link } from 'react-router-dom'

import FontAwesome from 'react-fontawesome'
import {
    Card, CardTitle, CardText,
    CardColumns, CardSubtitle, CardBody,
    Container, Button, ButtonGroup,
    Modal, ModalHeader, ModalBody,
    ModalFooter, FormFeedback, FormGroup,
    ControlLabel, Input,
} from 'reactstrap';


class CategorySelect extends Component {

    state = {
        categories: []
    }

    componentDidMount() {

        CategoriesAPI.getAllCategories().then( categories => {
            // console.log("From fetch", categories);
                // Dispatching to store
                this.setState({ categories })

                this.props.setAllCategories({ categories })
            // console.log("From store", this.props.categories)
        })
    }

    render() {
        const { categories } = this.state
        const cardStyle = { marginTop: '2em', marginBottom: '2em', backgroundColor: '#e5e5e5' }
        const categoryContainer = { marginTop: '10vh' }

        return (
            <div className="category-list">
                <p className="title unselectable" > Select a Category </p>
                <Container style={ categoryContainer }>
                    { categories.map( category => (
                        <Link className="select-category-link" to={`/${category.name}/`} key={ category.name } >
                            <Card body key={ category.name } style={ cardStyle }>
                                <CardTitle style={{ textAlign: 'center', textTransform: 'capitalize' }}>
                                    { category.name }
                                </CardTitle>
                            </Card>
                        </Link>
                    ) )}
                </Container>
            </div>
        )
// #e5e5e5
    }

}


function mapStateToProps ({ categories, posts, comments }) {
  return {
    categories,
    comments,
    posts,
  }
}


function mapDispatchToProps (dispatch) {
  return {
    setAllCategories: (data) => dispatch(setCategories(data)) ,
    setAllPosts:      (data) => dispatch(setPosts(data))      ,
    setAllComments:   (data) => dispatch(setComments(data))   ,
    postComment:      (data) => dispatch(setComment(data))    ,
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategorySelect)
