import React, { Component } from 'react';
import { setCategories, setPosts, setCategory } from '../actions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import EditModal from './EditModal'

import * as CategoriesAPI from '../API/CategoriesAPI';
import * as PostsAPI from '../API/PostsAPI';

import FontAwesome from 'react-fontawesome'
import {
    Card, CardTitle, CardText,
    CardColumns, CardSubtitle, CardBody,
    Container, Button, ButtonGroup,
    Modal, ModalHeader, ModalBody,
    ModalFooter, FormFeedback, FormGroup,
    ControlLabel, Input,
} from 'reactstrap';



class CreatePost extends Component {

    createPost = (inputFields) => {
        let inputFieldsEntries = Object.entries(inputFields)
        let title = inputFields.title.value
        let body = inputFields.body.value
        let author = inputFields.author.value
        let category = inputFields.category.value


        PostsAPI.createPost(title, body, author, category).then( response => {
            this.props.goTo(`/${category}`)
        } )

    }


    render() {

        // const { inputFields } = this.state
        const { goBack, categories } = this.props
        // const { title, body, author } = inputFields

        // const titleText = { textTransform: 'capitalize' }

        const inputFields = {
            title: {
                state: null,
                value: '',
                type: 'text'
            },
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
            category: {
                state: null,
                value: '',
                type: 'select',
            },
        }

        const backBtn   = { cursor: 'pointer', color: 'gray', marginLeft: '1em', marginTop: '0.4em' }
        // const textArea  = { minHeight: '62px' }



        return (
            <div className="create-post">
                <span className="left" onClick={ goBack }>
                    <FontAwesome name="angle-left" size="3x" style={ backBtn } />
                </span>

                <p className="title unselectable"> Create a Comment </p>

                <Container style={{ width: '65%' }}>
                    <EditModal
                        inputFieldsProps={inputFields}
                        onEdit={ (inputFields) => this.createPost(inputFields)}
                        submitBtnText="Create Comment"
                    />
                </Container>

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
)(CreatePost)